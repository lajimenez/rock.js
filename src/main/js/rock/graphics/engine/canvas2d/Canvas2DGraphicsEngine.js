rock.namespace('rock.graphics.engine.canvas2d');

/**
 * Render engine to use with canvas 2d HTML element
 * http://www.w3.org/TR/2dcanvas2D/
 *
 * @param {rock.graphics.engine.canvas2d.Canvas2DContext} context
 *            the context
 * @constructor
 * @extends rock.graphics.engine.ContextGraphicsEngine
 * @author Luis Alberto Jiménez
 */
rock.graphics.engine.canvas2d.Canvas2DGraphicsEngine = function (context) {
    rock.super_(this, arguments);
};

rock.extends_(rock.graphics.engine.canvas2d.Canvas2DGraphicsEngine, rock.graphics.engine.ContextGraphicsEngine);

/**
 * @see rock.graphics.engine.IGraphicsEngine#clear
 * @override
 */
rock.graphics.engine.canvas2d.Canvas2DGraphicsEngine.prototype.clear = function (color) {
    var canvas2D = this.context.getHTMLContext();
    canvas2D.beginPath();
    canvas2D.clearRect(0, 0, this.width, this.height);
    this.drawRectangle(0, 0, this.width, this.height, color);
};

/**
 * @see rock.graphics.engine.IGraphicsEngine#drawPoint
 * @override
 */
rock.graphics.engine.canvas2d.Canvas2DGraphicsEngine.prototype.drawPoint = function (x, y, size, color) {
    var canvas2D = this.context.getHTMLContext();
    canvas2D.fillStyle = color.getAsRGBA();
    canvas2D.beginPath();
    canvas2D.arc(x, y, size/2, 0, 2 * Math.PI, true);
    canvas2D.fill();
};

/**
 * @see rock.graphics.engine.IGraphicsEngine#drawLine
 * @override
 */
rock.graphics.engine.canvas2d.Canvas2DGraphicsEngine.prototype.drawLine = function (fromX, fromY, toX, toY, width, color) {
    var canvas2D = this.context.getHTMLContext();

    var adjustedFromX = this.adjustPixelPosition(fromX, width);
    var adjustedFromY = this.adjustPixelPosition(fromY, width);
    var adjustedToX = this.adjustPixelPosition(toX, width);
    var adjustedToY = this.adjustPixelPosition(toY, width);

    canvas2D.strokeStyle = color.getAsRGBA();
    canvas2D.lineWidth = width;
    canvas2D.beginPath();
    canvas2D.moveTo(adjustedFromX, adjustedFromY);
    canvas2D.lineTo(adjustedToX, adjustedToY);
    canvas2D.stroke();
};

/**
 * @see rock.graphics.engine.IGraphicsEngine#drawRectangle
 * @override
 */
rock.graphics.engine.canvas2d.Canvas2DGraphicsEngine.prototype.drawRectangle = function
        (x, y, width, height, color, strokeWidth) {
    if (rock.util.JsUtils.isNullOrUndefined(strokeWidth) || strokeWidth < 1) {
        this.drawFilledRectangle(x, y, width, height, color);
    } else {
        this.drawStrokeRectangle(x, y, width, height, color, strokeWidth);
    }
};

/**
 * Draw a filled rectangle
 *
 * @param x
 *            absolute x in canvas2D
 * @param y
 *            absolute y in canvas2D
 * @param width
 *            the width
 * @param height
 *            the height
 * @param {rock.graphics.Color} color
 *            the color
 *
 * @private
 */
rock.graphics.engine.canvas2d.Canvas2DGraphicsEngine.prototype.drawFilledRectangle = function (x, y, width, height, color) {
    var canvas2D = this.context.getHTMLContext();
    canvas2D.fillStyle = color.getAsRGBA();
    canvas2D.beginPath();
    canvas2D.fillRect(x, y, width, height);
};

/**
 * Draw a rectangle with an stroke
 *
 * @param x
 *            absolute x in canvas
 * @param y
 *            absolute y in canvas
 * @param width
 *            the width
 * @param height
 *            the height
 * @param {rock.graphics.Color} color
 *            the color
 * @param {Number} strokeWidth
 *            stroke width
 *
 * @private
 */

