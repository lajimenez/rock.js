rock.namespace('rock.geometry');

/**
 * Represents a 3D point
 *
 * @param x
 *            the x coordinate
 * @param y
 *            the y coordinate
 * @param z
 *            the z coordinate
 * @constructor
 * @author Luis Alberto Jiménez
 */
rock.geometry.Point3 = function (x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
};

/**
 * Get the x
 *
 * @returns the value
 */
rock.geometry.Point3.prototype.getX = function () {
    return this.x;
};

/**
 * Set the x
 *
 * @param x
 *            the value to set
 */
rock.geometry.Point3.prototype.setX = function (x) {
    this.x = x;
};

/**
 * Get the y
 *
 * @returns the value
 */
rock.geometry.Point3.prototype.getY = function () {
    return this.y;
};

/**
 * Set the y
 *
 * @param y
 *            the value to set
 */
rock.geometry.Point3.prototype.setY = function (y) {
    this.y = y;
};

/**
 * Get the z
 *
 * @returns the value
 */
rock.geometry.Point3.prototype.getZ = function () {
    return this.z;
};

/**
 * Set the z
 *
 * @param z
 *            the value to set
 */
rock.geometry.Point3.prototype.setZ = function (z) {
    this.z = z;
};

rock.geometry.Point3.prototype.clone = function () {
    return new rock.geometry.Point3(this.x, this.y, this.z);
};