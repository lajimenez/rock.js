rock.namespace('rock.event');

/**
 * Class for events
 * @param {String} id
 *      the id of the event
 *
 * @constructor
 * @author Luis Alberto Jiménez
 */
rock.event.Event = function (id) {
    this.id = null;
    if (!rock.util.JsUtils.isNullOrUndefined(id)) {
        this.id = id;
    }
};

/**
 * Sets the id component
 *
 * @param id
 *            the id
 */
rock.event.Event.prototype.setId = function (id) {
    this.id = id;
};

/**
 * Returns the id
 *
 * @returns the id
 */
rock.event.Event.prototype.getId = function () {
    return this.id;
};

/**
 * Set the source component
 *
 * @param source
 *            the source
 */
rock.event.Event.prototype.setSource = function (source) {
    this.source = source;
};

/**
 * Get the source
 *
 * @returns the source
 */
rock.event.Event.prototype.getSource = function () {
    return this.source;
};