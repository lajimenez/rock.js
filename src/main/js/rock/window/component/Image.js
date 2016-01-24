rock.namespace('rock.window.component');

/**
 * Image class
 *
 * @param {rock.window.Window} window
 *            the window where component exists
 * @param {rock.graphics.Image | String} image
 *            the image to use. It must be be a {String} representing resource id if you want localize it
 * @param {Boolean} [localize]
 *            if true, the image will be localized (and 'image' param must be a {String})
 * @constructor
 * @extends rock.window.component.Component
 *
 * @author Luis Alberto Jiménez
 */
rock.window.component.Image = function (window, image, localize) {
    rock.super_(this, [window]);
    this.image = image;
    this.width = rock.window.component.Component.AUTO_SIZE;
    this.height = rock.window.component.Component.AUTO_SIZE;

    this.localize = localize;
    if (rock.util.JsUtils.isNullOrUndefined(this.localize)) {
        this.localize = false;
    }
    // This is the real image that will be shown
    this.computedImage = null;
};

rock.extends_(rock.window.component.Image, rock.window.component.Component);

/**
 * @override
 * @see rock.window.component.Component#updateComponent
 */
rock.window.component.Image.prototype.updateComponent = function () {
    this.computeImage();
    var computedImage = this.computedImage;

    if (this.width === rock.window.component.Component.AUTO_SIZE) {
        this.computedWidth = computedImage.getWidth();
    } else {
        this.computedWidth = this.width;
    }

    if (this.height === rock.window.component.Component.AUTO_SIZE) {
        this.computedHeight = computedImage.getHeight();
    } else {
        this.computedHeight = this.height;
    }
};

/**
 * Get the image to use
 */
rock.window.component.Image.prototype.computeImage = function () {
    var computedImage =  this.image;
    if (this.localize) {
        computedImage = this.application.getResourceManager().getImage(this.image);
        this.checkResourceAvailable(computedImage);
    }
    this.computedImage = computedImage;
};

/**
 * @override
 * @see rock.graphics.engine.IDrawable#draw
 */
rock.window.component.Image.prototype.draw = function (graphicsEngine) {
    this.updateComponent();
    graphicsEngine.drawImage(this.computedImage, this.x, this.y, this.computedWidth, this.computedHeight);
};

/**
 * Get the image
 */
rock.window.component.Image.prototype.getImage = function() {
    return this.image;
};

/**
 * Get the localize
 */
rock.window.component.Image.prototype.getLocalize = function() {
    return this.localize;
};

/**
 * Get the computedImage
 */
rock.window.component.Image.prototype.getComputedImage = function() {
    return this.computedImage;
};