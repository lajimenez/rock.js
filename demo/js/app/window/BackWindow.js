rock.namespace('app.window');

/**
 * Select options window
 *
 * @param windowSystem
 *
 * @constructor
 * @extends rock.window.Window
 */
app.window.BackWindow = function (windowSystem) {
    rock.super_(this, arguments);
    this.addBackButton();
};

rock.extends_(app.window.BackWindow, rock.window.Window);

app.window.BackWindow.prototype.addBackButton = function () {
    var backButton = new rock.window.component.Button(this, 'BACK', true);
    backButton.setId('backButton');
    backButton.setX(500);
    backButton.setY(20);
    backButton.setBackgroundColor(new rock.graphics.Color(255, 255, 255));
    backButton.addEventListener(rock.constants.ROCK_EVENT_CLICK, rock
        .createEventHandler(this, this.handleOnBackButtonClick));
    this.addComponent(backButton);
};

app.window.BackWindow.prototype.handleOnBackButtonClick = function (event) {
    var mainWindow = this.windowSystem.getWindow(app.constants.MAIN_WINDOW);
    this.windowSystem.setCurrentWindow(mainWindow);
};