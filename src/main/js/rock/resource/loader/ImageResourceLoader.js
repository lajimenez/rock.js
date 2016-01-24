rock.namespace('rock.resource.loader');

/**
 * Class to load an image resource
 *
 * @constructor
 * @extends rock.resource.loader.AbstractResourceLoader
 * @author Luis Alberto Jiménez
 */
rock.resource.loader.ImageResourceLoader = function () {
    rock.super_(this, arguments);
};

rock.extends_(rock.resource.loader.ImageResourceLoader,
    rock.resource.loader.AbstractResourceLoader);

/**
 * @override
 * @see rock.resource.loader.AbstractResourceLoader#loadResource
 */
rock.resource.loader.ImageResourceLoader.prototype.loadResource = function (elem) {
    var HTMLImage = new Image();
    HTMLImage.id = elem.id;

    HTMLImage.onload = rock.createEventHandler(this, this.onLoadImage, [elem,
        HTMLImage]);

    HTMLImage.onerror = rock.createEventHandler(this, this.onErrorImage, [
        elem, HTMLImage]);

    HTMLImage.onabort = rock.createEventHandler(this, this.onAbortImage, [
        elem, HTMLImage]);

    HTMLImage.src = elem.getHTTPParams().getUrl();
};

/*
 * Event handler for an image
 */
rock.resource.loader.ImageResourceLoader.prototype.onLoadImage = function (event, elem, HTMLImage) {
    this.callResourceLoader(event, elem, HTMLImage, true);
};

/*
 * Event handler for an image
 */
rock.resource.loader.ImageResourceLoader.prototype.onErrorImage = function (event, elem, HTMLImage) {
    this.callResourceLoader(event, elem, HTMLImage, false);
};

/*
 * Event handler for an image
 */
rock.resource.loader.ImageResourceLoader.prototype.onAbortImage = function (event, elem, HTMLImage) {
    this.callResourceLoader(event, elem, HTMLImage, false);
};

rock.resource.loader.ImageResourceLoader.prototype.callResourceLoader = function (event, elem, HTMLImage, success) {
    var image = new rock.graphics.Image(HTMLImage);
    this.resourceLoaderManager.onResourceLoadEvent(success, elem, image);
};
