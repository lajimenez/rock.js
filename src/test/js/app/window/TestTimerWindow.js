rock.namespace('app.window');

/**
 * Test timer window
 *
 * @param {rock.window.WindowSystem} windowSystem
 *          the window system
 *
 * @constructor
 * @extends {app.window.BackWindow}
 *
 * @author Luis Alberto Jiménez
 */
app.window.TestTimerWindow = function (windowSystem) {
    rock.super_(this, arguments);
    this.registeredFunctions = [];
    this.addComponents();
};

rock.extends_(app.window.TestTimerWindow, app.window.BackWindow);

app.window.TestTimerWindow.prototype.addComponents = function() {
    var showConsoleLabel = new rock.window.component.Label(this, 'OPEN_CONSOLE_TO_SHOW_LOG', true);
    showConsoleLabel.setId('showConsoleLabel');
    showConsoleLabel.setX(200);
    showConsoleLabel.setY(60);
    this.addComponent(showConsoleLabel);

    var registerTimerFunctionButton = new rock.window.component.Button(this, 'REGISTER_TIMER_FUNCTION_BUTTON', true);
    registerTimerFunctionButton.setId('registerTimerFunctionButton');
    registerTimerFunctionButton.setX(200);
    registerTimerFunctionButton.setY(100);
    registerTimerFunctionButton.setWidth(200);
    registerTimerFunctionButton.setHeight(30);
    registerTimerFunctionButton.addEventListener(rock.constants.ROCK_EVENT_CLICK,
        rock.createEventHandler(this, this.handleOnRegisterTimerFunctionButtonClick));
    this.addComponent(registerTimerFunctionButton);

    var unregisterTimerFunctionButton = new rock.window.component.Button(this, 'UNREGISTER_TIMER_FUNCTION_BUTTON', true);
    unregisterTimerFunctionButton.setId('unregisterTimerFunctionButton');
    unregisterTimerFunctionButton.setX(200);
    unregisterTimerFunctionButton.setY(140);
    unregisterTimerFunctionButton.setWidth(200);
    unregisterTimerFunctionButton.setHeight(30);
    unregisterTimerFunctionButton.addEventListener(rock.constants.ROCK_EVENT_CLICK,
        rock.createEventHandler(this, this.handleOnUnregisterTimerFunctionButtonClick));
    this.addComponent(unregisterTimerFunctionButton);

    var startTimer = new rock.window.component.Button(this, 'START_TIMER_BUTTON', true);
    startTimer.setId('startTimer');
    startTimer.setX(200);
    startTimer.setY(200);
    startTimer.setWidth(200);
    startTimer.setHeight(30);
    startTimer.addEventListener(rock.constants.ROCK_EVENT_CLICK,
        rock.createEventHandler(this, this.handleOnStartTimerClick));
    this.addComponent(startTimer);

    var stopTimer = new rock.window.component.Button(this, 'STOP_TIMER_BUTTON', true);
    stopTimer.setId('stopTimer');
    stopTimer.setX(200);
    stopTimer.setY(240);
    stopTimer.setWidth(200);
    stopTimer.setHeight(30);
    stopTimer.addEventListener(rock.constants.ROCK_EVENT_CLICK,
        rock.createEventHandler(this, this.handleOnStopTimerClick));
    this.addComponent(stopTimer);

};

app.window.TestTimerWindow.prototype.handleOnRegisterTimerFunctionButtonClick = function (event) {
    var currentTime =  new Date().getTime();
    rock.console.log('Registered timer: ' + currentTime);

    var func =  function () {
        rock.console.log('timer running: ' + currentTime + ' - ' + Math.random());
    };

    this.registeredFunctions.push(func);
    rock.timer.registerTimerFunction(this, func, []);
};

app.window.TestTimerWindow.prototype.handleOnUnregisterTimerFunctionButtonClick = function (event) {
    rock.console.log('Unregistered timer');

    var registeredFunctions = this.registeredFunctions;
    if (registeredFunctions.length == 0) {
        return;
    }
    var func = registeredFunctions.shift();
    rock.timer.unregisterTimerFunction(func);
};

app.window.TestTimerWindow.prototype.handleOnStartTimerClick = function (event) {
    rock.timer.start();
};

app.window.TestTimerWindow.prototype.handleOnStopTimerClick = function (event) {
    rock.timer.stop();
};