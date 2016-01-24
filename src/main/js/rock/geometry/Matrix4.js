rock.namespace('rock.geometry');

/**
 * Represents a 4x4 matrix.
 *
 * @constructor
 * @author Luis Alberto Jiménez
 */
rock.geometry.Matrix4 = function () {
    // column major
    this.matrix = new Array(16);
    this.identity();

    this.cofactorMatrix = null;
    this.adjointMatrix = null;

    // This properties are used to avoid allocate new memory
    this.point3_ma = new rock.geometry.Point3(0, 0, 0);
    this.mat3_ma = new rock.geometry.Matrix3();
    this.mat4_ma = null;
    this.multiply_ma = null;
    this.matAsMat3Result_ma = new rock.geometry.Matrix3();
};

rock.geometry.Matrix4.prototype.getAuxiliaryPoint3 = function () {
    var point3 = this.point3_ma;
    point3.setX(0);
    point3.setY(0);
    point3.setZ(0);
    return point3;
};

rock.geometry.Matrix4.prototype.getAuxiliaryMat3 = function () {
    this.mat3_ma.identity();
    return this.mat3_ma;
};

rock.geometry.Matrix4.prototype.getAuxiliaryMat4 = function () {
    if (this.mat4_ma == null) {
        this.mat4_ma = new rock.geometry.Matrix4();
    }
    this.mat4_ma.identity();
    return this.mat4_ma;
};

rock.geometry.Matrix4.prototype.getAuxiliaryMultiply = function () {
    if (this.multiply_ma == null) {
        this.multiply_ma = new rock.geometry.Matrix4();
    }
    this.multiply_ma.identity();
    return this.multiply_ma;
};

/**
 * Returns the matrix as an array (column major)
 *
 * @returns {Array}
 */
rock.geometry.Matrix4.prototype.getMatrixAsArray = function () {
    return this.matrix;
};

/**
 * Do this matrix as identity matrix
 */
rock.geometry.Matrix4.prototype.identity = function () {
    for (var i = 0; i < 16; i++) {
        this.matrix[i] = 0;
    }

    this.matrix[0] = 1; // this.setValue(0, 0, 1);
    this.matrix[5] = 1; // this.setValue(1, 1, 1);
    this.matrix[10] = 1; // this.setValue(2, 2, 1);
    this.matrix[15] = 1; // this.setValue(3, 3, 1);
};

/**
 * Initialize matrix from another matrix
 *
 * @param mat4
 *            the matrix used to initialize current matrix
 */
rock.geometry.Matrix4.prototype.initFromMatrix = function (mat4) {
    var i, j;
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            this.setValue(i, j, mat4.getValue(i, j));
        }
    }
};

/**
 * Calculate the determinant
 *
 * @returns the determinant
 */
rock.geometry.Matrix4.prototype.getDeterminant = function () {
    var mat3 = this.getAuxiliaryMat3();

    var determinant = 0;

    mat3.setValue(0, 0, this.matrix[5]);
    mat3.setValue(1, 0, this.matrix[6]);
    mat3.setValue(2, 0, this.matrix[7]);
    mat3.setValue(0, 1, this.matrix[9]);
    mat3.setValue(1, 1, this.matrix[10]);
    mat3.setValue(2, 1, this.matrix[11]);
    mat3.setValue(0, 2, this.matrix[13]);
    mat3.setValue(1, 2, this.matrix[14]);
    mat3.setValue(2, 2, this.matrix[15]);

    determinant += this.matrix[0] * mat3.getDeterminant();

    mat3.setValue(0, 0, this.matrix[1]);
    mat3.setValue(1, 0, this.matrix[2]);
    mat3.setValue(2, 0, this.matrix[3]);
    mat3.setValue(0, 1, this.matrix[9]);
    mat3.setValue(1, 1, this.matrix[10]);
    mat3.setValue(2, 1, this.matrix[11]);
    mat3.setValue(0, 2, this.matrix[13]);
    mat3.setValue(1, 2, this.matrix[14]);
    mat3.setValue(2, 2, this.matrix[15]);

    determinant += -this.matrix[4] * mat3.getDeterminant();

    mat3.setValue(0, 0, this.matrix[1]);
    mat3.setValue(1, 0, this.matrix[2]);
    mat3.setValue(2, 0, this.matrix[3]);
    mat3.setValue(0, 1, this.matrix[5]);
    mat3.setValue(1, 1, this.matrix[6]);
    mat3.setValue(2, 1, this.matrix[7]);
    mat3.setValue(0, 2, this.matrix[13]);
    mat3.setValue(1, 2, this.matrix[14]);
    mat3.setValue(2, 2, this.matrix[15]);

    determinant += this.matrix[8] * mat3.getDeterminant();

    mat3.setValue(0, 0, this.matrix[1]);
    mat3.setValue(1, 0, this.matrix[2]);
    mat3.setValue(2, 0, this.matrix[3]);
    mat3.setValue(0, 1, this.matrix[5]);
    mat3.setValue(1, 1, this.matrix[6]);
    mat3.setValue(2, 1, this.matrix[7]);
    mat3.setValue(0, 2, this.matrix[9]);
    mat3.setValue(1, 2, this.matrix[10]);
    mat3.setValue(2, 2, this.matrix[11]);

    determinant += -this.matrix[12] * mat3.getDeterminant();

    return determinant;
};

