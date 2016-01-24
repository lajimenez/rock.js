/**
 * Functions to handle timer operations
 *
 * @constructor
 * @author Luis Alberto Jiménez
 */
rock.timer = {

    /**
     * Array containing timer functions
     */
    registeredFunctions : [],

    /**
     * You can use this property to check if the timer is running
     */
    isRunning : false,

    request : null,

    /**
     * Register a function so it will be executed when starting timer
     *
     * @param {Object} context
     *      the context which function will be executed
     * @param {function} func
     *      the function to be executed
     * @param {Array} params
     *      array containing parameters whe calling function
     */
    registerTimerFunction : function (context, func, params) {
        var functionInfo = {
            context : context,
            func : func,
            params : params
        };
        this.registeredFunctions.push(functionInfo);
    },

    /**
     * Unregister a function so it won't be executed when starting timer
     *
     * @param {function} func
     *      the function to be unregistered
     */
    unregisterTimerFunction : function (func) {
        var i, functionInfo, registeredFunctions;
        registeredFunctions = this.registeredFunctions;
        for (i = 0; i < registeredFunctions.length; i++) {
            functionInfo = registeredFunctions[i];
            if (func === functionInfo.func) {
                rock.util.JsUtils.removeByValueFromArray(registeredFunctions, functionInfo);
            }
        }
    },

    /**
     * Start the timer
     */
    start : function () {
        // You can start the timer without any function registered
        if (!this.isRunning) {
            this.request = requestAnimationFrame(this.rockTimerHandle);
            this.isRunning = true;
        }
    },

    /**
     * Stop the timer
     */
    stop : function () {
        if (this.isRunning) {
            cancelAnimationFrame(this.request);
            this.isRunning = false;
        }
    },

    /**
     * Internal function to handle timer
     *
     * @private
     */
    rockTimerHandle : function () {
        var i, registeredFunctions, functionInfo;
        registeredFunctions = rock.timer.registeredFunctions;
        rock.timer.request = requestAnimationFrame(rock.timer.rockTimerHandle);
        for (i = 0; i < registeredFunctions.length; i++) {
            functionInfo = registeredFunctions[i];
            functionInfo.func.apply(functionInfo.context, functionInfo.params);
        }
    },

    /**
     * Rock implementation when standard 'requestAnimationFrame' is not available
     *
     * @param {function} func
     *      the function to be executed
     * @returns {number} id of the interval
     */
    requestAnimationFrame : function (func) {
        return setTimeout(func, 16);
    },

    /**
     * Rock implementation when standard 'cancelAnimationFrame' is not available
     *
     * @param requestID
     *      id of the interval so clear
     */
    cancelAnimationFrame : function (requestID) {
        clearTimeout(requestID);
    }

};

// Init requestAnimationFrame & cancelAnimationFrame
(function() {
    window.requestAnimationFrame =
        window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame || window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame || rock.timer.requestAnimationFrame;

    window.cancelAnimationFrame =
        window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame ||
        window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame ||
        window.msCancelRequestAnimationFrame || rock.timer.cancelAnimationFrame;
})();