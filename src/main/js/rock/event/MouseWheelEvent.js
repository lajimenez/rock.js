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
rock.event.MouseWheelEvent = function (id) {
    rock.super_(this, [id]);
    this.DOMMouseEvent = null;
};

rock.extends_(rock.event.MouseWheelEvent, rock.event.Event);

/**
 * Get the DOMMouseEvent
 *
 * @returns the value
 */
rock.event.MouseWheelEvent.prototype.getDOMMouseEvent = function () {
    return this.DOMMouseEvent;
};

/**
 * Set the DOMMouseEvent
 *
 * @param DOMMouseEvent
 *            the value to set
 */
rock.event.MouseWheelEvent.prototype.setDOMMouseEvent = function (DOMMouseEvent) {
    this.DOMMouseEvent = DOMMouseEvent;
};

/**
 * Return the delta scroll
 *
 * @returns delta
 */
rock.event.MouseWheelEvent.prototype.getDelta = function () {
    var DOMMouseEvent = this.DOMMouseEvent;
    if (rock.util.JsUtils.isNullOrUndefined(DOMMouseEvent)) {
        return null;
    }

    return DOMMouseEvent.wheelDelta;
};

rock.event.MouseWheelEvent.prototype.getDelta_FI = function () {
    var DOMMouseEvent = this.DOMMouseEvent;
    if (rock.util.JsUtils.isNullOrUndefined(DOMMouseEvent)) {
        return null;
    }

    return -DOMMouseEvent.detail;
};

rock.replaceByUserAgentImplementation(rock.event.MouseWheelEvent, 'getDelta', true);