/**
 * Get minor
 *
 * @param i
 *            the column
 * @param j
 *            the row
 * @returns the minor
 */
rock.geometry.Matrix4.prototype.getMinor = function (i, j) {
    var mat3 = this.getAuxiliaryMat3();
    var s, t;
    var mat3_i, mat3_j;

    for (s = 0; s < 4; s++) {
        if (s == i) {
            continue;
        }

        for (t = 0; t < 4; t++) {
            if (t == j) {
                continue;
            }

            mat3_i = s;
            mat3_j = t;

            if (s > i) {
                mat3_i--;
            }

            if (t > j) {
                mat3_j--;
            }

            mat3.setValue(mat3_i, mat3_j, this.getValue(s, t));
        }
    }

    return mat3.getDeterminant();
};

/**
 * Return the sign. Used for calculating cofactor matrix.
 *
 * @param i
 *            the column
 * @param j
 *            the row
 * @returns 1 for positive, -1 for negative {Number}
 */
rock.geometry.Matrix4.prototype.getSign = function (i, j) {
    var row = i + 1;
    var column = j + 1;

    var sum = row + column;

    if (sum % 2 == 0) {
        return 1;
    } else {
        return -1;
    }
};

/**
 * Calculate the cofactor matrix
 *
 * @returns the cofactor matrix {rock.geometry.Matrix4}
 */
rock.geometry.Matrix4.prototype.getCofactorMatrix = function () {
    if (this.cofactorMatrix == null) {
        this.cofactorMatrix = new rock.geometry.Matrix4();
    }
    var mat4 = this.cofactorMatrix;
    var i, j;

    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            mat4.setValue(i, j, this.getMinor(i, j) * this.getSign(i, j));
        }
    }

    return mat4;
};

/**
 * Set the matrix as the transpose of itself
 */
rock.geometry.Matrix4.prototype.transpose = function () {
    var mat4 = this.getAuxiliaryMat4();

    mat4.setValue(0, 0, this.getValue(0, 0));
    mat4.setValue(1, 0, this.getValue(0, 1));
    mat4.setValue(2, 0, this.getValue(0, 2));
    mat4.setValue(3, 0, this.getValue(0, 3));

    mat4.setValue(0, 1, this.getValue(1, 0));
    mat4.setValue(1, 1, this.getValue(1, 1));
    mat4.setValue(2, 1, this.getValue(1, 2));
    mat4.setValue(3, 1, this.getValue(1, 3));

    mat4.setValue(0, 2, this.getValue(2, 0));
    mat4.setValue(1, 2, this.getValue(2, 1));
    mat4.setValue(2, 2, this.getValue(2, 2));
    mat4.setValue(3, 2, this.getValue(2, 3));

    mat4.setValue(0, 3, this.getValue(3, 0));
    mat4.setValue(1, 3, this.getValue(3, 1));
    mat4.setValue(2, 3, this.getValue(3, 2));
    mat4.setValue(3, 3, this.getValue(3, 3));

    this.initFromMatrix(mat4);
};

/**
 * Calculate the adjoint of the current matrix
 * http://en.wikipedia.org/wiki/Adjugate_matrix
 *
 * @returns the adjoint matrix {rock.geometry.Matrix4}
 */
rock.geometry.Matrix4.prototype.getAdjoint = function () {
    if (this.adjointMatrix == null) {
        this.adjointMatrix = new rock.geometry.Matrix4();
    }
    var mat4 = this.adjointMatrix;
    var cofactorMatrix = this.getCofactorMatrix();
    mat4.initFromMatrix(cofactorMatrix);
    mat4.transpose();
    return mat4;
};

