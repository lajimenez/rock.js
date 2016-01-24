rock.namespace('app.test.inheritance');

/**
 * Interface 3
 *
 * @author Luis Alberto Jiménez
 */
app.test.inheritance.Interface3 = function () {
};

rock.interface_(app.test.inheritance.Interface3);

app.test.inheritance.Interface3.prototype.function3 = rock.abstract_;
