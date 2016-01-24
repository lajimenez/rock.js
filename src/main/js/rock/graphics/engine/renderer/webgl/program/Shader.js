rock.namespace('rock.graphics.engine.renderer.webgl.program');

/**
 * Represents a WebGL shader
 *
 * @param {rock.graphics.engine.webgl.WebGLContext} glContext
 *         the WebGL context
 * @param {String} src
 *         the source of the shader
 * @param {String} type
 *         the type of the shader. Must be [VERTEX_SHADER | FRAGMENT_SHADER]
 *
 * @constructor
 *
 * @author Luis Alberto Jiménez
 */
rock.graphics.engine.renderer.webgl.program.Shader = function (glContext, src, type) {
    this.glContext = glContext;
    this.src = src;
    this.type = type;
    this.compiled = false;
    this.glShader = null;
};

/**
 * Vertex shader type constant
 */
rock.graphics.engine.renderer.webgl.program.Shader.VERTEX_SHADER = 'VERTEX_SHADER';

/**
 * Fragment shader type constant
 */
rock.graphics.engine.renderer.webgl.program.Shader.FRAGMENT_SHADER = 'FRAGMENT_SHADER';

/**
 * Compile the shader
 */
rock.graphics.engine.renderer.webgl.program.Shader.prototype.compile = function () {
    var gl = this.glContext.getHTMLContext();

    var glType = gl.VERTEX_SHADER;
    if (this.type === rock.graphics.engine.renderer.webgl.program.Shader.FRAGMENT_SHADER) {
        glType = gl.FRAGMENT_SHADER;
    }

    this.glShader = rock.util.WebGlUtils.createAndCompileShader(gl, glType, this.src);
    this.compiled = true;
};

/**
 * Get the source
 */
rock.graphics.engine.renderer.webgl.program.Shader.prototype.getSrc = function() {
    return this.src;
};

/**
 * Get the type
 */
rock.graphics.engine.renderer.webgl.program.Shader.prototype.getType = function() {
    return this.type;
};

/**
 * Get if the shader has been compiled or not
 */
rock.graphics.engine.renderer.webgl.program.Shader.prototype.isCompiled = function() {
    return this.compiled;
};

/**
 * Get the value
 */
rock.graphics.engine.renderer.webgl.program.Shader.prototype.getGlShader = function() {
    return this.glShader;
};