/**
 * Set the current matrix as the invert of itself
 */
rock.geometry.Matrix4.prototype.invert = function () {
    var mat4 = this.getAuxiliaryMat4();
    var determinant = this.getDeterminant();

    if (determinant == 0) {
        return null;
    }

    var adjoint = this.getAdjoint();

    mat4.setValue(0, 0, adjoint.getValue(0, 0) / determinant);
    mat4.setValue(1, 0, adjoint.getValue(1, 0) / determinant);
    mat4.setValue(2, 0, adjoint.getValue(2, 0) / determinant);
    mat4.setValue(3, 0, adjoint.getValue(3, 0) / determinant);

    mat4.setValue(0, 1, adjoint.getValue(0, 1) / determinant);
    mat4.setValue(1, 1, adjoint.getValue(1, 1) / determinant);
    mat4.setValue(2, 1, adjoint.getValue(2, 1) / determinant);
    mat4.setValue(3, 1, adjoint.getValue(3, 1) / determinant);

    mat4.setValue(0, 2, adjoint.getValue(0, 2) / determinant);
    mat4.setValue(1, 2, adjoint.getValue(1, 2) / determinant);
    mat4.setValue(2, 2, adjoint.getValue(2, 2) / determinant);
    mat4.setValue(3, 2, adjoint.getValue(3, 2) / determinant);

    mat4.setValue(0, 3, adjoint.getValue(0, 3) / determinant);
    mat4.setValue(1, 3, adjoint.getValue(1, 3) / determinant);
    mat4.setValue(2, 3, adjoint.getValue(2, 3) / determinant);
    mat4.setValue(3, 3, adjoint.getValue(3, 3) / determinant);

    this.initFromMatrix(mat4);
};

/**
 * Remove the translation of the current matrix
 */
rock.geometry.Matrix4.prototype.removeTranslation = function () {
    var mat4 = this.getAuxiliaryMat4();
    var i, j;

    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            mat4.setValue(i, j, this.getValue(i, j));
        }
    }

    this.initFromMatrix(mat4);
};

/**
 * Apply translation to the current matrix
 *
 * @param x
 *            distance in the x axis
 * @param y
 *            distance in the y axis
 * @param z
 *            distance in the z axis
 */
rock.geometry.Matrix4.prototype.translate = function (x, y, z) {
    var translationMatrix = this.getAuxiliaryMat4();
    translationMatrix.setValue(0, 3, x);
    translationMatrix.setValue(1, 3, y);
    translationMatrix.setValue(2, 3, z);

    this.multiply(translationMatrix);
};

/**
 * Apply rotation in the X axis to the current matrix
 *
 * @param angle
 *            the angle to rotate in degrees
 */
rock.geometry.Matrix4.prototype.rotateX = function (angle) {
    var rotationMatrix = this.getAuxiliaryMat4();

    var radians = rock.util.GeometryUtils.degToRad(angle);

    var cosAngle = Math.cos(radians);
    var sinAngle = Math.sin(radians);

    rotationMatrix.setValue(1, 1, cosAngle);
    rotationMatrix.setValue(1, 2, -sinAngle);
    rotationMatrix.setValue(2, 1, sinAngle);
    rotationMatrix.setValue(2, 2, cosAngle);

    this.multiply(rotationMatrix);
};

/**
 * Apply rotation in the Y axis to the current matrix
 *
 * @param angle
 *            the angle to rotate in degrees
 */
rock.geometry.Matrix4.prototype.rotateY = function (angle) {
    var rotationMatrix = this.getAuxiliaryMat4();

    var radians = rock.util.GeometryUtils.degToRad(angle);

    var cosAngle = Math.cos(radians);
    var sinAngle = Math.sin(radians);

    rotationMatrix.setValue(0, 0, cosAngle);
    rotationMatrix.setValue(0, 2, sinAngle);
    rotationMatrix.setValue(2, 0, -sinAngle);
    rotationMatrix.setValue(2, 2, cosAngle);

    this.multiply(rotationMatrix);
};

/**
 * Apply rotation in the Z axis to the current matrix
 *
 * @param angle
 *            the angle to rotate in degrees
 */
