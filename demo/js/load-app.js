// Load all scripts

function loadApp(gameSourcePathParam) {

    var gameSourcePath = 'app/';

    if (gameSourcePathParam) {
        gameSourcePath = gameSourcePathParam;
    }

    var gameScriptsToLoad = [
        'constants.js',
        'i18n/i18n.js',
        'TestApp.js',
        'window/MainWindow.js',
        'window/BackWindow.js',
        'window/OptionsWindow.js',
        'window/TestGraphicsEngineWindow.js',
        'window/TestEventsWindow.js',
        'window/TestComponentsWindow.js',
        'window/TestTimerWindow.js',
        'window/UnitTestWindow.js',
        'window/TestAudioWindow.js',
        'test/inheritance/DummyEventDispatcher.js',
        'test/inheritance/Interface1.js',
        'test/inheritance/Interface2.js',
        'test/inheritance/Interface3.js',
        'test/inheritance/Interface4.js',
        'test/inheritance/ClassA.js',
        'test/inheritance/ClassB.js',
        'test/inheritance/ClassC.js',
        'test/inheritance/ClassD.js',
        'test/inheritance/InheritanceTest.js',
        'test/RectangleTest.js',
        'test/ExposeTest.js',
        'test/ArrayTest.js'
    ];

    for (var i = 0; i < gameScriptsToLoad.length; i++) {
        document.write('<script src="' + gameSourcePath + gameScriptsToLoad[i] + '"><\/script>');
    }
};