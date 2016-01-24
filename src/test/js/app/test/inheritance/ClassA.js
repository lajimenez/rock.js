rock.namespace('app.test.inheritance');

/**
 * Class A
 *
 * @implements {app.test.inheritance.Interface2}
 *
 * @author Luis Alberto Jiménez
 */
app.test.inheritance.ClassA = function () {
    this.value = null;
    this.valueA = 'AAAAA';
    this.doSomethingParamClassA = null;
    this.whoIamA = null;
    this.whoIamAParam = null;
    this.setValue();

    this.dummyDispatcher = new app.test.inheritance.DummyEventDispatcher();
    this.dummyEventReceivedClassA = false;
    this.dummyDispatcher.addEventListener(app.test.inheritance.DummyEventDispatcher.DUMMY_EVENT,
        rock.createEventHandler(this, this.handleOnDummyEventClassA));

    this.setWhoIAmA('paramA');
};

rock.implements_(app.test.inheritance.ClassA, app.test.inheritance.Interface2);

app.test.inheritance.ClassA.prototype.function1 = function () {

};

app.test.inheritance.ClassA.prototype.setValue = function () {
    this.value = 'XXXXX';
};

app.test.inheritance.ClassA.prototype.doSomething = function (param) {
    this.doSomethingParamClassA = param;
};

app.test.inheritance.ClassA.prototype.callSuperError = function (param) {
    rock.super_method(this, app.test.inheritance.ClassA, 'callSuperError', arguments);
};

app.test.inheritance.ClassA.prototype.dispatchDummyEvent = function () {
    this.dummyDispatcher.dispatchDummyEvent();
};

app.test.inheritance.ClassA.prototype.handleOnDummyEventClassA = function () {
    this.dummyEventReceivedClassA = true;
};

app.test.inheritance.ClassA.prototype.setWhoIAmA = function (param) {
    this.whoIamA = this;
    this.whoIamAParam = param;
};