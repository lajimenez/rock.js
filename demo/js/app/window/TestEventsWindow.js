rock.namespace('app.window');

/**
 * Window to tests events
 *
 * @param {rock.window.WindowSystem} windowSystem
 *          the window system
 *
 * @constructor
 * @extends {app.window.BackWindow}
 *
 * @author Luis Alberto Jiménez
 */
app.window.TestEventsWindow = function (windowSystem) {
    rock.super_(this, arguments);
    this.listeners = [];
    this.dispatchEventButton = null;

    this.addComponents();
};

rock.extends_(app.window.TestEventsWindow, app.window.BackWindow);

app.window.TestEventsWindow.prototype.addComponents = function() {
    var showConsoleLabel = new rock.window.component.Label(this, 'OPEN_CONSOLE_TO_SHOW_LOG', true);
    showConsoleLabel.setId('showConsoleLabel');
    showConsoleLabel.setX(200);
    showConsoleLabel.setY(60);
    this.addComponent(showConsoleLabel);

    var keyEventsListenedLabel = new rock.window.component.Label(this, 'KEY_EVENTS_LISTENED', true);
    keyEventsListenedLabel.setId('keyEventsListenedLabel');
    keyEventsListenedLabel.setX(200);
    keyEventsListenedLabel.setY(85);
    this.addComponent(keyEventsListenedLabel);

    var mouseUpDownButton = new rock.window.component.Button(this, 'mouse Up & mouse down');
    mouseUpDownButton.setId('mouseUpDownButton');
    mouseUpDownButton.setX(200);
    mouseUpDownButton.setY(120);
    mouseUpDownButton.setWidth(200);
    mouseUpDownButton.setHeight(30);
    mouseUpDownButton.addEventListener(rock.constants.ROCK_EVENT_MOUSE_DOWN,
        rock.createEventHandler(this, this.handleOnMouseDown));
    mouseUpDownButton.addEventListener(rock.constants.ROCK_EVENT_MOUSE_UP,
        rock.createEventHandler(this, this.handleOnMouseUp));
    this.addComponent(mouseUpDownButton);

    var mouseDblClickButton = new rock.window.component.Button(this, 'double click');
    mouseDblClickButton.setId('mouseDblClickButton');
    mouseDblClickButton.setX(200);
    mouseDblClickButton.setY(160);
    mouseDblClickButton.setWidth(200);
    mouseDblClickButton.setHeight(30);
    mouseDblClickButton.addEventListener(rock.constants.ROCK_EVENT_DBLCLICK,
        rock.createEventHandler(this, this.handleOnMouseDblClick));
    this.addComponent(mouseDblClickButton);

    var mouseMoveButton = new rock.window.component.Button(this, 'mouse move');
    mouseMoveButton.setId('mouseMoveButton');
    mouseMoveButton.setX(200);
    mouseMoveButton.setY(200);
    mouseMoveButton.setWidth(200);
    mouseMoveButton.setHeight(30);
    mouseMoveButton.addEventListener(rock.constants.ROCK_EVENT_MOUSE_MOVE,
        rock.createEventHandler(this, this.handleOnMouseMove));
    this.addComponent(mouseMoveButton);

    var mouseOverLeaveButton = new rock.window.component.Button(this, 'mouse over & mouse leave');
    mouseOverLeaveButton.setId('mouseOverLeaveButton');
    mouseOverLeaveButton.setX(200);
    mouseOverLeaveButton.setY(240);
    mouseOverLeaveButton.setWidth(200);
    mouseOverLeaveButton.setHeight(30);
    mouseOverLeaveButton.addEventListener(rock.constants.ROCK_EVENT_MOUSE_OVER,
        rock.createEventHandler(this, this.handleOnMouseOverClick));
    mouseOverLeaveButton.addEventListener(rock.constants.ROCK_EVENT_MOUSE_LEAVE,
        rock.createEventHandler(this, this.handleOnMouseLeaveClick));
    this.addComponent(mouseOverLeaveButton);

    var addListenerButton = new rock.window.component.Button(this, 'ADD_LISTENER_BUTTON', true);
    addListenerButton.setId('addListenerButton');
    addListenerButton.setX(200);
    addListenerButton.setY(300);
    addListenerButton.setWidth(200);
    addListenerButton.setHeight(30);
    addListenerButton.addEventListener(rock.constants.ROCK_EVENT_CLICK,
        rock.createEventHandler(this, this.handleOnAddListenerButtonClick));
    this.addComponent(addListenerButton);

    var removeListenerButton = new rock.window.component.Button(this, 'REMOVE_LISTENER_BUTTON', true);
    removeListenerButton.setId('removeListenerButton');
    removeListenerButton.setX(200);
    removeListenerButton.setY(340);
    removeListenerButton.setWidth(200);
    removeListenerButton.setHeight(30);
    removeListenerButton.addEventListener(rock.constants.ROCK_EVENT_CLICK,
        rock.createEventHandler(this, this.handleOnRemoveListenerButtonClick));
    this.addComponent(removeListenerButton);

    var dispatchEventButton = new rock.window.component.Button(this, 'DISPATCH_EVENT_BUTTON', true);
    dispatchEventButton.setId('dispatchEventButton');
    dispatchEventButton.setX(200);
    dispatchEventButton.setY(390);
    dispatchEventButton.setWidth(200);
    dispatchEventButton.setHeight(30);
    this.addComponent(dispatchEventButton);
    this.dispatchEventButton = dispatchEventButton;

    this.addEventListener(rock.constants.ROCK_EVENT_KEY_DOWN,
        rock.createEventHandler(this, this.handleOnKeyDown));
    this.addEventListener(rock.constants.ROCK_EVENT_KEY_UP,
        rock.createEventHandler(this, this.handleOnKeyUp));
    this.addEventListener(rock.constants.ROCK_EVENT_KEY_PRESS,
        rock.createEventHandler(this, this.handleOnKeyPress));
};

