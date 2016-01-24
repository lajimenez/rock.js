rock.namespace('rock.graphics.engine.renderer');

/**
 * Information needed to render a 2D polygon with WebGL
 *
 * @constructor
 * @extends {rock.graphics.engine.renderer.ScreenElementRenderable}
 *
 * @author Luis Alberto Jiménez
 */
rock.graphics.engine.renderer.PolygonRenderable = function () {
    rock.super_(this);
    this.color = null;
};

rock.extends_(rock.graphics.engine.renderer.PolygonRenderable, rock.graphics.engine.renderer.ScreenElementRenderable);

/**
 * Get the value
 */
rock.graphics.engine.renderer.PolygonRenderable.prototype.getColor = function() {
    return this.color;
};

/**
 * Set the value
 * @param color the value
 */
rock.graphics.engine.renderer.PolygonRenderable.prototype.setColor = function(color) {
    this.color = color;
};