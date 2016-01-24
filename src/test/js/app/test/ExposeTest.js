rock.namespace('app.test');

/**
 * Expose test
 *
 * @constructor
 * @extends rock.test.TestSuite
 *
 * @author Luis Alberto Jiménez
 */
app.test.ExposeTest = function () {
};

rock.extends_(app.test.ExposeTest, rock.test.TestSuite);

app.test.ExposeTest.prototype.testExpose = function () {
    var appId = rock.util.JsUtils.generateUUID();
    var objId1 = 'ID_obj1';
    var obj1 = {
        id: objId1
    };
    var objId2 = 'ID_obj2';
    var obj2 = {
        id: objId2
    };
    rock.expose(appId, objId1, obj1);
    rock.expose(appId, objId2, obj2);

    var exposedObj1 = rock.getExposed(appId, objId1);
    this.assertNotNull(exposedObj1);
    this.assertEquals(objId1, exposedObj1.id);

    var exposedObj2 = rock.getExposed(appId, objId2);
    this.assertNotNull(exposedObj2);
    this.assertEquals(objId2, exposedObj2.id);

    this.assertNull(rock.getExposed('APPLICATION_ID_NOT_EXISTING', objId1));
    this.assertNullOrUndefined(rock.getExposed(appId, 'OBJECT_ID_NOT_EXISTING'));
};