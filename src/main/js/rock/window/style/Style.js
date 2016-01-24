rock.namespace('rock.window.style');

/**
 * Represents an style
 *
 * @constructor
 *
 * @author Luis Alberto Jiménez
 */
rock.window.style.Style = function (id) {
    this.id = id;
    this.colors = {};
    this.fonts = {};
};

/**
 * Get the id of the style
 *
 * @returns {String}
 */
rock.window.style.Style.prototype.getId = function () {
    return this.id;
};

/**
 * Add a color to the style
 *
 * @param {String} colorId
 * @param {rock.graphics.Color} color
 */
rock.window.style.Style.prototype.addColor = function (colorId, color) {
    this.colors[colorId] = color;
};

/**
 * Get a color
 *
 * @param {String} colorId
 *      the id of the color
 * @returns {rock.graphics.Color}
 */
rock.window.style.Style.prototype.getColor = function (colorId) {
    return this.colors[colorId];
};

/**
 * Add a font to the style
 *
 * @param {String} fontId
 * @param {rock.graphics.Font} font
 */
rock.window.style.Style.prototype.addFont = function (fontId, font) {
    this.fonts[fontId] = font;
};

/**
 * Get a font
 *
 * @param {String} fontId
 *      the id of the font
 * @returns {rock.graphics.Font}
 */
rock.window.style.Style.prototype.getFont = function (fontId) {
    return this.fonts[fontId];
};