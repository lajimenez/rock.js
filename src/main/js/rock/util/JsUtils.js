rock.namespace('rock.util');

/**
 * Javascript utils class
 *
 * @constructor
 * @author Luis Alberto Jiménez
 */
rock.util.JsUtils = {

    /**
     * Remove all instances of an element from array
     *
     * @param {Array} array
     *            the array
     * @param val
     *            the value to remove
     * @return {Boolean} if the array contained the value
     */
    removeByValueFromArray: function(array, val) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] === val) {
                array.splice(i, 1);
                return true;
            }
        }
        return false;
    },

    /**
     * Clear an array
     *
     * @param {Array} array
     *            the array
     */
    clearArray: function(array) {
        array.length = 0;
    },

    /**
     * Clone an array
     *
     * @param {Array} array
     *            the array
     *
     * @return {Array} clone
     */
    cloneArray: function(array) {
        if (array == null) {
            return null;
        }

        var clone = [], length = array.length;
        var i;

        for (i = 0; i < length; i++) {
            clone[i] = array[i];
        }

        return clone;

    },

    /**
     * Checks if a value is null or undefined
     *
     * @param value
     *            the value to check
     * @returns {Boolean} true if the value is null or undefined
     * @function
     */
    isNullOrUndefined: rock.isNullOrUndefined,

    /**
     * Get a value as an hexadecimal (with at least 2 digits...)
     *
     * @param value
     *            the value
     */
    getAsHex: function(value) {
        var hexVal = value.toString(16);

        while (hexVal.length < 2) {
            hexVal = "0" + hexVal;
        }

        return hexVal.toUpperCase();
    },

    /**
     * Check if a string starts with a prefix
     *
     * @param value
     * @param prefix
     * @returns {boolean}
     */
    stringStartsWith: function(value, prefix) {
        if (this.isNullOrUndefined(value) || this.isNullOrUndefined(prefix)) {
            return false;
        }

        return value.indexOf(prefix) == 0;
    },

    /**
     * Check if a string starts ends a prefix
     *
     * @param value
     * @param suffix
     * @returns {boolean}
     */
    stringEndsWith: function(value, suffix) {
        if (this.isNullOrUndefined(value) || this.isNullOrUndefined(suffix)) {
            return false;
        }

        var lastIndex = value.lastIndexOf(suffix);
        if (lastIndex < 0) {
            return false;
        }

        return lastIndex  == (value.length - suffix.length);
    },

    /**
     * Check if a string contains some value
     *
     * @param value
     * @param valueToCheck
     * @returns {boolean}
     */
    stringContains: rock.stringContains,

    /**
     * Round a number with a fixed number of decimals
     *
     * @param value
     *      the value to round
     * @param decimals
     *      the number of decimals
     * @returns {string}
     */
    round: function(value, decimals) {
        var roundValue = Math.pow(10, decimals);
        return (Math.round(value * roundValue) / roundValue).toFixed(decimals);
    },

    /**
     * Return true if the value is a numerical value
     *
     * @param value
     *      the value to be checked
     * @returns {boolean}
     */
    isNumerical: function(value) {
        return !isNaN(value - 0);
    },

    /**
     * Generate a UUID
     *
     * @returns {string}
     */
    generateUUID: function() {
        return this.getRandomHexNumbersArray(8) + '-' + this.getRandomHexNumbersArray(4) + '-' +
            '4' + this.getRandomHexNumbersArray(3) + '-' +
            this.getRandomNumber(8, 11).toString(16) + this.getRandomHexNumbersArray(3) + '-' +
            this.getRandomHexNumbersArray(12);
    },

    getRandomHexNumbersArray: function(lenght) {
        var random = '';
        for (var i=0; i < lenght; i++) {
            random = random + this.getRandomNumber(0, 15).toString(16);
        }
        return random;
    },

    /**
     * Get a random value
     *
     * @param min
     *      minimum range value
     * @param max
     *      maximum range value
     * @returns Number
     */
    getRandomNumber: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};
