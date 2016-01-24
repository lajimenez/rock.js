rock.namespace('rock.event');

/**
 * Class for key events.
 *
 * @param {String} id
 *      the id of the event
 *
 * @constructor
 * @extends rock.event.Event
 * @author Luis Alberto Jiménez
 */
rock.event.KeyEvent = function (id) {
    rock.super_(this, [id]);
    this.DOMMouseEvent = null;
};

rock.extends_(rock.event.KeyEvent, rock.event.Event);

/**
 * Get the DOMMouseEvent
 *
 * @returns the value
 */
rock.event.KeyEvent.prototype.getDOMMouseEvent = function () {
    return this.DOMMouseEvent;
};

/**
 * Set the DOMMouseEvent
 *
 * @param DOMMouseEvent
 *            the value to set
 */
rock.event.KeyEvent.prototype.setDOMMouseEvent = function (DOMMouseEvent) {
    this.DOMMouseEvent = DOMMouseEvent;
};

/**
 * Get the key code
 *
 * @returns {Number}
 */
rock.event.KeyEvent.prototype.getKey = function () {
    return this.DOMMouseEvent.keyCode;
};

/**
 * Returns if shift is pressed
 *
 * @returns {Boolean}
 */
rock.event.KeyEvent.prototype.isShiftPressed = function () {
    return this.DOMMouseEvent.shiftKey;
};

/**
 * Returns if alt is pressed
 *
 * @returns {Boolean}
 */
rock.event.KeyEvent.prototype.isAltPressed = function () {
    return this.DOMMouseEvent.altKey;
};

/**
 * Returns if control is pressed
 *
 * @returns {Boolean}
 */
rock.event.KeyEvent.prototype.isCtrlPressed = function () {
    return this.DOMMouseEvent.ctrlKey;
};

rock.event.KeyEvent.prototype.toString = function () {
    return 'key pressed: ' + this.getKey() + '\n'
        + 'shift pressed: ' + this.isShiftPressed() + '\n'
        + 'alt pressed: ' + this.isAltPressed() + '\n'
        + 'ctrl pressed: ' + this.isCtrlPressed();
};