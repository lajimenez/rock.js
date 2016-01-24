rock.namespace('rock.network.ajax');

/**
 * Class to use when doing an ajax call
 *
 * @param {rock.network.HTTPRequestParams} params
 *            parameters for the call
 * @constructor
 * @author Luis Alberto Jiménez
 */
rock.network.ajax.AjaxRequest = function (params) {
    rock.super_(this);

    this.url = params.getUrl();
    this.method = params.getMethod();
    this.httpParams = params.getHTTPParams();

    this.httpRequest = null;

};

rock.extends_(rock.network.ajax.AjaxRequest, rock.event.EventDispatcher);

/**
 * Create an http request
 */
rock.network.ajax.AjaxRequest.prototype.createHttpRequest = function () {
    var request = null;

    if (window.XMLHttpRequest && window.FormData) {
        request = new XMLHttpRequest();
    } else {
        throw new rock.error.RockError(rock.resource.rockResourceManager.getString('AJAX_NOT_SUPPORTED'));
    }

    return request;
};

/**
 * Do an ajax call
 */
rock.network.ajax.AjaxRequest.prototype.doCall = function () {
    this.httpRequest = this.createHttpRequest();
    var httpRequest = this.httpRequest;
    httpRequest.onreadystatechange = rock.createEventHandler(this,
        this.processRequest, []);

    var params = this.getParamsURLFormat(this.httpParams);
    var url = this.url;

    if (!rock.isNullOrUndefined(params) && this.method == rock.constants.HTTP_METHOD_GET) {
        url = this.concatParamToURL(url, params);
    }

    httpRequest.open(this.method, url, true);

    var data = null;
    if (!rock.isNullOrUndefined(params) && this.method == rock.constants.HTTP_METHOD_POST) {
        data = params;
        httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    }

    httpRequest.send(data);
};

rock.network.ajax.AjaxRequest.prototype.concatParamToURL = function (url, params) {
    var urlWithParams = url;
    if (!rock.util.JsUtils.stringContains(url, '?')) {
        urlWithParams = urlWithParams + '?' + params;
    } else if (rock.util.JsUtils.stringEndsWith(url, '&') || rock.util.JsUtils.stringEndsWith(url, '?')) {
        urlWithParams = urlWithParams + params;
    } else {
        urlWithParams = urlWithParams + '&' + params;
    }
    return urlWithParams;
};

rock.network.ajax.AjaxRequest.prototype.getParamsURLFormat = function (params) {
    if (rock.util.JsUtils.isNullOrUndefined(params)) {
        return null;
    }

    var urlParams = '';
    var property;
    var first = true;
    var atLeastOne = false;
    for (property in params) {
        if (params.hasOwnProperty(property)) {
            if (first) {
                first = false;
            } else {
                urlParams = urlParams + '&';
            }
            urlParams = urlParams + property + '=' + encodeURI(params[property]);
            atLeastOne = true;
        }
    }

    if (atLeastOne) {
        return urlParams;
    } else {
        return null;
    }
};

/**
 * Cancel the request
 */
rock.network.ajax.AjaxRequest.prototype.cancelRequest = function () {
    this.httpRequest.abort();
};

/**
 * Process the request
 */
rock.network.ajax.AjaxRequest.prototype.processRequest = function () {
    if (this.httpRequest.readyState == 4) {
        var responseText = null;
        var error = true;
        if (this.httpRequest.status == 200) {
            // responseXML ??
            responseText = this.httpRequest.responseText;
            error = false;
        }
        var ajaxEvent = new rock.network.ajax.event.AjaxEvent(responseText,
            error, this.httpRequest);
        this.dispatchEvent(ajaxEvent);
    }
};