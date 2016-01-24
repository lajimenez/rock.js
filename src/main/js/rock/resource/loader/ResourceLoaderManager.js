rock.namespace('rock.resource.loader');

/**
 * Class for load resources
 *
 * @constructor
 * @extends rock.event.EventDispatcher
 * @author Luis Alberto Jiménez
 */
rock.resource.loader.ResourceLoaderManager = function () {
    rock.super_(this, arguments);

    this.DEFAULT_MAX_CONCURRENT_LOADING_ELEMENTS = 2;

    // All elements must have a 'weight'. This will be the default value if none
    // is specified
    this.defaultWeight = 1;

    // 'loadedResources' WILL NOT be in the order they try to load
    // (elements load asynchronously :)
    this.loadedResources = [];
    this.errorResources = [];

    this.currentLoadedElem = 0;
    this.elemsToLoad = 0;

    // the 'weight' loaded
    this.currentLoad = 0;
    this.totalLoadExpected = 0;

    this.nextElementToLoad = 0;
    this.maxConcurrentLoadingElements = this.DEFAULT_MAX_CONCURRENT_LOADING_ELEMENTS;
    // Info for elements to load
    this.elems = null;

    this.loadersHandler = [];

    this.registerLoader(
        rock.constants.RESOURCE_TYPE_IMAGE,
        new rock.resource.loader.ImageResourceLoader());

    this.registerLoader(
        rock.constants.RESOURCE_TYPE_AUDIO,
        new rock.resource.loader.AudioResourceLoader());

    this.registerLoader(
        rock.constants.RESOURCE_TYPE_JSON,
        new rock.resource.loader.JSONResourceLoader());
};

rock.extends_(rock.resource.loader.ResourceLoaderManager,
    rock.event.EventDispatcher);

/**
 * Register a loader for a type
 *
 * @param type
 *            the type
 * @param {rock.resource.loader.AbstractResourceLoader} loader
 *            the loader
 */
rock.resource.loader.ResourceLoaderManager.prototype.registerLoader = function (type, loader) {
    var loaderHandler = {
        type: type,
        loader: loader
    };

    loader.setResourceLoaderManager(this);
    this.loadersHandler.push(loaderHandler);
};

/**
 * Unregister a loader for a type
 *
 * @param type
 *            the type
 * @returns {Boolean} if the loader has been unregistered
 */
rock.resource.loader.ResourceLoaderManager.prototype.unregisterLoader = function (type) {
    var loader = this.getLoader(type);
    if (loader != null) {
        rock.util.JsUtils.removeByValueFromArray(this.loadersHandler, loader);
        return true;
    }

    return false;
};

/**
 * Get the loader for a type
 *
 * @param type
 *            the type
 * @returns the loader
 */
rock.resource.loader.ResourceLoaderManager.prototype.getLoader = function (type) {
    var loadersHandler = this.loadersHandler;
    var loaderHandler = null;
    var i;

    for (i = 0; i < loadersHandler.length; i++) {
        loaderHandler = loadersHandler[i];
        if (loaderHandler.type == type) {
            return loaderHandler.loader;
        }
    }

    return null;
};

/**
 * Load resources
 *
 * @param {Array} elems
 *            info with elements to load {@link rock.resource.loader.ResourceLoaderElement}
 */
rock.resource.loader.ResourceLoaderManager.prototype.loadResources = function (elems) {
    this.elems = elems;

    if (rock.isNullOrUndefined(elems) || elems.length == 0) {
        throw new rock.error.RockError(rock.resource.rockResourceManager.getString('ERROR_PARAMS_LOAD_RESOURCES'));
    }

    rock.util.JsUtils.clearArray(this.loadedResources);
    rock.util.JsUtils.clearArray(this.errorResources);

    var i, elem;

    // Set weight to default value if it's not set
    for (i = 0; i < elems.length; i++) {
        elem = elems[i];
        if (rock.isNullOrUndefined(elem.getWeight())) {
            elem.weight = this.defaultWeight;
        }
    }

    this.currentLoadedElem = 0;
    this.elemsToLoad = elems.length;
    this.currentLoad = 0;
    this.nextElementToLoad = 0;

    for (i = 0; i < elems.length; i++) {
        elem = elems[i];
        this.totalLoadExpected += elem.getWeight();
    }

    // Load the resources
    for (i = 0; i < this.maxConcurrentLoadingElements; i++) {
        this.loadNextResource();
    }

};

/*
 * Load next resource
 */
rock.resource.loader.ResourceLoaderManager.prototype.loadNextResource = function () {
    // Check if all resources have been requested to load
    if (this.nextElementToLoad == this.elemsToLoad) {
        return;
    }

    var elem, loader;

    elem = this.elems[this.nextElementToLoad];
    this.nextElementToLoad++;
    // Get the loader for elem type
    loader = this.getLoader(elem.type);
    if (loader != null) {
        loader.loadResource(elem);
    } else {
        throw new rock.error.RockError(rock.resource.rockResourceManager.getString('INVALID_RESOURCE_TYPE'));
    }
};

/**
 * Default event handler for any element
 *
 * @param loaded
 *            if the element has been loaded
 * @param {rock.resource.loader.ResourceLoaderElement} elem
 *            info from resource loaded
 * @param value
 *            the value loaded
 */
rock.resource.loader.ResourceLoaderManager.prototype.onResourceLoadEvent = function (loaded, elem, value) {
    this.currentLoadedElem++;
    this.currentLoad += elem.getWeight();

    var resource = new rock.resource.Resource(elem.getId(), elem.getType(),
        value, elem.getHTTPParams());

    if (loaded) {
        this.loadedResources.push(resource);
    } else {
        this.errorResources.push(resource);
    }

    this.throwResourceLoadedEvent(loaded, resource);

    if (this.currentLoadedElem == this.elemsToLoad) {
        this.throwResourceLoaderComplete();
    } else {
        // Continue loading
        this.loadNextResource();
    }
};

/*
 * Throws a resource loaded event
 */
rock.resource.loader.ResourceLoaderManager.prototype.throwResourceLoadedEvent = function (loaded, resource) {
    var resourceLoadedEvent = new rock.resource.event.ResourceLoadedEvent();

    resourceLoadedEvent.setLoaded(loaded);
    resourceLoadedEvent.setResource(resource);

    this.dispatchEvent(resourceLoadedEvent);
};

/*
 * Throws a resource loader complete event
 */
rock.resource.loader.ResourceLoaderManager.prototype.throwResourceLoaderComplete = function () {
    var resourceLoaderCompleteEvent = new rock.resource.event.ResourceLoaderComplete();

    this.dispatchEvent(resourceLoaderCompleteEvent);
};

/**
 * Gets the percent loaded
 *
 * @returns {Number} percent loaded
 */
rock.resource.loader.ResourceLoaderManager.prototype.getPercentLoaded = function () {
    var percent = (this.currentLoad * 100) / this.totalLoadExpected;
    return percent;
};

/**
 * Return if there have been some errors when loading resources
 *
 * @returns {Boolean} true if there have been
 */
rock.resource.loader.ResourceLoaderManager.prototype.hasErrors = function () {
    return this.errorResources.length > 0;
};

/**
 * Return a loaded resource by id
 *
 * @param id
 *            the id of the resource
 * @returns the resource
 */
rock.resource.loader.ResourceLoaderManager.prototype.getLoadedResource = function (id) {
    var i, resource;
    for (i = 0; i < this.loadedResources.length; i++) {
        resource = this.loadedResources[i];
        if (resource.id == id) {
            return resource;
        }
    }

    return null;
};
