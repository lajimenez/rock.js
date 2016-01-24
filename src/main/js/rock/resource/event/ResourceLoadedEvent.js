rock.namespace('rock.resource.event');

/**
 * Event to throw when a resource has been loaded
 *
 * @constructor
 * @extends rock.event.Event
 * @author Luis Alberto Jiménez
 */
rock.resource.event.ResourceLoadedEvent = function () {
    rock.super_(this, [rock.resource.event.ResourceLoadedEvent.RESOURCE_LOADED]);
    this.resource = null;
    this.loaded = false;
};

rock.extends_(rock.resource.event.ResourceLoadedEvent, rock.event.Event);

/**
 * Event ID
 */
rock.resource.event.ResourceLoadedEvent.RESOURCE_LOADED = 'RESOURCE_LOADED';

/**
 * Get the result of the operation
 *
 * @returns the result
 */
rock.resource.event.ResourceLoadedEvent.prototype.getLoaded = function () {
    return this.loaded;
};

/**
 * Get the result of the operation
 *
 * @param loaded
 *            the result
 */
rock.resource.event.ResourceLoadedEvent.prototype.setLoaded = function (loaded) {
    this.loaded = loaded;
};

/**
 * Get the resource loaded
 *
 * @returns the resource loaded
 */
rock.resource.event.ResourceLoadedEvent.prototype.getResource = function () {
    return this.resource;
};

/**
 * Set the resource loaded
 *
 * @param resource
 *            the resource loaded
 */
rock.resource.event.ResourceLoadedEvent.prototype.setResource = function (resource) {
    this.resource = resource;
};