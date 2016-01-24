rock.namespace('rock.window');

/**
 * Class for window. All classes to use in the WindowSystem must inherit it.
 *
 * @param {rock.window.WindowSystem} windowSystem
 *            the window system where this window will be part
 *
 * @constructor
 * @extends rock.event.EventDispatcher
 * @augments rock.graphics.engine.IDrawable
 *
 * @author Luis Alberto Jiménez
 */
rock.window.Window = function (windowSystem) {
    rock.super_(this);

    this.windowSystem = windowSystem;

    // We check explicit to avoid bad initializations.
    // For example, create the window before create the window system.
    if (rock.isNullOrUndefined(this.windowSystem)) {
        throw new rock.error.RockError(rock.resource.rockResourceManager.getString('NO_WINDOW_SYSTEM'));
    }

    // For more efficiency, we put the application in property
    this.application = this.windowSystem.getApplication();

    /* list of components */
    this.components = [];

    this.backgroundColor =
        this.application.getStyleManager().getColor(rock.window.style.StyleManager.WINDOW_BACKGROUND_COLOR);
};

rock.extends_(rock.window.Window, rock.event.EventDispatcher);

rock.implements_(rock.window.Window, rock.graphics.engine.IDrawable);

/**
 * Constant for window activation event
 *
 * @const
 */
rock.window.Window.WINDOW_ACTIVATED_EVENT = 'WINDOW_ACTIVATED_EVENT';

/**
 * Constant for window deactivation event
 *
 * @const
 */
rock.window.Window.WINDOW_DEACTIVATED_EVENT = 'WINDOW_DEACTIVATED_EVENT';

/**
 * Add a component to the components list
 *
 * @param {rock.window.component.Component} component
 *            the component to add
 */
rock.window.Window.prototype.addComponent = function (component) {
    //component.updateWindow(this);
    this.components.push(component);
};

/**
 * Remove a component to the components list
 *
 * @param {rock.window.component.Component} component
 *            the component to remove
 */
rock.window.Window.prototype.removeComponent = function (component) {
    //component.updateWindow(null);
    rock.util.JsUtils.removeByValueFromArray(this.components, component);
};

/**
 * In case you need some update of components (positioning, sizing,...) you should do here
 * (and you should override it :)
 */
rock.window.Window.prototype.updateComponents = function () {
};

/**
 * @override
 * @see rock.graphics.engine.IDrawable#draw
 */
rock.window.Window.prototype.draw = function (graphicsEngine) {
    graphicsEngine.clear(this.backgroundColor);
    this.drawUI(graphicsEngine);
};

/**
 * Draw the user interface
 * @protected
 */
rock.window.Window.prototype.drawUI = function (graphicsEngine) {
    var i;
    var components = this.components;
    for (i = 0; i < components.length; i++) {
        components[i].draw(graphicsEngine);
    }
};

/**
 * Redraw the window
 * @protected
 */
rock.window.Window.prototype.redraw = function () {
    var windowSystem = this.windowSystem;
    // If the windows we want to redraw is not current,
    // we don't have to redraw
    if (this != windowSystem.getCurrentWindow()) {
        return;
    }

    // We 'centralize' window drawing in window system
    windowSystem.draw();
};

/**
 * Deactivate the window. This will do all necessary things when the window is not active
 */
rock.window.Window.prototype.deactivate = function () {
    var i;
    var component, components = this.components;
    for (i = 0; i < components.length; i++) {
        component = components[i];
        component.deactivate();
    }
    this.dispatchEvent(new rock.event.Event(rock.window.Window.WINDOW_DEACTIVATED_EVENT));
};

/**
 * Get a component by id
 *
 * @param id
 *      id of the component
 *
 * @returns {rock.window.component.Component}
 */
rock.window.Window.prototype.getComponent = function (id) {
    var components = this.components;
    var i, component;
    for (i = 0; i < components.length; i++) {
        component = components[i];
        if (id === component.getId()) {
            return component;
        }
    }

    return null;
};

/**
 * Get the components
 *
 * @returns {Array} the value
 */
rock.window.Window.prototype.getComponents = function () {
    return this.components;
};

/**
 * Get the window system
 */
rock.window.Window.prototype.getWindowSystem = function() {
    return this.windowSystem;
};

/**
 * Get the application
 */
rock.window.Window.prototype.getApplication = function() {
    return this.application;
};