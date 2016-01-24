rock.namespace('app.window');

/**
 * Start window for test application
 *
 * @constructor
 * @extends rock.window.Window
 *
 * @author Luis Alberto Jiménez
 */
app.window.MainWindow = function (windowSystem) {
    rock.super_(this, arguments);
    this.addComponents();
};

rock.extends_(app.window.MainWindow, rock.window.Window);

app.window.MainWindow.prototype.addComponents = function () {
    // Logo
    var logo = this.application.getResourceManager().getImage(app.constants.RES_ID_IMG_LOGO);
    var logoImage = new rock.window.component.Image(this, logo);
    logoImage.setId('logoImage');
    logoImage.setX(190);
    logoImage.setY(0);
    this.addComponent(logoImage);

    // Title (HTML Label)
    var htmlTitleLabelColor = new rock.graphics.Color(0, 0, 255);
    var htmlTitleLabelFont = new rock.graphics.Font('Arial', 18);
    var htmlTitleLabel = new rock.window.component.html.HTMLLabel(this, 'TITLE', true,
        htmlTitleLabelFont, htmlTitleLabelColor);
    htmlTitleLabel.id = 'htmlTitleLabel';
    htmlTitleLabel.setX(200);
    htmlTitleLabel.setY(65);
    this.addComponent(htmlTitleLabel);

    // Add buttons
    var showTestGraphicsEngineButton = new rock.window.component.Button(this, 'SHOW_TEST_GRAPHICS_ENGINE_BUTTON', true);
    showTestGraphicsEngineButton.setId('showTestGraphicsEngineButton');
    showTestGraphicsEngineButton.setX(200);
    showTestGraphicsEngineButton.setY(100);
    showTestGraphicsEngineButton.setWidth(200);
    showTestGraphicsEngineButton.setHeight(30);
    showTestGraphicsEngineButton.addEventListener(rock.constants.ROCK_EVENT_CLICK,
        rock.createEventHandler(this, this.handleOnShowTestGraphicsEngineButtonClick));
    this.addComponent(showTestGraphicsEngineButton);

    var shotTestEventsButton = new rock.window.component.Button(this, 'SHOW_TEST_EVENTS_BUTTON', true);
    shotTestEventsButton.setId('shotTestEventsButton');
    shotTestEventsButton.setX(200);
    shotTestEventsButton.setY(150);
    shotTestEventsButton.setWidth(200);
    shotTestEventsButton.setHeight(30);
    shotTestEventsButton.addEventListener(rock.constants.ROCK_EVENT_CLICK,
        rock.createEventHandler(this, this.handleOnShotTestEventsButtonClick));
    this.addComponent(shotTestEventsButton);

    var showTestComponentsButton = new rock.window.component.Button(this, 'SHOW_TEST_COMPONENTS_BUTTON', true);
    showTestComponentsButton.setId('showTestComponentsButton');
    showTestComponentsButton.setX(200);
    showTestComponentsButton.setY(200);
    showTestComponentsButton.setWidth(200);
    showTestComponentsButton.setHeight(30);
    showTestComponentsButton.addEventListener(rock.constants.ROCK_EVENT_CLICK,
        rock.createEventHandler(this, this.handleOnShowTestComponentsButtonClick));
    this.addComponent(showTestComponentsButton);

    var showTestTimerButton = new rock.window.component.Button(this, 'SHOW_TEST_TIMER_BUTTON', true);
    showTestTimerButton.setId('showTestTimerButton');
    showTestTimerButton.setX(200);
    showTestTimerButton.setY(250);
    showTestTimerButton.setWidth(200);
    showTestTimerButton.setHeight(30);
    showTestTimerButton.addEventListener(rock.constants.ROCK_EVENT_CLICK,
        rock.createEventHandler(this, this.handleOnShowTestTimerButtonClick));
    this.addComponent(showTestTimerButton);

    var showUnitTestButton = new rock.window.component.Button(this, 'SHOW_UNIT_TEST_BUTTON', true);
    showUnitTestButton.setId('showUnitTestButton');
    showUnitTestButton.setX(200);
    showUnitTestButton.setY(300);
    showUnitTestButton.setWidth(200);
    showUnitTestButton.setHeight(30);
    showUnitTestButton.addEventListener(rock.constants.ROCK_EVENT_CLICK,
        rock.createEventHandler(this, this.handleOnShowUnitTestButtonClick));
    this.addComponent(showUnitTestButton);

    var showTestAudioButton = new rock.window.component.Button(this, 'SHOW_TEST_AUDIO_BUTTON', true);
    showTestAudioButton.setId('showTestAudioButton');
    showTestAudioButton.setX(200);
    showTestAudioButton.setY(350);
    showTestAudioButton.setWidth(200);
    showTestAudioButton.setHeight(30);
    showTestAudioButton.addEventListener(rock.constants.ROCK_EVENT_CLICK,
        rock.createEventHandler(this, this.handleOnShowTestAudioButtonClick));
    this.addComponent(showTestAudioButton)

    var showOptionsButton = new rock.window.component.Button(this, 'SHOW_OPTIONS_BUTTON', true);
    showOptionsButton.setId('showOptionsButton');
    showOptionsButton.setX(200);
    showOptionsButton.setY(420);
    showOptionsButton.setWidth(200);
    showOptionsButton.setHeight(30);
    showOptionsButton.setBackgroundColor( new rock.graphics.Color(154, 180, 255));
    showOptionsButton.addEventListener(rock.constants.ROCK_EVENT_CLICK,
        rock.createEventHandler(this, this.handleOnShowOptionsButtonClick));
    this.addComponent(showOptionsButton);

    var ugliestAppEverLabel = new rock.window.component.html.HTMLLabel(this, 'UGLIEST_APP_EVER', true);
    ugliestAppEverLabel.setId('ugliestAppEverLabel');
    ugliestAppEverLabel.setX(200);
    ugliestAppEverLabel.setY(460);
    this.addComponent(ugliestAppEverLabel);
};

