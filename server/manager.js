import { mochaInstance as mocha } 	from "meteor/practicalmeteor:mocha-core"
import childProcess					from "child_process";
import path							    from "path";
import fs                   from "fs";

// https://docs.slimerjs.org/current/installation.html#having-a-headless-slimerjs
let serverTestsDone = false;
let clientLines = [];

/**
 * During the bundle stages the binary looses it's permission bitmasks,
 * we allow the server to be able to execute the file from the bundle
 * directory by adding the --x-r-r attributes.
 */
fs.chmodSync(Assets.absoluteFilePath('vendor/slimerjs/slimerjs'), 0755);

/**
 * TestManager core class,
 */
class TestManager {

	constructor() {
		/**
		 * Slimer Binary lcoation
		 * @type {[type]}
		 */
		this.slimer_bin = Assets.absoluteFilePath('vendor/slimerjs/slimerjs');

		/**
		 * Get the absolute lcoation of the slimer execution script.
		 * @type {String}
		 */
		this.slimer_script = Assets.absoluteFilePath('server/slimer.js' );

    /**
     * Track the slimer process between restarts
     * @type {Process}
     */
    this.slimer_proc = null;

    /**
     * Listen for meteor events
     */
    process.on("message", this._onClientRefreshOnly.bind(this));

		/**
		 * Server side failure count
		 * @type {Number}
		 */
		this.server_failures = 0;

		/**
		 * Client side failure count
		 * @type {Number}
		 */
		this.client_failures = 0;

		/**
		 * Define the spec
		 */
		mocha.reporter("spec");
	}

	printHeader(type) {
		console.log('--------------------');
		console.log(`----${type}---------`);
		console.log('--------------------');
	}

	/**
	 * [start description]
	 * @return {[type]} [description]
	 */
	start() {
		Meteor.startup(function(){
			/**
			 * 1. Run the server side tests
			 */

			this.printHeader('Server');

			/**
			 * Run the server side tests
			 * @type {MochaRunner}
			 */
			this._runner = mocha.run(this.onMochaServerSideComplete.bind(this));
		}.bind(this))

	}

	/**
	 * [onMochaComplete description]
	 * @param  {[type]} failures [description]
	 * @return {[type]}          [description]
	 */
	onMochaServerSideComplete(failures) {

		this.server_failures = failures;

		/**
		 * 2. Start ZOMBIE for client side tests
		 */
		this.printHeader('Client');
		this.startClient();
	}

	/**
	 * [startClient description]
	 * @return {[type]} [description]
	 */
	startClient() {
    /**
     * Reset the number of client errors
     * @type {Number}
     */
    this.client_failures = 0;

    /**
     * If we have a currently running process we need to exit it
     */
    if(this.slimer_proc !== null) {
      /**
       * Kill the script
       */
      this.slimer_proc.kill('SIGKILL');

      /**
       * Wipe the object
       */
      this.slimer_proc = null;
    }

		/**
		 * Create teh zombie process
		 * @type {[type]}
		 */
		this.slimer_proc = childProcess.execFile("xvfb-run", [this.slimer_bin, this.slimer_script].concat(process.env['SLIMERJS_ARGS'] || []), {
			env: {
				URL: Meteor.absoluteUrl()
			}
		});

		/**
		 * Bind pipes
		 */
		this.slimer_proc.stdout.on("data", this.onClientStreamOut.bind(this));
		this.slimer_proc.stderr.on("error", this.onClientStreamError.bind(this));

		/**
		 * Listen for an exit code
		 */
		this.slimer_proc.on('exit', this.onClientExit.bind(this));
	}

	_onClientRefreshOnly(message) {
    if(message && message.refresh && message.refresh == 'client') {
      this.startClient();
    }
	}

	/**
	 * [onClientExit description]
	 * @return {[type]} [description]
	 */
	onClientExit(failures) {
		/**
		 * Assign the exit code as the number of failures
		 * @type {Number}
		 */
		this.client_failures = failures;

		/**
		 *
		 */
		console.log(
			"All client and server tests finished!\n" +
			"--------------------------------\n" +
			"SERVER FAILURES: %s\n" +
			"CLIENT FAILURES: %s\n" +
			"--------------------------------",
			this.server_failures,
			this.client_failures
		);

		/**
		 * Proxy the exit code
		 */
		if(process.env.AUTO_EXIT && process.env.AUTO_EXIT === "1") {
			process.exit((this.client_failures + this.server_failures) > 0 ? 1 : 0);
		}
	}

	/**
	 * [onClientStreamOut description]
	 * @return {[type]} [description]
	 */
	onClientStreamOut(data) {
		if(data.toString("utf8").indexOf("stdout:") === -1) {
			process.stdout.write(data);
		}
	}

	/**
	 * [onClientStreamOut description]
	 * @return {[type]} [description]
	 */
	onClientStreamError(data) {
		process.stderr.write(data);
	}
}


function start() {
	let TS = new TestManager();
	return TS.start();
}

export {start};
