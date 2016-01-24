rock.namespace('rock.resource.loader');

/**
 * Information for resource loading
 *
 * @param id
 *            the id
 * @param type
 *            resource type
 * @param {rock.network.HTTPRequestParams} HTTPParams
 *            resource HTTP Params to use.
 *            ATTENTION: There are some resources that WILL NOT USE all HTTP params and only will use url.
 *            (for example images)
 * @param [weight]
 *            specific weight for this element, can be undefined
 */
rock.resource.loader.ResourceLoaderElement = function (id, type, HTTPParams, weight) {
    this.id = id;
    this.type = type;
    this.HTTPParams = HTTPParams;
    this.weight = weight;
};

/**
 * Get the id
 *
 * @returns the value
 */
rock.resource.loader.ResourceLoaderElement.prototype.getId = function () {
    return this.id;
};

/**
 * Get the type
 *
 * @returns the value
 */
rock.resource.loader.ResourceLoaderElement.prototype.getType = function () {
    return this.type;
};

/**
 * Get the HTTPParams
 *
 * @returns the value
 */
rock.resource.loader.ResourceLoaderElement.prototype.getHTTPParams = function () {
    return this.HTTPParams;
};

/**
 * Get the weight
 *
 * @returns  the value
 */
rock.resource.loader.ResourceLoaderElement.prototype.getWeight = function () {
    return this.weight;
};
