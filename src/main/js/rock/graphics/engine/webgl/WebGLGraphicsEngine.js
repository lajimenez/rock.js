rock.namespace('rock.graphics.engine.webgl');

/**
 * Render engine to use with canvas and WebGL
 * http://www.khronos.org/registry/webgl/specs/latest/
 *
 * @param {rock.graphics.engine.webgl.WebGLContext} context
 *            the context
 *
 * @constructor
 * @extends rock.graphics.engine.ContextGraphicsEngine
 *
 * @author Luis Alberto Jiménez
 */
rock.graphics.engine.webgl.WebGLGraphicsEngine = function (context) {
    rock.super_(this, arguments);

    this.state = {
        saved : false
    };

    this.CIRCUMFERENCE_POINTS = 50;

    this.polygonRenderer = null;
    this.imageRenderer = null;
    this.floatArrayRectangle = new Float32Array(12);
    this.floatArrayTextureCoordiantes = new Float32Array(12);
    this.floatArrayCircumference = new Float32Array(3 * 2 * this.CIRCUMFERENCE_POINTS);
    this.circumferencePerimeter = new Float32Array(2 * this.CIRCUMFERENCE_POINTS);
    this.polygonRenderable = new rock.graphics.engine.renderer.PolygonRenderable();
    this.imageRenderable = new rock.graphics.engine.renderer.ImageRenderable();

    this.init();
    this.computePerimeterPoints();

    // We use a canvas2D to support operations like drawing text. We init at minimum value so
    // it will resize when needed
    var canvas2DCanvas = rock.util.DOMUtils.createCanvas(1, 1);
    var canvas2DContext = canvas2DCanvas.getContext(rock.constants.CANVAS_CONTEXT_2D);
    var canvas2DGraphicsEngineContext = new rock.graphics.engine.canvas2d.Canvas2DContext(this, canvas2DContext);
    this.canvasGraphicsEngine = new rock.graphics.engine.canvas2d.Canvas2DGraphicsEngine(canvas2DGraphicsEngineContext);

    this.transparent = rock.graphics.Color.TRANSPARENT;
};

rock.extends_(rock.graphics.engine.webgl.WebGLGraphicsEngine, rock.graphics.engine.ContextGraphicsEngine);

/**
 * @see rock.graphics.engine.IGraphicsEngine#init
 * @override
 */
rock.graphics.engine.webgl.WebGLGraphicsEngine.prototype.init = function() {
    var context = this.context;
    this.polygonRenderer = new rock.graphics.engine.renderer.webgl.PolygonRenderer(context);
    this.imageRenderer = new rock.graphics.engine.renderer.webgl.ImageRenderer(context);
};

/**
 * We need some WebGL conditions to do engine work properly
 *
 * @param {Boolean} [premultipliedAlpha]
 *      if the color used for drawing has premultiplied alpha
 *
 * @private
 */
rock.graphics.engine.webgl.WebGLGraphicsEngine.prototype.prepareWebGLEngine = function (premultipliedAlpha) {
    var gl = this.context.getHTMLContext();
    gl.enable(gl.CULL_FACE);
    gl.frontFace(gl.CCW);
    gl.cullFace(gl.BACK);
    // Color mask set to write all colors
    gl.colorMask(true, true, true, true);
    // Last draw will be visible
    gl.disable(gl.DEPTH_TEST);
    // We want blending
    gl.enable(gl.BLEND);
    gl.blendEquation(gl.FUNC_ADD);
    if (premultipliedAlpha) {
        gl.blendFuncSeparate(gl.ONE, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE);
    } else {
        gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE);
    }
};

/**
 * Save the current state of the WebGL.
 * You could call this function before doing a graphics API call and so you will be able to restore the WebGL state
 */
rock.graphics.engine.webgl.WebGLGraphicsEngine.prototype.saveState = function () {
    var gl = this.context.getHTMLContext();
    var state = this.state;
    state.colorMask = gl.getParameter(gl.COLOR_WRITEMASK);
    state.cullFaceEnabled = gl.getParameter(gl.CULL_FACE);
    state.frontFace = gl.getParameter(gl.FRONT_FACE);
    state.cullFace = gl.getParameter(gl.CULL_FACE_MODE);
    state.depthTestEnabled = gl.getParameter(gl.DEPTH_TEST);
    state.blendEnabled = gl.getParameter(gl.BLEND);
    state.blendEquationRGB = gl.getParameter(gl.BLEND_EQUATION_RGB);
    state.blendEquationAlpha = gl.getParameter(gl.BLEND_EQUATION_ALPHA);
    state.blendFuncSrcRGB = gl.getParameter(gl.BLEND_SRC_RGB);
    state.blendFuncSrcAlpha = gl.getParameter(gl.BLEND_SRC_ALPHA);
    state.blendFuncDstRGB = gl.getParameter(gl.BLEND_DST_RGB);
    state.blendFuncDstAlpha = gl.getParameter(gl.BLEND_DST_ALPHA);
    state.saved = true;
};

