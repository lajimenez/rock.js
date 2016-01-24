rock.namespace('app.window');

/**
 * Select options window
 *
 * @param windowSystem
 *
 * @constructor
 * @abstract
 * @extends app.window.BackWindow
 */
app.window.OptionsWindow = function (windowSystem) {
    rock.super_(this, arguments);
    this.addComponents();
};

rock.extends_(app.window.OptionsWindow, app.window.BackWindow);

app.window.OptionsWindow.prototype.addComponents = function () {
    var languageLabel = new rock.window.component.Label(this, 'SELECT_LANGUAGE', true);
    languageLabel.setId('languageLabel');
    languageLabel.setX(200);
    languageLabel.setY(50);
    this.addComponent(languageLabel);

    var enImage = new rock.window.component.Image(this, app.constants.RES_ID_IMG_ENG, true);
    enImage.setId('enImage');
    enImage.setX(190);
    enImage.setY(90);
    enImage.addEventListener(rock.constants.ROCK_EVENT_CLICK, rock
        .createEventHandler(this, this.handleOnEnImageClick));
    this.addComponent(enImage);

    var esImage = new rock.window.component.Image(this, app.constants.RES_ID_IMG_ESP, true);
    esImage.setId('esImage');
    esImage.setX(190);
    esImage.setY(160);
    esImage.addEventListener(rock.constants.ROCK_EVENT_CLICK, rock
        .createEventHandler(this, this.handleOnEsImageClick));
    this.addComponent(esImage);

};

app.window.OptionsWindow.prototype.handleOnEnImageClick = function (event) {
    this.changeLocale(app.constants.LOCALE_EN);
};

app.window.OptionsWindow.prototype.handleOnEsImageClick = function (event) {
    this.changeLocale(app.constants.LOCALE_ES);
};

app.window.OptionsWindow.prototype.changeLocale = function (locale) {
    this.application.setLocale(locale);
};