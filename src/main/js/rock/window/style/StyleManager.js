rock.namespace('rock.window.style');

/**
 * Class for managing windows and components styles.
 * Use this class for initializing styles, not for dynamically changing it.
 *
 * @constructor
 *
 * @author Luis Alberto Jiménez
 */
rock.window.style.StyleManager = function () {
    this.styles = [];
    this.currentStyle = null;

    var rockStyle = rock.window.style.StyleManager.createRockStyle();
    this.addStyle(rockStyle);
    this.setCurrentStyle(rockStyle.getId());
};

rock.window.style.StyleManager.WINDOW_BACKGROUND_COLOR = 'WINDOW_BACKGROUND_COLOR';

rock.window.style.StyleManager.COMPONENT_BACKGROUND_COLOR = 'COMPONENT_BACKGROUND_COLOR';

rock.window.style.StyleManager.COMPONENT_COLOR = 'COMPONENT_COLOR';

rock.window.style.StyleManager.COMPONENT_COLOR_2 = 'COMPONENT_COLOR_2';

rock.window.style.StyleManager.COMPONENT_FONT_COLOR = 'COMPONENT_FONT_COLOR';

rock.window.style.StyleManager.COMPONENT_FONT = 'COMPONENT_FONT';

/**
 * Create the default rock style
 *
 * @returns {rock.window.style.Style}
 */
rock.window.style.StyleManager.createRockStyle = function () {
    var ROCK_STYLE_ID = rock.constants.ROCK_STYLE_ID;
    var rockStyle = new rock.window.style.Style(ROCK_STYLE_ID);

    rockStyle.addColor(rock.window.style.StyleManager.WINDOW_BACKGROUND_COLOR,
        new rock.graphics.Color(174, 222, 255));

    rockStyle.addColor(rock.window.style.StyleManager.COMPONENT_BACKGROUND_COLOR,
        new rock.graphics.Color(123, 201, 255));

    rockStyle.addColor(rock.window.style.StyleManager.COMPONENT_COLOR,
        new rock.graphics.Color(20, 30, 128));

    rockStyle.addColor(rock.window.style.StyleManager.COMPONENT_COLOR_2,
        new rock.graphics.Color(123, 175, 255));

    rockStyle.addColor(rock.window.style.StyleManager.COMPONENT_FONT_COLOR,
        new rock.graphics.Color(0, 0, 0));

    rockStyle.addFont(rock.window.style.StyleManager.COMPONENT_FONT,
        new rock.graphics.Font(rock.constants.DEFAULT_FONT_TYPE, rock.constants.DEFAULT_FONT_SIZE));

    return rockStyle;
};

/**
 * Add a new style
 *
 * @param {rock.window.style.Style} style
 *      the style to add
 */
rock.window.style.StyleManager.prototype.addStyle = function (style) {
    this.styles.push(style);
};

/**
 * Set the current style. Any call to get font or color will use it
 *
 * @param {String} id
 *      the id of the style to set
 */
rock.window.style.StyleManager.prototype.setCurrentStyle = function (id) {
    var i, style;
    var styles = this.styles;
    for (i = 0; i < styles.length; i++) {
        style = styles[i];
        if (style.getId() == id) {
            this.currentStyle = style;
        }
    }
};

/**
 * Get a color form the current style
 *
 * @param {String} colorId
 *      the id of the color
 * @returns {rock.graphics.Color}
 */
rock.window.style.StyleManager.prototype.getColor = function (colorId) {
    var color  = this.currentStyle.getColor(colorId);
    if (!rock.util.JsUtils.isNullOrUndefined(color)) {
        return color.clone();
    } else {
        return null;
    }
};

/**
 * Get a font form the current style
 *
 * @param {String} fontId
 *      the id of the font
 * @returns {rock.graphics.Font}
 */
rock.window.style.StyleManager.prototype.getFont = function (fontId) {
    var font  = this.currentStyle.getFont(fontId);
    if (!rock.util.JsUtils.isNullOrUndefined(font)) {
        return font.clone();
    } else {
        return null;
    }
};