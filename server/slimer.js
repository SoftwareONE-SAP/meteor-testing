/**
 * Slimer script
 */

/**
 * Require Dependancies
 */
var webpage     = require("webpage"),
    system      = require("system"),
    interval    = 500, // 500ms
    intervalId  = null,
    page        = webpage.create();

if(!system.env['URL']) {
  console.error("system.env['URL'] required");
  slimer.exit(1);
}

/**
 * Configure the viewport to be the standard 1024/768
 */
page.viewportSize = { width:1024, height:768 };

/**
 * Pipe the console messages
 */
page.onConsoleMessage = function (msg, line, file) {
  return console.log(msg);
};

/**
 * Open the webpage and
 */
page.open(system.env['URL']);

/**
 * Evaluate
 */
function evaluate() {
  /**
   * Check for __tests_complete__
   */
  let __tests_complete__ = page.evaluate(function() {
    return window.__tests_complete__;
  });

  /**
   * IF we are complete, we should extract the errors
   */
  if(__tests_complete__) {
    let __tests_failures__ = page.evaluate(function() {
      return window.__tests_failures__;
    });

    /**
     * Close the page as we are now at the end of the test.
     */
    page.close();

    /**
     * Exit with the number of failures
     */
    slimer.exit(__tests_failures__);
    return;
  }

  // sage guard, we will exist if there hasn't been console out put for 30s
  if ((new Date) - lastOutput > 30000) {
    slimer.exit(2);
  }
}

intervalId = setInterval(evaluate, interval);

// var startTime;
//
// let complete;
// let failures;
// let lastOutput = new Date();
//
//
// page.open("http://localhost:3300/")
//
// const testing = setInterval(function() {
//
//   complete = page.evaluate(function() {
//     return window.__tests_complete__;
//   });
//
//   if (complete) {
//     // console.log('inside here');
//     // console.log(complete);
//     failures = page.evaluate(function() {
//       return window.__tests_failures__;
//     });
//     page.close();
//     // console.log(failures);
//     // console.log('BEFORE EXIT');
//     slimer.exit(failures);
//     clearInterval(testing);
//   }
//
//   // sage guard, we will exist if there hasn't been console out put for 30s
//   if ((new Date) - lastOutput > 30000) {
//     slimer.exit(2);
//   }
// }, 500);
