function getURLParam(paramName) {
    if (location.search.length == 0) {
        return null;
    }
    var params = location.search.substring(1).split('&');
    var i, param, paramParts;
    for (i = 0; i < params.length; i++) {
        param = params[i];
        paramParts = param.split('=');
        if (paramParts.length != 2) {
            continue;
        }
        if (paramParts[0] == paramName) {
            return paramParts[1];
        }
    }

    return null;
}

/**
 * Function for init test application
 */
function init(idDiv, urlResources) {
    var contextTypeParam = getURLParam('contextType');
    var div;
    var contextType = rock.constants.CONTEXT_CANVAS_2D;
    var divId = 'divLinkWebGLVersion';
    if (contextTypeParam == rock.constants.CONTEXT_WEBGL) {
        contextType = rock.constants.CONTEXT_WEBGL;
        divId = 'divLinkCanvasVersion';
    }

    div = rock.util.DOMUtils.getElementById(divId);
    div.style.display = 'block';

    var initParams = new rock.app.InitApplicationParams(idDiv, 600, 500, contextType, urlResources);
    //initParams.setScaleFactor(1.8);

    var testApp = new app.TestApp(initParams);
}
