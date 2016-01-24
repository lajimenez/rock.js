rock.namespace('rock.window.component');

/**
 * Progress bar component
 *
 * @param {rock.window.Window} window
 *            the window where component exists
 * @constructor
 * @extends rock.window.component.Component
 * @author Luis Alberto Jiménez
 */
rock.window.component.ProgressBarComponent = function (window) {
    rock.super_(this, [window]);

    this.percentLoaded = 0;

    this.margin = 2;

    this.borderColor = this.application.getStyleManager().
        getColor(rock.window.style.StyleManager.COMPONENT_COLOR);
    this.barColor = this.application.getStyleManager().
        getColor(rock.window.style.StyleManager.COMPONENT_BACKGROUND_COLOR);

    this.barHeight = NaN;
    this.barWidth = NaN;
};

rock.extends_(rock.window.component.ProgressBarComponent, rock.window.component.Component);

rock.window.component.ProgressBarComponent.DEFAULT_WIDTH = 200;

rock.window.component.ProgressBarComponent.DEFAULT_HEIGHT = 30;

/**
 * @override
 * @see rock.window.component.Component#updateComponent
 */
rock.window.component.ProgressBarComponent.prototype.updateComponent = function () {
    if (this.width === rock.window.component.Component.AUTO_SIZE) {
        this.computedWidth = rock.window.component.ProgressBarComponent.DEFAULT_WIDTH;
    } else {
        this.computedWidth = this.width;
    }

    if (this.height === rock.window.component.Component.AUTO_SIZE) {
        this.computedHeight = rock.window.component.ProgressBarComponent.DEFAULT_HEIGHT;
    } else {
        this.computedHeight = this.height;
    }

    this.barHeight = this.computedHeight - 2 * this.margin;
    var maxBarWidth = this.computedWidth - 2 * this.margin;
    this.barWidth = (this.percentLoaded * maxBarWidth) / 100;
};

/**
 * @override
 * @see rock.graphics.engine.IDrawable#draw
 */
rock.window.component.ProgressBarComponent.prototype.draw = function (graphicsEngine) {
    this.updateComponent();
    graphicsEngine.drawRectangle(this.x, this.y, this.computedWidth, this.computedHeight,
        this.borderColor);
    graphicsEngine.drawRectangle(this.x + this.margin, this.y + this.margin,
        this.barWidth, this.barHeight, this.barColor);
};

rock.window.component.ProgressBarComponent.prototype.setPercentLoaded = function (percentLoaded) {
    if (percentLoaded > 100) {
        this.percentLoaded = 100;
    } else if (percentLoaded < 0) {
        this.percentLoaded = 0;
    } else {
        this.percentLoaded = percentLoaded;
    }
};