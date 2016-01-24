rock.namespace('rock.window.component.html');

/**
 * Base class for HTML components. This is a wrapper for an HTML Element that will be put over the canvas.
 *
 * @param {rock.window.Window} window
 *          the window where component exists
 * @param type
 *          the type of the HTML Element
 *
 * @constructor
 * @abstract
 * @extends rock.window.component.Component
 *
 * @author Luis Alberto Jiménez
 */
rock.window.component.html.HTMLComponent = function (window, type) {
    rock.super_(this, [window]);

    this.width = rock.window.component.Component.AUTO_SIZE;
    this.height = rock.window.component.Component.AUTO_SIZE;

    this.HTMLElement = rock.util.DOMUtils.createHTMLElement(type);
    this.style = this.HTMLElement.style;
    this.style[rock.constants.CSS_DISPLAY] = rock.constants.CSS_DISPLAY_NONE;
    this.style[rock.constants.CSS_POSITION] = rock.constants.CSS_POSITION_ABSOLUTE;
    var canvas = this.application.getCanvas();
    canvas.parentNode.appendChild(this.HTMLElement);

    rock.util.DOMUtils.addEventListener(this.HTMLElement, rock.constants.HTML_DOM_EVENT_MOUSE_DOWN,
        rock.createEventHandler(this, this.dispatchOnMouseEvent, [rock.constants.ROCK_EVENT_MOUSE_DOWN]));

    rock.util.DOMUtils.addEventListener(this.HTMLElement, rock.constants.HTML_DOM_EVENT_MOUSE_UP,
        rock.createEventHandler(this, this.dispatchOnMouseEvent, [rock.constants.ROCK_EVENT_MOUSE_UP]));

    rock.util.DOMUtils.addEventListener(this.HTMLElement, rock.constants.HTML_DOM_EVENT_CLICK,
        rock.createEventHandler(this, this.dispatchOnMouseEvent, [rock.constants.ROCK_EVENT_CLICK]));

    rock.util.DOMUtils.addEventListener(this.HTMLElement, rock.constants.HTML_DOM_EVENT_DBLCLICK,
        rock.createEventHandler(this, this.dispatchOnMouseEvent, [rock.constants.ROCK_EVENT_DBLCLICK]));

    rock.util.DOMUtils.addEventListener(this.HTMLElement, rock.constants.HTML_DOM_EVENT_MOUSE_MOVE,
        rock.createEventHandler(this, this.dispatchOnMouseEvent, [rock.constants.ROCK_EVENT_MOUSE_MOVE]));

    rock.util.DOMUtils.addEventListener(this.HTMLElement, rock.constants.HTML_DOM_EVENT_MOUSE_OVER,
        rock.createEventHandler(this, this.dispatchOnMouseEvent, [rock.constants.ROCK_EVENT_MOUSE_OVER]));

    rock.util.DOMUtils.addEventListener(this.HTMLElement, rock.constants.HTML_DOM_EVENT_MOUSE_LEAVE,
        rock.createEventHandler(this, this.dispatchOnMouseEvent, [rock.constants.ROCK_EVENT_MOUSE_LEAVE]));
};

rock.extends_(rock.window.component.html.HTMLComponent, rock.window.component.Component);

/**
 * This function will dispatch mouse events for HTML components
 *
 * @param mouseEvent
 *      the event thrown by the DOM
 * @param eventId
 *      id of the event to be thrown
 *
 * @private
 */
rock.window.component.html.HTMLComponent.prototype.dispatchOnMouseEvent = function (mouseEvent, eventId) {
    var coords = rock.util.MouseUtils.resolveEventCoords(mouseEvent);
    this.dispatchEvent(
        rock.window.WindowSystem.createMouseEvent(
            eventId, coords.x, coords.y, mouseEvent
        )
    );

    if (eventId === rock.constants.ROCK_EVENT_MOUSE_OVER) {
        this.mouseOver = true;
    } else if (eventId === rock.constants.ROCK_EVENT_MOUSE_LEAVE) {
        this.mouseOver = false;
    }
};

/**
 * @override
 * @see rock.window.component.Component#deactivate
 */
