rock.namespace('rock.resource.loader');

/**
 * Class to load a JSON object
 *
 * @constructor
 * @extends rock.resource.loader.AbstractResourceLoader
 * @author Luis Alberto Jiménez
 */
rock.resource.loader.JSONResourceLoader = function () {
    rock.super_(this, arguments);

    this.httpMethod = rock.constants.HTTP_METHOD_GET;
};

rock.extends_(rock.resource.loader.JSONResourceLoader,
    rock.resource.loader.AbstractResourceLoader);

/**
 * @override
 * @see rock.resource.loader.AbstractResourceLoader#loadResource
 */
rock.resource.loader.JSONResourceLoader.prototype.loadResource = function (elem) {
    var ajaxRequest = new rock.network.ajax.AjaxRequest(elem.getHTTPParams());
    ajaxRequest.addEventListener(
        rock.network.ajax.event.AjaxEvent.AJAX_EVENT, rock
            .createEventHandler(this, this.onAjaxEvent, [elem]));
    ajaxRequest.doCall();
};

/*
 * Ajax Event handler
 */
rock.resource.loader.JSONResourceLoader.prototype.onAjaxEvent = function (ajaxEvent, elem) {
    if (!ajaxEvent.getError()) {
        var obj = JSON.parse(ajaxEvent.getResponseText());
        this.resourceLoaderManager.onResourceLoadEvent(true, elem, obj);
    } else {
        this.resourceLoaderManager.onResourceLoadEvent(false, elem, null);
    }
};