app.window.MainWindow.prototype.handleOnShowTestGraphicsEngineButtonClick = function (event) {
    var testGraphicsEngineWindow = this.windowSystem.getWindow(app.constants.TEST_GRAPHICS_ENGINE_WINDOW);
    this.windowSystem.setCurrentWindow(testGraphicsEngineWindow);
};

app.window.MainWindow.prototype.handleOnShotTestEventsButtonClick = function (event) {
    var testEventsWindow =this.windowSystem.getWindow(app.constants.TEST_EVENTS_WINDOW);
    this.windowSystem.setCurrentWindow(testEventsWindow);
};

app.window.MainWindow.prototype.handleOnShowTestComponentsButtonClick = function (event) {
    var testComponentsWindow = this.windowSystem.getWindow(app.constants.TEST_COMPONENTS_WINDOW);
    this.windowSystem.setCurrentWindow(testComponentsWindow);
};

app.window.MainWindow.prototype.handleOnShowTestTimerButtonClick = function (event) {
    var testTimerWindow = this.windowSystem.getWindow(app.constants.TEST_TIMER_WINDOW);
    this.windowSystem.setCurrentWindow(testTimerWindow);
};

app.window.MainWindow.prototype.handleOnShowUnitTestButtonClick = function (event) {
    var unitTestWindow = this.windowSystem.getWindow(app.constants.UNIT_TEST_WINDOW);
    this.windowSystem.setCurrentWindow(unitTestWindow);
};

app.window.MainWindow.prototype.handleOnShowTestAudioButtonClick = function (event) {
    var testAudioWindow = this.windowSystem.getWindow(app.constants.TEST_AUDIO_WINDOW);
    this.windowSystem.setCurrentWindow(testAudioWindow);
};

app.window.MainWindow.prototype.handleOnShowOptionsButtonClick = function (event) {
    var optionsWindow = this.windowSystem.getWindow(app.constants.OPTIONS_WINDOW);
    this.windowSystem.setCurrentWindow(optionsWindow);
};
