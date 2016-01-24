rock.namespace('rock.graphics.engine.webgl');

/**
 * Represents a WebGL context used for drawing
 *
 * @constructor
 * @extends rock.graphics.engine.Context
 *
 * @author Luis Alberto Jiménez
 */
rock.graphics.engine.webgl.WebGLContext = function (application, HTMLContext) {
    rock.super_(this, arguments);
};

rock.extends_(rock.graphics.engine.webgl.WebGLContext, rock.graphics.engine.Context);

/**
 * @see rock.graphics.engine.Context#getWidth
 * @override
 */
rock.graphics.engine.webgl.WebGLContext.prototype.getWidth = function () {
    return this.HTMLContext.drawingBufferWidth;
};

/**
 * @see rock.graphics.engine.Context#getHeight
 * @override
 */
rock.graphics.engine.webgl.WebGLContext.prototype.getHeight = function () {
    return this.HTMLContext.drawingBufferHeight;
};
