rock.namespace('rock.resource');

/**
 * Class for resources
 *
 * @param id
 *            the id
 * @param type
 *            the type of the element
 * @param value
 *            the value
 * @param {null | rock.network.HTTPRequestParams} source
 *            the source where element has been loaded
 * @returns {rock.resource.Resource}
 *
 * @constructor
 * @author Luis Alberto Jiménez
 */
rock.resource.Resource = function (id, type, value, source) {
    this.id = id;
    this.type = type;
    this.value = value;
    this.source = source;
};

/**
 * Get the id
 *
 * @returns the value
 */
rock.resource.Resource.prototype.getId = function () {
    return this.id;
};

/**
 * Get the type
 *
 * @returns the value
 */
rock.resource.Resource.prototype.getType = function () {
    return this.type;
};

/**
 * Get the value
 *
 * @returns the value
 */
rock.resource.Resource.prototype.getValue = function () {
    return this.value;
};

/**
 * Get the source
 *
 * @returns the value
 */
rock.resource.Resource.prototype.getSource = function () {
    return this.source;
};
