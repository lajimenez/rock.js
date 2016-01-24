rock.namespace('rock.window.component');

/**
 * Base class for components.
 *
 * Rock framework components always call 'updateComponent' when drawing. That could be a bad idea if
 * this function do a lot of things, so you can only call this function when something has changed instead
 * calling it when drawing...
 *
 * STUDY: It will be nice to do some kind of study for improving components design. For example, TextComponent and
 * HTMLTextComponent are very similar... Probably there are some nice pattern to use... 'Decorator pattern' maybe?
 *
 * @param {rock.window.Window} window
 *      the window where component exists
 *
 * @constructor
 * @abstract
 * @extends rock.event.EventDispatcher
 * @augments rock.graphics.engine.IDrawable
 *
 * @author Luis Alberto Jiménez
 */
rock.window.component.Component = function (window) {
    rock.super_(this);

    this.window = window;
    this.application = window.getApplication();

    // Id
    this.id = null;

    // Absolute position
    this.x = NaN;
    this.y = NaN;

    // Width and height
    this.width = NaN;
    this.height = NaN;

    this.computedWidth = NaN;
    this.computedHeight = NaN;

    // Appearance
    this.backgroundColor =
        this.application.getStyleManager().getColor(rock.window.style.StyleManager.COMPONENT_BACKGROUND_COLOR);

    this.mouseOver = false;

    this.application.addEventListener(rock.app.Application.LOCALE_CHANGED_EVENT,
        rock.createEventHandler(this, this.handleOnLocaleChanged));
};

rock.extends_(rock.window.component.Component, rock.event.EventDispatcher);

rock.implements_(rock.window.component.Component, rock.graphics.engine.IDrawable);

/**
 * You must set with or height to this value if you want that the component automatically
 * compute the size of the component
 *
 * @type {number}
 */
rock.window.component.Component.AUTO_SIZE = -1;

/**
 * Default onLocation change handle event implementation
 */
rock.window.component.Component.prototype.handleOnLocaleChanged = function () {
};

/**
 * This function must set all variables related with the size component and drawing needs.
 * After calling this function you MUST assure that computed width and height are correct.
 *
 * @function
 */
rock.window.component.Component.prototype.updateComponent = rock.abstract_;

/**
 * Deactivate the component. This will do all necessary things when the component is not active
 */
rock.window.component.Component.prototype.deactivate = function () {
    this.mouseOver = false;
};

/**
 * Check if the current coord hits the component
 *
 * @param x
 *            the coord x
 * @param y
 *            the coord y
 *
 * @returns {Boolean} if the coord hits the component
 */
rock.window.component.Component.prototype.hit = function (x, y) {
    // We need to scale the mouse coord since all components will be scaled
    var scaleFactor = this.window.getApplication().getScaleFactor();
    var scaledX = x / scaleFactor;
    var scaledY = y / scaleFactor;

    return this.x <= scaledX && scaledX <= (this.x + this.computedWidth)
        && this.y <= scaledY && scaledY <= (this.y + this.computedHeight);
};

/**
 * Handle a system mouse event
 *
 * @param eventId
 *            the event ID
 * @param x
 *            the x click
 * @param y
 *            the y click
 * @param mouseEvent
 *            the event thrown by the DOM
 */
rock.window.component.Component.prototype.handleMouseSystemEvent = function (eventId, x, y, mouseEvent) {
    var hit = this.hit(x, y);

    if (hit) {
        this.dispatchEvent(rock.window.WindowSystem.createMouseEvent(eventId, x, y, mouseEvent));
    }

    if (eventId === rock.constants.ROCK_EVENT_MOUSE_MOVE) {
        this.handleMouseOutMouseOverEvent(hit, x, y, mouseEvent);
    }
};

/**
 * Handle mouse over and mouse out events
 *
 * @param hit
 *            if the mouse is over the component
 * @param x
 *            the x click
 * @param y
 *            the y click
 * @param mouseEvent
 *            the event thrown by the DOM
 */
rock.window.component.Component.prototype.handleMouseOutMouseOverEvent = function (hit, x, y, mouseEvent) {
    if (hit && !this.mouseOver) {
        this.mouseOver = true;
        this.dispatchEvent(rock.window.WindowSystem.createMouseEvent(rock.constants.ROCK_EVENT_MOUSE_OVER, x, y, mouseEvent));
    }
    else if (!hit && this.mouseOver) {
        this.mouseOver = false;
        this.dispatchEvent(rock.window.WindowSystem.createMouseEvent(rock.constants.ROCK_EVENT_MOUSE_LEAVE, x, y, mouseEvent));
    }
};

