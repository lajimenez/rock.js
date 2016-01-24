rock.namespace('rock.test');

/**
 * Class that contains information about execution of a test
 *
 * @constructor
 *
 * @author Luis Alberto Jiménez
 */
rock.test.TestSuiteResult = function () {
    this.resultByTest = [];
};

/**
 * Add failed result for a test
 *
 * @param testName
 * @param {boolean} result
 */
rock.test.TestSuiteResult.prototype.addResultForTest = function (testName, result) {
    this.resultByTest.push({name :testName, failed : result });
};

/**
 * Returns if some test has failed
 *
 * @returns {boolean} some test failed
 */
rock.test.TestSuiteResult.prototype.someTestFailed = function () {
    var resultByTest = this.resultByTest;
    var someTestFailed = false;
    var i;
    for (i = 0; i < resultByTest.length; i++) {
        someTestFailed = someTestFailed || resultByTest[i].failed;
    }
    return someTestFailed;
};

/**
 * Returns execution test information
 *
 * @returns {String}
 */
rock.test.TestSuiteResult.prototype.toString = function () {
    var result = '';
    if (this.someTestFailed()) {
        result += rock.resource.rockResourceManager.getString('TEST_SUITE_RESULT_KO');
    } else {
        result += rock.resource.rockResourceManager.getString('TEST_SUITE_RESULT_OK');
    }

    var i;
    var resultByTest = this.resultByTest;
    for (i = 0; i < resultByTest.length; i++) {
        if (resultByTest[i].failed) {
            result += rock.resource.rockResourceManager.getString('TEST_RESULT_KO', [resultByTest[i].name]);
        } else {
            result += rock.resource.rockResourceManager.getString('TEST_RESULT_OK', [resultByTest[i].name]);
        }
    }

    return result;
};