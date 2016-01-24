rock.namespace('rock.util');

/**
 * Geometry utils class
 *
 * @constructor
 * @author Luis Alberto Jiménez
 */
rock.util.GeometryUtils = {
    /**
     * Convert an angle from degrees to radians
     *
     * @param degrees
     *
     * @returns {Number} angle in radians
     */
    degToRad: function (degrees) {
        return (degrees * 2 * Math.PI) / 360;
    },

    /**
     * Convert an angle from radians to degrees
     *
     * @param radians
     *
     * @returns {Number} angle in degrees
     */
    radToDeg: function (radians) {
        return (radians * 360) / (2 * Math.PI);
    },

    /**
     * Cross product between 2 vectors
     *
     * @param {rock.geometry.Vector3} vector1
     *            vector 1
     * @param {rock.geometry.Vector3} vector2
     *            vector 2
     * @param {rock.geometry.Vector3} [result_ma]
     *            to avoid memory allocation, you can pass a vector that will be updated instead of creating a new
     *            as a result
     * @returns {rock.geometry.Vector3} the result vector
     */
    crossProduct: function (vector1, vector2, result_ma) {
        var result = result_ma;
        if (rock.util.JsUtils.isNullOrUndefined(result)) {
            result = new rock.geometry.Vector3(0, 0, 0);
        }

        result.setX((vector1.getY() * vector2.getZ()) - (vector1.getZ() * vector2.getY()));

        result.setY((vector1.getZ() * vector2.getX()) - (vector1.getX() * vector2.getZ()));

        result.setZ((vector1.getX() * vector2.getY()) - (vector1.getY() * vector2.getX()));

        return result;
    },

    /**
     * Return the point that makes share center point between 2 elements
     * (Element has the 'starting' point, width and height
     *
     * @param {rock.geometry.Point2} point
     *      point where 'base' element start
     * @param width
     *      width for 'base' element
     * @param height
     *      height for 'base' element
     * @param widthElemToCenter
     *      width for element we want to share center with base element
     * @param heightElemToCenter
     *      height for element we want to share center with base element
     * @returns {rock.geometry.Point2} start point for element we want to share center
     */
    getPointMakesSameCenter: function (point, width, height, widthElemToCenter, heightElemToCenter) {
        var x = point.getX() + ((width - widthElemToCenter) / 2);
        var y = point.getY() + ((height - heightElemToCenter) / 2);
        return new rock.geometry.Point2(Math.round(x), Math.round(y));
    },

    /**
     * Normalize and angle in degrees (0 to 360)
     *
     * @param angle
     *      the angle to normalize
     * @return {Number} the angle normalized
     */
    normalizeAngle : function(angle) {
        var normalizedAngle = angle;
        while (normalizedAngle < 0) {
            normalizedAngle += 360;
        }
        normalizedAngle = normalizedAngle % 360;
        return normalizedAngle;
    }

};