rock.graphics.engine.canvas2d.Canvas2DGraphicsEngine.prototype.drawStrokeRectangle = function
        (x, y, width, height, color, strokeWidth) {
    var canvas2D = this.context.getHTMLContext();
    var adjustedX = this.adjustPixelPosition(x, strokeWidth);
    var adjustedY = this.adjustPixelPosition(y, strokeWidth);

    canvas2D.strokeStyle = color.getAsRGBA();
    canvas2D.lineWidth = strokeWidth;
    canvas2D.beginPath();
    canvas2D.rect(adjustedX, adjustedY, width, height);
    canvas2D.stroke();
};

/**
 * @see rock.graphics.engine.IGraphicsEngine#drawRoundedRectangle
 * @override
 */
rock.graphics.engine.canvas2d.Canvas2DGraphicsEngine.prototype.drawRoundedRectangle = function
        (x, y, width, height, radius, color) {
    var canvas2D = this.context.getHTMLContext();
    var xmin = x;
    var ymin = y;
    var xmax = x + width;
    var ymax = y + height;
    canvas2D.fillStyle = color.getAsRGBA();
    canvas2D.beginPath();
    canvas2D.arc(xmin + radius, ymin + radius, radius, Math.PI, Math.PI * 1.5, false);
    canvas2D.lineTo(xmax - radius, ymin);
    canvas2D.arc(xmax - radius, ymin + radius, radius, Math.PI * 1.5, 2 * Math.PI, false);
    canvas2D.lineTo(xmax, ymax - radius);
    canvas2D.arc(xmax - radius, ymax - radius, radius, 0, Math.PI * 0.5, false);
    canvas2D.lineTo(xmin + radius, ymax);
    canvas2D.arc(xmin + radius, ymax - radius, radius, Math.PI * 0.5, Math.PI, false);
    canvas2D.fill();
};

/**
 * @see rock.graphics.engine.IGraphicsEngine#drawImage
 * @override
 */
rock.graphics.engine.canvas2d.Canvas2DGraphicsEngine.prototype.drawImage = function (image, x, y, width, height) {
    var canvas2D = this.context.getHTMLContext();
    canvas2D.beginPath();
    if (rock.util.JsUtils.isNullOrUndefined(width) || rock.util.JsUtils.isNullOrUndefined(height)) {
        canvas2D.drawImage(image.getHTMLImage(), x, y);
    } else {
        canvas2D.drawImage(image.getHTMLImage(), 0, 0, image.getWidth(), image.getHeight(), x, y,
            width, height);
    }
};

/**
 * @see rock.graphics.engine.IGraphicsEngine#drawSubImage
 * @override
 */
rock.graphics.engine.canvas2d.Canvas2DGraphicsEngine.prototype.drawSubImage = function
        (image, x, y, subX, subY, subWidth, subHeight) {
    var canvas2D = this.context.getHTMLContext();
    canvas2D.beginPath();
    canvas2D.drawImage(image.getHTMLImage(), subX, subY, subWidth, subHeight, x,
        y, subWidth, subHeight);
};

/**
 * @see rock.graphics.engine.IGraphicsEngine#drawText
 * @override
 */
rock.graphics.engine.canvas2d.Canvas2DGraphicsEngine.prototype.drawText = function
        (text, x, y, font, color, clippingWidth, clippingHeight) {
    var canvas2D = this.context.getHTMLContext();
    canvas2D.save();

    if (!rock.util.JsUtils.isNullOrUndefined(clippingWidth) && !rock.util.JsUtils.isNullOrUndefined(clippingHeight)) {
        canvas2D.strokeStyle = 'rgba(255, 255, 255, 0)';
        canvas2D.beginPath();
        canvas2D.rect(x, y, clippingWidth, clippingHeight);
        canvas2D.stroke();
        canvas2D.clip();
    }

    canvas2D.font = font.toCanvasFormat();
    canvas2D.fillStyle = color.getAsRGBA();
    canvas2D.beginPath();
    canvas2D.fillText(text, x, y + font.getSize());
    canvas2D.restore();
};

/**
 * @see rock.graphics.engine.IGraphicsEngine#measureTextWidth
 * @override
 */
rock.graphics.engine.canvas2d.Canvas2DGraphicsEngine.prototype.measureTextWidth = function (text, font) {
    return rock.util.TextUtils.measureTextWidth(text, font);
};


/**
 * @see rock.graphics.engine.IGraphicsEngine#measureTextWidth
 * @override
 */
rock.graphics.engine.canvas2d.Canvas2DGraphicsEngine.prototype.measureTextHeight = function (text, font) {
    return rock.util.TextUtils.measureTextHeight(text, font);
};