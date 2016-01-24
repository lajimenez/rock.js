rock.namespace('rock.window');

/**
 * Base class for window system. Handles the current window to draw.
 *
 * @param {rock.app.Application} application
 *            the application where this window system will be part
 *
 * @constructor
 * @author Luis Alberto Jiménez
 */
rock.window.WindowSystem = function (application) {
    this.application = application;
    this.canvas = application.getCanvas();
    this.width = -1;
    this.height = -1;
    this.graphicsEngine = null;
    this.registeredWindowsInfo = [];
    this.currentWindow = null;
    this.HTMLlisteners = {};
    this.canDraw = true;

    // Handle context events
    application.addEventListener(rock.constants.ROCK_EVENT_CONTEXT_LOST,
        rock.createEventHandler(this, this.disableDrawing));
    application.addEventListener(rock.constants.ROCK_EVENT_CONTEXT_RESTORED,
        rock.createEventHandler(this, this.enableDrawing));

    application.addEventListener(rock.app.Application.LOCALE_CHANGED_EVENT,
        rock.createEventHandler(this,this.handleOnLocaleChanged));
};

/**
 * Create a new MouseEvent
 *
 * @param eventId
 *            id of the event to be thrown
 * @param x
 *            the x click
 * @param y
 *            the y click
 * @param DOMMouseEvent
 *            the event thrown by the DOM
 * @returns {rock.event.MouseEvent} a new Mouse Event
 *
 */
rock.window.WindowSystem.createMouseEvent = function (eventId, x, y, DOMMouseEvent) {
    var mouseEvent = new rock.event.MouseEvent(eventId);
    mouseEvent.setX(x);
    mouseEvent.setY(y);
    mouseEvent.setDOMMouseEvent(DOMMouseEvent);
    return mouseEvent;
};

/**
 * Create a new KeyEvent
 *
 * @param eventId
 *            id of the event to be thrown
 * @param DOMMouseEvent
 *            the event thrown by the DOM
 * @returns {rock.event.KeyEvent} a new KeyEvent
 *
 * @private
 */
rock.window.WindowSystem.createKeyEvent = function (eventId, DOMMouseEvent) {
    var keyEvent = new rock.event.KeyEvent(eventId);
    keyEvent.setDOMMouseEvent(DOMMouseEvent);
    return keyEvent;
};

/**
 * Initialize the window system
 *
 */
rock.window.WindowSystem.prototype.init = function () {
    this.addHTMLEventsListeners();
};

/**
 * Add an HTML event listener
 *
 * @param {String} eventType
 * @param {function} listener
 *
 * @private
 */
rock.window.WindowSystem.prototype.addHTMLEventListener = function (eventType, listener) {
    this.removeHTMLEventListener(eventType);
    rock.util.DOMUtils.addEventListener(this.canvas, eventType, listener);
    this.HTMLlisteners[eventType] = listener;
};

/**
 * Remove the HTML event listener currently used
 *
 * @param {String} eventType
 *
 * @private
 */
rock.window.WindowSystem.prototype.removeHTMLEventListener = function (eventType) {
    var listener = this.HTMLlisteners[eventType];
    if (rock.util.JsUtils.isNullOrUndefined(listener)) {
        return;
    }

    rock.util.DOMUtils.removeEventListener(this.canvas, eventType, listener);
    this.HTMLlisteners[eventType] = null;
};

/**
 * Add all HTML events listeners
 */
