rock.namespace('rock.graphics');

/**
 * Represents a font
 *
 * @param family
 *            font family
 * @param size
 *            size of the font
 * @constructor
 */
rock.graphics.Font = function (family, size) {
    this.family = family;
    this.size = size;
};

/**
 * Get the font formatted for using as a canvas font property
 *
 * @returns the font as {String}
 */
rock.graphics.Font.prototype.toCanvasFormat = function () {
    return this.size + 'px ' + this.family;
};

/**
 * Get the family
 *
 * @returns the value
 */
rock.graphics.Font.prototype.getFamily = function () {
    return this.family;
};

/**
 * Set the family
 *
 * @param family
 *            the value to set
 */
rock.graphics.Font.prototype.setFamily = function (family) {
    this.type = family;
};

/**
 * Get the size
 *
 * @returns the value
 */
rock.graphics.Font.prototype.getSize = function () {
    return this.size;
};

/**
 * Set the size
 *
 * @param size
 *            the value to set
 */
rock.graphics.Font.prototype.setSize = function (size) {
    this.size = size;
};

/**
 * Clone this font
 *
 * @returns {rock.graphics.Font}
 */
rock.graphics.Font.prototype.clone = function () {
    return new rock.graphics.Font(this.family, this.size);
};