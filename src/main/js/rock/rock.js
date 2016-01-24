/**
 * Represents base object for rock framework
 *
 * @class
 * @author Luis Alberto Jiménez
 */
var rock = {

    /**
     * Rock framework version
     */
    version: 'r1',

    /**
     * Array with reserved properties
     */
    reservedProperties: ['super_', 'isInterface_', 'interfaces_', 'nextSuperToCall_'],

    /**
     * Add a namespace if it doesn't exists
     */
    namespace: function (namespace) {
        var parts = namespace.split('.');

        var lastVar = window;
        var i, currentVar;
        for (i = 0; i < parts.length; i++) {

            currentVar = lastVar[parts[i]];

            if (this.isNullOrUndefined(currentVar)) {
                lastVar[parts[i]] = {};
            }

            lastVar = lastVar[parts[i]];
        }
    },

    /**
     * Check if the name of the property is a reserved name property
     *
     * @param property
     *            the name of the property to check
     */
    isReservedProperty: function (property) {
        if (this.isNullOrUndefined(property)) {
            return false;
        }

        for (var i = 0; i < this.reservedProperties.length; i++) {
            if (property == this.reservedProperties[i]) {
                return true;
            }
        }
        return false;
    },

    /**
     * Define a function as an interface
     *
     * @param constructorFunc
     *            the constructor to be set as an interface
     */
    interface_: function (constructorFunc) {
        if (!this.isFunction(constructorFunc)) {
            throw new rock.error.RockError(rock.resource.rockResourceManager.getString('NO_FUNCTION_TYPE'));
        }

        constructorFunc.prototype.isInterface_ = true;
    },

    /**
     * Check if an element is a function
     *
     * @param element
     *            the element to check
     */
    isFunction: function (element) {
        return typeof element === rock.constants.TYPE_FUNCTION;
    },

    /**
     * Check if a function is an interface
     *
     * @param constructorFunc
     *            the constructor to check
     */
    isInterface_: function (constructorFunc) {
        if (!this.isFunction(constructorFunc)) {
            return false;
        }

        // A function can only implement interfaces. Rock
        // uses internal property 'isInterface_' to save
        // this information
        if (this.isNullOrUndefined(constructorFunc.prototype.isInterface_)) {
            return false;
        }

        return constructorFunc.prototype.isInterface_;
    },

    /**
     * Mark a class to implement some interface
     *
     * @param constructorFunc
     *            the constructor that implements the interface
     * @param interfaceFunc
     *            the interface to implement
     */
    implements_: function (constructorFunc, interfaceFunc) {
        if (!this.isFunction(constructorFunc)
            || !this.isFunction(interfaceFunc)) {
            throw new rock.error.RockError(rock.resource.rockResourceManager.getString('NO_FUNCTION_TYPE'));
        }

        // An interface can't implement nothing
        if (this.isInterface_(constructorFunc)) {
            throw new rock.error.RockError(rock.resource.rockResourceManager.getString('INTERFACE_CANT_IMPLEMENT'));
        }

        // Only an interface can be implemented
        if (!this.isInterface_(interfaceFunc)) {
            throw new rock.error.RockError(rock.resource.rockResourceManager.getString('ONLY_INTERFACE_CAN_BE_IMPLEMENTED'));
        }

        if (this.isNullOrUndefined(constructorFunc.prototype.interfaces_)) {
            constructorFunc.prototype.interfaces_ = [];
        }

        constructorFunc.prototype.interfaces_.push(interfaceFunc);

        // Add all elements from interface prototype
        for (var property in interfaceFunc.prototype) {
            // we don't want to replace any existing element. And we don't
            // want to add reserved properties, for example 'isInterface_'
            if (constructorFunc.prototype[property] === undefined
                && !this.isReservedProperty(property)) {
                constructorFunc.prototype[property] = interfaceFunc.prototype[property];
            }
        }
    },

    /**
     * Implements inheritance in rock
     *
     * @param constructorFunc
     *            the constructor that extends
     * @param superConstructorFunc
     *            the constructor to be extended
     */
    extends_: function (constructorFunc, superConstructorFunc) {
        if (!this.isFunction(constructorFunc)
            || !this.isFunction(superConstructorFunc)) {
            throw new rock.error.RockError(rock.resource.rockResourceManager.getString('NO_FUNCTION_TYPE'));
        }

        // Class extends class and interface extends interface
        if (this.isInterface_(constructorFunc) !== this.isInterface_(superConstructorFunc)) {
            throw new rock.error.RockError(rock.resource.rockResourceManager.getString('INVALID_EXTENSION'));
        }

        // Validation: To define a new class, first must be 'extends' then
        // 'implements', so class that 'implements' any interface can't
        // 'extends'
        if (!this.isInterface_(constructorFunc)
            && !this.isNullOrUndefined(constructorFunc.prototype.interfaces_)) {
            if (constructorFunc.prototype.interfaces_.length > 0) {
                throw new rock.error.RockError(
                    rock.resource.rockResourceManager.getString('INVALID_INHERITANCE_EXTENDS_BEFORE_IMPLEMENTS'));
            }
        }

        var super_ = superConstructorFunc;
        constructorFunc.prototype.super_ = super_;

        if (this.isNullOrUndefined(super_.prototype)) {
            return;
        }

        // Add all elements from prototype
        for (var property in super_.prototype) {

            // we don't want to replace any existing element, for example
            // 'super_'
            if (constructorFunc.prototype[property] === undefined
                && !this.isReservedProperty(property)) {
                constructorFunc.prototype[property] = super_.prototype[property];
            }
        }
    },

    /**
     * Call super constructor
     *
     * @param object
     *            the object that call super
     * @param {Array} [params]
     *            parameters to use on the super constructor.
     */
    super_: function (object, params) {
        var superConstructor = object.nextSuperToCall_ || object.super_;

        if (this.isNullOrUndefined(superConstructor)) {
            // Throw exception here?
            return;
        }

        var constructor = object.constructor;
        rock.invokeSuper(object, constructor, superConstructor, params);
    },

    /**
     * We simulate invocation to a constructor of a superclass.
     *
     * @param object
     *            the object under construction
     * @param constructor
     *            the constructor
     * @param superConstructor
     *            the superclass constructor
     * @param params
     *            the parameters
     * @returns an object
     */
    invokeSuper: function (object, constructor, superConstructor, params) {
        object.nextSuperToCall_ = superConstructor.prototype.super_;
        superConstructor.apply(object, params);
        delete object.nextSuperToCall_;
    },

    /**
     * Add properties in other object.
     *
     * @param toObject
     *            the object to add properties
     * @param fromObject
     *            the object where to get properties
     */
    addProperties: function (toObject, fromObject) {
        var property;
        for (property in fromObject) {
            if (fromObject.hasOwnProperty(property)) {
                toObject[property] = fromObject[property];
            }
        }
    },

    /**
     * We simulate a 'new'. We want to be able to do a call with a
     * dynamic parameter's number.
     *
     * THIS METHOD IS NOT USED. But I like it :)
     *
     * @param constructor
     *            the constructor
     * @param params
     *            the parameters
     * @returns an object
     */
    new_: function (constructor, params) {
        function Seed() {
            constructor.apply(this, params);
        }

        // We change the prototype. We do that because it's possible that in the
        // constructor there are some calls to functions/properties defined in prototype
        Seed.prototype = constructor.prototype;
        return new Seed();
    },

    /**
     * Call a super method implementation.
     *
     * @param {object} object
     *          the object that call super
     * @param {function} baseClass
     *          class where the super method is call
     * @param {string} methodName
     *          name of the method to be invoked
     * @param {Array} [params]
     *          parameters to use on the super constructor
     *
     * @return {*} the return value
     */
    super_method: function (object, baseClass, methodName, params) {
        var super_ = baseClass.prototype.super_;

        if (this.isNullOrUndefined(super_)) {
            throw new rock.error.RockError(
                rock.resource.rockResourceManager.getString('INHERITANCE_NO_SUPER_METHOD_IN_SUPERCLASS'));
        }

        var method = super_.prototype[methodName];
        if (!this.isNullOrUndefined(method) && this.isFunction(method)) {
            return method.apply(object, params);
        } else {
            throw new rock.error.RockError(
                rock.resource.rockResourceManager.getString('INHERITANCE_NO_SUPER_METHOD_IN_SUPERCLASS'));
        }
    },

    /**
     * Check if a object is from a type
     *
     * @param object
     *            the object to check
     * @param type
     *            the type to check
     * @returns if the object is instance of type
     */
    instanceof_: function (object, type) {
        if (object.constructor === type) {
            return true;
        }

        var super_ = object.super_;
        var interfaces_ = object.interfaces_;
        var currentInterface = null;
        // var superCurrentInterface = null;

        if (!this.isNullOrUndefined(interfaces_)) {
            // First we check if some of the interfaces is
            // instance of the type
            for (var i = 0; i < interfaces_.length; i++) {
                currentInterface = interfaces_[i];

                // We check if the type is one of the interfaces
                // or some of the interface parents
                while (!this.isNullOrUndefined(currentInterface)) {
                    if (currentInterface === type) {
                        return true;
                    }
                    currentInterface = currentInterface.prototype.super_;
                }
            }
        }

        if (this.isNullOrUndefined(super_)) {
            // Check whether we are checking vs javascript Object
            if (typeof object === rock.constants.TYPE_OBJECT && type === Object) {
                return true;
            } else {
                // We use javascript typeof directly
                return typeof object === type;
            }
        } else {
            return this.instanceof_(super_.prototype, type);
        }

    },

    /**
     * Dummy function to mark functions as abstract (or interface function
     * definition)
     */
    abstract_: function () {
        throw new rock.error.RockError(
            rock.resource.rockResourceManager.getString('CALLED_METHOD_WITH_NO_IMPLEMENTATION'));
    },

    /**
     * Checks if a value is null or undefined
     *
     * @param value
     *            the value to check
     * @returns {Boolean} true if the value is null or undefined
     */
    isNullOrUndefined: function (value) {
        return value === undefined || value === null;
    },

    /**
     * Return a function to handle an event. We set the 'this' so we can use a
     * function's object to handle an event.
     *
     * @param this_
     *            the object to handle event
     * @param handler
     *            the function to handle event
     * @param {Array} [extraParams]
     *            extra params when calling handler
     * @returns a function
     */
    createEventHandler: function (this_, handler, extraParams) {
        // TODO: Is there any problem with this here? 'this_' could be released? (memory leaks???)
        var params = [];
        var i;
        if (!rock.isNullOrUndefined(extraParams)) {
            for (i = 0; i < extraParams.length; i++) {
                params.push(extraParams[i]);
            }
        }
        var eventHandler = function (event) {
            var eventHandlerParams = [event];
            eventHandlerParams = eventHandlerParams.concat(params);
            handler.apply(this_, eventHandlerParams);
        };

        return eventHandler;
    },

    /**
     * Check if the object has a specified named property.
     *
     * @param object
     *      object to check
     * @param property
     *      property name
     * @returns {boolean}
     */
    hasProperty : function (object, property) {
        return property in object && !this.isFunction(object[property]);
    },

    /**
     * Check if the object has a specified named method.
     *
     * @param object
     *      object to check
     * @param method
     *      method name
     * @returns {boolean}
     */
    hasMethod : function (object, method) {
        return this.isFunction(object[method]);
    },

    /**
     * Replace a method in class by an user agent dependent method
     *
     * @param pClazz
     *      the class to be updated
     * @param method
     *      the method to be replaced with an user agent dependent implementation
     * @param [usePrototype]
     *       if the method is in prototype object
     */
    replaceByUserAgentImplementation : function (pClazz, method, usePrototype) {
        var clazz = pClazz;
        if (usePrototype) {
            clazz = clazz['prototype'];
        }

        var methodUserAgentImplementation = method + '_' + rock.environment.userAgentFamily;
        var methodUserAgent = clazz[methodUserAgentImplementation];
        if (!this.isNullOrUndefined(methodUserAgent)) {
            clazz[method] = methodUserAgent;
        }
    },

    /**
     * Check if a string contains some value
     *
     * @param value
     * @param valueToCheck
     * @returns {boolean}
     */
    stringContains: function(value, valueToCheck) {
        if (this.isNullOrUndefined(value) || this.isNullOrUndefined(valueToCheck)) {
            return false;
        }

        return value.indexOf(valueToCheck) >= 0;
    },

    /**
     * Internal property to store exposed objects
     */
    exposedObjects : {},

    /**
     * Expose an object to world. You can expose an object within an application and then get outside
     * (some external button could get the object and call some method)
     *
     * @param applicationId
     *      the id of the application exposing object
     * @param objId
     *      the id of the exposed object
     * @param obj
     *      the object to expose
     */
    expose: function(applicationId, objId, obj) {
        this.exposedObjects[applicationId] = this.exposedObjects[applicationId] || {};
        this.exposedObjects[applicationId][objId] = obj;
    },

    /**
     * Get an exposed object
     *
     * @param applicationId
     *      the id of the application that exposed object
     * @param objId
     *      the id of the exposed object
     *
     * @returns the object
     */
    getExposed: function(applicationId, objId) {
        var appObjects = this.exposedObjects[applicationId];
        if (rock.isNullOrUndefined(appObjects)) {
            return null;
        } else {
            return appObjects[objId];
        }
    }
};
