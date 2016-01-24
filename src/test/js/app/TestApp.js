rock.namespace('app');

/**
 * Test application
 *
 * @param {rock.app.InitApplicationParams} initParams
 *            params for initialization
 *
 * @constructor
 * @extends rock.app.Application
 *
 * @author Luis Alberto Jiménez
 */
app.TestApp = function (initParams) {
    this.ID_IMG_ES_ESP = 'ID_IMG_ES_ESP';
    this.ID_IMG_ES_ENG = 'ID_IMG_ES_ENG';
    this.ID_IMG_EN_ESP = 'ID_IMG_EN_ESP';
    this.ID_IMG_EN_ENG = 'ID_IMG_EN_ENG';
    this.ID_IMG_EN_COMPONENT = 'ID_IMG_EN_COMPONENT';
    this.ID_IMG_ES_COMPONENT = 'ID_IMG_ES_COMPONENT';

    rock.super_(this, arguments);
};

rock.extends_(app.TestApp, rock.app.Application);

/**
 * @override
 * @see rock.app.Application#start
 */
app.TestApp.prototype.start = function () {
    try {
        this.initResources();
    } catch (err) {
        // ATTENTION: if some exception is thrown when init resources, it won't be caught!
        // (that is because loading is an asynchronous process)
        alert(err.message);
        rock.console.log(err.stack);
    }
};

app.TestApp.prototype.createAndRegisterWindow = function () {
    var mainWindow = new app.window.MainWindow(this.windowSystem);
    var optionsWindow = new app.window.OptionsWindow(this.windowSystem);
    var testGraphicsEngineWindow = new app.window.TestGraphicsEngineWindow(this.windowSystem);
    var testEventsWindow = new app.window.TestEventsWindow(this.windowSystem);
    var testComponentsWindow = new app.window.TestComponentsWindow(this.windowSystem);
    var testTimerWindow = new app.window.TestTimerWindow(this.windowSystem);
    var unitTestWindow = new app.window.UnitTestWindow(this.windowSystem);
    var testAudioWindow = new app.window.TestAudioWindow(this.windowSystem);

    this.windowSystem.registerWindow(app.constants.MAIN_WINDOW, mainWindow);
    this.windowSystem.registerWindow(app.constants.OPTIONS_WINDOW, optionsWindow);
    this.windowSystem.registerWindow(app.constants.TEST_GRAPHICS_ENGINE_WINDOW, testGraphicsEngineWindow);
    this.windowSystem.registerWindow(app.constants.TEST_EVENTS_WINDOW, testEventsWindow);
    this.windowSystem.registerWindow(app.constants.TEST_COMPONENTS_WINDOW, testComponentsWindow);
    this.windowSystem.registerWindow(app.constants.TEST_TIMER_WINDOW, testTimerWindow);
    this.windowSystem.registerWindow(app.constants.UNIT_TEST_WINDOW, unitTestWindow);
    this.windowSystem.registerWindow(app.constants.TEST_AUDIO_WINDOW, testAudioWindow);

    testEventsWindow.addEventListener(
        rock.window.Window.WINDOW_ACTIVATED_EVENT,
        rock.createEventHandler(this, this.onActivateTestEventsWindows));
    testEventsWindow.addEventListener(
        rock.window.Window.WINDOW_DEACTIVATED_EVENT,
        rock.createEventHandler(this, this.onDeactivateTestEventsWindows));
};

