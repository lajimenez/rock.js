rock.namespace('rock.geometry');

/**
 * Represents a 3D vertex
 *
 * @param x
 *            the x coordinate
 * @param y
 *            the y coordinate
 * @param z
 *            the z coordinate
 *
 * @constructor
 * @extends rock.geometry.Point3
 * @author Luis Alberto Jiménez
 */
rock.geometry.Vertex3 = function (x, y, z) {
    rock.super_(this, arguments);
};

rock.extends_(rock.geometry.Vertex3, rock.geometry.Point3);