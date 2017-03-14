/* Copyright 2012-2013 Sam Elsamman
 Permission is hereby granted, free of charge, to any person obtaining
 a copy of this software and associated documentation files (the
 "Software"), to deal in the Software without restriction, including
 without limitation the rights to use, copy, modify, merge, publish,
 distribute, sublicense, and/or sell copies of the Software, and to
 permit persons to whom the Software is furnished to do so, subject to
 the following conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
"use strict";

// Node Modules
let Bluebird = require('bluebird');
let Semotus = require('semotus');
let Persistor = require('persistor');

// Local Modules
let getTemplates = require('./lib/getTemplates').getTemplates;
let listen = require('./lib/listen').listen;
let typescript = require('./lib/typescript');

// Module Global Variables
let AmorphicContext = require('./lib/AmorphicContext');

// TODO: This should be a default set in Semotus
Semotus.maxCallTime = 60 * 1000; // Max time for call interlock

// Typescript standard extends helper
var __extends = (this && this.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();

// TODO: Remove this - this is just to set the default config options
// TODO: At a minimum change our tests to not expect a promise back and we can eliminate this function.

/**
 * This function exists to reset AmorphicContext to the default options.
 *  It is only used by our tests.  Once our tests have been updated to properly stub
 *  AmorphicContext out this should be removed.
 *
 * @returns {Promise<Boolean>} A promise that resolves to true.
 */
function reset() {
    AmorphicContext.reset();
    return Bluebird.resolve(true);
}

/**
 * Mixin class implementation
 * @param Base
 * @constructor
 */
function Remoteable (Base) {
    return (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return class_1;
    }(Base));
}

var exports = {
    getTemplates: getTemplates,
    listen: listen,
    reset: reset,
    Remoteable: Remoteable,
    Persistable: Persistor.Persistable
    // Additional decorators added here by the subsequent bindDecorators call
};

// bindDecorators will need to be called before importing templates to bind to the correct
// subtype of ObjectTemplate (either semotus or persistor).  By default we bind to persistor in case
// someone has mocha tests that use the object model.
exports.bindDecorators = typescript.bindDecorators.bind(exports)
exports.bindDecorators(require('persistor')(require('supertype'), null, require('supertype'))); // For tests

Object.defineProperty(exports.Remoteable.prototype, 'amorphic', {get: function () {
    return this.__objectTemplate__
}});

module.exports = exports;