/**
 * Handle a system key event
 *
 * @param eventId
 *            the system event id
 * @param keyEvent
 *            the key event
 * @private
 */
rock.window.component.Component.prototype.handleKeySystemEvent = function (eventId, keyEvent) {
    this.dispatchEvent(rock.window.WindowSystem.createKeyEvent(eventId, keyEvent));
};

/**
 * Check if the resource is available
 *
 * @param resource
 */
rock.window.component.Component.prototype.checkResourceAvailable = function (resource) {
    if (rock.util.JsUtils.isNullOrUndefined(resource)) {
        throw new rock.error.RockError(rock.resource.rockResourceManager.getString('RESOURCE_NOT_AVAILABLE'));
    }
};

/**
 * Redraw the component
 * @protected
 */
rock.window.component.Component.prototype.redraw = function () {
    var window = this.window;
    var windowSystem = window.getWindowSystem();
    // If the component we want to redraw is not in the current window,
    // we don't have to redraw it
    if (window != windowSystem.getCurrentWindow()) {
        return;
    }

    this.draw(windowSystem.getGraphicsEngine());
};

/**
 * Update the window. You shouldn't call this except in some rare cases...
 *
 * @param window the value
 */
rock.window.component.Component.prototype.updateWindow = function(window) {
    this.window = window;
};

/**
 * Get the value
 */
rock.window.component.Component.prototype.getId = function() {
    return this.id;
};

/**
 * Set the value
 * @param id the value
 */
rock.window.component.Component.prototype.setId = function(id) {
    this.id = id;
};

/**
 * Get the value
 */
rock.window.component.Component.prototype.getX = function() {
    return this.x;
};

/**
 * Set the value
 * @param x the value
 */
rock.window.component.Component.prototype.setX = function(x) {
    this.x = x;
};

/**
 * Get the value
 */
rock.window.component.Component.prototype.getY = function() {
    return this.y;
};

/**
 * Set the value
 * @param y the value
 */
rock.window.component.Component.prototype.setY = function(y) {
    this.y = y;
};

/**
 * Get the width. This value is expected value, but it can be different.
 * If you want to get the real width, you can use 'getComputedWidth'.
 */
rock.window.component.Component.prototype.getWidth = function() {
    return this.width;
};

/**
 * Set the width of the component (use 'rock.window.component.Component.AUTO_SIZE' for auto sizing)
 * If any subcomponent doesn't allow auto size, it must override this function and throw an
 * invalid component operation.
 *
 * @param width the value
 *
 * ATTENTION: Setting width may or not compute the real width
 * (you must assure that 'updateComponent' has been called if you want get real width)
 */
rock.window.component.Component.prototype.setWidth = function(width) {
    if (width < rock.window.component.Component.AUTO_SIZE) {
        throw new rock.error.RockError(rock.resource.rockResourceManager.getString('INVALID_COMPONENT_OPERATION'));
    }
    this.width = width;
};

/**
 * Get the height. This value is expected value, but it can be different.
 * If you want to get the real height, you can use 'getComputedHeight'
 */
rock.window.component.Component.prototype.getHeight = function() {
    return this.height;
};

/**
 * Set the height of the component (use 'rock.window.component.Component.AUTO_SIZE' for auto sizing)
 * If any subcomponent doesn't allow auto size, it must override this function and throw an
 * invalid component operation.
 *
 * @param height the value
 *
 * ATTENTION: Setting height may or not compute the real height
 * (you must assure that 'updateComponent' has been called if you want get real height
 */
rock.window.component.Component.prototype.setHeight = function(height) {
    if (height < rock.window.component.Component.AUTO_SIZE) {
        throw new rock.error.RockError(rock.resource.rockResourceManager.getString('INVALID_COMPONENT_OPERATION'));
    }
    this.height = height;
};

/**
 * Get the real width of the component
 */
rock.window.component.Component.prototype.getComputedWidth = function() {
    return this.computedWidth;
};

/**
 * Get the real height of the component
 */
rock.window.component.Component.prototype.getComputedHeight = function() {
    return this.computedHeight;
};

/**
 * Get the value
 */
rock.window.component.Component.prototype.getBackgroundColor = function() {
    return this.backgroundColor;
};

/**
 * Set the value
 * @param {rock.graphics.Color} backgroundColor the value
 */
rock.window.component.Component.prototype.setBackgroundColor = function(backgroundColor) {
    this.backgroundColor = backgroundColor;
};