app.TestApp.prototype.initResources = function () {
    this.resourceManager.loadStrings(app.test.i18n.en);
    this.resourceManager.loadStrings(app.test.i18n.es);

    var resourceLoaderWindow = new rock.window.ResourceLoaderWindow(this.windowSystem);
    this.windowSystem.registerWindow(app.constants.RESOURCE_LOADER_WINDOW, resourceLoaderWindow);

    this.windowSystem.setCurrentWindow(resourceLoaderWindow);

    var urlResources = this.urlResources;
    var elemsToLoad = [];
    // Images
    var baseImgPath = urlResources + 'img/';
    elemsToLoad.push(new rock.resource.loader.ResourceLoaderElement(app.constants.RES_ID_IMG_LOGO,
        rock.constants.RESOURCE_TYPE_IMAGE,
        new rock.network.HTTPRequestParams(baseImgPath + 'rockLogo.png', null, null)));
    elemsToLoad.push(new rock.resource.loader.ResourceLoaderElement(this.ID_IMG_ES_ESP,
        rock.constants.RESOURCE_TYPE_IMAGE,
        new rock.network.HTTPRequestParams(baseImgPath + 'es_ESP.png', null, null)));
    elemsToLoad.push(new rock.resource.loader.ResourceLoaderElement(this.ID_IMG_ES_ENG,
        rock.constants.RESOURCE_TYPE_IMAGE,
        new rock.network.HTTPRequestParams(baseImgPath + 'es_ENG.png', null, null)));
    elemsToLoad.push(new rock.resource.loader.ResourceLoaderElement(this.ID_IMG_EN_ESP,
        rock.constants.RESOURCE_TYPE_IMAGE,
        new rock.network.HTTPRequestParams(baseImgPath + 'en_ESP.png', null, null)));
    elemsToLoad.push(new rock.resource.loader.ResourceLoaderElement(this.ID_IMG_EN_ENG,
        rock.constants.RESOURCE_TYPE_IMAGE,
        new rock.network.HTTPRequestParams(baseImgPath + 'en_ENG.png', null, null)));
    elemsToLoad.push(new rock.resource.loader.ResourceLoaderElement(app.constants.RES_ID_IMG_CHESSBOARD,
        rock.constants.RESOURCE_TYPE_IMAGE,
        new rock.network.HTTPRequestParams(baseImgPath + 'chessboard.png', null, null)));
    elemsToLoad.push(new rock.resource.loader.ResourceLoaderElement(app.constants.RES_ID_IMG_TEST_GRAPHICS_ENGINE,
        rock.constants.RESOURCE_TYPE_IMAGE,
        new rock.network.HTTPRequestParams(baseImgPath + 'imgTestGraphicsEngine.png', null, null)));
    elemsToLoad.push(new rock.resource.loader.ResourceLoaderElement(
        app.constants.RES_ID_IMG_TRANSPARENCY_TEST_GRAPHICS_ENGINE,
        rock.constants.RESOURCE_TYPE_IMAGE,
        new rock.network.HTTPRequestParams(baseImgPath + 'imgTransparency.png', null, null)));
    elemsToLoad.push(new rock.resource.loader.ResourceLoaderElement(this.ID_IMG_ES_COMPONENT,
        rock.constants.RESOURCE_TYPE_IMAGE,
        new rock.network.HTTPRequestParams(baseImgPath + 'es_imgComponent.png', null, null)));
    elemsToLoad.push(new rock.resource.loader.ResourceLoaderElement(this.ID_IMG_EN_COMPONENT,
        rock.constants.RESOURCE_TYPE_IMAGE,
        new rock.network.HTTPRequestParams(baseImgPath + 'en_imgComponent.png', null, null)));
    // Audio
    var baseAudioPath = urlResources + 'audio/';
    elemsToLoad.push(new rock.resource.loader.ResourceLoaderElement(app.constants.RES_ID_AUDIO_WAV,
        rock.constants.RESOURCE_TYPE_AUDIO,
        new rock.network.HTTPRequestParams(baseAudioPath + 'helloWorld.mp3', null, null)));

    resourceLoaderWindow.addEventListener(
        rock.resource.event.ResourceWindowCompleteEvent.RESOURCE_WINDOW_COMPLETE,
        rock.createEventHandler(this, this.onResourceLoaderWindowComplete));

    resourceLoaderWindow.loadResources(elemsToLoad);

};

