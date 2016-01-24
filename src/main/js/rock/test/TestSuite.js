rock.namespace('rock.test');

/**
 * Abstract class for implementing tests. The tests must be prefixed with 'test'.
 *
 * @constructor
 * @abstract
 *
 * @author Luis Alberto Jiménez
 */
rock.test.TestSuite = function () {
    this.currentTestFailed = null;
    this.reset();
};

/**
 * Reset the test so it can be run again
 */
rock.test.TestSuite.prototype.reset = function () {
    this.currentTestFailed = false;
};

/**
 * Returns if the test has failed
 *
 * @returns {boolean} if the test has failed
 */
rock.test.TestSuite.prototype.hasCurrentTestFailed = function () {
    return this.currentTestFailed;
};

/**
 * Any initialization needed must be done here
 */
rock.test.TestSuite.prototype.setUp = function () {
};

/**
 * Any release of resources must be done here
 */
rock.test.TestSuite.prototype.tearDown = function () {
};

/**
 * Assert if the param is true
 *
 * @param value
 *      the value to be checked
 */
rock.test.TestSuite.prototype.assertTrue = function (value) {
    if (!value) {
        this.markCurrentTestAsFailed();
    }
};

/**
 * Assert if the param is false
 *
 * @param value
 *      the value to be checked
 */
rock.test.TestSuite.prototype.assertFalse = function (value) {
    if (value) {
        this.markCurrentTestAsFailed();
    }
};

/**
 * Assert if both params are equals
 *
 * @param expectation
 *      the expectation value
 * @param value
 *      the value to be checked
 */
rock.test.TestSuite.prototype.assertEquals = function (expectation, value) {
    if (expectation !== value) {
        this.markCurrentTestAsFailed();
    }
};

/**
 * Assert if params are different
 *
 * @param expectation
 *      the expectation value
 * @param value
 *      the value to be checked
 */
rock.test.TestSuite.prototype.assertNotEquals = function (expectation, value) {
    if (expectation === value) {
        this.markCurrentTestAsFailed();
    }
};

/**
 * Assert if value is null

 * @param value
 *      the value to be checked
 */
rock.test.TestSuite.prototype.assertNull = function (value) {
    if (value !== null) {
        this.markCurrentTestAsFailed();
    }
};

/**
 * Assert if value is null or undefined

 * @param value
 *      the value to be checked
 */
rock.test.TestSuite.prototype.assertNullOrUndefined = function (value) {
    if (!rock.util.JsUtils.isNullOrUndefined(value)) {
        this.markCurrentTestAsFailed();
    }
};

/**
 * Assert if value is not null

 * @param value
 *      the value to be checked
 */
rock.test.TestSuite.prototype.assertNotNull = function (value) {
    if (value === null) {
        this.markCurrentTestAsFailed();
    }
};

/**
 * Assert that function throws error
 *
 * @param expectedMessage
 * @param object
 * @param func
 * @param params
 */
rock.test.TestSuite.prototype.assertError = function (expectedMessage, object, func, params) {
    var error = null;
    try {
        func.apply(object, params);
    } catch (e) {
        error = e;
    }

    if (!error) {
        this.markCurrentTestAsFailed();
    } else {
        if (expectedMessage != error.message) {
            this.markCurrentTestAsFailed();
        }
    }
};

/**
 * Mark the current test as failed
 */
rock.test.TestSuite.prototype.markCurrentTestAsFailed = function () {
    this.currentTestFailed = true;
};