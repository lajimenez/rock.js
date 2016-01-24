rock.namespace('rock.app');

/**
 * This is an example of JSDoc.For annotating extending, we will use the
 * annotation <b>extends</b>.For annotating implementing we will use the
 * annotation <b>augments</b> (internally is the same that using <b>extends</b>).
 * All elements (classes and interfaces) must be annotated with <b>constructor</b>
 * and interfaces must be also annotated with <b>interface</b>.
 *
 * Abstract class must be annotated with <b>abstract</b>.
 *
 * @param {rock.graphics.engine.ContextGraphicsEngine} context
 *            one param (see how type is specified)
 *
 * @constructor
 * @abstract (if necessary)
 * @extends rock.app.Application
 * @augments rock.graphics.engine.IDrawable
 *
 * @author Luis Alberto Jiménez
 */
rock.app.JSDocExample = function (context) {

    /**
     * Property with JSDoc
     *
     * @type rock.graphics.engine.ContextGraphicsEngine
     * @private
     */
    this.context = context;
};

rock.extends_(rock.app.JSDocExample, rock.app.Application);

rock.implements_(rock.app.JSDocExample, rock.graphics.engine.IDrawable);

/**
 * JSDoc private function
 *
 * @returns {Number} zero value
 * @private
 */
rock.app.JSDocExample.prototype.privateFunction = function () {
    return 0;
};

/**
 * This is an function JSDoc
 *
 * @param {String} param
 *            the param
 * @param {Array} [optionalParam]
 *            optional params
 * @returns {rock.graphics.engine.ContextGraphicsEngine} the return value
 */
rock.app.JSDocExample.prototype.functionA = function (param, optionalParam) {
    return this.context;
};

/**
 * @see rock.app.Application#start
 * @override
 */
rock.app.JSDocExample.prototype.start = function () {
    ;
};

/**
 * This is an static field
 */
rock.app.JSDocExample.staticValue = "STATIC FIELD";

/**
 * Using function annotation (for example to use with abstract annotation :)
 *
 * @abstract
 * @function
 */
rock.app.JSDocExample.prototype.abstractFunction = rock.abstract_;