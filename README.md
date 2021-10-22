# Hi developer! 

I started this project some years ago. I did just for fun and I learned a lot. Altough it's not maintained anymore, still today there are some people who clone this project.
If you are one of them and want to say to me whatever you want, please don't hesitate to send me an email to [lajimenez.rock@gmail.com](mailto:email lajimenez.rock@gmail.com)

# Documentation

## What is rock.js?

rock.js is a framework to develop 2D graphical components (like charts). rock.js can also help you to draw 3D scenes and basic 3D games (see [rock.game.js](https://github.com/lajimenez/rock.game.js)).
rock.js is based on [Canvas 2D](https://www.w3.org/TR/2dcontext/) and [WebGL](https://www.khronos.org/registry/webgl/specs/latest/1.0/).

If you want to have an idea of what you can do click [here](https://lajimenez.github.io/rock.js/demo) and [here](https://lajimenez.github.com/rock.io.js/demo)

## Features

Next you can see a list of features offered by rock.js.

#### Inheritance

rock.js offers a custom inheritance implementation. You have an example below, but you can see more examples in package 'app.test.inheritance'.

```javascript
// Defines a new space so you can start defining classes in that namespace
rock.namespace('com.example');

/* com.example.InterfaceA */
com.example.InterfaceA = function () {
};

// Defines 'com.example.InterfaceA' as an interface
rock.interface_(com.example.InterfaceA);

// It's recommended to assign 'rock.abstract_' to interface function definitions (and class abstract methods)
com.example.InterfaceA.prototype.interfaceMethod = rock.abstract_;

/* com.example.ClassA */
com.example.ClassA = function () {
    // rock.js assumes all properties are protected
    this.protectedPropertyA = 'propertyA';
};

// 'com.example.ClassA' implements 'com.example.InterfaceA'.
rock.implements_(com.example.ClassA, com.example.InterfaceA);

com.example.ClassA.prototype.interfaceMethod = function () {
    rock.console.log('interfaceMethod called in classA');
};

com.example.ClassA.prototype.printProperty = function () {
    rock.console.log(this.protectedPropertyA);
};

/* com.example.ClassB */
com.example.ClassB = function () {
    // Call super constructor (you can pass params if needed)
    rock.super_(this);
    this.protectedPropertyB = 'propertyB';
};

// 'com.example.ClassB' extends 'com.example.ClassA'. A class only can extend one (and only one) class.
rock.extends_(com.example.ClassB, com.example.ClassA);

com.example.ClassB.prototype.printProperty = function () {
    rock.console.log(this.protectedPropertyB);
};

com.example.ClassB.prototype.interfaceMethod = function () {
    // Call a method in the super class (you can pass params if needed)
    rock.super_method(this, com.example.ClassB, 'interfaceMethod');
    rock.console.log('interfaceMethod called in classB');
};

(function() {
    var classA = new com.example.ClassA();
    var classB = new com.example.ClassB();
    // You can use 'rock.instanceof_(...)' to check types
    if (rock.instanceof_(classB, com.example.InterfaceA)) {
        rock.console.log('Yeah! classB is an instance of com.example.InterfaceA');
    }

    classA.printProperty();
    classA.interfaceMethod();

    classB.printProperty();
    classB.interfaceMethod();

})();

// Output:
// Yeah! classB is an instance of com.example.InterfaceA
// propertyA
// interfaceMethod called in classA
// propertyB
// interfaceMethod called in classA
// interfaceMethod called in classB

```

#### Windows system

rock.js implements a minimal windows system with windows and components. All in rock.js happens within a window!

#### Drawing API

A drawing API is available for windows to help you to draw text, basic shapes and images.
The drawing API has 2 implementations, Canvas 2D and WebGL.
(It could be interesting create a library with this feature...)

#### I18n

All components can be internationalized (in fact, you can have internationalized strings for using when needed)

#### Manage resources

There are classes to help you dynamically load images, sounds and JSONs (and also a window to see how loading process is progressing)

#### Events

You can throw your custom events and listen for it. This is achieved through classes 'rock.event.Event' and 'rock.event.EventDispatcher'.

#### Timer

rock.js has functions to abstract you from timer browser implementations.

#### 3D

All 3D capabilities are achieved via [rock.game.js](https://github.com/lajimenez/rock.game.js) project. Check it for more info.

#### Basic unit test

rock.js offers a simple framework for unit testing.

## Related projects

* [rock.game.js](https://github.com/lajimenez/rock.game.js): a rock.js extension for drawing 3D scenes and 3D games

* [rock.converter](https://github.com/lajimenez/rock.converter): this java project generates a jar that let you convert from 3D OBJ format to a custom internal JSON that can be consumed by rock.game.js.

* [chart](https://github.com/lajimenez/chart): 2D chart component. That is intended to be an example on how to develop 2D components.

* [pong](https://github.com/lajimenez/pong): 3D pong game. That is intended to be an example on how to develop a 3D game.

## JSDoc and examples

You can find JSDoc for all classes [here](https://lajimenez.github.io/rock.js/jsdoc)
You can test rock.js features yourself [here](https://lajimenez.github.io/rock.js/demo)

## Recommendations

Use canvas 2D version whenever possible.

## Development

The project has been 'mavenized' so if you are familiar with maven you shouldn't have problems with the project folder structure. If not, you can found maven tutorials anyplace :P
At this moment, you will have to revise the code yourself as there is no technical documentation.

## How to generate JSDoc and minified version

Open the terminal and navigate to the correct folder. Then execute:
```Batchfile
mvn clean compile jstools:jsdoc
```