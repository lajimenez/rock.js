rock.namespace('rock.graphics.engine.renderer.webgl');

/**
 * Render a polygon (screen coordinates)
 *
 * @param {rock.graphics.engine.webgl.WebGLContext} glContext
 *         the WebGL context
 *
 * @constructor
 * @extends {rock.graphics.engine.renderer.webgl.GenericRenderer}
 *
 * @author Luis Alberto Jiménez
 */
rock.graphics.engine.renderer.webgl.PolygonRenderer = function (glContext) {
    this.ATTRIBUTE_VERTICES = 'a_vertices';
    this.UNIFORM_RESOLUTION = 'u_resolution';
    this.UNIFORM_COLOR = 'u_color';

    var attributes = [this.ATTRIBUTE_VERTICES];
    var uniforms = [this.UNIFORM_RESOLUTION, this.UNIFORM_COLOR];
    var textures = [];

    var superParams =[
        glContext,
        rock.graphics.engine.renderer.webgl.PolygonRenderer.vertexShaderSrc,
        rock.graphics.engine.renderer.webgl.PolygonRenderer.fragmentShaderSrc,
        attributes,
        uniforms,
        textures
    ];
    rock.super_(this, superParams);
};

rock.extends_(rock.graphics.engine.renderer.webgl.PolygonRenderer, rock.graphics.engine.renderer.webgl.GenericRenderer);

/**
 * @see rock.graphics.engine.renderer.webgl.GenericRenderer#populateAttributes
 * @override
 */
rock.graphics.engine.renderer.webgl.PolygonRenderer.prototype.populateAttributes = function (renderable) {
    var program = this.program;
    program.populateAttribute(this.ATTRIBUTE_VERTICES, renderable.getVertices(), 2);
};

/**
 * @see rock.graphics.engine.renderer.webgl.GenericRenderer#populateTextures
 * @override
 */
rock.graphics.engine.renderer.webgl.PolygonRenderer.prototype.populateTextures = function (renderable) {

};

/**
 * @see rock.graphics.engine.renderer.webgl.GenericRenderer#setUniforms
 * @override
 */
rock.graphics.engine.renderer.webgl.PolygonRenderer.prototype.setUniforms = function (renderable) {
    var gl = this.glContext.getHTMLContext();
    var program = this.program;
    var color = renderable.getColor();
    gl.uniform2f(program.getUniformLocation(this.UNIFORM_RESOLUTION), renderable.getWidth(), renderable.getHeight());
    gl.uniform4f(program.getUniformLocation(this.UNIFORM_COLOR), color.getNormalizedRed(), color.getNormalizedGreen(),
        color.getNormalizedBlue(), color.getNormalizedAlpha());
};

/**
 * Vertex shader source
 */
rock.graphics.engine.renderer.webgl.PolygonRenderer.vertexShaderSrc = ''
+ ' attribute vec2 a_vertices;                                           \n'
+ ' uniform vec2 u_resolution;                                           \n'
+ ' void main() {                                                        \n'
+ '     vec2 zeroToOne = a_vertices / u_resolution;                      \n'
+ '     vec2 zeroToTwo = zeroToOne * 2.0;                                \n'
+ '     vec2 clipSpace = zeroToTwo - 1.0;                                \n'
+ '     gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);               \n'
+ ' }                                                                    \n';

/**
 * Fragment shader source
 */
rock.graphics.engine.renderer.webgl.PolygonRenderer.fragmentShaderSrc = ''
+ ' precision mediump float;                                             \n'
+ ' uniform vec4 u_color;                                                \n'
+ ' void main() {                                                        \n'
+ '     gl_FragColor = u_color;                                          \n'
+ ' }                                                                    \n';