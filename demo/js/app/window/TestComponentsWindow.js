rock.namespace('app.window');

/**
 * Test components window
 *
 * @param windowSystem
 *
 * @constructor
 * @abstract
 *
 * @extends app.window.BackWindow
 */
app.window.TestComponentsWindow = function (windowSystem) {
    rock.super_(this, arguments);

    this.HTML_LABEL_COMPONENT_ID = 'htmlLabelComponent';
    this.HTML_BUTTON_COMPONENT_ID = 'htmlButtonComponent';
    this.LABEL_COMPONENT_ID = 'labelComponent';
    this.BUTTON_COMPONENT_ID = 'buttonComponent';

    this.addComponents();
};

rock.extends_(app.window.TestComponentsWindow, app.window.BackWindow);

app.window.TestComponentsWindow.prototype.addComponents = function () {
    // HTML Label Component
    var htmlLabelComponentColor = new rock.graphics.Color(0, 0, 255);
    var htmlLabelComponentFont = new rock.graphics.Font('Arial', 18);
    var htmlLabelComponent = new rock.window.component.html.HTMLLabel(this, 'HTML_LABEL_COMPONENT', true,
        htmlLabelComponentFont, htmlLabelComponentColor);
    htmlLabelComponent.setId(this.HTML_LABEL_COMPONENT_ID);
    htmlLabelComponent.setX(130);
    htmlLabelComponent.setY(60);
    htmlLabelComponent.addEventListener(rock.constants.ROCK_EVENT_CLICK,
        rock.createEventHandler(this, this.handleOnHTMLLabelComponentClick));
    this.addComponent(htmlLabelComponent);

    // HTML Button Component
    var htmlButtonComponent = new rock.window.component.html.HTMLButton(this, 'HTML_BUTTON_COMPONENT', true);
    htmlButtonComponent.setId(this.HTML_BUTTON_COMPONENT_ID);
    htmlButtonComponent.setX(130);
    htmlButtonComponent.setY(110);
    htmlButtonComponent.setBackgroundColor(new rock.graphics.Color(0, 255, 0));
    htmlButtonComponent.addEventListener(rock.constants.ROCK_EVENT_CLICK,
        rock.createEventHandler(this, this.handleOnHTMLButtonComponentClick));
    this.addComponent(htmlButtonComponent);

    // Label
    var labelComponentColor = new rock.graphics.Color(0, 0, 255);
    var labelComponentFont = new rock.graphics.Font('Arial', 18);
    var labelComponent = new rock.window.component.Label(this, 'LABEL_COMPONENT', true,
        labelComponentFont, labelComponentColor);
    labelComponent.setId(this.LABEL_COMPONENT_ID);
    labelComponent.setX(130);
    labelComponent.setY(160);
    labelComponent.addEventListener(rock.constants.ROCK_EVENT_CLICK,
        rock.createEventHandler(this, this.handleOnLabelComponentClick));
    this.addComponent(labelComponent);

    // Button
    var buttonComponent = new rock.window.component.Button(this, 'BUTTON_COMPONENT', true);
    buttonComponent.setId(this.BUTTON_COMPONENT_ID);
    buttonComponent.setX(130);
    buttonComponent.setY(210);
    buttonComponent.setBackgroundColor(new rock.graphics.Color(255, 0, 0));
    buttonComponent.setOnMouseOverColor(new rock.graphics.Color(220, 0, 0));
    buttonComponent.addEventListener(rock.constants.ROCK_EVENT_CLICK,
        rock.createEventHandler(this, this.handleOnButtonComponentClick));
    this.addComponent(buttonComponent);

    // Image
    var imageComponent = new rock.window.component.Image(this, app.constants.RES_ID_IMAGE_COMPONENT, true);
    imageComponent.setId('imageComponent');
    imageComponent.setX(130);
    imageComponent.setY(270);
    imageComponent.addEventListener(rock.constants.ROCK_EVENT_CLICK, rock
        .createEventHandler(this, this.handleOnImageComponentClick));
    this.addComponent(imageComponent);

    var changeTextFontColorButton = new rock.window.component.Button(this, 'CHANGE_TEXT_BUTTON', true);
    changeTextFontColorButton.setId('changeTextFontColorButton');
    changeTextFontColorButton.setX(130);
    changeTextFontColorButton.setY(400);
    changeTextFontColorButton.addEventListener(rock.constants.ROCK_EVENT_CLICK,
        rock.createEventHandler(this, this.handleOnChangeTextFontColorButtonClick));
    this.addComponent(changeTextFontColorButton);
};

app.window.TestComponentsWindow.prototype.handleOnHTMLLabelComponentClick = function (event) {
    alert(this.application.getResourceManager().getString('HTML_LABEL_COMPONENT_ALERT'));
};

app.window.TestComponentsWindow.prototype.handleOnHTMLButtonComponentClick = function (event) {
    alert(this.application.getResourceManager().getString('HTML_BUTTON_COMPONENT_ALERT'));
};

app.window.TestComponentsWindow.prototype.handleOnLabelComponentClick = function (event) {
    alert(this.application.getResourceManager().getString('LABEL_COMPONENT_ALERT'));
};

app.window.TestComponentsWindow.prototype.handleOnButtonComponentClick = function (event) {
    alert(this.application.getResourceManager().getString('BUTTON_COMPONENT_ALERT'));
};

app.window.TestComponentsWindow.prototype.handleOnImageComponentClick = function (event) {
    alert(this.application.getResourceManager().getString('IMAGE_COMPONENT_ALERT'));
};

app.window.TestComponentsWindow.prototype.handleOnChangeTextFontColorButtonClick = function (event) {
    this.changeTextFontColor(this.HTML_LABEL_COMPONENT_ID);
    this.changeTextFontColor(this.HTML_BUTTON_COMPONENT_ID);
    this.changeTextFontColor(this.LABEL_COMPONENT_ID);
    this.changeTextFontColor(this.BUTTON_COMPONENT_ID);
};

/**
 * This function is awful... I won't recognize that I have coded it
 */
app.window.TestComponentsWindow.prototype.changeTextFontColor = function (id) {
    var font = new rock.graphics.Font('Times New Roman', 18);
    var color = new rock.graphics.Color(255, 255, 255);

    var component = this.getComponent(id);
    component.setText('DUMMY_TEXT', true);
    component.setFont(font);
    component.setColor(color);
    this.redraw();
}