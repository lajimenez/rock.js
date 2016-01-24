rock.namespace('rock.graphics.engine.renderer');

/**
 * Information needed to render an image with WebGL
 *
 * @constructor
 * @extends {rock.graphics.engine.renderer.ScreenElementRenderable}
 *
 * @author Luis Alberto Jiménez
 */
rock.graphics.engine.renderer.ImageRenderable = function () {
    rock.super_(this);
    this.image = null;
    this.textureCoordinates = null;
};

rock.extends_(rock.graphics.engine.renderer.ImageRenderable, rock.graphics.engine.renderer.ScreenElementRenderable);

/**
 * Get the value
 */
rock.graphics.engine.renderer.ImageRenderable.prototype.getImage = function() {
    return this.image;
};

/**
 * Set the value
 * @param image the value
 */
rock.graphics.engine.renderer.ImageRenderable.prototype.setImage = function(image) {
    this.image = image;
};

/**
 * Get the value
 */
rock.graphics.engine.renderer.ImageRenderable.prototype.getTextureCoordinates = function() {
    return this.textureCoordinates;
};

/**
 * Set the value
 * @param textureCoordinates the value
 */
rock.graphics.engine.renderer.ImageRenderable.prototype.setTextureCoordinates = function(textureCoordinates) {
    this.textureCoordinates = textureCoordinates;
};