rock.window.WindowSystem.prototype.addHTMLEventsListeners = function () {
    this.addHTMLEventListener(rock.constants.HTML_DOM_EVENT_MOUSE_DOWN,
        rock.createEventHandler(this, this.handleMouseDown)
    );

    this.addHTMLEventListener(rock.constants.HTML_DOM_EVENT_MOUSE_UP,
        rock.createEventHandler(this, this.handleMouseUp)
    );

    this.addHTMLEventListener(rock.constants.HTML_DOM_EVENT_CLICK,
        rock.createEventHandler(this, this.handleClick)
    );

    this.addHTMLEventListener(rock.constants.HTML_DOM_EVENT_DBLCLICK,
        rock.createEventHandler(this, this.handleDblClick)
    );

    this.addHTMLEventListener(rock.constants.HTML_DOM_EVENT_MOUSE_MOVE,
        rock.createEventHandler(this, this.handleMouseMove)
    );

    this.addHTMLEventListener(rock.constants.HTML_DOM_EVENT_MOUSE_WHEEL,
        rock.createEventHandler(this, this.handleMouseWheel)
    );

    this.addHTMLEventListener(rock.constants.HTML_DOM_EVENT_MOUSE_WHEEL_FI,
        rock.createEventHandler(this, this.handleMouseWheel)
    );

    this.addHTMLEventListener(rock.constants.HTML_DOM_EVENT_MOUSE_LEAVE,
        rock.createEventHandler(this, this.handleMouseLeave)
    );

    this.addHTMLEventListener(rock.constants.HTML_DOM_EVENT_KEY_DOWN,
        rock.createEventHandler(this, this.handleKeyDown)
    );

    this.addHTMLEventListener(rock.constants.HTML_DOM_EVENT_KEY_UP,
        rock.createEventHandler(this, this.handleKeyUp)
    );

    this.addHTMLEventListener(rock.constants.HTML_DOM_EVENT_KEY_PRESS,
        rock.createEventHandler(this, this.handleKeyPress)
    );
};

/**
 * Remove all HTML events listeners. You can do that if you want to handle events by yourself.
 * (It could be nice if you don't want to use default behavior that creates a lot of objects
 * and so, a lot of memory)
 */
rock.window.WindowSystem.prototype.removeHTMLEventsListeners = function () {
    var HTMLlisteners = this.HTMLlisteners;
    var property;
    for (property in HTMLlisteners) {
        if (HTMLlisteners.hasOwnProperty(property)) {
            this.removeHTMLEventListener(HTMLlisteners[property]);
        }
    }
};

/**
 * Draw the current window
 */
rock.window.WindowSystem.prototype.draw = function () {
    if (!this.canDraw) {
        return;
    }
    this.currentWindow.draw(this.graphicsEngine);
};

/**
 * The window system will not draw nothing
 */
rock.window.WindowSystem.prototype.disableDrawing = function () {
    this.canDraw = false;
};

/**
 * The window system can draw
 */
rock.window.WindowSystem.prototype.enableDrawing = function () {
    this.canDraw = true;
};

/**
 * Handle the mouse down in the window
 */
rock.window.WindowSystem.prototype.handleMouseDown = function (event) {
    this.handleMouseSystemEvent(this.currentWindow,
        rock.constants.ROCK_EVENT_MOUSE_DOWN,
        event);
};

/**
 * Handle the mouse up in the window
 */
rock.window.WindowSystem.prototype.handleMouseUp = function (event) {
    this.handleMouseSystemEvent(this.currentWindow,
        rock.constants.ROCK_EVENT_MOUSE_UP,
        event);
};

/**
 * Handle the click in the window
 */
rock.window.WindowSystem.prototype.handleClick = function (event) {
    this.handleMouseSystemEvent(this.currentWindow,
        rock.constants.ROCK_EVENT_CLICK,
        event);
};

/**
 * Handle the double click in the window
 */
rock.window.WindowSystem.prototype.handleDblClick = function (event) {
    this.handleMouseSystemEvent(this.currentWindow,
        rock.constants.ROCK_EVENT_DBLCLICK,
        event);
};

/**
 * Handle the mouse move in the window
 */
rock.window.WindowSystem.prototype.handleMouseMove = function (event) {
    this.handleMouseSystemEvent(this.currentWindow,
        rock.constants.ROCK_EVENT_MOUSE_MOVE,
        event);
};

/**
 * Handle the mouse wheel in the window
 */
