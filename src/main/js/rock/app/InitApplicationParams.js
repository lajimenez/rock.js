rock.namespace('rock.app');

/**
 * Application initialization object
 *
 * @param {String} idDiv
 *            id for div where we insert canvas
 * @param {int} width
 *            width in pixels
 * @param {int} height
 *            height in pixels
 * @param contextType
 *            the type of context , can be one of the values in array
 *            [rock.constants.CONTEXT_CANVAS_2D, rock.constants.CONTEXT_WEBGL]
 * @param {String} urlResources
 *            the base url for dynamic resources
 * @param {Object} [contextCreationParams]
 *            pair key/value with context the creations params
 * @constructor
 *
 * @author Luis Alberto Jiménez
 */
rock.app.InitApplicationParams = function (idDiv, width, height, contextType, urlResources, contextCreationParams) {
    this.idDiv = idDiv;
    this.width = width;
    this.height = height;
    this.contextType = contextType;
    this.urlResources = urlResources;
    this.contextCreationParams = contextCreationParams;

    /**
     * You can scale the size of the application
     *
     * @type {Number}
     */
    this.scaleFactor = null;
};

/**
 * Get the idDiv
 */
rock.app.InitApplicationParams.prototype.getIdDiv = function() {
    return this.idDiv;
};

/**
 * Get the width
 */
rock.app.InitApplicationParams.prototype.getWidth = function() {
    return this.width;
};

/**
 * Get the height
 */
rock.app.InitApplicationParams.prototype.getHeight = function() {
    return this.height;
};

/**
 * Get the contextType
 */
rock.app.InitApplicationParams.prototype.getContextType = function() {
    return this.contextType;
};

/**
 * Get the urlResources
 */
rock.app.InitApplicationParams.prototype.getUrlResources = function() {
    return this.urlResources;
};

/**
 * Get the contextCreationParams
 */
rock.app.InitApplicationParams.prototype.getContextCreationParams = function() {
    return this.contextCreationParams;
};

/**
 * Get the scaleFactor
 */
rock.app.InitApplicationParams.prototype.getScaleFactor = function() {
    return this.scaleFactor;
};

/**
 * Set the scaleFactor
 *
 * @param scaleFactor the value
 */
rock.app.InitApplicationParams.prototype.setScaleFactor = function(scaleFactor) {
    this.scaleFactor = scaleFactor;
};

