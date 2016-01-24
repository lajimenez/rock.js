rock.namespace('rock.graphics.engine.renderer.webgl');

/**
 * Base class for use to render elements in WebGL
 *
 * @param {rock.graphics.engine.webgl.WebGLContext} glContext
 *         the WebGL context
 * @param {String} vertexShaderSrc
 *         source for the vertex shader
 * @param {String} fragmentShaderSrc
 *         source for the fragment shader
 * @param {Array} attributes
 *          list of attributes in program
 * @param {Array} uniforms
 *          list of uniform in program
 * @param {Array} textures
 *          list of textures in program
 *
 * @constructor
 * @augments {rock.graphics.engine.renderer.IRenderer}
 *
 * @author Luis Alberto Jiménez
 */
rock.graphics.engine.renderer.webgl.Renderer = function (glContext, vertexShaderSrc, fragmentShaderSrc,
                                                              attributes, uniforms, textures) {
    this.glContext = glContext;
    this.program =
        new rock.graphics.engine.renderer.webgl.program.CacheProgram(
            glContext, vertexShaderSrc, fragmentShaderSrc, attributes, uniforms, textures);
};

rock.implements_(rock.graphics.engine.renderer.webgl.Renderer, rock.graphics.engine.renderer.IRenderer);
