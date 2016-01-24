rock.namespace('rock.util');

/**
 * WebGL utils class
 *
 * @constructor
 * @author Luis Alberto Jiménez
 */
rock.util.WebGlUtils = {
    /**
     * Create and compile a shader
     *
     * @param gl
     *            the WebGL context
     * @param type
     *            the type of the shader {gl.VERTEX_SHADER, gl.FRAGMENT_SHADER}
     * @param src
     *            the shader source
     * @returns the shader
     */
    createAndCompileShader: function (gl, type, src) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, src);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS) && !gl.isContextLost()) {
            // var shaderInfoLog = gl.getShaderInfoLog(shader);
            throw new rock.error.RockError(rock.resource.rockResourceManager.getString('SHADER_NOT_COMPILED'));
        }
        return shader;
    },

    /**
     * Creates a new program
     *
     * @param gl
     *            the webgl context
     * @param vertexShader
     *            the vertex shader to use in the program
     * @param fragmentShader
     *            the fragment shader to use in the program
     * @returns the program
     */
    createProgram: function (gl, vertexShader, fragmentShader) {
        var program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        this.linkProgram(gl, program);
        return program;
    },

    /**
     * Links a program
     *
     * @param gl
     *            the webgl context
     * @param program
     *            the program to link
     */
    linkProgram: function (gl, program) {
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS) && !gl.isContextLost()) {
            // gl.getProgramInfoLog(program);
            throw new rock.error.RockError(rock.resource.rockResourceManager.getString('PROGRAM_NOT_LINKED'));
        }
    },

    /**
     * Populate an attribute in a GLSL program. The buffer used for populating
     * attribute will be bound.
     *
     * @param gl
     *            the WebGL context
     * @param program
     *            the program that have the attribute
     * @param attribute
     *            attribute name
     * @param vertices
     *            array of vertices
     * @param dimensions
     *            dimensions of the vertices
     * @returns {WebGLBuffer} the buffer used for populate attribute
     */
    populateArrayBufferAttribute: function (gl, program, attribute, vertices, dimensions) {
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        var attribLocation = gl.getAttribLocation(program, attribute);
        gl.enableVertexAttribArray(attribLocation);
        gl.vertexAttribPointer(attribLocation, dimensions, gl.FLOAT, gl.FALSE, 0, 0);

        return buffer;
    },

    /**
     * Populate a indexes buffer used to draw elements. The buffer created will
     * be bound
     *
     * @param gl
     *            the WebGL context
     * @param indexes
     *            array with indexes
     *
     * @returns {WebGLBuffer} the buffer created to draw
     */
    populateElementArrayBuffer: function (gl, indexes) {
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexes), gl.STATIC_DRAW);
        return buffer;
    },

    /**
     * Create and populate a texture
     *
     * @param gl
     *            the WebGL context
     * @param {rock.graphics.Image} image
     *            the image used for the texture
     *
     * @returns {WebGLTexture} the texture created
     */
    populateTexture: function (gl, image) {
        // Create a texture.
        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        // Configure how to draw texture
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

        // Upload the image into the texture.
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
            image.getHTMLImage());
        return texture;
    },

    /**
     * Disable all vertex attribute in a program
     *
     * @param gl
     *            the WebGL context
     * @param program
     *            the program to disable vertext attribute
     */
    disableAllVertexAttribArray : function (gl, program) {
        var currentAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
        var i;
        for (i = 0; i < currentAttributes; i++) {
            gl.disableVertexAttribArray(i);
        }
    }
};