rock.window.component.html.HTMLComponent.prototype.deactivate = function () {
    rock.super_method(this, rock.window.component.html.HTMLComponent, 'deactivate', []);
    this.display(false);
};

/**
 * @override
 * @see rock.window.component.Component#handleMouseSystemEvent
 */
rock.window.component.html.HTMLComponent.prototype.handleMouseSystemEvent = function (eventId, x, y, mouseEvent) {
    ;
};

/**
 * Compute the size of an HTML element
 *
 * ATTENTION: If the element is not visible, width and height will be 0...
 */
rock.window.component.html.HTMLComponent.prototype.computeSize = function () {
    this.computedWidth =  this.HTMLElement.offsetWidth;
    this.computedHeight =  this.HTMLElement.offsetHeight;
};

/**
 * Set the display value of the component
 *
 * @param {Boolean} visible
 */
rock.window.component.html.HTMLComponent.prototype.display = function(visible) {
    if (visible) {
        this.style[rock.constants.CSS_DISPLAY] = rock.constants.CSS_DISPLAY_BLOCK;

        // If the app has been scaled, we have to 'scale' the position
        var scaleFactory = this.application.getScaleFactor();
        var left = this.getX() * scaleFactory;
        var top = this.getY() * scaleFactory;

        this.style[rock.constants.CSS_LEFT] = Math.round(left) +'px';
        this.style[rock.constants.CSS_TOP] = Math.round(top) + 'px';
    } else {
        this.style[rock.constants.CSS_DISPLAY] = rock.constants.CSS_DISPLAY_NONE;
    }
};

/**
 * @override
 * @see rock.graphics.engine.IDrawable#draw
 */
rock.window.component.html.HTMLComponent.prototype.draw = function() {
    this.display(true);
    // We must assure that the element is visible, if not the computes size will be incorrect
    this.updateComponent();
};

/**
 * Update the size of the HTML element
 *
 * @param {CSSStyleDeclaration} style
 * @param width
 * @param height
 * @param scaleFactor
 * @param {Boolean} [overflow]
 *          if true, there will be set the overflow
 */
rock.window.component.html.HTMLComponent.updateHTMLStyleSize = function (style, width, height, scaleFactor, overflow) {
    if (rock.util.JsUtils.isNullOrUndefined(width) || width < 0) {
        style[rock.constants.CSS_WIDTH] = '';
    } else {
        style[rock.constants.CSS_WIDTH] = Math.round(width * scaleFactor) + 'px';
    }

    if (rock.util.JsUtils.isNullOrUndefined(height) || height < 0) {
        style[rock.constants.CSS_HEIGHT] = '';
    } else {
        style[rock.constants.CSS_HEIGHT] = Math.round(height * scaleFactor) + 'px';
    }

    if (rock.util.JsUtils.isNullOrUndefined(overflow)) {
        style[rock.constants.CSS_OVERFLOW] = '';
    } else {
        style[rock.constants.CSS_OVERFLOW] = rock.constants.CSS_OVERFLOW_HIDDEN;
    }
};

/**
 * Update the font of the HTML element
 *
 * @param {CSSStyleDeclaration} style
 * @param {rock.graphics.Font} font
 *            the font to use
 * @param {rock.graphics.Color} color
 *            the color to use
 * @param scaleFactor
 */
rock.window.component.html.HTMLComponent.updateHTMLStyleFont = function (style, font, color, scaleFactor) {
    style[rock.constants.CSS_FONT_FAMILY] = font.getFamily();
    style[rock.constants.CSS_FONT_SIZE] = Math.round(font.getSize() * scaleFactor) + 'px';
    style[rock.constants.CSS_COLOR] = color.getAsHex();
};

/**
 * Update the background color of the HTML element
 *
 * @param {CSSStyleDeclaration} style
 * @param {rock.graphics.Color} backgroundColor
 *            the color to use
 */
rock.window.component.html.HTMLComponent.updateHTMLBackground = function (style, backgroundColor) {
    if (!rock.util.JsUtils.isNullOrUndefined(backgroundColor)) {
        style[rock.constants.CSS_BACKGROUND_COLOR] = backgroundColor.getAsHex();
    } else {
        style[rock.constants.CSS_BACKGROUND_COLOR] = '';
    }
};