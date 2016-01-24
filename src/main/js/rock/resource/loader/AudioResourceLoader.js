rock.namespace('rock.resource.loader');

/**
 * Class to load an audio resource
 *
 * @constructor
 * @extends rock.resource.loader.AbstractResourceLoader
 * @author Luis Alberto Jiménez
 */
rock.resource.loader.AudioResourceLoader = function () {
    rock.super_(this, arguments);
};

rock.extends_(rock.resource.loader.AudioResourceLoader,
    rock.resource.loader.AbstractResourceLoader);

/**
 * @override
 * @see rock.resource.loader.AbstractResourceLoader#loadResource
 */
rock.resource.loader.AudioResourceLoader.prototype.loadResource = function (elem) {

    var HTMLAudio = new Audio();
    HTMLAudio.id = elem.id;

    HTMLAudio.addEventListener('loadeddata', rock.createEventHandler(this,
        this.onLoadAudio, [elem, HTMLAudio]), false);

    HTMLAudio.onerror = rock.createEventHandler(this, this.onErrorAudio, [
        elem, HTMLAudio]);

    HTMLAudio.onabort = rock.createEventHandler(this, this.onAbortAudio, [
        elem, HTMLAudio]);

    HTMLAudio.src = elem.getHTTPParams().getUrl();

};

/*
 * Event handler for an audio
 */
rock.resource.loader.AudioResourceLoader.prototype.onLoadAudio = function (event, elem, HTMLAudio) {
    this.callResourceLoader(event, elem, HTMLAudio, true);
};

/*
 * Event handler for an audio
 */
rock.resource.loader.AudioResourceLoader.prototype.onErrorAudio = function (event, elem, HTMLAudio) {
    this.callResourceLoader(event, elem, HTMLAudio, false);
};

/*
 * Event handler for an audio
 */
rock.resource.loader.AudioResourceLoader.prototype.onAbortAudio = function (event, elem, HTMLAudio) {
    this.callResourceLoader(event, elem, HTMLAudio, false);
};

rock.resource.loader.AudioResourceLoader.prototype.callResourceLoader = function (event, elem, HTMLAudio, success) {
    var audio = new rock.audio.Audio(HTMLAudio);
    this.resourceLoaderManager.onResourceLoadEvent(success, elem, audio);
};