rock.namespace('app.test.inheritance');

/**
 * Interface 2
 *
 * @extends {app.test.inheritance.Interface1}
 *
 * @author Luis Alberto Jiménez
 */
app.test.inheritance.Interface2 = function () {
};

rock.interface_(app.test.inheritance.Interface2);

rock.extends_(app.test.inheritance.Interface2, app.test.inheritance.Interface1);

app.test.inheritance.Interface2.prototype.function2 = rock.abstract_;