/**
 * Restore the WebGL state (a state must have been saved before call this method)
 */
rock.graphics.engine.webgl.WebGLGraphicsEngine.prototype.restoreState = function () {
    var state = this.state;
    if (!state.saved) {
        return;
    }

    var gl = this.context.getHTMLContext();

    var colorMask = state.colorMask;
    gl.colorMask(colorMask[0], colorMask[1], colorMask[2], colorMask[3]);

    if (state.cullFaceEnabled) {
        gl.enable(gl.CULL_FACE);
    } else {
        gl.disable(gl.CULL_FACE);
    }

    gl.frontFace(state.frontFace);
    gl.cullFace(state.cullFace);

    if (state.depthTestEnabled) {
        gl.enable(gl.DEPTH_TEST);
    } else {
        gl.disable(gl.DEPTH_TEST);
    }

    if (state.blendEnabled) {
        gl.enable(gl.BLEND);
    } else {
        gl.disable(gl.BLEND);
    }

    gl.blendEquationSeparate(state.blendEquationRGB, state.blendEquationAlpha);
    gl.blendFuncSeparate(state.blendFuncSrcRGB, state.blendFuncDstRGB,
        state.blendFuncSrcAlpha, state.blendFuncDstAlpha);
};

/**
 * @see rock.graphics.engine.IGraphicsEngine#clear
 * @override
 */
rock.graphics.engine.webgl.WebGLGraphicsEngine.prototype.clear = function (color) {
    var gl = this.context.getHTMLContext();
    gl.clearColor(color.getNormalizedRed(), color.getNormalizedGreen(), color
        .getNormalizedBlue(), color.getNormalizedAlpha());
    gl.clear(gl.COLOR_BUFFER_BIT);
};

rock.graphics.engine.webgl.WebGLGraphicsEngine.prototype.computePerimeterPoints = function () {
    var circumferencePerimeter = this.circumferencePerimeter;
    var i, rad;
    var TWO_PI = (2 * Math.PI);
    var circumferencePoints = this.CIRCUMFERENCE_POINTS;
    var difference = TWO_PI / circumferencePoints;

    for (i = 0; i < circumferencePoints; i++) {
        rad = i * difference;
        circumferencePerimeter[2 * i] = Math.cos(rad);
        circumferencePerimeter[2 * i + 1] = Math.sin(rad);
    }
};

rock.graphics.engine.webgl.WebGLGraphicsEngine.prototype.computeCircumferenceVertices = function (x, y, size) {
    var radius = size / 2.;
    var circumferencePerimeter = this.circumferencePerimeter;
    var circumferencePoints = this.CIRCUMFERENCE_POINTS;
    var vertices = this.floatArrayCircumference;
    var i, pos = 0, currentPointX, currentPointY, nextPointX, nextPointY;

    for (i = 0; i < circumferencePoints - 1; i++) {
        pos = 2 * i;
        currentPointX = circumferencePerimeter[pos];
        currentPointY = circumferencePerimeter[pos + 1];
        nextPointX = circumferencePerimeter[pos + 2];
        nextPointY = circumferencePerimeter[pos + 3];

        pos = 3 * 2 * i;
        vertices[pos] = x;
        vertices[pos + 1] = y;

        vertices[pos + 2] = x + nextPointX * radius;
        vertices[pos + 3] = y + nextPointY * radius;

        vertices[pos + 4] = x + currentPointX * radius;
        vertices[pos + 5] = y + currentPointY * radius;
    }

    pos = 3 * 2 * (circumferencePoints - 1);
    vertices[pos] = x;
    vertices[pos + 1] = y;

    vertices[pos + 2] = x + circumferencePerimeter[0] * radius;
    vertices[pos + 3] = y + circumferencePerimeter[1] * radius;

    vertices[pos + 4] = x + circumferencePerimeter[2 * circumferencePoints - 2] * radius;
    vertices[pos + 5] = y + circumferencePerimeter[2 * circumferencePoints - 1] * radius;
};

/**
 * @see rock.graphics.engine.IGraphicsEngine#drawPoint
 * @override
 */