rock.window.WindowSystem.prototype.handleMouseWheel = function (event) {
    // The components should throw this event?
    var mouseWheelEvent = new rock.event.MouseWheelEvent(rock.constants.ROCK_EVENT_MOUSE_WHEEL);
    mouseWheelEvent.setDOMMouseEvent(event);
    this.currentWindow.dispatchEvent(mouseWheelEvent);
};

/**
 * Handle the mouse leave in the window
 */
rock.window.WindowSystem.prototype.handleMouseLeave = function (event) {
    var coords = rock.util.MouseUtils.resolveEventCoords(event);
    var x = coords.x;
    var y = coords.y;

    var i;
    var currentComponent;
    var components = this.currentWindow.getComponents();
    for (i = 0; i < components.length; i++) {
        currentComponent = components[i];
        currentComponent.handleMouseOutMouseOverEvent(false, x, y, event);
    }

    this.currentWindow.dispatchEvent(
        rock.window.WindowSystem.createMouseEvent(rock.constants.ROCK_EVENT_MOUSE_LEAVE, x, y, event));
};

/**
 * Handle the key down in the window
 */
rock.window.WindowSystem.prototype.handleKeyDown = function (event) {
    this.handleKeySystemEvent(this.currentWindow,
        rock.constants.ROCK_EVENT_KEY_DOWN,
        event);
};

/**
 * Handle the key up in the window
 */
rock.window.WindowSystem.prototype.handleKeyUp = function (event) {
    this.handleKeySystemEvent(this.currentWindow,
        rock.constants.ROCK_EVENT_KEY_UP,
        event);
};


/**
 * Handle the key press in the window
 */
rock.window.WindowSystem.prototype.handleKeyPress = function (event) {
    this.handleKeySystemEvent(this.currentWindow,
        rock.constants.ROCK_EVENT_KEY_PRESS,
        event);
};

/**
 * Handle a system mouse event
 *
 * @param {rock.window.Window} window
 *            the window handling the event
 * @param eventId
 *            id of the event to be thrown
 * @param mouseEvent
 *            the event thrown by the DOM
 * @private
 */
rock.window.WindowSystem.prototype.handleMouseSystemEvent = function (window, eventId, mouseEvent) {
    var coords = rock.util.MouseUtils.resolveEventCoords(mouseEvent);
    var x = coords.x;
    var y = coords.y;

    var i;
    var currentComponent;
    var components = window.getComponents();
    for (i = 0; i < components.length; i++) {
        currentComponent = components[i];
        currentComponent.handleMouseSystemEvent(eventId, x, y, mouseEvent);
    }

    window.dispatchEvent(rock.window.WindowSystem.createMouseEvent(eventId, x, y, mouseEvent));
};

/**
 * Handle a system key event
 *
 * @param {rock.window.Window} window
 *            the window handling the event
 * @param eventId
 *            id of the event to be thrown
 * @param keyEvent
 *            the event thrown by the DOM
 * @private
 */
rock.window.WindowSystem.prototype.handleKeySystemEvent = function (window, eventId, keyEvent) {
    var currentComponent;
    var components = window.getComponents();
    var i;
    for (i = 0; i < components.length; i++) {
        currentComponent = components[i];
        currentComponent.handleKeySystemEvent(eventId, keyEvent);
    }

    window.dispatchEvent(rock.window.WindowSystem.createKeyEvent(eventId, keyEvent));
};

/**
 * Handle the locale changing event
 */
rock.window.WindowSystem.prototype.handleOnLocaleChanged = function () {
    this.draw();
};

/**
 * Register a window in the system
 *
 * @param id
 *            the id of the window
 * @param window
 *            the window to register
 */
rock.window.WindowSystem.prototype.registerWindow = function (id, window) {
    this.unregisterWindow(id);

    var registeredWindowInfo = new rock.window.WindowRegisterInfo(id, window);
    this.registeredWindowsInfo.push(registeredWindowInfo);

};

/**
 * Unregister a window in the system
 *
 * @param id
 *            the id of the window to unregister
 */
