rock.namespace('rock.util');

/**
 * Text utils class
 *
 * @constructor
 * @author Luis Alberto Jiménez
 */
rock.util.TextUtils = {
    /**
     * Get the width for a given text
     *
     * @param text
     *      text to measure
     * @param {rock.graphics.Font} font
     *      the font
     * @returns {Number} the width
     */
    measureTextWidth: function (text, font) {
        this.context.font = font.toCanvasFormat();
        var metrics = this.context.measureText(text);
        return Math.ceil(metrics.width);
    },

    /**
     * Get the height for a given text
     *
     * ATTENTION: This implementation is stupid right now... But I have left because
     * in the future there will only be one place for a better implementation.
     *
     * ATTENTION 2: This value is an approximate...
     *
     * @param text
     *      text to measure
     * @param {rock.graphics.Font} font
     *      the font
     * @returns {Number} the width
     */
    measureTextHeight: function (text, font) {
        return Math.ceil(font.getSize() * 1.2);
    }
};

rock.util.TextUtils.context = rock.util.DOMUtils.createCanvas(1, 1).getContext(rock.constants.CANVAS_CONTEXT_2D);
