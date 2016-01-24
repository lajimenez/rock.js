rock.namespace('rock.event');

/**
 * Base class for components that can dispatch events.
 *
 * SOME IDEAS...
 * I think the event system could be implemented using the DOM 'EventTarget' interface (for example, adding
 * the events to the canvas that any rock application has). But I like this implementation because
 * I can assure that the javascript thread won't be disrupted (and so no partial drawing should occur)
 * when an event is dispatched.
 *
 * @constructor
 *
 * @author Luis Alberto Jiménez
 */
rock.event.EventDispatcher = function () {
    this.handlersEventElements = [];
};

/**
 * Dispatch an event
 *
 * @param {rock.event.Event} event
 *            the event
 */
rock.event.EventDispatcher.prototype.dispatchEvent = function (event) {
    event.setSource(this);
    var currentHandlersEventElement = this.getHandlersEventElement(event
        .getId());
    var i;
    var handlers;
    if (currentHandlersEventElement != null) {
        handlers = currentHandlersEventElement.handlers;
        for (i = 0; i < handlers.length; i++) {
            handlers[i](event);
        }

    }
};

/**
 * Add a new event listener to an event type (defined by id)
 *
 * @param eventId
 *            the id of the event to listen
 * @param {function} handler
 *            function to handle the event
 */
rock.event.EventDispatcher.prototype.addEventListener = function (eventId, handler) {
    var currentHandlersEventElement = this.getHandlersEventElement(eventId);

    if (currentHandlersEventElement == null) {
        currentHandlersEventElement = new rock.event.EventDispatcherHandlersEventElement();
        currentHandlersEventElement.eventId = eventId;
        this.handlersEventElements.push(currentHandlersEventElement);
    }

    currentHandlersEventElement.handlers.push(handler);
};

/**
 * Remove an event listener from an event type (defined by id)
 *
 * @param eventId
 *            the id of the event to remove
 * @param handler
 *            function to handle the event {function}
 */
rock.event.EventDispatcher.prototype.removeEventListener = function (eventId, handler) {
    var currentHandlersEventElement = this.getHandlersEventElement(eventId);

    if (currentHandlersEventElement == null) {
        return;
    }

    rock.util.JsUtils.removeByValueFromArray(currentHandlersEventElement.handlers,
        handler);
};

/**
 * Remove all event listener from an event type (defined by id)
 *
 * @param eventId
 *            the id of the event to remove
 */
rock.event.EventDispatcher.prototype.removeAllEventListener = function (eventId) {
    var currentHandlersEventElement = this.getHandlersEventElement(eventId);

    if (currentHandlersEventElement == null) {
        return;
    }

    rock.util.JsUtils.clearArray(currentHandlersEventElement.handlers);
};

/**
 * Get the handlers for an event type
 *
 * @param eventId
 *            the event id
 * @returns list of handlers
 * @private
 */
rock.event.EventDispatcher.prototype.getHandlersEventElement = function (eventId) {
    var i;
    var handlersEventElements = this.handlersEventElements;
    var currentElement;

    for (i = 0; i < handlersEventElements.length; i++) {
        currentElement = handlersEventElements[i];

        if (eventId === currentElement.eventId) {
            return currentElement;
        }
    }

    return null;
};

/**
 * Internal class to store relation between events and handlers
 */
rock.event.EventDispatcherHandlersEventElement = function () {
    this.eventId = null;
    this.handlers = [];
};