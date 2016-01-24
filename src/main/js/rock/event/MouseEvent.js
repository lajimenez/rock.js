rock.namespace('rock.event');

/**
 * Class for mouse events.
 *
 * @param {String} id
 *      the id of the event
 *
 * @constructor
 * @extends rock.event.Event
 * @author Luis Alberto Jiménez
 */
rock.event.MouseEvent = function (id) {
    rock.super_(this, [id]);

    this.x = null;
    this.y = null;
    this.DOMMouseEvent = null;
};

rock.extends_(rock.event.MouseEvent, rock.event.Event);

/**
 * Return the mouse button that has done the action
 *
 * @returns the button
 */
rock.event.MouseEvent.prototype.getButton = function () {
    var DOMMouseEvent = this.DOMMouseEvent;
    if (rock.util.JsUtils.isNullOrUndefined(DOMMouseEvent)) {
        return null;
    }

    var mouseButton = DOMMouseEvent.button;
    var button = null;

    if (mouseButton == rock.constants.HTML_DOM_EVENT_MOUSE_BUTTON_LEFT) {
        button = rock.constants.ROCK_EVENT_MOUSE_BUTTON_LEFT;
    } else if (mouseButton == rock.constants.HTML_DOM_EVENT_MOUSE_BUTTON_WHEEL) {
        button = rock.constants.ROCK_EVENT_MOUSE_BUTTON_WHEEL;
    } else if (mouseButton == rock.constants.HTML_DOM_EVENT_MOUSE_BUTTON_RIGHT) {
        button = rock.constants.ROCK_EVENT_MOUSE_BUTTON_RIGHT;
    }

    return button;
};

/**
 * Get the x
 *
 * @returns the value
 */
rock.event.MouseEvent.prototype.getX = function () {
    return this.x;
};

/**
 * Set the x
 *
 * @param x
 *            the value to set
 */
rock.event.MouseEvent.prototype.setX = function (x) {
    this.x = x;
};

/**
 * Get the y
 *
 * @returns the value
 */
rock.event.MouseEvent.prototype.getY = function () {
    return this.y;
};

/**
 * Set the y
 *
 * @param y
 *            the value to set
 */
rock.event.MouseEvent.prototype.setY = function (y) {
    this.y = y;
};

/**
 * Get the DOMMouseEvent
 *
 * @returns the value
 */
rock.event.MouseEvent.prototype.getDOMMouseEvent = function () {
    return this.DOMMouseEvent;
};

/**
 * Set the DOMMouseEvent
 *
 * @param DOMMouseEvent
 *            the value to set
 */
rock.event.MouseEvent.prototype.setDOMMouseEvent = function (DOMMouseEvent) {
    this.DOMMouseEvent = DOMMouseEvent;
};
