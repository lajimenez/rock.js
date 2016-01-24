/**
 * Functions to handle console operations
 *
 * @constructor
 * @author Luis Alberto Jiménez
 */
rock.console = {
    log : function (msg) {
        rock.console.dummyConsoleOperation(msg);
    },

    warn : function (msg) {
        rock.console.dummyConsoleOperation(msg);
    },

    info : function (msg) {
        rock.console.dummyConsoleOperation(msg);
    },

    debug : function (msg) {
        rock.console.dummyConsoleOperation(msg);
    },

    trace : function () {
        rock.console.dummyConsoleOperation();
    },

    dummyConsoleOperation : function () {
        // At least you can put a breakpoint :P
        // (I prefer not to put an alert here so it can be very 'aggressive')
        var stop = true;
    }
};

(function() {
    if (console) {
        if (console.log) {
            rock.console.log = function (msg) {
                console.log(msg);
                // A better implementation might be to not define parameters and use:
                //console.log.apply(console, arguments);
            };
        }
        if (console.warn) {
            rock.console.warn = function (msg) {
                console.warn(msg);
            };
        }
        if (console.info) {
            rock.console.info = function (msg) {
                console.info(msg);
            };
        }
        if (console.debug) {
            rock.console.debug = function (msg) {
                console.debug(msg);
            };
        }
        if (console.trace) {
            rock.console.trace = function () {
                console.trace();
            };
        }
    }
})();

