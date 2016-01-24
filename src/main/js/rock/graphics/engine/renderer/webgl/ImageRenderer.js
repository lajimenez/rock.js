rock.namespace('rock.graphics.engine.renderer.webgl');

/**
 * Render an image
 *
 * @param {rock.graphics.engine.webgl.WebGLContext} glContext
 *         the WebGL context
 *
 * @constructor
 * @extends {rock.graphics.engine.renderer.webgl.GenericRenderer}
 *
 * @author Luis Alberto Jiménez
 */
rock.graphics.engine.renderer.webgl.ImageRenderer = function (glContext) {
    this.ATTRIBUTE_VERTICES = 'a_vertices';
    this.ATTRIBUTE_TEXCOORD = 'a_texCoord';
    this.UNIFORM_RESOLUTION = 'u_resolution';
    this.UNIFORM_IMAGE = 'u_image';

    var attributes = [this.ATTRIBUTE_VERTICES, this.ATTRIBUTE_TEXCOORD];
    var uniforms = [this.UNIFORM_RESOLUTION];
    var textures = [this.UNIFORM_IMAGE];

    var superParams =[
        glContext,
        rock.graphics.engine.renderer.webgl.ImageRenderer.vertexShaderSrc,
        rock.graphics.engine.renderer.webgl.ImageRenderer.fragmentShaderSrc,
        attributes,
        uniforms,
        textures
    ];
    rock.super_(this, superParams);
};

rock.extends_(rock.graphics.engine.renderer.webgl.ImageRenderer, rock.graphics.engine.renderer.webgl.GenericRenderer);

/**
 * @see rock.graphics.engine.renderer.webgl.GenericRenderer#populateAttributes
 * @override
 */
rock.graphics.engine.renderer.webgl.ImageRenderer.prototype.populateAttributes = function (renderable) {
    var program = this.program;
    program.populateAttribute(this.ATTRIBUTE_VERTICES, renderable.getVertices(), 2);
    program.populateAttribute(this.ATTRIBUTE_TEXCOORD, renderable.getTextureCoordinates(), 2);
};

/**
 * @see rock.graphics.engine.renderer.webgl.GenericRenderer#populateTextures
 * @override
 */
rock.graphics.engine.renderer.webgl.ImageRenderer.prototype.populateTextures = function (renderable) {
    var program = this.program;
    program.populateTexture(this.UNIFORM_IMAGE, renderable.getImage());
};

/**
 * @see rock.graphics.engine.renderer.webgl.GenericRenderer#setUniforms
 * @override
 */
rock.graphics.engine.renderer.webgl.ImageRenderer.prototype.setUniforms = function (renderable) {
    var gl = this.glContext.getHTMLContext();
    var program = this.program;
    gl.uniform2f(program.getUniformLocation(this.UNIFORM_RESOLUTION), renderable.getWidth(), renderable.getHeight());
};

/**
 * Vertex shader source
 */
rock.graphics.engine.renderer.webgl.ImageRenderer.vertexShaderSrc = ''
+ ' attribute vec2 a_vertices;                                           \n'
+ ' attribute vec2 a_texCoord;                                           \n'
+ ' uniform vec2 u_resolution;                                           \n'
+ ' varying vec2 v_texCoord;                                             \n'
+ ' void main() {                                                        \n'
+ '     vec2 zeroToOne = a_vertices / u_resolution;                      \n'
+ '     vec2 zeroToTwo = zeroToOne * 2.0;                                \n'
+ '     vec2 clipSpace = zeroToTwo - 1.0;                                \n'
+ '     gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);               \n'
+ '     v_texCoord = a_texCoord;                                         \n'
+ ' }                                                                    \n';

/**
 * Fragment shader source
 */
rock.graphics.engine.renderer.webgl.ImageRenderer.fragmentShaderSrc = ''
+ ' precision mediump float;                                             \n'
+ ' uniform sampler2D u_image;                                           \n'
+ ' varying vec2 v_texCoord;                                             \n'
+ ' void main() {                                                        \n'
+ '     gl_FragColor = texture2D(u_image, v_texCoord);                   \n'
+ ' }                                                                    \n';