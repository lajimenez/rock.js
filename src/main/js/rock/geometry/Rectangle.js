rock.namespace('rock.geometry');

/**
 * Represents a rectangle
 *
 * @param xMin
 * @param yMin
 * @param xMax
 * @param yMax
 *
 * @constructor
 *
 * @author Luis Alberto Jiménez
 */
rock.geometry.Rectangle = function (xMin, yMin, xMax, yMax) {
    this.xMin = xMin;
    this.yMin = yMin;
    this.xMax = xMax;
    this.yMax = yMax;
};

/**
 * Return if the point intersects with the rectangle
 *
 * @param {rock.geometry.Point2} point
 *
 * @returns {boolean}
 */
rock.geometry.Rectangle.prototype.intersectWithPoint = function (point) {
    var pointX = point.getX();
    var pointY = point.getY();

    return this.xMin <= pointX && pointX <= this.xMax && this.yMin <= pointY && pointY <= this.yMax;
};

/**
 * Return the intersection between 2 rectangles
 *
 * @param {rock.geometry.Rectangle} rectangle
 *
 * @returns {null |rock.geometry.Rectangle }
 */
rock.geometry.Rectangle.prototype.getIntersectionWithRectangle = function (rectangle) {
    var result = null;
    var intersectXMin = rectangle.getXMin();
    var intersectYMin = rectangle.getYMin();
    var intersectXMax = rectangle.getXMax();
    var intersectYMax = rectangle.getYMax();
    var xMin = this.xMin;
    var yMin = this.yMin;
    var xMax = this.xMax;
    var yMax = this.yMax;

    if (xMax < intersectXMin || intersectXMax < xMin
        || yMax < intersectYMin || intersectYMax < yMin) {
        return result;
    }

    var resultXMin = xMin;
    if (intersectXMin > resultXMin) {
        resultXMin = intersectXMin;
    }

    var resultYMin = yMin;
    if (intersectYMin > resultYMin) {
        resultYMin = intersectYMin;
    }

    var resultXMax = xMax;
    if (intersectXMax < resultXMax) {
        resultXMax = intersectXMax;
    }

    var resultYMax = yMax;
    if (intersectYMax < resultYMax) {
        resultYMax = intersectYMax;
    }

    // Intersection might be a line or point, but this function will always return a Rectangle.
    return new rock.geometry.Rectangle(resultXMin, resultYMin, resultXMax, resultYMax);
};

/**
 * Get the width of the rectangle
 *
 * @returns {number}
 */
rock.geometry.Rectangle.prototype.getWidth = function () {
    return Math.abs(this.xMax - this.xMin);
};

/**
 * Get the height of the rectangle
 *
 * @returns {number}
 */
rock.geometry.Rectangle.prototype.getHeight = function () {
    return Math.abs(this.yMax - this.yMin);
};

/**
 * Get the value
 */
rock.geometry.Rectangle.prototype.getXMin = function() {
    return this.xMin;
};

/**
 * Set the value
 * @param xMin the value
 */
rock.geometry.Rectangle.prototype.setXMin = function(xMin) {
    this.xMin = xMin;
};

/**
 * Get the value
 */
rock.geometry.Rectangle.prototype.getYMin = function() {
    return this.yMin;
};

/**
 * Set the value
 * @param yMin the value
 */
rock.geometry.Rectangle.prototype.setYMin = function(yMin) {
    this.yMin = yMin;
};

/**
 * Get the value
 */
rock.geometry.Rectangle.prototype.getXMax = function() {
    return this.xMax;
};

/**
 * Set the value
 * @param xMax the value
 */
rock.geometry.Rectangle.prototype.setXMax = function(xMax) {
    this.xMax = xMax;
};

/**
 * Get the value
 */
rock.geometry.Rectangle.prototype.getYMax = function() {
    return this.yMax;
};

/**
 * Set the value
 * @param yMax the value
 */
rock.geometry.Rectangle.prototype.setYMax = function(yMax) {
    this.yMax = yMax;
};