rock.geometry.Matrix4.prototype.rotateZ = function (angle) {
    var rotationMatrix = this.getAuxiliaryMat4();

    var radians = rock.util.GeometryUtils.degToRad(angle);

    var cosAngle = Math.cos(radians);
    var sinAngle = Math.sin(radians);

    rotationMatrix.setValue(0, 0, cosAngle);
    rotationMatrix.setValue(0, 1, -sinAngle);
    rotationMatrix.setValue(1, 0, sinAngle);
    rotationMatrix.setValue(1, 1, cosAngle);

    this.multiply(rotationMatrix);
};

/**
 * Apply scale to the current matrix
 *
 * @param scaleX
 *            factor scale in the x axis
 * @param scaleY
 *            factor scale in the y axis
 * @param scaleZ
 *            factor scale in the z axis
 */
rock.geometry.Matrix4.prototype.scale = function (scaleX, scaleY, scaleZ) {
    var scaleMatrix = this.getAuxiliaryMat4();
    scaleMatrix.setValue(0, 0, scaleX);
    scaleMatrix.setValue(1, 1, scaleY);
    scaleMatrix.setValue(2, 2, scaleZ);

    this.multiply(scaleMatrix);
};

/**
 * Multiply the matrix pass as parameter
 *
 * @param {rock.geometry.Matrix4} mat
 *            the matrix to multiply
 *
 * @returns the result matrix of multiplication
 */
rock.geometry.Matrix4.prototype.multiply = function (mat) {
    var multiplyMatrix = this.getAuxiliaryMultiply();

    var i, j, value;

    // Improvement: use the 'this.matrix' instead of 'getValue' and
    // 'setValue' for both matrix
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            value = this.getValue(i, 0) * mat.getValue(0, j)
            + this.getValue(i, 1) * mat.getValue(1, j)
            + this.getValue(i, 2) * mat.getValue(2, j)
            + this.getValue(i, 3) * mat.getValue(3, j);

            multiplyMatrix.setValue(i, j, value);
        }
    }

    this.initFromMatrix(multiplyMatrix);
};

/**
 * This function multiply a point with a matrix
 *
 * This function is a tricky as this not a valid multiplication...
 * This function will assume that the point is a 4d point with w = 1
 *
 * @param {rock.geometry.Point3} point3
 *      the point
 *
 * @return {rock.geometry.Point3}
 */
rock.geometry.Matrix4.prototype.multiplyByPoint3 = function (point3) {
    var result = this.getAuxiliaryPoint3();

    var point3X = point3.getX();
    var point3Y = point3.getY();
    var point3Z = point3.getZ();

    result.setX(point3X * this.getValue(0, 0) + point3Y * this.getValue(0, 1) + point3Z * this.getValue(0, 2) + this.getValue(0, 3));
    result.setY(point3X * this.getValue(1, 0) + point3Y * this.getValue(1, 1) + point3Z * this.getValue(1, 2) + this.getValue(1, 3));
    result.setZ(point3X * this.getValue(2, 0) + point3Y * this.getValue(2, 1) + point3Z * this.getValue(2, 2) + this.getValue(2, 3));
    //var w = vec3X * this.getValue(3, 0) + vec3Y * this.getValue(3, 1) + vec3Z * this.getValue(3, 2) + this.getValue(3, 3);
    //result.setX(result.getX() / w);
    //result.setY(result.getY() / w);
    //result.setZ(result.getZ() / w);

    return result;
};

/**
 * Return this matrix as a matrix 3 x 3
 *
 * @return {rock.geometry.Matrix3}
 */
rock.geometry.Matrix4.prototype.getAsMatrix3 = function () {
    var mat3 = this.matAsMat3Result_ma;
    var i, j;

    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            mat3.setValue(i, j, this.getValue(i, j));
        }
    }

    return mat3;
};


/**
 * Return a clone of the current matrix
 */
rock.geometry.Matrix4.prototype.clone = function () {
    var result = new rock.geometry.Matrix4();
    var resultMatrix = result.getMatrixAsArray();
    var currentMatrix = this.matrix;
    var i;

    for (i = 0; i < currentMatrix.length; i++) {
        resultMatrix[i] = currentMatrix[i];
    }

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
rock.geometry.Matrix4.prototype.setValue = function (i, j, value) {
    var pos = j * 4 + i;
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
rock.geometry.Matrix4.prototype.getValue = function (i, j) {
    var pos = j * 4 + i;
    return this.matrix[pos];
};
