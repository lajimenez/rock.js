rock.namespace('rock.network');

/**
 * Parameters for using when doing an HTTP request
 *
 * @param url
 *            the url to do the call
 * @param method
 *            HTTP method {GET, POST}
 * @param {object} HTTPParams
 *            HTTP parameters. Object containing key pair values
 *
 * @constructor
 * @author Luis Alberto Jiménez
 */
rock.network.HTTPRequestParams = function (url, method, HTTPParams) {
    this.url = url;
    this.method = method;
    if (rock.util.JsUtils.isNullOrUndefined(this.method)){
        this.method = rock.constants.HTTP_METHOD_GET;
    }
    this.HTTPParams = HTTPParams;
};

/**
 * Get the url
 *
 * @returns the value
 */
rock.network.HTTPRequestParams.prototype.getUrl = function () {
    return this.url;
};

/**
 * Set the url
 *
 * @param url
 *            the value to set
 */
rock.network.HTTPRequestParams.prototype.setUrl = function (url) {
    this.url = url;
};

/**
 * Get the method
 *
 * @returns the value
 */
rock.network.HTTPRequestParams.prototype.getMethod = function () {
    return this.method;
};

/**
 * Set the method
 *
 * @param method
 *            the value to set
 */
rock.network.HTTPRequestParams.prototype.setMethod = function (method) {
    this.method = method;
};

/**
 * Get the HTTP params
 *
 * @returns the value
 */
rock.network.HTTPRequestParams.prototype.getHTTPParams = function () {
    return this.HTTPParams;
};

/**
 * Set the HTTP pParams
 *
 * @param HTTPParams
 *            the value to set
 */
rock.network.HTTPRequestParams.prototype.setHTTPParams = function (HTTPParams) {
    this.HTTPParams = HTTPParams;
};
