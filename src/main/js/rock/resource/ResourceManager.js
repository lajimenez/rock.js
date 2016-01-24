rock.namespace('rock.resource');

/**
 * Class for manage resources
 *
 * @constructor
 * @author Luis Alberto Jiménez
 */
rock.resource.ResourceManager = function () {
    // Use this locale when no other locale is required
    this.DEFAULT_LOCALE = rock.constants.DEFAULT_ROCK_LOCALE;

    this.locale = this.DEFAULT_LOCALE;
    this.resources = {};
    this.defaultResources = this.createResourceObject(this.DEFAULT_LOCALE);
};

rock.resource.ResourceManager.prototype.createResourceObject = function (locale) {
    if (rock.util.JsUtils.isNullOrUndefined(this.resources[locale])) {
        this.resources[locale] = new rock.resource.Resources(locale);
    }

    return this.resources[locale];
};

rock.resource.ResourceManager.prototype.resolveLocale = function (locale) {
    var resolvedLocale = locale;
    // If no locale requested, we use default
    if (rock.util.JsUtils.isNullOrUndefined(locale)) {
        resolvedLocale = this.DEFAULT_LOCALE;
    }

    return resolvedLocale;
};

/**
 * Get resources related to a locale
 *
 * @param locale
 *        the locale
 *
 * @returns {rock.resource.Resources}
 */
rock.resource.ResourceManager.prototype.getResources = function (locale) {
    var resolvedLocale = this.resolveLocale(locale);

    var resources = this.resources[resolvedLocale];
    if (rock.util.JsUtils.isNullOrUndefined(resources)) {
        resources = this.createResourceObject(resolvedLocale);
    }
    return resources;
};

/**
 * Add a resource
 *
 * @param type
 *      the type of the resource
 * @param id
 *      the id of the resource
 * @param {object} resource
 *      the resource
 * @param {string} [locale]
 *      the locale
 */
rock.resource.ResourceManager.prototype.addResource = function (type, id, resource, locale) {
    var resources = this.getResources(locale);
    resources.addResource(type, id, resource);
};

/**
 * Add a string
 *
 * @param id
 *      the id of the string
 * @param {String} value
 *      the value
 * @param {string} [locale]
 *      the locale
 */
rock.resource.ResourceManager.prototype.addString = function (id, value, locale) {
    this.addResource(rock.constants.RESOURCE_TYPE_STRING, id, value, locale);
};

/**
 * Load all strings for a locale
 *
 * @param {Object} json
 *      JSON containing messages for locale
 */
rock.resource.ResourceManager.prototype.loadStrings = function (json) {
    var locale = json.locale;
    var messages = json.messages;
    var property;

    for (property in messages) {
        if (messages.hasOwnProperty(property)) {
            this.addString(property, messages[property], locale);
        }
    }
};

/**
 * Add an image
 *
 * @param {string} id
 *      the id of the image
 * @param {rock.graphics.Image} image
 *      the image
 * @param {string} [locale]
 *      the locale
 */
rock.resource.ResourceManager.prototype.addImage = function (id, image, locale) {
    this.addResource(rock.constants.RESOURCE_TYPE_IMAGE, id, image, locale);
};

/**
 * Add a audio
 *
 * @param {string} id
 *      the id of the sound
 * @param {rock.audio.Audio} audio
 *      the audio
 * @param {string} [locale]
 *      the locale
 */
rock.resource.ResourceManager.prototype.addAudio = function (id, audio, locale) {
    this.addResource(rock.constants.RESOURCE_TYPE_AUDIO, id, audio, locale);
};

/**
 * Get a resource
 *
 * @param type
 *      the type of the resource
 * @param id
 *      the id of the resource
 * @param {String} [locale]
 *      the locale (if undefined, current locale will be used)
 *
 * @returns {object} the resource
 */
rock.resource.ResourceManager.prototype.getResource = function (type, id, locale) {
    var localeToUse = locale;
    if (rock.util.JsUtils.isNullOrUndefined(localeToUse)) {
        localeToUse = this.locale;
    }

    var resources = this.getResources(localeToUse);
    var resource = resources.getResource(type, id);

    // If not found, try to find it in default
    if (rock.util.JsUtils.isNullOrUndefined(resource)) {
        resource = this.defaultResources.getResource(type, id);
    }

    return resource;
};

/**
 * Returns an String by id
 *
 * @param {String} id
 *      the id of the string
 * @param {Array} [expressions]
 *      expressions to be replaced
 * @param {String} [locale]
 *      the locale (if undefined, current locale will be used)
 *
 * @returns {String}
 */
rock.resource.ResourceManager.prototype.getString = function (id, expressions, locale) {
    var message = this.getResource(rock.constants.RESOURCE_TYPE_STRING, id, locale);
    var exps = expressions;

    if (rock.util.JsUtils.isNullOrUndefined(message)) {
        message = id;
    }

    if (rock.util.JsUtils.isNullOrUndefined(exps)) {
        exps = [];
    }

    var i, exp;
    for (i = 0; i < exps.length; i++) {
        exp = '{' + i + '}';
        message = message.replace(exp, exps[i]);
    }
    return message;
};

/**
 * Returns an image by id
 *
 * @param id
 *      the id of the image
 * @param {String} [locale]
 *      the locale (if undefined, current locale will be used)
 *
 * @returns {rock.graphics.Image}
 */
rock.resource.ResourceManager.prototype.getImage = function (id, locale) {
    return this.getResource(rock.constants.RESOURCE_TYPE_IMAGE, id, locale);
};

/**
 * Returns an audio by id
 *
 * @param id
 *      the id of the audio
 * @param {String} [locale]
 *      the locale (if undefined, current locale will be used)
 *
 * @returns {rock.audio.Audio}
 */
rock.resource.ResourceManager.prototype.getAudio = function (id, locale) {
    return this.getResource(rock.constants.RESOURCE_TYPE_AUDIO, id, locale);
};

/**
 * Get the value
 */
rock.resource.ResourceManager.prototype.getLocale = function() {
    return this.locale;
};

/**
 * Set the value
 * @param locale the value
 */
rock.resource.ResourceManager.prototype.setLocale = function(locale) {
    this.locale = locale;
};

// Rock framework has its own resource manager
rock.resource.rockResourceManager = new rock.resource.ResourceManager();
rock.resource.rockResourceManager.loadStrings(rock.i18n.rockDefaultLocaleInfo);