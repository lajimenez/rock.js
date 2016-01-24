rock.namespace('rock.resource.event');

/**
 * Event to throw when the ResourceWindow has finished
 *
 * @constructor
 * @extends rock.event.Event
 * @author Luis Alberto Jiménez
 */
rock.resource.event.ResourceWindowCompleteEvent = function () {
    rock.super_(this, [rock.resource.event.ResourceWindowCompleteEvent.RESOURCE_WINDOW_COMPLETE]);
};

rock
    .extends_(rock.resource.event.ResourceWindowCompleteEvent,
    rock.event.Event);

/**
 * Event ID
 */
rock.resource.event.ResourceWindowCompleteEvent.RESOURCE_WINDOW_COMPLETE = 'RESOURCE_WINDOW_COMPLETE';