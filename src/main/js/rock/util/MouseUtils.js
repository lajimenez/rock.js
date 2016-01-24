
rock.namespace('rock.util');

/**
 * Mouse utils class
 *
 * @constructor
 * @author Luis Alberto Jiménez
 */
rock.util.MouseUtils = {

    /**
     * Get the coordinates of an event. The position is relative to the current
     * element.
     *
     * @param event
     *            the mouse event
     */
    resolveEventCoords: function (event) {
        var boundingClientRect = event.currentTarget.getBoundingClientRect();

        return {
            x: event.clientX - boundingClientRect.left,
            y: event.clientY - boundingClientRect.top
        };
    },

    resolveEventCoords_CH: function (event) {
        return {
            x: event.offsetX,
            y: event.offsetY
        };
    },

    resolveEventCoords_IE: this.resolveEventCoords_CH
};

rock.replaceByUserAgentImplementation(rock.util.MouseUtils, 'resolveEventCoords');

