rock.namespace('rock.graphics.engine.renderer');

/**
 * Render an element (the vertices represents screen pixels positions)
 *
 * @constructor
 * @extends {rock.graphics.engine.renderer.webgl.GenericRenderable}
 * @abstract
 *
 * @author Luis Alberto Jiménez
 */
rock.graphics.engine.renderer.ScreenElementRenderable = function () {
    rock.super_(this);
    this.width = null;
    this.height = null;
};

rock.extends_(rock.graphics.engine.renderer.ScreenElementRenderable,
    rock.graphics.engine.renderer.webgl.GenericRenderable);

/**
 * Get the value
 */
rock.graphics.engine.renderer.ScreenElementRenderable.prototype.getWidth = function() {
    return this.width;
};

/**
 * Set the value
 * @param width the value
 */
rock.graphics.engine.renderer.ScreenElementRenderable.prototype.setWidth = function(width) {
    this.width = width;
};

/**
 * Get the value
 */
rock.graphics.engine.renderer.ScreenElementRenderable.prototype.getHeight = function() {
    return this.height;
};

/**
 * Set the value
 * @param height the value
 */
rock.graphics.engine.renderer.ScreenElementRenderable.prototype.setHeight = function(height) {
    this.height = height;
};
