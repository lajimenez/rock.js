rock.namespace('rock.error');

/**
 * Class for errors
 *
 * @constructor
 *
 * @author Luis Alberto Jiménez
 */
rock.error.RockError = function (message) {
    // There is no get for this property. We do that so we are able to handle pure
    // Javascript Errors and RockErrors with the same function.
    this.message = message;
};

rock.error.RockError.prototype.toString = function () {
    return rock.resource.rockResourceManager.getString('ROCK_ERROR_MSG', [this.message]);
};

//rock.extends_(rock.error.RockError, Error);