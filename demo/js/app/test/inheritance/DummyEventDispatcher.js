rock.namespace('app.test.inheritance');

/**
 * Dummy event dispatcher
 *
 * @extends {app.test.inheritance.DummyEventDispatcher}
 *
 * @author Luis Alberto Jiménez
 */
app.test.inheritance.DummyEventDispatcher = function () {
    rock.super_(this);
};

rock.extends_(app.test.inheritance.DummyEventDispatcher, rock.event.EventDispatcher);

app.test.inheritance.DummyEventDispatcher.DUMMY_EVENT = 'DUMMY_EVENT';

app.test.inheritance.DummyEventDispatcher.prototype.dispatchDummyEvent = function () {
    this.dispatchEvent(new rock.event.Event(app.test.inheritance.DummyEventDispatcher.DUMMY_EVENT));
};