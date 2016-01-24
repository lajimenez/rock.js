rock.namespace('app.test.inheritance');

/**
 * Inheritance test
 *
 * @constructor
 * @extends rock.test.TestSuite
 * @author Luis Alberto Jiménez
 */
app.test.inheritance.InheritanceTest = function () {
};

rock.extends_(app.test.inheritance.InheritanceTest, rock.test.TestSuite);

app.test.inheritance.InheritanceTest.prototype.setUp = function () {
    this.classA = new app.test.inheritance.ClassA();
    this.classB = new app.test.inheritance.ClassB();
    this.classC = new app.test.inheritance.ClassC();
    // really ClassD is abstract so it shouldn't be a 'new'...
    this.classD = new app.test.inheritance.ClassD();
};

app.test.inheritance.InheritanceTest.prototype.testInstanceOfJavascriptTypes = function () {
    this.assertTrue(rock.instanceof_(this.classA, 'object'));
    this.assertTrue(rock.instanceof_(this.classA, Object));
    this.assertFalse(rock.instanceof_(this.classA, Array));

    var testObject = {};
    this.assertTrue(rock.instanceof_(testObject, 'object'));
    this.assertTrue(rock.instanceof_(testObject, Object));
    this.assertFalse(rock.instanceof_(this.classA, Array));

    var testArray = [];
    this.assertTrue(rock.instanceof_(testArray, Array));
    this.assertTrue(rock.instanceof_(testArray, Object));

    var testDate = new Date();
    this.assertTrue(rock.instanceof_(testDate, Date));
    this.assertTrue(rock.instanceof_(testDate, Object));

    var testFunction = function () {};
    this.assertTrue(rock.instanceof_(testFunction, 'function'));
    this.assertTrue(rock.instanceof_(testFunction, Function));
    this.assertFalse(rock.instanceof_(testFunction, Object));

    var testInt = 1;
    this.assertTrue(rock.instanceof_(testInt, 'number'));
    this.assertTrue(rock.instanceof_(testInt, Number));
    this.assertFalse(rock.instanceof_(testInt, Object));

    var testFloat = 1.4;
    this.assertTrue(rock.instanceof_(testFloat, 'number'));
    this.assertTrue(rock.instanceof_(testFloat, Number));
    this.assertFalse(rock.instanceof_(testFloat, Object));

    var testString = 'js string';
    this.assertTrue(rock.instanceof_(testString, 'string'));
    this.assertTrue(rock.instanceof_(testString, String));
    this.assertFalse(rock.instanceof_(testString, Object));

    var testBoolean = true;
    this.assertTrue(rock.instanceof_(testBoolean, 'boolean'));
    this.assertTrue(rock.instanceof_(testBoolean, Boolean));
    this.assertFalse(rock.instanceof_(testBoolean, Object));
};

app.test.inheritance.InheritanceTest.prototype.testInstanceOfExtends = function () {
    this.assertTrue(rock.instanceof_(this.classB, app.test.inheritance.ClassA));

    this.assertTrue(rock.instanceof_(this.classC, app.test.inheritance.ClassA));
    this.assertTrue(rock.instanceof_(this.classC, app.test.inheritance.ClassB));

    this.assertTrue(rock.instanceof_(this.classD, app.test.inheritance.ClassA));
    this.assertTrue(rock.instanceof_(this.classD, app.test.inheritance.ClassB));

    this.assertFalse(rock.instanceof_(this.classD, app.test.inheritance.ClassC));
};

app.test.inheritance.InheritanceTest.prototype.testInstanceOfImplements = function () {
    this.assertTrue(rock.instanceof_(this.classA, app.test.inheritance.Interface1));
    this.assertTrue(rock.instanceof_(this.classA, app.test.inheritance.Interface2));

    this.assertTrue(rock.instanceof_(this.classB, app.test.inheritance.Interface1));
    this.assertTrue(rock.instanceof_(this.classB, app.test.inheritance.Interface2));

    this.assertTrue(rock.instanceof_(this.classC, app.test.inheritance.Interface1));
    this.assertTrue(rock.instanceof_(this.classC, app.test.inheritance.Interface2));
    this.assertTrue(rock.instanceof_(this.classC, app.test.inheritance.Interface3));

    this.assertTrue(rock.instanceof_(this.classD, app.test.inheritance.Interface1));
    this.assertTrue(rock.instanceof_(this.classD, app.test.inheritance.Interface2));
    this.assertTrue(rock.instanceof_(this.classD, app.test.inheritance.Interface3));
    this.assertTrue(rock.instanceof_(this.classD, app.test.inheritance.Interface4));

    this.assertFalse(rock.instanceof_(this.classA, app.test.inheritance.Interface3));
    this.assertFalse(rock.instanceof_(this.classC, app.test.inheritance.Interface4));
};

