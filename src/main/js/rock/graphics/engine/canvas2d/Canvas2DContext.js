rock.namespace('rock.graphics.engine.canvas2d');

/**
 * Represents a Canvas2D context used for drawing
 *
 * @constructor
 * @extends rock.graphics.engine.Context
 *
 * @author Luis Alberto Jiménez
 */
rock.graphics.engine.canvas2d.Canvas2DContext = function (application, HTMLContext) {
    rock.super_(this, arguments);
};

rock.extends_(rock.graphics.engine.canvas2d.Canvas2DContext, rock.graphics.engine.Context);

/**
 * @see rock.graphics.engine.Context#getWidth
 * @override
 */
rock.graphics.engine.canvas2d.Canvas2DContext.prototype.getWidth = function () {
    return this.HTMLContext.canvas.width;
};

/**
 * @see rock.graphics.engine.Context#getHeight
 * @override
 */
rock.graphics.engine.canvas2d.Canvas2DContext.prototype.getHeight = function () {
    return this.HTMLContext.canvas.height;
};