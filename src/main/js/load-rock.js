// Load all scripts

function loadRock(rockSourcePathParam) {
    
    var rockSourcePath = 'rock/';
    
    if (rockSourcePathParam) {
        rockSourcePath = rockSourcePathParam;
    }
    
    var rockScriptsToLoad = [ 
                          'rock.js',
                          'error/RockError.js',
                          'constants.js',
                          'environment.js',
                          'console.js',
                          'timer.js',
                          'i18n/RockI18nLocale.js',
                          'js/Array.js',
                          'util/JsUtils.js',
                          'util/DOMUtils.js',
                          'util/MouseUtils.js',
                          'util/WebGLUtils.js',
                          'util/TextUtils.js',
                          'event/Event.js',
                          'event/MouseEvent.js',
                          'event/MouseWheelEvent.js',
                          'event/KeyEvent.js',
                          'event/EventDispatcher.js',
                          'resource/Resource.js',
                          'resource/Resources.js',
                          'resource/ResourceManager.js',
                          'resource/event/ResourceLoadedEvent.js',
                          'resource/event/ResourceLoaderCompleteEvent.js',
                          'resource/event/ResourceWindowCompleteEvent.js',
                          'resource/loader/ResourceLoaderElement.js',
                          'resource/loader/ResourceLoaderManager.js',
                          'resource/loader/AbstractResourceLoader.js',
                          'resource/loader/ImageResourceLoader.js',
                          'resource/loader/AudioResourceLoader.js',
                          'resource/loader/JSONResourceLoader.js',
                          'audio/Audio.js',
                          'graphics/Color.js',
                          'graphics/Font.js',
                          'graphics/Image.js',
                          'graphics/engine/IDrawable.js',
                          'graphics/engine/IGraphicsEngine.js',
                          'graphics/engine/Context.js',
                          'graphics/engine/canvas2d/Canvas2DContext.js',
                          'graphics/engine/webgl/WebGLContext.js',
                          'graphics/engine/ContextGraphicsEngine.js',
                          'graphics/engine/canvas2d/Canvas2DGraphicsEngine.js',
                          'graphics/engine/renderer/Renderable.js',
                          'graphics/engine/renderer/IRenderer.js',
                          'graphics/engine/renderer/webgl/program/Shader.js',
                          'graphics/engine/renderer/webgl/program/Program.js',
                          'graphics/engine/renderer/webgl/program/CacheProgram.js',
                          'graphics/engine/renderer/webgl/Renderer.js',
                          'graphics/engine/renderer/webgl/GenericRenderable.js',
                          'graphics/engine/renderer/webgl/GenericRenderer.js',
                          'graphics/engine/renderer/ScreenElementRenderable.js',
                          'graphics/engine/renderer/PolygonRenderable.js',
                          'graphics/engine/renderer/ImageRenderable.js',
                          'graphics/engine/renderer/webgl/PolygonRenderer.js',
                          'graphics/engine/renderer/webgl/ImageRenderer.js',
                          'graphics/engine/webgl/WebGLGraphicsEngine.js',
                          'window/Window.js',
                          'window/WindowSystem.js',
                          'window/style/Style.js',
                          'window/style/StyleManager.js',
                          'window/component/Component.js',
                          'window/component/TextComponent.js',
                          'window/component/Image.js',
                          'window/component/Label.js',
                          'window/component/Button.js',
                          'window/component/ProgressBarComponent.js',
                          'window/component/html/HTMLComponent.js',
                          'window/component/html/HTMLTextComponent.js',
                          'window/component/html/HTMLLabel.js',
                          'window/component/html/HTMLButton.js',
                          'geometry/Point2.js',
                          'geometry/Point3.js',
                          'geometry/Vertex3.js',
                          'geometry/Vector3.js',
                          'geometry/Matrix3.js',
                          'geometry/Matrix4.js',
                          'geometry/Rectangle.js',
                          'geometry/BBOX.js',
                          'util/GeometryUtils.js',
                          'network/HTTPRequestParams.js',
                          'network/ajax/event/AjaxEvent.js',
                          'network/ajax/AjaxRequest.js',
                          'resource/window/ResourceLoaderWindow.js',
                          'app/InitApplicationParams.js',
                          'app/Application.js',
                          'test/TestSuite.js',
                          'test/TestSuiteResult.js',
                          'test/TestRunner.js'
                          ];

    for ( var i = 0; i < rockScriptsToLoad.length; i++) {
        document.write('<script src="' + rockSourcePath + rockScriptsToLoad[i] + '"><\/script>');
    }
};