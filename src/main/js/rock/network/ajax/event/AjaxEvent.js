rock.namespace('rock.network.ajax.event');

/**
 * Event to throw when an ajax call ends
 *
 * @param responseText
 *            the response
 * @param error
 *            if it have been some error
 * @param httpRequest
 *            the httpRequest used
 * @constructor
 * @extends rock.event.Event
 * @author Luis Alberto Jiménez
 */
rock.network.ajax.event.AjaxEvent = function (responseText, error, httpRequest) {
    rock.super_(this, [rock.network.ajax.event.AjaxEvent.AJAX_EVENT]);

    this.responseText = responseText;
    this.error = error;
    this.httpRequest = httpRequest;

};

rock.extends_(rock.network.ajax.event.AjaxEvent, rock.event.Event);

/**
 * Event ID
 */
rock.network.ajax.event.AjaxEvent.AJAX_EVENT = 'AJAX_EVENT';

/**
 * Get the responseText
 *
 * @returns the value
 */
rock.network.ajax.event.AjaxEvent.prototype.getResponseText = function () {
    return this.responseText;
};

/**
 * Set the responseText
 *
 * @param responseText
 *            the value to set
 */
rock.network.ajax.event.AjaxEvent.prototype.setResponseText = function (responseText) {
    this.responseText = responseText;
};

/**
 * Get if there is some error
 *
 * @returns the value
 */
rock.network.ajax.event.AjaxEvent.prototype.getError = function () {
    return this.error;
};

/**
 * Set if there is some error
 *
 * @param error
 *            the value to set
 */
rock.network.ajax.event.AjaxEvent.prototype.setError = function (error) {
    this.error = error;
};

/**
 * Get the httpRequest
 *
 * @returns the value
 */
rock.network.ajax.event.AjaxEvent.prototype.getHttpRequest = function () {
    return this.httpRequest;
};

/**
 * Set the httpRequest
 *
 * @param httpRequest
 *            the value to set
 */
rock.network.ajax.event.AjaxEvent.prototype.setHttpRequest = function (httpRequest) {
    this.httpRequest = httpRequest;
};