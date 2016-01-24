rock.namespace('rock.graphics.engine.renderer.webgl.program');

/**
 * Represents a WebGL program. This class cache some information so we can take some advantage when using it.
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
 * @param {Boolean} [provisioningBuffers]
 *          if true, caching will also create buffers
 * @param {Boolean} [provisioningTextures]
 *          if true, caching will also create textures
 *
 * @constructor
 * @extends rock.graphics.engine.renderer.webgl.program.Program
 *
 * @author Luis Alberto Jiménez
 */
rock.graphics.engine.renderer.webgl.program.CacheProgram = function (glContext, vertexShaderSrc, fragmentShaderSrc,
                                                                attributes, uniforms, textures,
                                                                provisioningBuffers, provisioningTextures) {
    rock.super_(this, [glContext, vertexShaderSrc, fragmentShaderSrc]);

    this.attributes = null;
    this.uniforms = null;
    this.textures = null;

    this.indexes = null;

    var createBuffers = provisioningBuffers;
    if (rock.util.JsUtils.isNullOrUndefined(createBuffers)) {
        createBuffers = true;
    }
    var createTextures = provisioningTextures;
    if (rock.util.JsUtils.isNullOrUndefined(createTextures)) {
        createTextures = true;
    }

    this.cache(attributes, uniforms, textures, createBuffers, createTextures);

    // Used for restore
    this.createBuffers = createBuffers;
    this.createTextures = createTextures;
};

rock.extends_(rock.graphics.engine.renderer.webgl.program.CacheProgram,
    rock.graphics.engine.renderer.webgl.program.Program);

/**
 * Cache all elements
 *
 * @param attributes
 * @param uniforms
 * @param textures
 * @param createBuffers
 * @param createTextures
 *
 * @private
 */
rock.graphics.engine.renderer.webgl.program.CacheProgram.prototype.cache = function (attributes, uniforms, textures,
                                                                                     createBuffers, createTextures) {
    this.cacheAttributes(attributes, createBuffers);
    this.cacheUniforms(uniforms);
    this.cacheTextures(textures, createTextures);
    this.initIndexes(createBuffers);
};

/**
 * Cache the location and create a buffer for all attributes
 *
 * @param {Array} attributes
 *          list of attributes in program
 * @param createBuffers
 *
 * @private
 */
rock.graphics.engine.renderer.webgl.program.CacheProgram.prototype.cacheAttributes = function (attributes, createBuffers) {
    var gl = this.glContext.getHTMLContext();
    var glProgram = this.glProgram;
    var buffer = null;
    var i, name, location;

    this.attributes = [];

    for ( i = 0; i < attributes.length; i++) {
        name = attributes[i];
        location =  gl.getAttribLocation(glProgram, name);
        if (createBuffers) {
            buffer = gl.createBuffer();
        }
        this.attributes.push({
            name: name,
            location: location,
            buffer: buffer
        });
    }
};

/**
 * Cache the uniform locations
 *
 * @param {Array} uniforms
 *          list of uniform in program
 *
 * @private
 */
rock.graphics.engine.renderer.webgl.program.CacheProgram.prototype.cacheUniforms = function (uniforms) {
    var gl = this.glContext.getHTMLContext();
    var glProgram = this.glProgram;
    var i, name, location;

    this.uniforms = [];

    for (i = 0; i < uniforms.length; i++) {
        name = uniforms[i];
        location =  gl.getUniformLocation(glProgram, name);
        this.uniforms.push({
            name: name,
            location: location
        });
    }
};

/**
 * Cache the location and create a gl texture for all textures
 *
 * @param {Array} textures
 *          list of textures in program
 *
 * @private
 */
rock.graphics.engine.renderer.webgl.program.CacheProgram.prototype.cacheTextures = function (textures, createTextures) {
    var gl = this.glContext.getHTMLContext();
    var glProgram = this.glProgram;
    var texture = null;
    var i, name, location;

    this.textures = [];

    for (i = 0; i < textures.length; i++) {
        name = textures[i];
        location =  gl.getUniformLocation(glProgram, name);
        if (createTextures) {
            texture = gl.createTexture();
        }
        this.textures.push({
            name: name,
            location: location,
            texture: texture,
            textureUnit: i
        });
    }
};

rock.graphics.engine.renderer.webgl.program.CacheProgram.prototype.initIndexes = function (createBuffers) {
    var gl = this.glContext.getHTMLContext();
    var indexes = {};
    var buffer = null;
    if (createBuffers) {
        buffer = gl.createBuffer();
    }
    indexes.buffer = buffer;
    this.indexes = indexes;
};

/**
 * Enable all attributes
 */
rock.graphics.engine.renderer.webgl.program.CacheProgram.prototype.enableAttributes = function () {
    var gl = this.glContext.getHTMLContext();
    var attributes = this.attributes;
    var i, attribute;

    for (i = 0; i < attributes.length; i++) {
        attribute = attributes[i];
        gl.enableVertexAttribArray(attribute.location);
    }
};

/**
 * Disable all attributes
 */
