rock.namespace('app.test');

/**
 * Array test
 *
 * @constructor
 * @extends rock.test.TestSuite
 *
 * @author Luis Alberto Jiménez
 */
app.test.ArrayTest = function () {
};

rock.extends_(app.test.ArrayTest, rock.test.TestSuite);

app.test.ArrayTest.prototype.testArray = function () {
    var initialCapacity = 2;
    var resizeIncrement = 3;
    var array = new rock.js.Array(initialCapacity, resizeIncrement);

    this.assertArray(array, initialCapacity, 0, []);

    array.addValue(11);
    array.addValue(22);

    this.assertArray(array, initialCapacity, 2, [11, 22]);

    // this must force resize the internal array
    array.addValue(33);

    this.assertArray(array, initialCapacity + resizeIncrement, 3, [11, 22, 33]);

    array.addValue(44);

    this.assertArray(array, initialCapacity + resizeIncrement, 4, [11, 22, 33, 44]);

    // remove doesn't reduce capacity
    array.removeValue(11);
    array.removeValue(22);

    this.assertArray(array, initialCapacity + resizeIncrement, 2, [33, 44]);

    // clear must force length = 0
    array.clear();
    this.assertArray(array, initialCapacity + resizeIncrement, 0, []);

    // add 3 elements and adjust capacity
    array.addValue(11);
    array.addValue(22);
    array.addValue(33);
    array.adjustCapacity();
    this.assertArray(array, 3, 3, [11, 22, 33]);
};

app.test.ArrayTest.prototype.assertArray = function (array, capacity, lenght, expectedValues) {
    var arrayLength = array.getLength();
    this.assertEquals(array.getCapacity(), capacity);
    this.assertEquals(arrayLength, lenght);
    var i;
    for (i = 0; i < arrayLength; i++) {
        this.assertEquals(expectedValues[i], array.getValue(i));
    }

    // this should always be true... Get an internal property is very ugly... It's 2 AM and I'm tired :P
    this.assertEquals(array.values.length, array.getCapacity());
};