rock.namespace('rock.graphics.engine.renderer.webgl');

/**
 * Generic WebGL renderer. It helps to cache locations, buffers and textures and has a generic render function.
 *
 * @param {rock.graphics.engine.webgl.WebGLContext} glContext
 *         the WebGL context
 * @param {String} vertexShaderSrc
 *         source for the wertex shader
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
 * @extends {rock.graphics.engine.renderer.webgl.Renderer}
 *
 * @author Luis Alberto Jiménez
 */
rock.graphics.engine.renderer.webgl.GenericRenderer = function (glContext, vertexShaderSrc, fragmentShaderSrc,
                                                                         attributes, uniforms, textures) {
    rock.super_(this, arguments);
    var gl = glContext.getHTMLContext();
    this.glDrawMode = gl.TRIANGLES;
};

rock.extends_(rock.graphics.engine.renderer.webgl.GenericRenderer,
    rock.graphics.engine.renderer.webgl.Renderer);

/**
 * @see rock.graphics.engine.renderer.IRenderer#render
 * @override
 */
rock.graphics.engine.renderer.webgl.GenericRenderer.prototype.render = function (renderable) {
    var program = this.program;
    program.useProgram();

    var gl = this.glContext.getHTMLContext();

    program.enableAttributes();

    this.populateAttributes(renderable);
    this.populateTextures(renderable);
    this.setUniforms(renderable);

    gl.drawArrays(this.glDrawMode, 0, renderable.getCount());

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindTexture(gl.TEXTURE_2D, null);

    program.disableAttributes();
};

/**
 * Populate attributes. This functions must be implemented in subclasses
 *
 * @param {rock.graphics.engine.renderer.webgl.GenericRenderable} renderable
 *
 * @function
 */
rock.graphics.engine.renderer.webgl.GenericRenderer.prototype.populateAttributes = rock.abstract_;

/**
 * Populate textures. This functions must be implemented in subclasses
 *
 * @param {rock.graphics.engine.renderer.webgl.GenericRenderable} renderable
 *
 * @function
 */
rock.graphics.engine.renderer.webgl.GenericRenderer.prototype.populateTextures = rock.abstract_;

/**
 * Set uniforms. This functions must be implemented in subclasses
 *
 * @param {rock.graphics.engine.renderer.webgl.GenericRenderable} renderable
 *
 * @function
 */
rock.graphics.engine.renderer.webgl.GenericRenderer.prototype.setUniforms = rock.abstract_;