rock.window.WindowSystem.prototype.unregisterWindow = function (id) {
    rock.util.JsUtils.removeByValueFromArray(this.registeredWindowsInfo, this
        .getRegisteredWindowInfo(id));
};

/**
 * Get a window in the system
 *
 * @param id
 *            the id of the window
 * @returns {rock.window.Window} the window
 */
rock.window.WindowSystem.prototype.getWindow = function (id) {
    var registeredWindowInfo = this.getRegisteredWindowInfo(id);
    if (registeredWindowInfo != null) {
        return registeredWindowInfo.getWindow();
    } else {
        return null;
    }
};

/**
 * Get a window registered info in the system
 *
 * @param id
 *            the id of the window
 * @returns {rock.window.WindowRegisterInfo} the window
 * @private
 */
rock.window.WindowSystem.prototype.getRegisteredWindowInfo = function (id) {
    var registeredWindowsInfo = this.registeredWindowsInfo;
    var registeredWindowInfo = null;
    var i;
    for (i = 0; i < registeredWindowsInfo.length; i++) {
        registeredWindowInfo = registeredWindowsInfo[i];
        if (registeredWindowInfo.getId() === id) {
            return registeredWindowInfo;
        }
    }

    return null;
};

/**
 * Sets the current window.
 *
 * @param {rock.window.Window} currentWindow
 *            the current window to draw
 */
rock.window.WindowSystem.prototype.setCurrentWindow = function (currentWindow) {
    var windowToDeactivate = this.currentWindow;
    if (!rock.isNullOrUndefined(windowToDeactivate)) {
        windowToDeactivate.deactivate();
    }

    this.currentWindow = currentWindow;
    this.currentWindow.dispatchEvent(new rock.event.Event(rock.window.Window.WINDOW_ACTIVATED_EVENT));
    this.draw();
};

/**
 * Get the current window
 *
 * @returns {rock.window.Window} current window the current window to draw
 */
rock.window.WindowSystem.prototype.getCurrentWindow = function () {
    return this.currentWindow;
};

/**
 * Get the application
 *
 * @returns the value
 */
rock.window.WindowSystem.prototype.getApplication = function () {
    return this.application;
};

/**
 * Get the width of the windows
 *
 * @returns the value
 */
rock.window.WindowSystem.prototype.getWidth = function () {
    return this.width;
};

/**
 * Sets the width of the windows
 *
 * @param width
 *            the value to set
 */
rock.window.WindowSystem.prototype.setWidth = function (width) {
    this.width = width;
};

/**
 * Get the height of the windows
 *
 * @returns the value
 */
rock.window.WindowSystem.prototype.getHeight = function () {
    return this.height;
};

/**
 * Sets the height of the windows
 *
 * @param height
 *            the value to set
 */
rock.window.WindowSystem.prototype.setHeight = function (height) {
    this.height = height;
};

/**
 * Get the drawing engine
 *
 * @return {rock.graphics.IGraphicsEngine} the drawing engine
 */
rock.window.WindowSystem.prototype.getGraphicsEngine = function () {
    return this.graphicsEngine;
};

/**
 * Set the drawing engine
 *
 * @param {rock.graphics.IGraphicsEngine} graphicsEngine
 *            the drawing engine
 */
rock.window.WindowSystem.prototype.setGraphicsEngine = function (graphicsEngine) {
    this.graphicsEngine = graphicsEngine;
};

/**
 * Get the aspect ratio of the window system
 *
 * @return {Number} the aspect ratio
 */
rock.window.WindowSystem.prototype.getAspectRatio = function () {
    return this.width / this.height;
};

/*
 * Class to save registered window info
 */
rock.window.WindowRegisterInfo = function (id, window) {
    this.id = id;
    this.window = window;
};

rock.window.WindowRegisterInfo.prototype.getId = function () {
    return this.id;
};

rock.window.WindowRegisterInfo.prototype.getWindow = function () {
    return this.window;
};
