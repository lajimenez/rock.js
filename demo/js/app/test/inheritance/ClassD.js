rock.namespace('app.test.inheritance');

/**
 * Class D
 *
 * @extends {app.test.inheritance.ClassB}
 * @implements {app.test.inheritance.Interface3}
 * @implements {app.test.inheritance.Interface4}
 *
 * @author Luis Alberto Jiménez
 */
app.test.inheritance.ClassD = function () {
    rock.super_(this);
    this.valueD = 'DDDDDD';
};

rock.extends_(app.test.inheritance.ClassD, app.test.inheritance.ClassB);

rock.implements_(app.test.inheritance.ClassD, app.test.inheritance.Interface3);
rock.implements_(app.test.inheritance.ClassD, app.test.inheritance.Interface4);

app.test.inheritance.ClassD.prototype.function3 = function () {

};