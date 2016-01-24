rock.namespace('rock.resource.loader');

/**
 * Abstract class to implement by resource loaders
 *
 * @constructor
 * @author Luis Alberto Jiménez
 */
rock.resource.loader.AbstractResourceLoader = function () {
    this.resourceLoaderManager = null;
};

/**
 * Sets the resource loader
 *
 * @param {rock.resource.loader.ResourceLoaderManager} resourceLoaderManager
 *
 */
rock.resource.loader.AbstractResourceLoader.prototype.setResourceLoaderManager = function (resourceLoaderManager) {
    this.resourceLoaderManager = resourceLoaderManager;
};

/**
 * Load the resource
 *
 * @param {rock.resource.loader.ResourceLoaderElement} elem
 *
 * @function
 */
rock.resource.loader.AbstractResourceLoader.prototype.loadResource = rock.abstract_;