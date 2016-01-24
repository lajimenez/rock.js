rock.namespace('rock.graphics.engine');

/**
 * Interface to implement by graphic engines
 *
 * @constructor
 * @interface
 * @author Luis Alberto Jiménez
 */
rock.graphics.engine.IGraphicsEngine = function () {
};

rock.interface_(rock.graphics.engine.IGraphicsEngine);

/**
 * Do any initialization needed
 *
 * @function
 */
rock.graphics.engine.IGraphicsEngine.prototype.init = rock.abstract_;

/**
 * Clear the context
 *
 * @param {rock.graphics.Color} color
 *            the color to use when clearing
 * @function
 */
rock.graphics.engine.IGraphicsEngine.prototype.clear = rock.abstract_;

/**
 * Draws a point
 *
 * @param x
 *            absolute x in context
 * @param y
 *            absolute y in context
 * @param size
 *            the size
 * @param {rock.graphics.Color} color
 *            the color
 * @function
 */
rock.graphics.engine.IGraphicsEngine.prototype.drawPoint = rock.abstract_;

/**
 * Draws a line
 *
 * @param fromX
 *            starting point x
 * @param fromY
 *            starting point y
 * @param toX
 *            ending point x
 * @param toY
 *            ending point y
 * @param width
 *            line width
 * @param {rock.graphics.Color} color
 *            the color
 * @function
 */
rock.graphics.engine.IGraphicsEngine.prototype.drawLine = rock.abstract_;

/**
 * Draws a rectangle
 *
 * @param x
 *            absolute x in context
 * @param y
 *            absolute y in context
 * @param width
 *            the width
 * @param height
 *            the height
 * @param {rock.graphics.Color} color
 *            the color
 * @param {Number} [strokeWidth]
 *            stroke width
 * @function
 */
rock.graphics.engine.IGraphicsEngine.prototype.drawRectangle = rock.abstract_;

/**
 * Draws a rounded rectangle
 *
 * @param x
 *            absolute x in context
 * @param y
 *            absolute y in context
 * @param width
 *            the width
 * @param height
 *            the height
 * @param radius
 *            the radius of the rounded border
 * @param {rock.graphics.Color} color
 *            the color
 * @function
 */
rock.graphics.engine.IGraphicsEngine.prototype.drawRoundedRectangle = rock.abstract_;

/**
 * Draw an image
 *
 * @param {rock.graphics.Image} image
 *            an image
 * @param x
 *            absolute x in context
 * @param y
 *            absolute y in context
 * @param [width]
 *            width to draw
 * @param [height]
 *            height to draw
 * @function
 */
rock.graphics.engine.IGraphicsEngine.prototype.drawImage = rock.abstract_;

/**
 * Draw an subImage
 *
 * @param {rock.graphics.Image} image
 *            an image
 * @param x
 *            absolute x in context
 * @param y
 *            absolute y in context
 * @param subX
 *            subimage x position
 * @param subY
 *            subimage y position
 * @param subWidth
 *            subimage width to draw
 * @param subHeight
 *            subimage height to draw
 *
 * @function
 *
 */
rock.graphics.engine.IGraphicsEngine.prototype.drawSubImage = rock.abstract_;

/**
 * Draw text
 *
 * @param text
 *            text to draw
 * @param x
 *            absolute x in context
 * @param y
 *            absolute y in context
 * @param {rock.graphics.Font} font
 *            the font
 * @param {rock.graphics.Color} color
 *            the color
 * @param [clippingWidth]
 *            clipping width
 * @param [clippingHeight]
 *            clipping height
 * @function
 */
rock.graphics.engine.IGraphicsEngine.prototype.drawText = rock.abstract_;

/**
 * Measure text width
 *
 * @param text
 *            text to measure
 * @param {rock.graphics.Font} font
 *            the font
 */
rock.graphics.engine.IGraphicsEngine.prototype.measureTextWidth = rock.abstract_;

/**
 * Measure text height
 *
 * @param text
 *            text to measure
 * @param {rock.graphics.Font} font
 *            the font
 */
rock.graphics.engine.IGraphicsEngine.prototype.measureTextHeight = rock.abstract_;