rock.namespace('rock.geometry');

/**
 * Represents a bounding box
 *
 * @param xMin
 *
 * @param xMax
 *
 * @param yMin
 *
 * @param yMax
 *
 * @param zMin
 *
 * @param zMax
 *
 * @constructor
 * @author Luis Alberto Jiménez
 */
rock.geometry.BBOX = function (xMin, xMax, yMin, yMax, zMin, zMax) {
    this.xMin = xMin;
    this.xMax = xMax;
    this.yMin = yMin;
    this.yMax = yMax;
    this.zMin = zMin;
    this.zMax = zMax;

    this.center_ma = new rock.geometry.Point3(0, 0, 0);
};

/**
 * Return if the point intersects with the rectangle
 *
 * @param {rock.geometry.Point3} point
 *
 * @returns {boolean}
 */
rock.geometry.BBOX.prototype.intersectWithPoint = function (point) {
    var pointX = point.getX();
    var pointY = point.getY();
    var pointZ = point.getZ();

    return this.xMin <= pointX && pointX <= this.xMax && this.yMin <= pointY && pointY <= this.yMax &&
        this.zMin <= pointZ && pointZ <= this.zMax;
};

/**
 * Return the center of the BBOX
 *
 * @return {rock.geometry.Point3} the center
 */
rock.geometry.BBOX.prototype.getCenter = function () {
    var center = this.center_ma;
    center.setX((this.xMin + this.xMax) / 2);
    center.setY((this.yMin + this.yMax) / 2);
    center.setZ((this.zMin + this.zMax) / 2);

    return center;
};

/**
 * Update the size of this BBOX to also contain passed BBOX
 *
 * @param BBOX
 *      the bbox
 */
rock.geometry.BBOX.prototype.join = function (BBOX) {
    var xMin = BBOX.getXMin();
    var xMax = BBOX.getXMax();
    var yMin = BBOX.getYMin();
    var yMax = BBOX.getYMax();
    var zMin = BBOX.getZMin();
    var zMax = BBOX.getZMax();

    if (xMin < this.xMin) {
        this.xMin = xMin;
    }
    if (xMax > this.xMax) {
        this.xMax = xMax;
    }

    if (yMin < this.yMin) {
        this.yMin = yMin;
    }
    if (yMax > this.yMax) {
        this.yMax = yMax;
    }

    if (zMin < this.zMin) {
        this.zMin = zMin;
    }
    if (zMax > this.zMax) {
        this.zMax = zMax;
    }
};



/**
 * Get the xMin
 */
rock.geometry.BBOX.prototype.getXMin = function() {
    return this.xMin;
};

/**
 * Set the xMin
 *
 * @param xMin the value
 */
rock.geometry.BBOX.prototype.setXMin = function(xMin) {
    this.xMin = xMin;
};

/**
 * Get the xMax
 */
rock.geometry.BBOX.prototype.getXMax = function() {
    return this.xMax;
};

/**
 * Set the xMax
 *
 * @param xMax the value
 */
rock.geometry.BBOX.prototype.setXMax = function(xMax) {
    this.xMax = xMax;
};

/**
 * Get the yMin
 */
rock.geometry.BBOX.prototype.getYMin = function() {
    return this.yMin;
};

/**
 * Set the yMin
 *
 * @param yMin the value
 */
rock.geometry.BBOX.prototype.setYMin = function(yMin) {
    this.yMin = yMin;
};

/**
 * Get the yMax
 */
rock.geometry.BBOX.prototype.getYMax = function() {
    return this.yMax;
};

/**
 * Set the yMax
 *
 * @param yMax the value
 */
rock.geometry.BBOX.prototype.setYMax = function(yMax) {
    this.yMax = yMax;
};

/**
 * Get the zMin
 */
rock.geometry.BBOX.prototype.getZMin = function() {
    return this.zMin;
};

/**
 * Set the zMin
 *
 * @param zMin the value
 */
rock.geometry.BBOX.prototype.setZMin = function(zMin) {
    this.zMin = zMin;
};

/**
 * Get the zMax
 */
rock.geometry.BBOX.prototype.getZMax = function() {
    return this.zMax;
};

/**
 * Set the zMax
 *
 * @param zMax the value
 */
