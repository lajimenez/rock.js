rock.namespace('rock.window.component');

/**
 * Button class
 *
 * @param {rock.window.Window} window
 *            the window where component exists
 * @param {String} text
 *            the text to show in label
 * @param {Boolean} [localize]
 *            if true, the text will be localized (so text should be the resource id of the localized string)
 * @param {rock.graphics.Font} [font]
 *            the font to use
 * @param {rock.graphics.Color} [color]
 *            the color to use
 *
 * @constructor
 * @extends rock.window.component.TextComponent
 *
 * @author Luis Alberto Jiménez
 */
rock.window.component.Button = function (window, text, localize, font, color) {
    rock.super_(this, [window, text, localize, font, color]);
    this.width = rock.window.component.Component.AUTO_SIZE;
    this.height = rock.window.component.Component.AUTO_SIZE;
    this.MARGIN_WIDTH = 6;
    this.MARGIN_HEIGHT = 3;
    this.BORDER_WIDTH = 1;
    this.borderColor = this.application.getStyleManager().getColor(rock.window.style.StyleManager.COMPONENT_COLOR);
    this.onMouseOverColor = this.application.getStyleManager().getColor(rock.window.style.StyleManager.COMPONENT_COLOR_2);
    this.textPosition = null;

    this.addEventListener(rock.constants.ROCK_EVENT_MOUSE_OVER, rock.createEventHandler(this, this.handleOnMouseOver));
    this.addEventListener(rock.constants.ROCK_EVENT_MOUSE_LEAVE, rock.createEventHandler(this, this.handleOnMouseOut));
};

rock.extends_(rock.window.component.Button, rock.window.component.TextComponent);

rock.window.component.Button.prototype.handleOnMouseOver = function (event) {
    this.redraw();
};

rock.window.component.Button.prototype.handleOnMouseOut = function (event) {
    this.redraw();
};

/**
 * @override
 * @see rock.window.component.Component#updateComponent
 */
rock.window.component.Button.prototype.updateComponent = function () {
    this.localizeText();
    var text = this.localizedText;
    var font = this.font;
    var textWidth = rock.util.TextUtils.measureTextWidth(text, font);
    var textHeight = rock.util.TextUtils.measureTextHeight(text, font);

    if (this.width === rock.window.component.Component.AUTO_SIZE) {
        this.computedWidth = textWidth + 2 * this.MARGIN_WIDTH;
    } else {
        this.computedWidth = this.width;
    }

    if (this.height === rock.window.component.Component.AUTO_SIZE) {
        this.computedHeight = textHeight + 2 * this.MARGIN_HEIGHT;
    } else {
        this.computedHeight = this.height;
    }

    this.textPosition = rock.util.GeometryUtils.getPointMakesSameCenter(new rock.geometry.Point2(this.x, this.y),
        this.computedWidth, this.computedHeight, textWidth, textHeight);

};

rock.window.component.Button.prototype.getBackgroundColorToUse = function () {
    if (this.mouseOver) {
        return this.onMouseOverColor;
    } else {
        return this.backgroundColor;
    }
};

/**
 * @override
 * @see rock.graphics.engine.IDrawable#draw
 */
rock.window.component.Button.prototype.draw = function (graphicsEngine) {
    this.updateComponent();
    graphicsEngine.drawRectangle(this.x, this.y, this.computedWidth, this.computedHeight,
        this.getBackgroundColorToUse());
    graphicsEngine.drawRectangle(this.x, this.y, this.computedWidth, this.computedHeight,
        this.borderColor, this.BORDER_WIDTH);
    var textPosition = this.textPosition;
    graphicsEngine.drawText(this.localizedText, textPosition.getX(), textPosition.getY(),
        this.font, this.color);
};

/**
 * Get the onMouseOverColor
 */
rock.window.component.Button.prototype.getOnMouseOverColor = function() {
    return this.onMouseOverColor;
};

/**
 * Set the onMouseOverColor
 *
 * @param onMouseOverColor the value
 */
rock.window.component.Button.prototype.setOnMouseOverColor = function(onMouseOverColor) {
    this.onMouseOverColor = onMouseOverColor;
    this.redraw();
};