rock.graphics.engine.webgl.WebGLGraphicsEngine.prototype.drawPoint = function (x, y, size, color) {
    this.computeCircumferenceVertices(x, y, size);
    this.renderPolygon(this.floatArrayCircumference, 3 * this.CIRCUMFERENCE_POINTS, color);
};

/**
 * @see rock.graphics.engine.IGraphicsEngine#drawLine
 * @override
 */
rock.graphics.engine.webgl.WebGLGraphicsEngine.prototype.drawLine = function (fromX, fromY, toX, toY, width, color) {
    var halfWidth = width / 2.;
    var orientation = Math.atan2(toY - fromY, toX - fromX);
    var halfPI = Math.PI / 2.;

    var vertices = this.floatArrayRectangle;
    vertices[0] = fromX + (halfWidth * Math.cos(orientation - halfPI));
    vertices[1] = fromY + (halfWidth * Math.sin(orientation - halfPI));

    vertices[2] = fromX + (halfWidth * Math.cos(orientation + halfPI));
    vertices[3] = fromY + (halfWidth * Math.sin(orientation + halfPI));

    vertices[4] = toX + (halfWidth * Math.cos(orientation + halfPI));
    vertices[5] = toY + (halfWidth * Math.sin(orientation + halfPI));

    vertices[6] = fromX + (halfWidth * Math.cos(orientation - halfPI));
    vertices[7] = fromY + (halfWidth * Math.sin(orientation - halfPI));

    vertices[8] = toX + (halfWidth * Math.cos(orientation + halfPI));
    vertices[9] = toY + (halfWidth * Math.sin(orientation + halfPI));

    vertices[10] = toX + (halfWidth * Math.cos(orientation - halfPI));
    vertices[11] = toY + (halfWidth * Math.sin(orientation - halfPI));

    this.adjustVertices(vertices, width);

    this.renderPolygon(vertices, 6, color);
};

rock.graphics.engine.webgl.WebGLGraphicsEngine.prototype.adjustVertices = function (vertices, width) {
    var i, value;
    for (i = 0; i < vertices.length; i++) {
        value = vertices[i];
        vertices[i] = this.adjustPixelPosition(value, width);
    }
};

/**
 * @see rock.graphics.engine.IGraphicsEngine#drawRectangle
 * @override
 */
rock.graphics.engine.webgl.WebGLGraphicsEngine.prototype.drawRectangle = function (x, y, width, height, color, strokeWidth) {
    if (rock.util.JsUtils.isNullOrUndefined(strokeWidth) || strokeWidth < 1) {
        this.drawFilledRectangle(x, y, width, height, color);
    } else {
        this.drawStrokeRectangle(x, y, width, height, color, strokeWidth);
    }
};

/**
 * Draw a filled rectangle
 *
 * @param x
 *            absolute x in context
 * @param y
 *            absolute y in context
 * @param width
 *            the width
 * @param height
 *            the height
 * @param {rock.graphics.Color} color
 *            the color
 *
 * @private
 */
rock.graphics.engine.webgl.WebGLGraphicsEngine.prototype.drawFilledRectangle = function (x, y, width, height, color) {
    var vertices = this.floatArrayRectangle;

    vertices[0] = x;
    vertices[1] = y;

    vertices[2] = x;
    vertices[3] = y + height;

    vertices[4] = x + width;
    vertices[5] = y + height;

    vertices[6] = x;
    vertices[7] = y;

    vertices[8] = x + width;
    vertices[9] = y + height;

    vertices[10] = x + width;
    vertices[11] = y;

    this.renderPolygon(vertices, 6, color);
};

/**
 * Draw a rectangle with an stroke
 *
 * @param x
 *            absolute x in context
 * @param y
 *            absolute y in context
 * @param width
 *            the width
 * @param height
 *            the height
 * @param {rock.graphics.Color} color
 *            the color
 * @param {Number} strokeWidth
 *            stroke width
 *
 * @private
 */
rock.graphics.engine.webgl.WebGLGraphicsEngine.prototype.drawStrokeRectangle = function
    (x, y, width, height, color, strokeWidth) {
    var middleStrokeWidth = strokeWidth / 2;
    var xmin = x;
    var xmax = x + width;
    var ymin = y;
    var ymax = y + height;
    this.drawLine(xmin - middleStrokeWidth, ymin, xmax + middleStrokeWidth, ymin, strokeWidth, color);
    this.drawLine(xmin, ymin, xmin, ymax, strokeWidth, color);
    this.drawLine(xmin - middleStrokeWidth, ymax, xmax + middleStrokeWidth, ymax, strokeWidth, color);
    this.drawLine(xmax, ymin, xmax, ymax, strokeWidth, color);
};

