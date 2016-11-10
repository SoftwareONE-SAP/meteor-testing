/**
 *
 */
import { mocha } from "meteor/practicalmeteor:mocha-core";
import { chai } from "meteor/practicalmeteor:chai";

function runTests() {
	mocha.reporter("spec");

	window.__tests_running__   = true;
  window.__tests_complete__  = false;

	mocha.run(function (failures) {
		window.__tests_failures__ 	= failures + 0;
		window.__tests_running__ 	  = false;
		window.__tests_complete__ 	= true;
	})
}

export { runTests };
