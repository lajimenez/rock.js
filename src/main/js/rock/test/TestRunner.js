rock.namespace('rock.test');

/**
 * Class for running tests
 *
 * @constructor
 *
 * @author Luis Alberto Jiménez
 */
rock.test.TestRunner = function () {
};

/**
 * Test functions mush start with this prefix
 *
 * @constant
 */
rock.test.TestRunner.TEST_PREFIX = 'test';

/**
 * Run all tests in a test suite
 *
 * @param {rock.test.TestSuite} testSuite
 *      test to be executed
 * @returns {rock.test.TestSuiteResult} information about the test execution
 */
rock.test.TestRunner.prototype.runTestSuite = function (testSuite) {
    if (!rock.instanceof_(testSuite, rock.test.TestSuite)) {
        throw new rock.error.RockError(rock.resource.rockResourceManager.getString('TEST_INVALID_TYPE'));
    }

    var testSuiteResult = new rock.test.TestSuiteResult();

    var propertyName, property;
    for (propertyName in testSuite) {
        property = testSuite[propertyName];
        if (rock.isFunction(property)
            && rock.util.JsUtils.stringStartsWith(propertyName, rock.test.TestRunner.TEST_PREFIX)) {
            testSuiteResult.addResultForTest(propertyName, this.runTest(testSuite, propertyName));
        }
    }

    return testSuiteResult;
};

/*
 * Run test
 *
 * @param testSuite
 *      test suite object
 * @param testName
 *      function in test suite to be executed
 *
 * @returns {boolean} if the test has failed
 */
rock.test.TestRunner.prototype.runTest = function (testSuite, testName) {
    testSuite.reset();
    testSuite.setUp();
    try {
        testSuite[testName]();
    } catch (error) {
        testSuite.markCurrentTestAsFailed();
    }
    testSuite.tearDown();

    return testSuite.hasCurrentTestFailed();
};