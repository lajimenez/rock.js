rock.namespace('rock.graphics.engine');

/**
 * Represents a context that is used for drawing
 *
 * @param {rock.app.Application} application
 * @param HTMLContext
 *
 * @constructor
 * @abstract
 *
 * @author Luis Alberto Jiménez
 */
rock.graphics.engine.Context = function (application, HTMLContext) {
    this.application = application;
    this.HTMLContext = HTMLContext;
};

/**
 * Get the width of the context
 *
 * @function
 */
rock.graphics.engine.Context.prototype.getWidth = rock.abstract_;

/**
 * Get the height of the context
 *
 * @function
 */
rock.graphics.engine.Context.prototype.getHeight = rock.abstract_;

/**
 * Get the application
 */
rock.graphics.engine.Context.prototype.getApplication = function () {
    return this.application;
};

/**
 * Get the HTMLContext
 */
rock.graphics.engine.Context.prototype.getHTMLContext = function () {
    return this.HTMLContext;
};