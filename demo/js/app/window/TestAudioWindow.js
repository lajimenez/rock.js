rock.namespace('app.window');

/**
 * Test audio window
 *
 * @param windowSystem
 *
 * @constructor
 * @abstract
 *
 * @extends app.window.BackWindow
 */
app.window.TestAudioWindow = function (windowSystem) {
    rock.super_(this, arguments);
    this.addComponents();
};

rock.extends_(app.window.TestAudioWindow, app.window.BackWindow);

app.window.TestAudioWindow.prototype.addComponents = function () {
    var playSoundButton = new rock.window.component.Button(this, 'SAY_HELLO_WORLD_BUTTON', true);
    playSoundButton.setId('playSoundButton');
    playSoundButton.setX(200);
    playSoundButton.setY(70);
    playSoundButton.setWidth(200);
    playSoundButton.setHeight(30);
    playSoundButton.addEventListener(rock.constants.ROCK_EVENT_CLICK,
        rock.createEventHandler(this, this.handleOnPlaySoundButtonClick));
    this.addComponent(playSoundButton);
};

app.window.TestAudioWindow.prototype.handleOnPlaySoundButtonClick = function (event) {
    var audio = this.application.getResourceManager().getAudio(app.constants.RES_ID_AUDIO_WAV);
    audio.play();
};