rock.graphics.engine.renderer.webgl.program.CacheProgram.prototype.disableAttributes = function () {
    var gl = this.glContext.getHTMLContext();
    var attributes = this.attributes;
    var i, attribute;

    for (i = 0; i < attributes.length; i++) {
        attribute = attributes[i];
        gl.disableVertexAttribArray(attribute.location);
    }
};

/**
 * Get an element inside an array
 *
 * @param name
 *      the name element
 * @param array
 *      values
 * @returns {Object}
 *
 * @private
 */
rock.graphics.engine.renderer.webgl.program.CacheProgram.prototype.getByName = function (name, array) {
    var i, object;
    for (i = 0; i < array.length; i++) {
        object = array[i];
        if (object.name == name) {
            return object;
        }
    }
    return null;
};

/**
 * Get the uniform location
 *
 * @param {String} name
 *      uniform name to find
 * @returns the location
 */
rock.graphics.engine.renderer.webgl.program.CacheProgram.prototype.getUniformLocation = function (name) {
    var uniform = this.getByName(name, this.uniforms);
    return uniform.location;
};

/**
 * Populate an attribute
 *
 * @param {String} name
 *      attribute name to populate
 * @param {Float32Array} values
 *      values used to populate attribute
 * @param {Number} dimensions
 *      dimensions of the values
 */
rock.graphics.engine.renderer.webgl.program.CacheProgram.prototype.populateAttribute = function (name, values, dimensions) {
    var gl = this.glContext.getHTMLContext();
    var attribute = this.getByName(name, this.attributes);
    gl.bindBuffer(gl.ARRAY_BUFFER, attribute.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, values, gl.STATIC_DRAW);
    gl.vertexAttribPointer(attribute.location, dimensions, gl.FLOAT, gl.FALSE, 0, 0);
};

/**
 * Populate indexes
 *
 * @param {Uint16Array} values
 *      values used to populate indexes
 */
rock.graphics.engine.renderer.webgl.program.CacheProgram.prototype.populateIndexes = function (values) {
    var gl = this.glContext.getHTMLContext();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexes.buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, values, gl.STATIC_DRAW);
};

/**
 * Populate a texture with an image
 *
 * @param {String} name
 *      texture name to populate
 * @param {rock.graphics.Image} image
 *      image used to populate texture
 */
rock.graphics.engine.renderer.webgl.program.CacheProgram.prototype.populateTexture = function (name, image) {
    var gl = this.glContext.getHTMLContext();
    var texture = this.getByName(name, this.textures);

    gl.activeTexture(gl.TEXTURE0 + texture.textureUnit);
    gl.bindTexture(gl.TEXTURE_2D, texture.texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image.getHTMLImage());

    gl.uniform1i(texture.location, texture.textureUnit);
};

/**
 * Configure an attribute using a buffer
 *
 * @param {String} name
 *      attribute name to populate
 * @param {WebGLBuffer} buffer
 *      the buffer containing data
 * @param {Number} dimensions
 *      dimensions of the values
 */
rock.graphics.engine.renderer.webgl.program.CacheProgram.prototype.bufferAttribute = function (name, buffer, dimensions) {
    var gl = this.glContext.getHTMLContext();
    var attribute = this.getByName(name, this.attributes);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(attribute.location, dimensions, gl.FLOAT, gl.FALSE, 0, 0);
};

/**
 * Configure indexes using a buffer
 *
 * @param {WebGLBuffer} buffer
 *      the buffer containing data
 */
rock.graphics.engine.renderer.webgl.program.CacheProgram.prototype.bufferIndexes = function (buffer) {
    var gl = this.glContext.getHTMLContext();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
};

/**
 * Configure a texture using an also generated glTexture
 *
 * @param {String} name
 *      texture name to populate
 * @param {WebGLTexture} glTexture
 *      the texture
 */
rock.graphics.engine.renderer.webgl.program.CacheProgram.prototype.updateTexture = function (name, glTexture) {
    var gl = this.glContext.getHTMLContext();
    var texture = this.getByName(name, this.textures);
    gl.activeTexture(gl.TEXTURE0 + texture.textureUnit);
    gl.bindTexture(gl.TEXTURE_2D, glTexture);
    gl.uniform1i(texture.location, texture.textureUnit);
};

/**
 * Get an array with the names of the array passed as parameter
 *
 * @param {Array} array
 *      array of objects. These objects must have a property named 'name'
 * @return {Array} array with the name
 */
rock.graphics.engine.renderer.webgl.program.CacheProgram.prototype.getAsNameArray = function (array) {
    var nameArray = [];
    var i, element;
    for (i = 0; i < array.length; i++) {
        element = array[i];
        nameArray.push(element.name);
    }
    return nameArray;
};

/**
 * @see rock.graphics.engine.renderer.webgl.program.Program#restore
 * @override
 */
rock.graphics.engine.renderer.webgl.program.CacheProgram.prototype.restore = function () {
    rock.super_method(this, rock.graphics.engine.renderer.webgl.program.CacheProgram, 'restore');

    var attributes = this.getAsNameArray(this.attributes);
    var uniforms = this.getAsNameArray(this.uniforms);
    var textures = this.getAsNameArray(this.textures);
    this.cache(attributes, uniforms, textures, this.createBuffers, this.createTextures);
};