rock.namespace('rock.app');

/**
 * Represents a rock application.
 *
 * @param {rock.app.InitApplicationParams} initParams
 *            params for initialization
 *
 * @constructor
 * @extends rock.event.EventDispatcher
 *
 * @author Luis Alberto Jiménez
 */
rock.app.Application = function (initParams) {
    rock.super_(this);

    this.idDiv = null;
    this.canvas = null;
    this.windowSystem = null;
    this.resourceManager = new rock.resource.ResourceManager();
    this.styleManager = new rock.window.style.StyleManager();
    this.scaleFactor = 1;
    this.locale = null;
    this.setLocale(rock.constants.DEFAULT_ROCK_LOCALE);
    this.urlResources = null;

    this.DEFAULT_WEBGL_CONTEXT_CREATION_PARAMS = {
        premultipliedAlpha: false,
        preserveDrawingBuffer: true
    };

    this.init(initParams);
    this.start();
};

rock.extends_(rock.app.Application, rock.event.EventDispatcher);

/**
 * Initialize the application
 *
 * @param {rock.app.InitApplicationParams} initParams
 *            params for initialization
 */
rock.app.Application.prototype.init = function (initParams) {
    this.idDiv = initParams.getIdDiv();
    var uuid = rock.util.JsUtils.generateUUID();
    this.id = 'ROCK_APP_' + uuid;
    var width = initParams.getWidth();
    var height = initParams.getHeight();
    var canvasDiv = rock.util.DOMUtils.getElementById(this.idDiv);
    var canvas = rock.util.DOMUtils.createCanvas(width, height, 0);
    var idCanvas = 'ROCK_CANVAS_' + uuid;
    canvas.setAttribute('id', idCanvas);

    // We create a new div. This div is used for positioning HTMLComponents
    var relativeDiv = rock.util.DOMUtils.createHTMLElement(rock.constants.DIV_TAG);
    relativeDiv.style[rock.constants.CSS_POSITION] = rock.constants.CSS_POSITION_RELATIVE;
    relativeDiv.style[rock.constants.CSS_WIDTH] = width + 'px';
    relativeDiv.style[rock.constants.CSS_HEIGHT] = height + 'px';
    relativeDiv.appendChild(canvas);
    canvasDiv.appendChild(relativeDiv);

    // Set resources base url
    this.urlResources = initParams.getUrlResources();

    // Scale the app with CSS (it can be useful when drawing 3D scenes...)
    var scaleFactor = initParams.getScaleFactor();
    var scaledWidth, scaledHeight;
    if (!rock.util.JsUtils.isNullOrUndefined(scaleFactor)) {
        scaledWidth = (width * scaleFactor) + 'px';
        scaledHeight = (height * scaleFactor) + 'px';
        relativeDiv.style[rock.constants.CSS_WIDTH] = scaledWidth;
        relativeDiv.style[rock.constants.CSS_HEIGHT] = scaledHeight;
        canvas.style[rock.constants.CSS_WIDTH] = scaledWidth;
        canvas.style[rock.constants.CSS_HEIGHT] = scaledHeight;
        this.scaleFactor = scaleFactor;
    }

    this.canvas = canvas;

    // Create the window system
    var windowSystem = new rock.window.WindowSystem(this);
    windowSystem.setWidth(width);
    windowSystem.setHeight(height);
    windowSystem.init();
    this.windowSystem = windowSystem;

    // Create the graphics engine
    var graphicsEngine = this.createGraphicsEngine(canvas, initParams.getContextType(),
        initParams.getContextCreationParams());

    windowSystem.setGraphicsEngine(graphicsEngine);
};

/**
 * Constant for application locale changed event
 *
 * @const
 */
rock.app.Application.LOCALE_CHANGED_EVENT = 'LOCALE_CHANGED_EVENT';

/**
 * @param contextType
 *            the context type of graphics engine
 * @param {Object} contextCreationParams
 *            pair key/value with context the creations params
 *
 * @private
 *
 */
rock.app.Application.prototype.resolveContextCreationParams = function (contextType, contextCreationParams) {
    var resolvedContextCreationParams = {};

    if (contextType == rock.constants.CONTEXT_WEBGL) {
        rock.addProperties(resolvedContextCreationParams, this.DEFAULT_WEBGL_CONTEXT_CREATION_PARAMS);
    }

    if (!rock.util.JsUtils.isNullOrUndefined(contextCreationParams)) {
        rock.addProperties(resolvedContextCreationParams, contextCreationParams);
    }

    return resolvedContextCreationParams;
};

/**
 * Instantiate the graphics engine.
 * If you want to use a custom graphics engine, you should override this function and return your custom implementation.
 *
 * @param HTMLContext
 * @param contextType
 * @returns {rock.graphics.engine.IGraphicsEngine} the graphics engine
 */
rock.app.Application.prototype.instantiateGraphicsEngine = function (HTMLContext, contextType) {
    var graphicsEngine = null;

    var context = null;

    if (contextType == rock.constants.CONTEXT_CANVAS_2D) {
        context = new rock.graphics.engine.canvas2d.Canvas2DContext(this, HTMLContext);
        graphicsEngine = new rock.graphics.engine.canvas2d.Canvas2DGraphicsEngine(context);
    } else if (contextType == rock.constants.CONTEXT_WEBGL) {
        context = new rock.graphics.engine.webgl.WebGLContext(this, HTMLContext);
        graphicsEngine = new rock.graphics.engine.webgl.WebGLGraphicsEngine(context);
    }
    return graphicsEngine;
};

