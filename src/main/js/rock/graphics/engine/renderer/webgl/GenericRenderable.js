rock.namespace('rock.graphics.engine.renderer.webgl');

/**
 * Generic object for using with {rock.graphics.engine.renderer.webgl.GenericRenderer}
 *
 * @constructor
 * @extends {rock.graphics.engine.renderer.Renderable}
 *
 * @abstract
 *
 * @author Luis Alberto Jiménez
 */
rock.graphics.engine.renderer.webgl.GenericRenderable = function () {
    this.count = null;
    this.vertices = null;
};

rock.extends_(rock.graphics.engine.renderer.webgl.GenericRenderable, rock.graphics.engine.renderer.Renderable);

/**
 * Get the value
 */
rock.graphics.engine.renderer.webgl.GenericRenderable.prototype.getCount = function() {
    return this.count;
};

/**
 * Set the value
 * @param count the value
 */
rock.graphics.engine.renderer.webgl.GenericRenderable.prototype.setCount = function(count) {
    this.count = count;
};

/**
 * Get the value
 */
rock.graphics.engine.renderer.webgl.GenericRenderable.prototype.getVertices = function() {
    return this.vertices;
};

/**
 * Set the value
 * @param vertices the value
 */
rock.graphics.engine.renderer.webgl.GenericRenderable.prototype.setVertices = function(vertices) {
    this.vertices = vertices;
};
