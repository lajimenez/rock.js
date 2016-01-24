rock.namespace('app.test.inheritance');

/**
 * Class B
 *
 * @extends {app.test.inheritance.ClassA}
 *
 * @author Luis Alberto Jiménez
 */
app.test.inheritance.ClassB = function () {
    // Declare listener before call 'rock.super_'
    this.dummyDispatcher2 = new app.test.inheritance.DummyEventDispatcher();
    this.dummyEventReceivedClassB2 = false;
    this.dummyDispatcher2.addEventListener(app.test.inheritance.DummyEventDispatcher.DUMMY_EVENT,
        rock.createEventHandler(this, this.handleOnDummyEventClassB2));

    rock.super_(this);
    this.valueB = 'BBBBB';
    this.doSomethingParamClassB = null;
    this.whoIamB = null;
    this.whoIamBParam = null;

    this.dummyEventReceivedClassB = false;
    this.dummyDispatcher.addEventListener(app.test.inheritance.DummyEventDispatcher.DUMMY_EVENT,
        rock.createEventHandler(this, this.handleOnDummyEventClassB));

    this.setWhoIAmB('paramB');
};

rock.extends_(app.test.inheritance.ClassB, app.test.inheritance.ClassA);

app.test.inheritance.ClassB.prototype.function2 = function () {

};

app.test.inheritance.ClassB.prototype.doSomething = function (param) {
    rock.super_method(this, app.test.inheritance.ClassB, 'doSomething', arguments);
    this.doSomethingParamClassB = param;
};

app.test.inheritance.ClassB.prototype.handleOnDummyEventClassB = function () {
    this.dummyEventReceivedClassB = true;
};

app.test.inheritance.ClassB.prototype.handleOnDummyEventClassB2 = function () {
    this.dummyEventReceivedClassB2 = true;
};

app.test.inheritance.ClassB.prototype.dispatchDummyEvent2 = function () {
    this.dummyDispatcher2.dispatchDummyEvent();
};

app.test.inheritance.ClassB.prototype.setWhoIAmB = function (param) {
    this.whoIamB = this;
    this.whoIamBParam = param;
};