/**
 * @see rock.graphics.engine.IGraphicsEngine#drawRoundedRectangle
 * @override
 */
rock.graphics.engine.webgl.WebGLGraphicsEngine.prototype.drawRoundedRectangle = function (x, y, width, height, radius, color) {
    // OK, VERY inefficient way to do it...
    var size = radius * 2;
    this.computeCircumferenceVertices(x + radius, y + radius, size);
    this.renderPolygon(this.floatArrayCircumference, 3 * this.CIRCUMFERENCE_POINTS, color);

    this.computeCircumferenceVertices(x + width - radius, y + radius, size);
    this.renderPolygon(this.floatArrayCircumference, 3 * this.CIRCUMFERENCE_POINTS, color);

    this.computeCircumferenceVertices(x + radius, y + height - radius, size);
    this.renderPolygon(this.floatArrayCircumference, 3 * this.CIRCUMFERENCE_POINTS, color);

    this.computeCircumferenceVertices(x + width - radius, y + height - radius, size);
    this.renderPolygon(this.floatArrayCircumference, 3 * this.CIRCUMFERENCE_POINTS, color);

    this.drawFilledRectangle(x, y + radius, width, height - size, color);
    this.drawFilledRectangle(x + radius, y, width - size, height, color);
};

/**
 * Render a polygon
 *
 * @param {Float32Array} vertices
 *      the vertices to be rendered
 * @param count
 *       number of vertices to be rendered
 * @param {rock.graphics.Color} color
 *      color of the polygon
 *
 * @private
 */
rock.graphics.engine.webgl.WebGLGraphicsEngine.prototype.renderPolygon = function (vertices, count, color) {
    this.prepareWebGLEngine();

    var polygonRenderer = this.polygonRenderer;
    var polygonRenderable = this.polygonRenderable;

    polygonRenderable.setVertices(vertices);
    polygonRenderable.setCount(count);
    polygonRenderable.setWidth(this.width);
    polygonRenderable.setHeight(this.height);
    polygonRenderable.setColor(color);

    polygonRenderer.render(polygonRenderable);
};

/**
 * @see rock.graphics.engine.IGraphicsEngine#drawImage
 * @override
 */
rock.graphics.engine.webgl.WebGLGraphicsEngine.prototype.drawImage = function (image, x, y, width, height) {
    var drawingWidth, drawingHeight;

    if (!rock.util.JsUtils.isNullOrUndefined(width)) {
        drawingWidth = width;
    } else {
        drawingWidth = image.getWidth();
    }

    if (!rock.util.JsUtils.isNullOrUndefined(height)) {
        drawingHeight = height;
    } else {
        drawingHeight = image.getHeight();
    }

    var vertices = this.floatArrayRectangle;
    vertices[0] = x;
    vertices[1] = y;

    vertices[2] = x;
    vertices[3] = y + drawingHeight;

    vertices[4] = x + drawingWidth;
    vertices[5] = y + drawingHeight;

    vertices[6] = x;
    vertices[7] = y;

    vertices[8] = x + drawingWidth;
    vertices[9] = y + drawingHeight;

    vertices[10] = x + drawingWidth;
    vertices[11] = y;

    var textureVertices = this.floatArrayTextureCoordiantes;
    textureVertices[0] = 0;
    textureVertices[1] = 0;

    textureVertices[2] = 0;
    textureVertices[3] = 1;

    textureVertices[4] = 1;
    textureVertices[5] = 1;

    textureVertices[6] = 0;
    textureVertices[7] = 0;

    textureVertices[8] = 1;
    textureVertices[9] = 1;

    textureVertices[10] = 1;
    textureVertices[11] = 0;

    this.renderImage(image, vertices, 6, textureVertices);
};

/**
 * @see rock.graphics.engine.IGraphicsEngine#drawSubImage
 * @override
 */
