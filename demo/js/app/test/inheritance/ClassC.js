rock.namespace('app.test.inheritance');

/**
 * Class C
 *
 * @extends {app.test.inheritance.ClassB}
 * @implements {app.test.inheritance.Interface3}
 *
 * @author Luis Alberto Jiménez
 */
app.test.inheritance.ClassC = function () {
    rock.super_(this);
    this.valueC = 'CCCCC';
    this.doSomethingParamClassC = null;
    this.whoIamC = null;

    this.dummyEventReceivedClassC = false;
    this.dummyDispatcher.addEventListener(app.test.inheritance.DummyEventDispatcher.DUMMY_EVENT,
        rock.createEventHandler(this, this.handleOnDummyEventClassC));

    this.setWhoIAmC();
};

rock.extends_(app.test.inheritance.ClassC, app.test.inheritance.ClassB);

rock.implements_(app.test.inheritance.ClassC, app.test.inheritance.Interface3);

app.test.inheritance.ClassC.prototype.function2 = function () {

};

app.test.inheritance.ClassC.prototype.function3 = function () {

};

app.test.inheritance.ClassC.prototype.setValue = function () {
    this.value = 'YYYYY';
};

app.test.inheritance.ClassC.prototype.doSomething = function (param) {
    rock.super_method(this, app.test.inheritance.ClassC, 'doSomething', arguments);
    this.doSomethingParamClassC = param;
};

app.test.inheritance.ClassC.prototype.callSuperError2 = function (param) {
    rock.super_method(this, app.test.inheritance.ClassC, 'callSuperError2', arguments);
};

app.test.inheritance.ClassC.prototype.handleOnDummyEventClassC = function () {
    this.dummyEventReceivedClassC = true;
};

app.test.inheritance.ClassC.prototype.setWhoIAmC = function () {
    this.whoIamC = this;
};