/**
 * Objects have methods and properties from extended/implemented class
 */
app.test.inheritance.InheritanceTest.prototype.testSuper = function () {

    this.assertTrue(rock.hasProperty(this.classA, 'valueA'));

    this.assertTrue(rock.hasProperty(this.classB, 'valueA'));
    this.assertTrue(rock.hasProperty(this.classB, 'valueB'));
    this.assertFalse(rock.hasProperty(this.classB, 'valueC'));

    this.assertTrue(rock.hasMethod(this.classA, 'function1'));

    this.assertTrue(rock.hasMethod(this.classB, 'function1'));
    this.assertTrue(rock.hasMethod(this.classB, 'function2'));

    this.assertTrue(rock.hasMethod(this.classC, 'function1'));
    this.assertTrue(rock.hasMethod(this.classC, 'function2'));
    this.assertTrue(rock.hasMethod(this.classC, 'function3'));
    this.assertFalse(rock.hasMethod(this.classC, 'function4'));

    this.assertTrue(rock.hasMethod(this.classD, 'function1'));
    this.assertTrue(rock.hasMethod(this.classD, 'function2'));
    this.assertTrue(rock.hasMethod(this.classD, 'function3'));
    this.assertTrue(rock.hasMethod(this.classD, 'function4'));
    this.assertEquals(rock.abstract_, this.classD['function4']);
    this.assertNotEquals(rock.abstract_, this.classD['function3']);
};

/**
 * Call overrode method on constructor
 */
app.test.inheritance.InheritanceTest.prototype.testOverride = function () {
    this.assertEquals('XXXXX', this.classA['value']);
    this.assertEquals('YYYYY', this.classC['value']);
};


/**
 * Call method that calls a super implementation
 */
app.test.inheritance.InheritanceTest.prototype.testCallSuperMethod = function () {
    this.assertNull(this.classC['doSomethingParamClassA']);
    this.assertNull(this.classC['doSomethingParamClassB']);
    this.assertNull(this.classC['doSomethingParamClassC']);

    this.classC.doSomething('PPPPP');

    this.assertEquals('PPPPP', this.classC['doSomethingParamClassA']);
    this.assertEquals('PPPPP', this.classC['doSomethingParamClassB']);
    this.assertEquals('PPPPP', this.classC['doSomethingParamClassC']);

    var errorMsg = rock.resource.rockResourceManager.getString('INHERITANCE_NO_SUPER_METHOD_IN_SUPERCLASS');
    this.assertError(errorMsg, this.classA, this.classA.callSuperError, []);
    this.assertError(errorMsg, this.classC, this.classC.callSuperError2, []);
};

/**
 * Adding listener on constructor
 */
app.test.inheritance.InheritanceTest.prototype.testAddEventListenerOnConstructor = function () {
    this.assertFalse(this.classA['dummyEventReceivedClassA']);
    this.classA.dispatchDummyEvent();
    this.assertTrue(this.classA['dummyEventReceivedClassA']);

    this.assertFalse(this.classB['dummyEventReceivedClassA']);
    this.assertFalse(this.classB['dummyEventReceivedClassB']);
    this.classB.dispatchDummyEvent();
    this.assertTrue(this.classB['dummyEventReceivedClassA']);
    this.assertTrue(this.classB['dummyEventReceivedClassB']);

    this.assertFalse(this.classC['dummyEventReceivedClassA']);
    this.assertFalse(this.classC['dummyEventReceivedClassB']);
    this.assertFalse(this.classC['dummyEventReceivedClassC']);
    this.classC.dispatchDummyEvent();
    this.assertTrue(this.classC['dummyEventReceivedClassA']);
    this.assertTrue(this.classC['dummyEventReceivedClassB']);
    this.assertTrue(this.classC['dummyEventReceivedClassC']);

    this.assertFalse(this.classC['dummyEventReceivedClassB2']);
    this.classC.dispatchDummyEvent2();
    this.assertTrue(this.classC['dummyEventReceivedClassB2']);

};

/**
 * Call method using this on constructor
 */
app.test.inheritance.InheritanceTest.prototype.testCallMethodUsingThisInConstructor = function () {
    this.assertEquals(this.classA, this.classA['whoIamA']);
    this.assertEquals('paramA', this.classA['whoIamAParam']);

    this.assertEquals(this.classB, this.classB['whoIamA']);
    this.assertEquals(this.classB, this.classB['whoIamB']);
    this.assertEquals('paramA', this.classB['whoIamAParam']);
    this.assertEquals('paramB', this.classB['whoIamBParam']);

    this.assertEquals(this.classC, this.classC['whoIamA']);
    this.assertEquals(this.classC, this.classC['whoIamB']);
    this.assertEquals(this.classC, this.classC['whoIamC']);
};