rock.graphics.engine.webgl.WebGLGraphicsEngine.prototype.drawSubImage = function (image, x, y, subX, subY, subWidth, subHeight) {
    var width = image.getWidth();
    var height = image.getHeight();

    var imageRectangle = new rock.geometry.Rectangle(x, y, x + width, y + height);
    var drawingRectangle = new rock.geometry.Rectangle(x + subX, y + subY,
        x + subX + subWidth, y + subY + subHeight);

    var intersection = imageRectangle.getIntersectionWithRectangle(drawingRectangle);
    if (rock.util.JsUtils.isNullOrUndefined(intersection)) {
        return;
    }

    var intersectionWidth = intersection.getWidth();
    var intersectionHeight = intersection.getHeight();

    var textMinX = subX / width;
    var textMaxX = (subX + intersectionWidth) / width;
    var textMinY = subY / height;
    var textMaxY = (subY + intersectionHeight) / height;

    var vertices = this.floatArrayRectangle;
    vertices[0] = x;
    vertices[1] = y;

    vertices[2] = x;
    vertices[3] = y + intersectionHeight;

    vertices[4] = x + intersectionWidth;
    vertices[5] = y + intersectionHeight;

    vertices[6] = x;
    vertices[7] = y;

    vertices[8] = x + intersectionWidth;
    vertices[9] = y + intersectionHeight;

    vertices[10] = x + intersectionWidth;
    vertices[11] = y;

    var textureCoordinates = this.floatArrayTextureCoordiantes;
    textureCoordinates[0] = textMinX;
    textureCoordinates[1] = textMinY;

    textureCoordinates[2] = textMinX;
    textureCoordinates[3] = textMaxY;

    textureCoordinates[4] = textMaxX;
    textureCoordinates[5] = textMaxY;

    textureCoordinates[6] = textMinX;
    textureCoordinates[7] = textMinY;

    textureCoordinates[8] = textMaxX;
    textureCoordinates[9] = textMaxY;

    textureCoordinates[10] = textMaxX;
    textureCoordinates[11] = textMinY;

    this.renderImage(image, vertices, 6, textureCoordinates);
};

/**
 * Render an image
 *
 * @param {rock.graphics.Image} image
 *      the image
 * @param {Float32Array} vertices
 *      the vertices to be rendered
 * @param count
 *       number of vertices to be rendered
 * @param {Float32Array} textureCoordinates
 *      texture coordinates for image
 *
 * @private
 */
rock.graphics.engine.webgl.WebGLGraphicsEngine.prototype.renderImage = function (image, vertices, count, textureCoordinates) {
    this.prepareWebGLEngine(image.getPremultipliedAlpha());

    var imageRenderer = this.imageRenderer;
    var imageRenderable = this.imageRenderable;

    imageRenderable.setVertices(vertices);
    imageRenderable.setCount(count);
    imageRenderable.setWidth(this.width);
    imageRenderable.setHeight(this.height);
    imageRenderable.setImage(image);
    imageRenderable.setTextureCoordinates(textureCoordinates);

    imageRenderer.render(imageRenderable);
};

/**
 * @see rock.graphics.engine.IGraphicsEngine#drawText
 * @override
 */
rock.graphics.engine.webgl.WebGLGraphicsEngine.prototype.drawText = function
        (text, x, y, font, color, clippingWidth, clippingHeight) {

    var textWidth = rock.util.TextUtils.measureTextWidth(text, font);
    var textHeight = rock.util.TextUtils.measureTextHeight(text, font);

    if (textWidth == 0 || textHeight == 0) {
        return;
    }

    // we compute maximum possible width & height
    var width = this.width - x;
    var height = this.height - y;

    if (textWidth > width) {
        textWidth = width;
    }

    if (textHeight > height) {
        textHeight = height;
    }

    var canvasGraphicsEngine = this.canvasGraphicsEngine;
    var canvas2D = canvasGraphicsEngine.getContext().getHTMLContext();
    canvas2D.canvas.width = textWidth;
    canvas2D.canvas.height = textHeight;
    canvasGraphicsEngine.computeSize();

    canvasGraphicsEngine.clear(this.transparent);
    canvasGraphicsEngine.drawText(text, 0, 0, font, color, clippingWidth, clippingHeight);

    var imageData = canvas2D.getImageData(0, 0, textWidth, textHeight);
    var image = new rock.graphics.Image(imageData);

    this.drawImage(image, x, y);
};

/**
 * @see rock.graphics.engine.IGraphicsEngine#measureTextWidth
 * @override
 */
rock.graphics.engine.webgl.WebGLGraphicsEngine.prototype.measureTextWidth = function (text, font) {
    return this.canvasGraphicsEngine.measureTextWidth(text, font);
};

/**
 * @see rock.graphics.engine.IGraphicsEngine#measureTextHeight
 * @override
 */
rock.graphics.engine.webgl.WebGLGraphicsEngine.prototype.measureTextHeight = function (text, font) {
    return this.canvasGraphicsEngine.measureTextHeight(text, font);
};