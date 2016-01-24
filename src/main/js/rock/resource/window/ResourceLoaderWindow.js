rock.namespace('rock.resource.window');

/**
 * Window to show loading process
 *
 * @param  {rock.app.Application} application
 *            the application where this window will be part
 *
 * @constructor
 * @extends rock.window.Window
 * @author Luis Alberto Jiménez
 */
rock.window.ResourceLoaderWindow = function (application) {
    rock.super_(this, arguments);
    this.resourceLoaderManager = new rock.resource.loader.ResourceLoaderManager();
    this.resourceLoaderManager.addEventListener(
        rock.resource.event.ResourceLoadedEvent.RESOURCE_LOADED,
        rock.createEventHandler(this, this.resourceLoaded));

    this.resourceLoaderManager
        .addEventListener(
        rock.resource.event.ResourceLoaderComplete.RESOURCE_LOADER_COMPLETE,
        rock.createEventHandler(this,
            this.resourceLoaderManagerComplete));

    // Space between Label and ProgressBar
    this.margin = 5;

    this.progressBar = new rock.window.component.ProgressBarComponent(this);
    this.setProgressBarWidth(this.windowSystem.getWidth() / 2);
    this.setProgressBarHeight(30);

    this.addComponent(this.progressBar);

    this.label = new rock.window.component.Label(this, rock.resource.rockResourceManager.getString('RESOURCE_WINDOW_LOADING_LABEL'));
    this.addComponent(this.label);
};

rock.extends_(rock.window.ResourceLoaderWindow, rock.window.Window);

/**
 * Set the width of the progress bar
 *
 * @param width
 *      the width
 */
rock.window.ResourceLoaderWindow.prototype.setProgressBarWidth = function (width) {
    this.progressBar.setWidth(width);
}

/**
 * Set the height of the progress bar
 *
 * @param height
 *      the height
 */
rock.window.ResourceLoaderWindow.prototype.setProgressBarHeight = function (height) {
    this.progressBar.setHeight(height);
}

/**
 * Load resources
 *
 * @param {Array} elems
 *            info with elements to load {@link rock.resource.loader.ResourceLoaderElement}
 */
rock.window.ResourceLoaderWindow.prototype.loadResources = function (elems) {
    this.resourceLoaderManager.loadResources(elems);
};

rock.window.ResourceLoaderWindow.prototype.resourceLoaded = function (event) {
    this.progressBar.setPercentLoaded(this.resourceLoaderManager
        .getPercentLoaded());
    this.redraw();
};

rock.window.ResourceLoaderWindow.prototype.resourceLoaderManagerComplete = function (event) {
    var resourceWindowCompleteEvent = new rock.resource.event.ResourceWindowCompleteEvent();
    this.dispatchEvent(resourceWindowCompleteEvent);
};

/**
 * Compute position of progress bar to set at center
 */
rock.window.ResourceLoaderWindow.prototype.updateComponents = function () {
    var zeroPoint = new rock.geometry.Point2(0, 0);
    var drawPoint = rock.util.GeometryUtils.getPointMakesSameCenter(zeroPoint,
        this.windowSystem.getWidth(), this.windowSystem.getHeight(),
        this.progressBar.getComputedWidth(), this.progressBar.getComputedHeight());

    this.progressBar.setX(drawPoint.getX());
    this.progressBar.setY(drawPoint.getY());

    var label = this.label;
    var textWidth = label.getComputedWidth();
    var textHeight = label.getComputedHeight();

    drawPoint = rock.util.GeometryUtils.getPointMakesSameCenter(zeroPoint,
        this.windowSystem.getWidth(), this.windowSystem.getHeight(),
        textWidth, textHeight);

    this.label.setX(drawPoint.getX());
    this.label.setY(this.progressBar.getY() - (textHeight + this.margin));
};

/**
 * @override
 * @see rock.window.Window#draw
 */
rock.window.ResourceLoaderWindow.prototype.draw = function(graphicsEngine){
    this.updateComponents();
    rock.super_method(this, rock.window.ResourceLoaderWindow, 'draw', [graphicsEngine]);
};

/**
 * Get the value
 */
rock.window.ResourceLoaderWindow.prototype.getResourceLoaderManager = function() {
    return this.resourceLoaderManager;
};

/**
 * Get the label
 */
rock.window.ResourceLoaderWindow.prototype.getLabel = function() {
    return this.label;
};