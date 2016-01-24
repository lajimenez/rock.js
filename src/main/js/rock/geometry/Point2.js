rock.namespace('rock.geometry');

/**
 * Represents a 2D point
 *
 * @param x
 *            the x coordinate
 * @param y
 *            the y coordinate
 * @constructor
 * @author Luis Alberto Jiménez
 */
rock.geometry.Point2 = function (x, y) {
    this.x = x;
    this.y = y;
};

/**
 * Get the x
 *
 * @returns the value
 */
rock.geometry.Point2.prototype.getX = function () {
    return this.x;
};

/**
 * Set the x
 *
 * @param x
 *            the value to set
 */
rock.geometry.Point2.prototype.setX = function (x) {
    this.x = x;
};

/**
 * Get the y
 *
 * @returns the value
 */
rock.geometry.Point2.prototype.getY = function () {
    return this.y;
};

/**
 * Set the y
 *
 * @param y
 *            the value to set
 */
rock.geometry.Point2.prototype.setY = function (y) {
    this.y = y;
};