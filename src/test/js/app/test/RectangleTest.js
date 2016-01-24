rock.namespace('app.test');

/**
 * Inheritance test
 *
 * @constructor
 * @extends rock.test.TestSuite
 * @author Luis Alberto Jiménez
 */
app.test.RectangleTest = function () {
};

rock.extends_(app.test.RectangleTest, rock.test.TestSuite);

app.test.RectangleTest.prototype.testRectangle = function () {
    var rec0033 = new rock.geometry.Rectangle(0, 0, 3, 3);
    var rec5599 = new rock.geometry.Rectangle(5, 5, 9, 9);
    var rec10102020 = new rock.geometry.Rectangle(10, 10, 20, 20);

    var rec3478 = new rock.geometry.Rectangle(3, 4, 7, 8);
    var rec6789 = new rock.geometry.Rectangle(6, 7, 8, 9);
    var rec15162525 = new rock.geometry.Rectangle(15, 16, 25, 25);
    var rec5151525 = new rock.geometry.Rectangle(5, 15, 15, 25);

    this.assertNull(rec0033.getIntersectionWithRectangle(rec5599));
    this.assertNull(rec5599.getIntersectionWithRectangle(rec10102020));
    this.assertNull(rec10102020.getIntersectionWithRectangle(rec0033));

    var intersection;
    intersection = rec5599.getIntersectionWithRectangle(rec6789);
    this.assertEquals(6, intersection.getXMin());
    this.assertEquals(7, intersection.getYMin());
    this.assertEquals(8, intersection.getXMax());
    this.assertEquals(9, intersection.getYMax());

    intersection = rec15162525.getIntersectionWithRectangle(rec10102020);
    this.assertEquals(15, intersection.getXMin());
    this.assertEquals(16, intersection.getYMin());
    this.assertEquals(20, intersection.getXMax());
    this.assertEquals(20, intersection.getYMax());

    intersection = rec5599.getIntersectionWithRectangle(rec3478);
    this.assertEquals(5, intersection.getXMin());
    this.assertEquals(5, intersection.getYMin());
    this.assertEquals(7, intersection.getXMax());
    this.assertEquals(8, intersection.getYMax());

    intersection = rec5151525.getIntersectionWithRectangle(rec10102020);
    this.assertEquals(10, intersection.getXMin());
    this.assertEquals(15, intersection.getYMin());
    this.assertEquals(15, intersection.getXMax());
    this.assertEquals(20, intersection.getYMax());
};