rock.namespace('rock.i18n');

// This object should be in a file in a resource folder, not here. But then you should be very careful
// when you load because some basic features from rock launches exceptions with localized messages...

rock.i18n.rockDefaultLocaleInfo = {
    locale: rock.constants.DEFAULT_ROCK_LOCALE,

    messages: {
        ROCK_ERROR_MSG: 'RockError: {0}',
        NO_FUNCTION_TYPE: 'No function type',
        INTERFACE_CANT_IMPLEMENT: 'Interface can\'t implements nothing',
        ONLY_INTERFACE_CAN_BE_IMPLEMENTED: 'Only interface can be implemented',
        INVALID_EXTENSION: 'Classes must extend classes and interfaces must extend interfaces',
        INVALID_INHERITANCE_EXTENDS_BEFORE_IMPLEMENTS: 'Invalid inheritance: "extends" must be before any "implements"',
        INHERITANCE_NO_SUPER_METHOD_IN_SUPERCLASS: 'It doesn\'t exists a super method in any super class',
        CALLED_METHOD_WITH_NO_IMPLEMENTATION: 'Called method with no implementation.',

        NO_GET_CONTEXT_CANVAS: 'No getContext available',
        NO_CONTEXT_CANVAS_AVAILABLE: 'Context not available',
        INVALID_ROCK_CONTEXT_CANVAS_TYPE: 'Invalid rock canvas type',

        NO_WINDOW_SYSTEM : 'No window system',

        AJAX_NOT_SUPPORTED : 'Ajax not supported',

        INVALID_RESOURCE_TYPE: 'Invalid resource type',
        ERROR_PARAMS_LOAD_RESOURCES: 'Incorrect params for loading resources',
        RESOURCE_NOT_AVAILABLE: 'Resource not available',

        SHADER_NOT_COMPILED: 'Shader not compiled',
        PROGRAM_NOT_LINKED: 'Program not linked',
        CAMERA_INVALID_VALUES: 'Invalid camera values',

        INVALID_COMPONENT_OPERATION: 'Invalid component operation',

        TEST_INVALID_TYPE: 'Type for object must inherit from type "rock.test.Test"',
        TEST_SUITE_RESULT_OK: 'The test suite has finished OK\n',
        TEST_SUITE_RESULT_KO: 'The test suite has ERRORS\n',
        TEST_RESULT_OK: 'The test {0} has finished well\n',
        TEST_RESULT_KO: 'The test {0} has failed\n',

        RESOURCE_WINDOW_LOADING_LABEL: 'Loading...'
    }
};