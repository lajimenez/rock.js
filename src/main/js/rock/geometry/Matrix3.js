rock.namespace('rock.geometry');

/**
 * Represents a 3x3 matrix.
 *
 * @constructor
 * @author Luis Alberto Jiménez
 */
rock.geometry.Matrix3 = function () {
    // column major
    this.matrix = new Array(9);
    this.identity();

    // This properties are used to avoid allocate new memory
    this.point3_ma = new rock.geometry.Point3(0, 0, 0);
};

rock.geometry.Matrix3.prototype.getAuxiliaryPoint3 = function () {
    var point3 = this.point3_ma;
    point3.setX(0);
    point3.setY(0);
    point3.setZ(0);
    return point3;
};

/**
 * Returns the matrix as an array
 *
 * @returns {Array.9}
 */
rock.geometry.Matrix3.prototype.getMatrixAsArray = function () {
    return this.matrix;
};

/**
 * Do this matrix as identity matrix
 *
 */
rock.geometry.Matrix3.prototype.identity = function () {
    for (var i = 0; i < 9; i++) {
        this.matrix[i] = 0;
    }

    this.matrix[0] = 1; // this.setValue(0, 0, 1);
    this.matrix[4] = 1; // this.setValue(1, 1, 1);
    this.matrix[8] = 1; // this.setValue(2, 2, 1);
};

/**
 * Calculate the determinant
 *
 * @returns the determinant
 */
rock.geometry.Matrix3.prototype.getDeterminant = function () {
    var determinant = ((this.matrix[0] * this.matrix[4] * this.matrix[8])
        + (this.matrix[3] * this.matrix[7] * this.matrix[2]) + (this.matrix[6]
        * this.matrix[1] * this.matrix[5]))
        - ((this.matrix[6] * this.matrix[4] * this.matrix[2])
        + (this.matrix[3] * this.matrix[1] * this.matrix[8]) + (this.matrix[0]
        * this.matrix[7] * this.matrix[5]));
    return determinant;
};

/**
 * This function multiply a point with a matrix
 *
 * @param {rock.geometry.Point3} point3
 *      the point
 *
 * @return {rock.geometry.Point3}
 */
rock.geometry.Matrix3.prototype.multiplyByPoint3 = function (point3) {
    var result = this.getAuxiliaryPoint3();

    var point3X = point3.getX();
    var point3Y = point3.getY();
    var point3Z = point3.getZ();

    result.setX(point3X * this.getValue(0, 0) + point3Y * this.getValue(0, 1) + point3Z * this.getValue(0, 2));
    result.setY(point3X * this.getValue(1, 0) + point3Y * this.getValue(1, 1) + point3Z * this.getValue(1, 2));
    result.setZ(point3X * this.getValue(2, 0) + point3Y * this.getValue(2, 1) + point3Z * this.getValue(2, 2));

    return result;
};

/**
 * Set a value
 *
 * @param i
 *            the row
 * @param j
 *            the column
 * @param value
 *            the value to set
 */
rock.geometry.Matrix3.prototype.setValue = function (i, j, value) {
    var pos = j * 3 + i;
    this.matrix[pos] = value;
};

/**
 * Return a value
 *
 * @param i
 *            the row
 * @param j
 *            the column
 * @returns the value
 */
rock.geometry.Matrix3.prototype.getValue = function (i, j) {
    var pos = j * 3 + i;
    return this.matrix[pos];
};
