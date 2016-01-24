rock.namespace('rock.graphics');

/**
 * Class to represents a color
 *
 * @param r
 *            red component {0, 255}
 * @param g
 *            green component {0, 255}
 * @param b
 *            blue component {0, 255}
 * @param [a]
 *            alpha component {0, 255}
 * @constructor
 * @author Luis Alberto Jiménez
 */
rock.graphics.Color = function (r, g, b, a) {

    this.MAX_VALUE = 255;

    this.red = r;
    this.green = g;
    this.blue = b;

    if (!rock.isNullOrUndefined(a)) {
        // Alpha
        this.alpha = a;
    } else {
        this.alpha = this.MAX_VALUE;
    }

};

/**
 * Transparent color
 *
 * @constant
 */
rock.graphics.Color.TRANSPARENT = new rock.graphics.Color(0, 0, 0, 0);

/**
 * Black color
 *
 * @constant
 */
rock.graphics.Color.BLACK = new rock.graphics.Color(0, 0, 0);

/**
 * White color
 *
 * @constant
 */
rock.graphics.Color.WHITE = new rock.graphics.Color(255, 255, 255);

/**
 * Red color
 *
 * @constant
 */
rock.graphics.Color.RED = new rock.graphics.Color(255, 0, 0);

/**
 * Green color
 *
 * @constant
 */
rock.graphics.Color.GREEN = new rock.graphics.Color(0, 255, 0);

/**
 * Blue color
 *
 * @constant
 */
rock.graphics.Color.BLUE = new rock.graphics.Color(0, 0, 255);

/**
 * Get the red
 *
 * @returns the value
 */
rock.graphics.Color.prototype.getRed = function () {
    return this.red;
};

/**
 * Set the red
 *
 * @param red
 *            the value to set
 */
rock.graphics.Color.prototype.setRed = function (red) {
    this.red = red;
};

/**
 * Get the green
 *
 * @returns the value
 */
rock.graphics.Color.prototype.getGreen = function () {
    return this.green;
};

/**
 * Set the green
 *
 * @param green
 *            the value to set
 */
rock.graphics.Color.prototype.setGreen = function (green) {
    this.green = green;
};

/**
 * Get the blue
 *
 * @returns the value
 */
rock.graphics.Color.prototype.getBlue = function () {
    return this.blue;
};

/**
 * Set the blue
 *
 * @param blue
 *            the value to set
 */
rock.graphics.Color.prototype.setBlue = function (blue) {
    this.blue = blue;
};

/**
 * Get the alpha
 *
 * @returns the value
 */
rock.graphics.Color.prototype.getAlpha = function () {
    return this.alpha;
};

/**
 * Set the alpha
 *
 * @param alpha
 *            the value to set
 */
rock.graphics.Color.prototype.setAlpha = function (alpha) {
    this.alpha = alpha;
};

/**
 * Get the red normalized {0, 1}
 *
 * @returns {Number} the value
 */
rock.graphics.Color.prototype.getNormalizedRed = function () {
    return this.red / this.MAX_VALUE;
};

/**
 * Get the green normalized {0, 1}
 *
 * @returns {Number} the value
 */
rock.graphics.Color.prototype.getNormalizedGreen = function () {
    return this.green / this.MAX_VALUE;
};

/**
 * Get the blue normalized {0, 1}
 *
 * @returns {Number} the value
 */
rock.graphics.Color.prototype.getNormalizedBlue = function () {
    return this.blue / this.MAX_VALUE;
};

/**
 * Get the alpha normalized {0, 1}
 *
 * @returns {Number} the value
 */
rock.graphics.Color.prototype.getNormalizedAlpha = function () {
    return this.alpha / this.MAX_VALUE;
};

/**
 * Get the color as hex values. Format: #RRGGBB
 *
 * @returns {string} the color as hex
 */
rock.graphics.Color.prototype.getAsHex = function () {

    return '#' + rock.util.JsUtils.getAsHex(this.red)
        + rock.util.JsUtils.getAsHex(this.green)
        + rock.util.JsUtils.getAsHex(this.blue);
};

/**
 * Get the color as rgba. Format: rgba(r, g, b, a)
 *
 * @returns {string} the color as rgba
 */
rock.graphics.Color.prototype.getAsRGBA = function () {
    return 'rgba(' + this.red + ', ' + this.green + ', ' + this.blue + ', '
        + this.getNormalizedAlpha() + ')';
};

/**
 * Create an color object from an hex values
 *
 * @param hex
 *      the color as hex. Format: #RRGGBB
 * @returns {rock.graphics.Color} the color
 */
rock.graphics.Color.fromHex = function (hex) {
    var red = parseInt(hex.substring(1, 3), 16);
    var green = parseInt(hex.substring(3, 5), 16);
    var blue = parseInt(hex.substring(5, 7), 16);

    return new rock.graphics.Color(red, green, blue);
};

/**
 * Clone this color
 *
 * @returns {rock.graphics.Color}
 */
rock.graphics.Color.prototype.clone = function () {
    return new rock.graphics.Color(this.red, this.green, this.blue, this.alpha);
};