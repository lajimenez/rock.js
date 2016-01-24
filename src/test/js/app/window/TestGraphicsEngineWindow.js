rock.namespace('app.window');

/**
 * Window for testing GraphicsEngine
 *
 * @param {rock.window.WindowSystem} windowSystem
 *            the window system where this window will be part
 *
 * @constructor
 * @extends app.window.BackWindow
 *
 * @author Luis Alberto Jiménez
 */
app.window.TestGraphicsEngineWindow = function (windowSystem) {
    rock.super_(this, [windowSystem]);
    this.backgroundColor = new rock.graphics.Color(200, 200, 200);
    this.chessboard = this.application.getResourceManager().getImage(app.constants.RES_ID_IMG_CHESSBOARD);
    this.image = this.application.getResourceManager().getImage(app.constants.RES_ID_IMG_TEST_GRAPHICS_ENGINE);
    this.transparentImage =
        this.application.getResourceManager().getImage(app.constants.RES_ID_IMG_TRANSPARENCY_TEST_GRAPHICS_ENGINE);
};

rock.extends_(app.window.TestGraphicsEngineWindow, app.window.BackWindow);

app.window.TestGraphicsEngineWindow.prototype.drawChessboard = function (graphicsEngine, startX, startY) {
    var chessboard = this.chessboard;
    var endX = this.windowSystem.getWidth();
    var endY = this.windowSystem.getHeight();
    var imgWidth = chessboard.getWidth();
    var imgHeight = chessboard.getHeight();
    var x = startX;
    var y = startY;

    while (y < endY) {
        x = startX;
        while (x < endX) {
            graphicsEngine.drawImage(chessboard, x, y);
            x += imgWidth;
        }
        y += imgHeight;
    }
};

app.window.TestGraphicsEngineWindow.prototype.draw = function (graphicsEngine) {
    this.drawChessboard(graphicsEngine, 0, 0);

    // Text
    var LOREM_IPSUM = 'Lorem ipsum';
    var black = rock.graphics.Color.BLACK.clone();
    var monospaceFont = new rock.graphics.Font('monospace', 16);
    var sansSerifFont = new rock.graphics.Font('sans-serif', 16);
    var serifFont = new rock.graphics.Font('serif', 16);
    graphicsEngine.drawText(LOREM_IPSUM, 20, 30, monospaceFont, black);
    black.setAlpha(200);
    graphicsEngine.drawText(LOREM_IPSUM, 150, 30, sansSerifFont, black);
    black.setAlpha(128);
    graphicsEngine.drawText(LOREM_IPSUM, 270, 30, serifFont, black);

    // Shapes
    var count = 10;
    var radDifference = 2 * Math.PI / count;
    var centerLineX = 100;
    var centerLineY = 200;
    var centerPointX = 300;
    var centerPointY = 200;
    var lineSize = 80;
    var initLineWidth = 10;
    var initPointWidth = 15;
    var pointRingRadius = 40;
    var lineColor = rock.graphics.Color.RED.clone();
    var pointColor = rock.graphics.Color.GREEN.clone();

    var rad, i, difference, lineWidth, pointWidth;
    for (i = 0; i < count; i++) {
        rad = i * radDifference;
        difference = i / count;

        lineWidth = initLineWidth - initLineWidth * difference;
        pointWidth = initPointWidth - initPointWidth * difference;

        lineColor.setAlpha(255 - 255 * difference);
        graphicsEngine.drawLine(centerLineX, centerLineY,
            centerLineX + Math.cos(rad) * lineSize, centerLineY - Math.sin(rad) * lineSize,
            lineWidth, lineColor);

        pointColor.setAlpha(255 - 255 * difference);
        graphicsEngine.drawPoint(centerPointX + Math.cos(rad) * pointRingRadius,
            centerPointY - Math.sin(rad) * pointRingRadius, pointWidth, pointColor);
    }

    var rectangleColor = new rock.graphics.Color(0, 0, 255, 64);
    graphicsEngine.drawRectangle(420, 130, 100, 50, rectangleColor);
    rectangleColor.setAlpha(128);
    graphicsEngine.drawRectangle(430, 150, 100, 50, rectangleColor);
    rectangleColor.setAlpha(255);
    graphicsEngine.drawRectangle(440, 170, 100, 50, rectangleColor);

    graphicsEngine.drawRectangle(420, 230, 70, 50, rectangleColor, 5);
    graphicsEngine.drawRoundedRectangle(500, 230, 70, 50, 10, rectangleColor);

    // Images
    graphicsEngine.drawImage(this.image, 20, 310);
    graphicsEngine.drawImage(this.image, 20, 430, 150, 50);
    graphicsEngine.drawImage(this.transparentImage, 200, 430);

    graphicsEngine.drawSubImage(this.image, 300, 310, 0, 0, 50, 50);
    graphicsEngine.drawSubImage(this.image, 350, 360, 50, 50, 50, 50);
    graphicsEngine.drawSubImage(this.image, 400, 310, 100, 0, 50, 100);
    graphicsEngine.drawSubImage(this.image, 450, 310, 150, 0, 50, 50);
    graphicsEngine.drawSubImage(this.image, 500, 310, 200, 0, 50, 100);

    this.drawUI(graphicsEngine);
};
