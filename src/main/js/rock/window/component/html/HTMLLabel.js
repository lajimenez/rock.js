rock.namespace('rock.window.component.html');

/**
 * Label class.
 *
 * @param {rock.window.Window} window
 *            the window where component exists
 * @param text
 *            the text to show in label
 * @param {Boolean} [localize]
 *            if true, the text will be localized (so text should be the resource id of the localized string)
 * @param {rock.graphics.Font} [font]
 *            the font to use
 * @param {rock.graphics.Color} [color]
 *            the color to use
 *
 * @constructor
 * @extends rock.window.component.html.HTMLTextComponent
 *
 * @author Luis Alberto Jiménez
 */
rock.window.component.html.HTMLLabel = function (window, text, localize, font, color) {
    rock.super_(this, [window, text, localize, font, color, rock.constants.SPAN_TAG]);
    this.style[rock.constants.CSS_TEXT_ALIGN] = rock.constants.CSS_LEFT;
};

rock.extends_(rock.window.component.html.HTMLLabel, rock.window.component.html.HTMLTextComponent);

/**
 * @override
 * @see rock.window.component.Component#updateComponent
 */
rock.window.component.html.HTMLLabel.prototype.updateComponent = function () {
    var style = this.style;
    var scaleFactor = this.window.getApplication().getScaleFactor();
    rock.window.component.html.HTMLComponent.updateHTMLStyleSize(style, this.width, this.height, scaleFactor, true);
    rock.window.component.html.HTMLComponent.updateHTMLStyleFont(style, this.font, this.color, scaleFactor);
    this.localizeText();
    this.HTMLElement.textContent = this.localizedText;

    this.computeSize();
};