rock.namespace('rock.graphics.engine.renderer.webgl.program');

/**
 * Represents a WebGL program
 *
 * @param {rock.graphics.engine.webgl.WebGLContext} glContext
 *         the WebGL context
 * @param {String} vertexShaderSrc
 *         source for the vertex shader
 * @param {String} fragmentShaderSrc
 *         source for the fragment shader
 *
 * @constructor
 *
 * @author Luis Alberto Jiménez
 */
rock.graphics.engine.renderer.webgl.program.Program = function (glContext, vertexShaderSrc, fragmentShaderSrc) {
    this.glContext = glContext;
    this.vertexShader = null;
    this.fragmentShader = null;
    this.linked = false;
    this.glProgram = null;
    this.createProgram(vertexShaderSrc, fragmentShaderSrc);

    // Handle context events
    var app = glContext.getApplication();
    app.addEventListener(rock.constants.ROCK_EVENT_CONTEXT_RESTORED, rock.createEventHandler(this, this.onContextRestored));
};

/**
 * Set the renderer as active
 */
rock.graphics.engine.renderer.webgl.program.Program.prototype.useProgram = function () {
    var gl = this.glContext.getHTMLContext();
    gl.useProgram(this.getGlProgram());
};

/**
 * Create the WebGL program. Shaders will be created and compiled and the program will be linked.
 *
 * @param vertexShaderSrc
 * @param fragmentShaderSrc
 *
 * @private
 */
rock.graphics.engine.renderer.webgl.program.Program.prototype.createProgram = function (vertexShaderSrc,
                                                                                        fragmentShaderSrc) {
    this.vertexShader = null;
    this.fragmentShader = null;
    this.linked = false;
    this.glProgram = null;

    this.createShaders(vertexShaderSrc, fragmentShaderSrc);
    this.createProgramAndLink();
};

/**
 * Create the shaders
 *
 * @private
 */
rock.graphics.engine.renderer.webgl.program.Program.prototype.createShaders =
        function (vertexShaderSrc, fragmentShaderSrc) {
    var glContext = this.glContext;
    this.vertexShader =
        new rock.graphics.engine.renderer.webgl.program.Shader(
            glContext, vertexShaderSrc, rock.graphics.engine.renderer.webgl.program.Shader.VERTEX_SHADER);
    this.fragmentShader =
        new rock.graphics.engine.renderer.webgl.program.Shader(
            glContext, fragmentShaderSrc, rock.graphics.engine.renderer.webgl.program.Shader.FRAGMENT_SHADER);
};

/**
 * Link the program
 *
 * @private
 */
rock.graphics.engine.renderer.webgl.program.Program.prototype.createProgramAndLink = function () {
    var gl = this.glContext.getHTMLContext();

    var vertexShader = this.vertexShader;
    var fragmentShader = this.fragmentShader;
    if (!vertexShader.isCompiled()) {
        vertexShader.compile();
    }
    if (!fragmentShader.isCompiled()) {
        fragmentShader.compile();
    }

    this.glProgram = rock.util.WebGlUtils.createProgram(gl, vertexShader.getGlShader(), fragmentShader.getGlShader());
    this.linked = true;
};

/**
 * Function for handling context restored
 *
 * @private
 */
rock.graphics.engine.renderer.webgl.program.Program.prototype.onContextRestored = function (event) {
    this.restore();
};

/**
 * Restore the program. The WebGL program will be re-created
 */
rock.graphics.engine.renderer.webgl.program.Program.prototype.restore = function () {
    var vertexShader = this.vertexShader;
    var fragmentShader = this.fragmentShader;

    if (vertexShader == null || fragmentShader == null) {
        return;
    }

    this.createProgram(vertexShader.getSrc(), fragmentShader.getSrc());
};

/**
 * Get the value
 */
rock.graphics.engine.renderer.webgl.program.Program.prototype.getVertexShader = function() {
    return this.vertexShader;
};

/**
 * Get the value
 */
rock.graphics.engine.renderer.webgl.program.Program.prototype.getFragmentShader = function() {
    return this.fragmentShader;
};

/**
 * Get the value
 */
rock.graphics.engine.renderer.webgl.program.Program.prototype.getLinked = function() {
    return this.linked;
};

/**
 * Get the value
 */
rock.graphics.engine.renderer.webgl.program.Program.prototype.getGlProgram = function() {
    return this.glProgram;
};