/**
 * Create a new graphics engine
 *
 * @param canvas
 *            HTML canvas
 * @param contextType
 *            the context type of graphics engine
 * @param {Object} contextCreationParams
 *            pair key/value with context the creations params
 *
 * @returns {rock.graphics.engine.IGraphicsEngine} the drawing engine
 *
 * @private
 */
rock.app.Application.prototype.createGraphicsEngine = function (canvas, contextType, contextCreationParams) {
    if (!canvas.getContext) {
        throw new rock.error.RockError(rock.resource.rockResourceManager.getString('NO_GET_CONTEXT_CANVAS'));
    }

    var resolvedContextCreationParams = this.resolveContextCreationParams(contextType, contextCreationParams);
    var HTMLContext = this.getContext(canvas, contextType, resolvedContextCreationParams);

    if (rock.isNullOrUndefined(HTMLContext)) {
        throw new rock.error.RockError(rock.resource.rockResourceManager.getString('NO_CONTEXT_CANVAS_AVAILABLE'));
    }

    var graphicsEngine = this.instantiateGraphicsEngine(HTMLContext, contextType);
    return graphicsEngine;
};

/**
 * Get the context from canvas
 *
 * @param canvas
 *            HTML canvas
 * @param contextType
 *            the context type of graphics engine
 * @param {Object} resolvedContextCreationParams
 *            pair key/value with context the creations params
 *
 * @returns context
 *
 * @private
 */
rock.app.Application.prototype.getContext = function (canvas, contextType, resolvedContextCreationParams) {
    var HTMLContext = null;

    if (contextType == rock.constants.CONTEXT_CANVAS_2D) {
        HTMLContext = canvas.getContext(rock.constants.CANVAS_CONTEXT_2D);
    } else if (contextType == rock.constants.CONTEXT_WEBGL) {
        HTMLContext = canvas.getContext(rock.constants.CANVAS_CONTEXT_WEBGL, resolvedContextCreationParams)
            || canvas.getContext(rock.constants.CANVAS_CONTEXT_EXPERIMENTAL_WEBGL, resolvedContextCreationParams)
            || canvas.getContext(rock.constants.CANVAS_CONTEXT_WEBKIT_3D, resolvedContextCreationParams)
            || canvas.getContext(rock.constants.CANVAS_CONTEXT_MOZ_WEBGL, resolvedContextCreationParams);

        this.handleWebGLContextEvents(canvas);
    } else {
        throw new rock.error.RockError(rock.resource.rockResourceManager.getString('INVALID_ROCK_CONTEXT_CANVAS_TYPE'));
    }

    return HTMLContext;
};

rock.app.Application.prototype.handleWebGLContextEvents = function (canvas) {
    rock.util.DOMUtils.addEventListener(canvas, rock.constants.WEBGL_CONTEXT_LOST_EVENT,
        rock.createEventHandler(this ,this.onContextLost )
    );

    rock.util.DOMUtils.addEventListener(canvas, rock.constants.WEBGL_CONTEXT_RESTORED_EVENT,
        rock.createEventHandler(this ,this.onContextRestored )
    );
};

rock.app.Application.prototype.onContextLost = function (event) {
    event.preventDefault();
    this.dispatchEvent(new rock.event.Event(rock.constants.ROCK_EVENT_CONTEXT_LOST));
};

rock.app.Application.prototype.onContextRestored = function (event) {
    this.dispatchEvent(new rock.event.Event(rock.constants.ROCK_EVENT_CONTEXT_RESTORED));
    this.windowSystem.draw();
};

/**
 * Draw the application
 */
rock.app.Application.prototype.draw = function () {
    this.windowSystem.draw();
};

/**
 * Set a locale to use in the application
 *
 * @param {String} locale
 *      the locale to use
 */
rock.app.Application.prototype.setLocale = function (locale) {
    this.locale = locale;
    this.getResourceManager().setLocale(this.locale);
    this.dispatchEvent(new rock.event.Event(rock.app.Application.LOCALE_CHANGED_EVENT));
};

/**
 * Starts the application.
 *
 * @function
 */
rock.app.Application.prototype.start = rock.abstract_;

/**
 * Get application id
 */
rock.app.Application.prototype.getId = function () {
    return this.id;
};

/**
 * Get the canvas
 */
rock.app.Application.prototype.getCanvas = function () {
    return this.canvas;
};

/**
 * Get the window system
 *
 * @returns the window system
 */
rock.app.Application.prototype.getWindowSystem = function () {
    return this.windowSystem;
};

/**
 * Get the value
 */
rock.app.Application.prototype.getResourceManager = function() {
    return this.resourceManager;
};

/**
 * Get the styleManager
 */
rock.app.Application.prototype.getStyleManager = function() {
    return this.styleManager;
};

/**
 * Get the scaleFactor
 */
rock.app.Application.prototype.getScaleFactor = function() {
    return this.scaleFactor;
};