app.TestApp.prototype.onResourceLoaderWindowComplete = function (event) {
    var resourceLoaderWindow = event.getSource();
    var resourceLoaderManager = resourceLoaderWindow.getResourceLoaderManager();

    if (resourceLoaderManager.hasErrors()) {
        throw new rock.error.RockError(this.resourceManager.getString('ERROR_LOADING_RESOURCES'));
    }

    var imgLogo = resourceLoaderManager.getLoadedResource(app.constants.RES_ID_IMG_LOGO).getValue();
    var imgEsEsp = resourceLoaderManager.getLoadedResource(this.ID_IMG_ES_ESP).getValue();
    var imgEsEng = resourceLoaderManager.getLoadedResource(this.ID_IMG_ES_ENG).getValue();
    var imgEnEsp = resourceLoaderManager.getLoadedResource(this.ID_IMG_EN_ESP).getValue();
    var imgEnEng = resourceLoaderManager.getLoadedResource(this.ID_IMG_EN_ENG).getValue();
    var imgChessboard = resourceLoaderManager.getLoadedResource(app.constants.RES_ID_IMG_CHESSBOARD).getValue();
    var imgGraphicsEngine = resourceLoaderManager.getLoadedResource(app.constants.RES_ID_IMG_TEST_GRAPHICS_ENGINE).getValue();
    var imgTransparentGraphicsEngine = resourceLoaderManager.
        getLoadedResource(app.constants.RES_ID_IMG_TRANSPARENCY_TEST_GRAPHICS_ENGINE).getValue();
    var imgEsComponent = resourceLoaderManager.getLoadedResource(this.ID_IMG_ES_COMPONENT).getValue();
    var imgEnComponent = resourceLoaderManager.getLoadedResource(this.ID_IMG_EN_COMPONENT).getValue();

    var audioWav = resourceLoaderManager.getLoadedResource(app.constants.RES_ID_AUDIO_WAV).getValue();

    this.resourceManager.addImage(app.constants.RES_ID_IMG_LOGO, imgLogo);
    this.resourceManager.addImage(app.constants.RES_ID_IMG_ESP, imgEsEsp, app.constants.LOCALE_ES);
    this.resourceManager.addImage(app.constants.RES_ID_IMG_ESP, imgEnEsp, app.constants.LOCALE_EN);
    this.resourceManager.addImage(app.constants.RES_ID_IMG_ENG, imgEsEng, app.constants.LOCALE_ES);
    this.resourceManager.addImage(app.constants.RES_ID_IMG_ENG, imgEnEng, app.constants.LOCALE_EN);
    this.resourceManager.addImage(app.constants.RES_ID_IMG_CHESSBOARD, imgChessboard);
    this.resourceManager.addImage(app.constants.RES_ID_IMG_TEST_GRAPHICS_ENGINE, imgGraphicsEngine);
    this.resourceManager.addImage(app.constants.RES_ID_IMG_TRANSPARENCY_TEST_GRAPHICS_ENGINE, imgTransparentGraphicsEngine);
    this.resourceManager.addImage(app.constants.RES_ID_IMAGE_COMPONENT, imgEsComponent, app.constants.LOCALE_ES);
    this.resourceManager.addImage(app.constants.RES_ID_IMAGE_COMPONENT, imgEnComponent, app.constants.LOCALE_EN);

    this.resourceManager.addAudio(app.constants.RES_ID_AUDIO_WAV, audioWav);

    this.createAndRegisterWindow();

    var mainWindow = this.windowSystem.getWindow(app.constants.MAIN_WINDOW);
    this.windowSystem.setCurrentWindow(mainWindow);
};

app.TestApp.prototype.onActivateTestEventsWindows = function (event) {
    rock.console.log(this.resourceManager.getString('ACTIVATED_WINDOW_MSG'));
};

app.TestApp.prototype.onDeactivateTestEventsWindows = function (event) {
    rock.console.log(this.resourceManager.getString('DEACTIVATED_WINDOW_MSG'));
};