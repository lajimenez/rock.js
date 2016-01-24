rock.namespace('rock.js');

/**
 * Rock custom Array implementation. This class is intended for a more controlled dynamic resize of javascript Arrays.
 * The objective is to avoid create new Arrays. You can use this class and rehuse Arrays without allocating memory
 * (at least you can have more control on how Array grow...)
 * This class is intended for being used this way:
 *  Create Array
 *  Populate Array
 *  Clear Array
 *  Go to 'Populate Array'
 *
 * @param [initialCapacity]
 *            the initial capacity of the array
 *
 * @param [resizeIncrement]
 *            if the array must be resized, the capacity will be augmented by this amount
 *
 * @constructor
 *
 * @author Luis Alberto Jiménez
 */
rock.js.Array = function (initialCapacity, resizeIncrement) {
    this.length = 0;
    var capacity = rock.js.Array.DEFAULT_INITIAL_CAPACITY;
    if (!rock.util.JsUtils.isNullOrUndefined(initialCapacity) && initialCapacity > 0) {
        capacity = initialCapacity;
    }
    this.values = new Array(capacity);
    this.capacity = capacity;

    this.resizeIncrement = rock.js.Array.DEFAULT_RESIZE_INCREMENT;
    if (!rock.util.JsUtils.isNullOrUndefined(resizeIncrement) && resizeIncrement > 0) {
        this.resizeIncrement = resizeIncrement;
    }
};

rock.js.Array.DEFAULT_INITIAL_CAPACITY = 10;

rock.js.Array.DEFAULT_RESIZE_INCREMENT = 5;

/**
 * Resize the values array
 *
 * @private
 */
rock.js.Array.prototype.resizeValues = function () {
    var resizeIncrement = this.resizeIncrement;
    var values = this.values;
    var i;
    for (i = 0; i < resizeIncrement; i++) {
        values.push(null);
    }
    this.capacity += resizeIncrement;
};

/**
 * Add a new value
 *
 * @param value
 *      the value
 */
rock.js.Array.prototype.addValue = function (value) {
    var capacity = this.capacity;
    if (capacity == this.length) {
        this.resizeValues();
    }

    var values = this.values;
    values[this.length] = value;
    this.length++;
};

/**
 * Remove a value. This operation can be very expensive.
 *
 * @param value
 *      the value
 * @returns {Boolean} returns if the value existed in the array
 */
rock.js.Array.prototype.removeValue = function (value) {
    var values = this.values;
    var length = this.length;
    var found = false;
    var i, pos;
    for (i = 0; i < length; i++) {
        if (values[i] === value) {
            found = true;
            pos = i;
            break;
        }
    }

    if (found) {
        // we maintain order
        for (i = pos; i < length - 1; i++) {
            values[i] = values[i + 1];
        }
        this.length--;
    }

    return found;
};

/**
 * Clear the array
 *
 * @param {Boolean} [setNulls]
 *      set null on all the elements of the underlying array. Default will be false
 */
rock.js.Array.prototype.clear = function (setNulls) {
    this.length = 0;

    // This may be important because if you don't set nulls, there will be a reference
    // to all existing elements. This will cause that these elements will not be
    // released by garbage collector.
    if (!rock.util.JsUtils.isNullOrUndefined(setNulls) && setNulls) {
        var i;
        var values = this.values;
        for (i = 0; i < values.length; i++) {
            values[i] = null;
        }
    }
};

/**
 * Adjust the capacity to the current length
 */
rock.js.Array.prototype.adjustCapacity = function () {
    this.values.length = this.length;
    this.capacity = this.length;
};

/**
 * Get the value
 *
 * @param position
 *      the position of array
 * @return {Object} the value
 */
rock.js.Array.prototype.getValue = function(position) {
    return this.values[position];
};

/**
 * Get the length
 *
 * @return {Number} the length
 */
rock.js.Array.prototype.getLength = function() {
    return this.length;
};

/**
 * Get the capacity
 *
 * @return {Number} the capacity
 */
rock.js.Array.prototype.getCapacity = function() {
    return this.capacity;
};