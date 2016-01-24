rock.namespace('rock.geometry');

/**
 * Represents a 3D vector
 *
 * @constructor
 * @author Luis Alberto Jiménez
 */
rock.geometry.Vector3 = function (x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
};

/**
 * Normalize this vector
 */
rock.geometry.Vector3.prototype.normalize = function () {
    var module = this.module();

    this.x = this.x / module;
    this.y = this.y / module;
    this.z = this.z / module;
};

/**
 * Get the module
 */
rock.geometry.Vector3.prototype.module = function () {
    return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
};

/**
 * Get the x
 *
 * @returns the value
 */
rock.geometry.Vector3.prototype.getX = function () {
    return this.x;
};

/**
 * Set the x
 *
 * @param x
 *            the value to set
 */
rock.geometry.Vector3.prototype.setX = function (x) {
    this.x = x;
};

/**
 * Get the y
 *
 * @returns the value
 */
rock.geometry.Vector3.prototype.getY = function () {
    return this.y;
};

/**
 * Set the y
 *
 * @param y
 *            the value to set
 */
rock.geometry.Vector3.prototype.setY = function (y) {
    this.y = y;
};

/**
 * Get the z
 *
 * @returns the value
 */
rock.geometry.Vector3.prototype.getZ = function () {
    return this.z;
};

/**
 * Set the z
 *
 * @param z
 *            the value to set
 */
rock.geometry.Vector3.prototype.setZ = function (z) {
    this.z = z;
};

rock.geometry.Vector3.prototype.clone = function () {
    return new rock.geometry.Vector3(this.x, this.y, this.z);
};