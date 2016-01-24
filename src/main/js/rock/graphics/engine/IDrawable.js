rock.namespace('rock.graphics.engine');

/**
 * Interface to implement by any drawable item
 *
 * @constructor
 * @interface
 * @author Luis Alberto Jiménez
 */
rock.graphics.engine.IDrawable = function () {
};

rock.interface_(rock.graphics.engine.IDrawable);

/**
 * Draw the element using the drawing engine
 *
 * @param {rock.graphics.engine.IGraphicsEngine} graphicsEngine
 *            the drawing engine to use for drawing the element
 *
 * @function
 */
rock.graphics.engine.IDrawable.prototype.draw = rock.abstract_;