rock.geometry.BBOX.prototype.setZMax = function(zMax) {
    this.zMax = zMax;
};

/**
 * Get this BBOX as if it was translated
 *
 * @return {rock.geometry.BBOX} the BBOX translated
 */
rock.geometry.BBOX.prototype.getTranslatedBBOX = function (translationX, translationY, translationZ) {
    return new rock.geometry.BBOX(this.xMin + translationX, this.xMax + translationX,
        this.yMin + translationY, this.yMax + translationY,
        this.zMin + translationZ, this.zMax + translationZ);
};

/**
 * Get this BBOX as if it was scaled
 *
 * @return {rock.geometry.BBOX} the BBOX scaled
 */
rock.geometry.BBOX.prototype.getScaledBBOX = function (scaleX, scaleY, scaleZ) {
    return new rock.geometry.BBOX(this.xMin * scaleX, this.xMax * scaleX,
        this.yMin * scaleY, this.yMax * scaleY,
        this.zMin * scaleZ, this.zMax * scaleZ);
};

/**
 * Get this BBOX as if it was rotated. Be careful as this function return an approximated BBOX.
 *
 * @return {rock.geometry.BBOX} the BBOX  * Get this BBOX as if it was rotated
 */
rock.geometry.BBOX.prototype.getRotatedBBOX = function (rotationX, rotationY, rotationZ) {
    var i, pointX, pointY, pointZ;
    var xMin = this.xMin, xMax = this.xMax, yMin = this.yMin, yMax = this.yMax, zMin = this.zMin, zMax = this.zMax;
    var point = new rock.geometry.Point3(0, 0, 0);
    var points = [];
    var matrix = new rock.geometry.Matrix4();
    matrix.identity();
    matrix.rotateX(rotationX);
    matrix.rotateY(rotationY);
    matrix.rotateZ(rotationZ);

    point.setX(xMin);
    point.setY(yMin);
    point.setZ(zMin);
    points.push(matrix.multiplyByPoint3(point).clone());

    point.setX(xMin);
    point.setY(yMin);
    point.setZ(zMax);
    points.push(matrix.multiplyByPoint3(point).clone());

    point.setX(xMax);
    point.setY(yMin);
    point.setZ(zMin);
    points.push(matrix.multiplyByPoint3(point).clone());

    point.setX(xMax);
    point.setY(yMin);
    point.setZ(zMax);
    points.push(matrix.multiplyByPoint3(point).clone());

    point.setX(xMin);
    point.setY(yMax);
    point.setZ(zMin);
    points.push(matrix.multiplyByPoint3(point).clone());

    point.setX(xMin);
    point.setY(yMax);
    point.setZ(zMax);
    points.push(matrix.multiplyByPoint3(point).clone());

    point.setX(xMax);
    point.setY(yMax);
    point.setZ(zMin);
    points.push(matrix.multiplyByPoint3(point).clone());

    point.setX(xMax);
    point.setY(yMax);
    point.setZ(zMax);
    points.push(matrix.multiplyByPoint3(point).clone());

    point = points[0];
    xMin = point.getX();
    xMax = xMin;
    yMin = point.getY();
    yMax = yMin;
    zMin = point.getZ();
    zMax = zMin;
    for (i = 1; i < points.length; i++) {
        point = points[i];
        pointX = point.getX();
        pointY = point.getY();
        pointZ = point.getZ();

        if (pointX < xMin) {
            xMin = pointX;
        }
        if (pointX > xMax) {
            xMax = pointX;
        }
        if (pointY < yMin) {
            yMin = pointY;
        }
        if (pointY > yMax) {
            yMax = pointY;
        }
        if (pointZ < zMin) {
            zMin = pointZ;
        }
        if (pointZ > zMax) {
            zMax = pointZ;
        }
    }

    return new rock.geometry.BBOX(xMin, xMax, yMin, yMax, zMin, zMax);
};

/**
 * Clone this BBOX
 *
 * @return {rock.geometry.BBOX} the clone
 */
rock.geometry.BBOX.prototype.clone = function() {
    return new rock.geometry.BBOX(this.xMin, this.xMax, this.yMin, this.yMax, this.zMin, this.zMax);
};