rock.namespace('rock.audio');

/**
 * Represents an audio
 *
 * @param HTMLAudio
 *            an audio {HTML audio}
 * @constructor
 *
 * @author Luis Alberto Jiménez
 */
rock.audio.Audio = function (HTMLAudio) {
    this.HTMLAudio = HTMLAudio;
};

/**
 * Get the audio
 *
 * @returns the value
 */
rock.audio.Audio.prototype.getHTMLAudio = function () {
    return this.HTMLAudio;
};

rock.audio.Audio.prototype.play = function () {
   this.HTMLAudio.play();
};