rock.namespace('rock.resource.event');

/**
 * Event to throw when the ResourceLoader has finished
 *
 * @constructor
 * @extends rock.event.Event
 * @author Luis Alberto Jiménez
 */
rock.resource.event.ResourceLoaderComplete = function () {
    rock.super_(this, [rock.resource.event.ResourceLoaderComplete.RESOURCE_LOADER_COMPLETE]);
};

rock.extends_(rock.resource.event.ResourceLoaderComplete, rock.event.Event);

/**
 * Event ID
 */
rock.resource.event.ResourceLoaderComplete.RESOURCE_LOADER_COMPLETE = 'RESOURCE_LOADER_COMPLETE';