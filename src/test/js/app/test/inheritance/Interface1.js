rock.namespace('app.test.inheritance');

/**
 * Interface 1
 *
 * @author Luis Alberto Jiménez
 */
app.test.inheritance.Interface1 = function () {
};

rock.interface_(app.test.inheritance.Interface1);

app.test.inheritance.Interface1.prototype.function1 = rock.abstract_;
