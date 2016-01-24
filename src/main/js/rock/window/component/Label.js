rock.namespace('rock.window.component');

/**
 * Label class
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
rock.window.component.Label = function (window, text, localize, font, color) {
    rock.super_(this, [window, text, localize, font, color]);
    this.width = rock.window.component.Component.AUTO_SIZE;
    this.height = rock.window.component.Component.AUTO_SIZE;
};

rock.extends_(rock.window.component.Label, rock.window.component.TextComponent);

/**
 * @override
 * @see rock.window.component.Component#updateComponent
 */
rock.window.component.Label.prototype.updateComponent = function () {
    this.localizeText();
    var localizedText = this.localizedText;
    var font = this.font;

    if (this.width === rock.window.component.Component.AUTO_SIZE) {
        this.computedWidth = rock.util.TextUtils.measureTextWidth(localizedText, font);
    } else {
        this.computedWidth = this.width;
    }

    if (this.height === rock.window.component.Component.AUTO_SIZE) {
        this.computedHeight = rock.util.TextUtils.measureTextHeight(localizedText, font);
    } else {
        this.computedHeight = this.height;
    }
};

/**
 * @override
 * @see rock.graphics.engine.IDrawable#draw
 */
rock.window.component.Label.prototype.draw = function (graphicsEngine) {
    this.updateComponent();
    graphicsEngine.drawText(this.localizedText, this.x, this.y, this.font, this.color,
        this.computedWidth, this.computedHeight);
};