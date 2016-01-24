rock.namespace('rock.window.component.html');

/**
 * Abstract class for components that has some text to show
 *
 * (This class is almost a copy of the class {rock.window.component.TextComponent}...
 * I should do some refactor to avoid it...)
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
 * @param type
 *          the type of the HTML Element
 *
 *
 * @constructor
 * @abstract
 * @extends rock.window.component.html.HTMLComponent
 *
 * @author Luis Alberto Jiménez
 */
rock.window.component.html.HTMLTextComponent = function (window, text, localize, font, color, type) {
    rock.super_(this, [window, type]);

    this.text = text;
    if (rock.util.JsUtils.isNullOrUndefined(this.text)) {
        this.text = '';
    }
    this.localize = localize;
    if (rock.util.JsUtils.isNullOrUndefined(this.localize)) {
        this.localize = false;
    }
    this.font = font;
    if (rock.util.JsUtils.isNullOrUndefined(this.font)) {
        this.font = this.application.getStyleManager().getFont(rock.window.style.StyleManager.COMPONENT_FONT);
    }
    this.color = color;
    if (rock.util.JsUtils.isNullOrUndefined(this.color)) {
        this.color = this.application.getStyleManager().getColor(rock.window.style.StyleManager.COMPONENT_FONT_COLOR);
    }

    // This is the real text that will be shown
    this.localizedText = null;
    this.localizeText();
};

rock.extends_(rock.window.component.html.HTMLTextComponent, rock.window.component.html.HTMLComponent);

/**
 * Get the text to use
 */
rock.window.component.html.HTMLTextComponent.prototype.localizeText = function () {
    var localizedText = this.text;
    if (this.localize) {
        localizedText = this.application.getResourceManager().getString(this.text);
    }
    this.localizedText = localizedText;
};

/**
 * Get the text
 *
 * @returns the value
 */
rock.window.component.html.HTMLTextComponent.prototype.getText = function () {
    return this.text;
};

/**
 * Get the localize
 */
rock.window.component.html.HTMLTextComponent.prototype.getLocalize = function() {
    return this.localize;
};

/**
 * Set the text
 *
 * @param text
 *          the value to set
 * @param [localize]
 *         if true, the text will be localized
 */
rock.window.component.html.HTMLTextComponent.prototype.setText = function (text, localize) {
    this.text = text;
    if (rock.util.JsUtils.isNullOrUndefined(this.text)) {
        this.text = '';
    }

    this.localize = localize;
    if (rock.util.JsUtils.isNullOrUndefined(this.localize)) {
        this.localize = false;
    }
    this.localizeText();
};

/**
 * Get the font
 *
 * @returns the value
 */
rock.window.component.html.HTMLTextComponent.prototype.getFont = function () {
    return this.font;
};

/**
 * Set the font
 *
 * @param font
 *            the value to set
 */
rock.window.component.html.HTMLTextComponent.prototype.setFont = function (font) {
    this.font = font;
};

/**
 * Get the value
 */
rock.window.component.html.HTMLTextComponent.prototype.getColor = function() {
    return this.color;
};

/**
 * Set the value
 * @param color the value
 */
rock.window.component.html.HTMLTextComponent.prototype.setColor = function(color) {
    this.color = color;
};

/**
 * Get the localizedText
 */
rock.window.component.html.HTMLTextComponent.prototype.getLocalizedText = function() {
    return this.localizedText;
};