app.window.TestEventsWindow.prototype.handleOnMouseDown = function (event) {
    rock.console.log('mouseDown');
};

app.window.TestEventsWindow.prototype.handleOnMouseUp = function (event) {
    rock.console.log('mouseUp');
};

app.window.TestEventsWindow.prototype.handleOnMouseDblClick = function (event) {
    rock.console.log('double click');
};

app.window.TestEventsWindow.prototype.handleOnMouseMove = function (event) {
    rock.console.log('mouse move');
};

app.window.TestEventsWindow.prototype.handleOnMouseOverClick = function (event) {
    rock.console.log('mouse over');
};

app.window.TestEventsWindow.prototype.handleOnMouseLeaveClick = function (event) {
    rock.console.log('mouse leave');
};

app.window.TestEventsWindow.prototype.handleOnAddListenerButtonClick = function (event) {
    var currentTime =  new Date().getTime();
    rock.console.log('Added dummy listener to window: ' + currentTime);

    var listener =  function () {
        rock.console.log('dummy event: ' + currentTime);
    };

    this.listeners.push(listener);
    this.dispatchEventButton.addEventListener(rock.constants.ROCK_EVENT_CLICK, listener);
};

app.window.TestEventsWindow.prototype.handleOnRemoveListenerButtonClick = function (event) {
    rock.console.log('Removed dummy listener to window');
    var listener = this.listeners.shift();
    this.dispatchEventButton.removeEventListener(rock.constants.ROCK_EVENT_CLICK, listener);
};

app.window.TestEventsWindow.prototype.handleOnKeyDown = function (event) {
    rock.console.log('key down: ' + event.toString());
};

app.window.TestEventsWindow.prototype.handleOnKeyUp = function (event) {
    rock.console.log('key up: ' + event.toString());
};

app.window.TestEventsWindow.prototype.handleOnKeyPress = function (event) {
    rock.console.log('key press: ' + event.toString());
};