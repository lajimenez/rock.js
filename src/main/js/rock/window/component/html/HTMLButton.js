rock.namespace('rock.window.component.html');

/**
 * Button class
 *
 * @param {rock.window.Window} window
 *            the window where component exists
 * @param text
 *            the text to show in button
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
rock.window.component.html.HTMLButton = function (window, text, localize, font, color) {
    rock.super_(this, [window, text, localize, font, color, rock.constants.INPUT_TAG]);
    this.HTMLElement.type = rock.constants.INPUT_TYPE_BUTTON;
};

rock.extends_(rock.window.component.html.HTMLButton, rock.window.component.html.HTMLTextComponent);

/**
 * @override
 * @see rock.window.component.Component#updateComponent
 */
rock.window.component.html.HTMLButton.prototype.updateComponent = function () {
    var style = this.style;
    var scaleFactor = this.window.getApplication().getScaleFactor();
    rock.window.component.html.HTMLComponent.updateHTMLStyleSize(style, this.width, this.height, scaleFactor);
    rock.window.component.html.HTMLComponent.updateHTMLStyleFont(style, this.font, this.color, scaleFactor);
    rock.window.component.html.HTMLComponent.updateHTMLBackground(style, this.backgroundColor);

    this.localizeText();
    this.HTMLElement.value = this.localizedText;

    this.computeSize();
};