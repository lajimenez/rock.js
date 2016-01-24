rock.namespace('rock.graphics.engine');

/**
 * Drawing engine for use with canvas context
 *
 * @param {rock.graphics.engine.Context} context
 *            the context
 * @constructor
 * @abstract
 * @augments rock.graphics.engine.IGraphicsEngine
 * @author Luis Alberto Jiménez
 */
rock.graphics.engine.ContextGraphicsEngine = function (context) {
    rock.super_(this, []);
    this.context = context;
    this.width = null;
    this.height = null;
    this.computeSize();
};

rock.extends_(rock.graphics.engine.ContextGraphicsEngine, rock.event.EventDispatcher);

rock.implements_(rock.graphics.engine.ContextGraphicsEngine, rock.graphics.engine.IGraphicsEngine);

/**
 * @see rock.graphics.engine.IGraphicsEngine#init
 * @override
 */
rock.graphics.engine.ContextGraphicsEngine.prototype.init = function() {
    ;
};

rock.graphics.engine.ContextGraphicsEngine.prototype.adjustPixelPosition = function (pixelPosition, width) {
    var position = pixelPosition;
    var ADJUSTMENT = 0.5;

    if (width % 2 != 0) {
        position = position + ADJUSTMENT;
    }
    return position;
};

/**
 * Update the size of the component
 */
rock.graphics.engine.ContextGraphicsEngine.prototype.computeSize = function () {
    var context = this.context;
    this.width = context.getWidth();
    this.height = context.getHeight();
};

/**
 * Return the context
 *
 * @returns the context
 */
rock.graphics.engine.ContextGraphicsEngine.prototype.getContext = function() {
    return this.context;
};
