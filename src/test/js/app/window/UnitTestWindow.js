rock.namespace('app.window');

/**
 * Window for test
 *
 * @constructor
 * @extends app.window.BackWindow
 *
 * @author Luis Alberto Jiménez
 */
app.window.UnitTestWindow = function (windowSystem) {
    rock.super_(this, arguments);

    this.testRunner = new rock.test.TestRunner();
    this.addComponents();
};

rock.extends_(app.window.UnitTestWindow, app.window.BackWindow);

app.window.UnitTestWindow.prototype.addComponents = function () {
    var itsSadLabel = new rock.window.component.html.HTMLLabel(this, 'UNIT_TEST_LABEL', true);
    itsSadLabel.setId('itsSadLabel');
    itsSadLabel.setX(200);
    itsSadLabel.setY(60);
    this.addComponent(itsSadLabel);

    var inheritanceTestButton = new rock.window.component.Button(this, 'UNIT_TEST_INHERITANCE_BUTTON', true);
    inheritanceTestButton.setId('inheritanceTestButton');
    inheritanceTestButton.setX(200);
    inheritanceTestButton.setY(100);
    inheritanceTestButton.setWidth(200);
    inheritanceTestButton.setHeight(30);
    inheritanceTestButton.addEventListener(rock.constants.ROCK_EVENT_CLICK,
        rock.createEventHandler(this, this.handleOnInheritanceTestButtonClick));
    this.addComponent(inheritanceTestButton);

    var rectangleTestButton = new rock.window.component.Button(this, 'UNIT_TEST_RECTANGLE_BUTTON', true);
    rectangleTestButton.setId('rectangleTestButton');
    rectangleTestButton.setX(200);
    rectangleTestButton.setY(140);
    rectangleTestButton.setWidth(200);
    rectangleTestButton.setHeight(30);
    rectangleTestButton.addEventListener(rock.constants.ROCK_EVENT_CLICK,
        rock.createEventHandler(this, this.handleOnRectangleTestButtonClick));
    this.addComponent(rectangleTestButton);

    var exposeTestButton = new rock.window.component.Button(this, 'UNIT_TEST_EXPOSE_BUTTON', true);
    exposeTestButton.setId('exposeTestButton');
    exposeTestButton.setX(200);
    exposeTestButton.setY(180);
    exposeTestButton.setWidth(200);
    exposeTestButton.setHeight(30);
    exposeTestButton.addEventListener(rock.constants.ROCK_EVENT_CLICK,
        rock.createEventHandler(this, this.handleOnExposeTestButtonClick));
    this.addComponent(exposeTestButton);

    var arrayTestButton = new rock.window.component.Button(this, 'UNIT_TEST_ARRAY_BUTTON', true);
    arrayTestButton.setId('arrayTestButton');
    arrayTestButton.setX(200);
    arrayTestButton.setY(220);
    arrayTestButton.setWidth(200);
    arrayTestButton.setHeight(30);
    arrayTestButton.addEventListener(rock.constants.ROCK_EVENT_CLICK,
        rock.createEventHandler(this, this.handleOnArrayTestButtonClick));
    this.addComponent(arrayTestButton);
};

app.window.UnitTestWindow.prototype.handleOnInheritanceTestButtonClick = function (event) {
    var inheritanceTest = new app.test.inheritance.InheritanceTest();
    var result = this.testRunner.runTestSuite(inheritanceTest);
    alert(result.toString());
};

app.window.UnitTestWindow.prototype.handleOnRectangleTestButtonClick = function (event) {
    var rectangleTest = new app.test.RectangleTest();
    var result = this.testRunner.runTestSuite(rectangleTest);
    alert(result.toString());
};

app.window.UnitTestWindow.prototype.handleOnExposeTestButtonClick = function (event) {
    var exposeTest = new app.test.ExposeTest();
    var result = this.testRunner.runTestSuite(exposeTest);
    alert(result.toString());
};

app.window.UnitTestWindow.prototype.handleOnArrayTestButtonClick = function (event) {
    var arrayTest = new app.test.ArrayTest();
    var result = this.testRunner.runTestSuite(arrayTest);
    alert(result.toString());
};