rock.namespace('rock.graphics.engine.renderer');

/**
 * All renderers must implement it
 *
 * @constructor
 * @interface
 *
 * @author Luis Alberto Jiménez
 */
rock.graphics.engine.renderer.IRenderer = function () {
};

rock.interface_(rock.graphics.engine.renderer.IRenderer);

/**
 * Render an object
 *
 * @param {rock.graphics.engine.renderer.Renderable} renderable
 *            the object to be rendered
 *
 * @function
 */
rock.graphics.engine.renderer.IRenderer.prototype.render = rock.abstract_;