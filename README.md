# Centiq testing

This is a meteor testing driver package for running mocha tests, the project uses [SlimerJS](https://slimerjs.org/) to interact with the front end.

### Why did we created our own driver package?
We had issues running [PhantomJS](http://phantomjs.org/) with the [practicalmeteor:mocha](https://atmospherejs.com/practicalmeteor/mocha) & [dispatchme:meteor-mocha-phantomjs](https://github.com/DispatchMe/meteor-mocha).

SlimerJS is presented as having the same behaviors as PhantomJS, however where as
PhantomJS is built on top of Webkit and JavascriptCore, SlimerJS is built on Gecko
and SpiderMonkey.

More [differences](https://docs.slimerjs.org/current/differences-with-phantomjs.html)

#### Usage
`meteor test-packages --driver-package=centiq:testing`

or

`meteor test --driver-package=centiq:testing`

#### Arguments

##### --watch

This flag will keep the process running and rerun the tests whenever meteor detects
a change.

##### Environment varaibles

To run only server side tests you can create an environment variable called `SERVER_ONLY_TESTS` and set it to true.