rock.namespace('rock.resource');

/**
 * Class for store resources
 *
 * @constructor
 * @author Luis Alberto Jiménez
 */
rock.resource.Resources = function (locale) {
    this.locale = locale;
    if (rock.util.JsUtils.isNullOrUndefined(this.locale)) {
        this.locale = rock.constants.DEFAULT_ROCK_LOCALE;
    }

    this.resources = {};
};

rock.resource.Resources.prototype.getResourcesByType = function (type) {
    this.resources[type] = this.resources[type] || {};
    return this.resources[type];
};

/**
 * Add a new resource
 *
 * @param type
 *      the type of the resource
 * @param id
 *      the id of the resource
 * @param {object} resource
 *      the resource itself
 */
rock.resource.Resources.prototype.addResource = function (type, id, resource) {
    var resources = this.getResourcesByType(type);
    resources[id] = resource;
};

/**
 * Get a resource
 *
 * @param type
 *      the type of the resource
 * @param id
 *      the id of the resource
 * @returns {object} the resource
 */
rock.resource.Resources.prototype.getResource = function (type, id) {
    var resources = this.getResourcesByType(type);
    return resources[id];
};