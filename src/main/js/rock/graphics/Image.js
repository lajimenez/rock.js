rock.namespace('rock.graphics');

/**
 * Represents an image
 *
 * @param {HTMLImageElement} HTMLImage
 *            with an image
 * @constructor
 */
rock.graphics.Image = function (HTMLImage) {
    this.HTMLImage = HTMLImage;
    /**
     * Only set if you know what are you doing :P
     * ATTENTION: It will be ignored in Canvas2DGraphicsEngine :(
     *
     * @type {Boolean}
     */
    this.premultipliedAlpha = false;
};

/**
 * Get the htmlImage
 *
 * @returns the value
 */
rock.graphics.Image.prototype.getHTMLImage = function () {
    return this.HTMLImage;
};

/**
 * Get the width of the image
 *
 * @returns the width of the image
 */
rock.graphics.Image.prototype.getWidth = function () {
    return this.HTMLImage.width;
};

/**
 * Get the height of the image
 *
 * @returns the height of the image
 */
rock.graphics.Image.prototype.getHeight = function () {
    return this.HTMLImage.height;
};

/**
 * Get the premultipliedAlpha
 */
rock.graphics.Image.prototype.getPremultipliedAlpha = function() {
    return this.premultipliedAlpha;
};

/**
 * Set the premultipliedAlpha
 *
 * @param premultipliedAlpha the value
 */
rock.graphics.Image.prototype.setPremultipliedAlpha = function(premultipliedAlpha) {
    this.premultipliedAlpha = premultipliedAlpha;
};