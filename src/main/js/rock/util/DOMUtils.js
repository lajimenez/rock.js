rock.namespace('rock.util');

/**
 * DOM utils class
 *
 * @constructor
 * @author Luis Alberto Jiménez
 */
rock.util.DOMUtils = {

    /**
     * Get a HTML Element by id
     *
     * @param id
     *            the id of the HTML Element
     */
    getElementById: function (id) {
        return document.getElementById(id);
    },

    /**
     * Add an event listener to an HTML Element
     *
     * @param element
     *            the HTML element
     * @param eventType
     *            the event to add listener
     * @param handler
     *            the handler for the event
     * @param {Boolean} [useCapture]
     *            use capture
     */
    addEventListener: function (element, eventType, handler, useCapture) {
        var capture = false;
        if (!rock.util.JsUtils.isNullOrUndefined(useCapture)) {
            capture = useCapture;
        }
        element.addEventListener(eventType, handler, capture);
    },

    /**
     * Remove an event listener from an HTML Element
     *
     * @param element
     *            the HTML element
     * @param eventType
     *            the event to add listener
     * @param handler
     *            the handler for the event
     * @param {Boolean} [useCapture]
     *            use capture
     */
    removeEventListener: function (element, eventType, handler, useCapture) {
        var capture = false;
        if (!rock.util.JsUtils.isNullOrUndefined(useCapture)) {
            capture = useCapture;
        }
        element.removeEventListener(eventType, handler, capture);
    },

    /**
     * Create a HTML Element
     *
     * @param type
     *            the type of the HTML Element
     */
    createHTMLElement: function (type) {
        var HTMLElement = document.createElement(type);
        return HTMLElement;
    },

    /**
     * Create a canvas element
     *
     * @param width
     *            the width of the canvas
     * @param height
     *            the height of the canvas
     * @param {number} [tabIndex]
     *            the tab index. It's a trick to be able to set focus on the element...
     */
    createCanvas: function (width, height, tabIndex) {
        var canvas = this.createHTMLElement(rock.constants.CANVAS_TAG);
        canvas.setAttribute('width', width + 'px');
        canvas.setAttribute('height', height + 'px');
        if (!rock.isNullOrUndefined(tabIndex)) {
            canvas.setAttribute('tabindex', tabIndex);
        }
        return canvas;
    }

};