'use strict';

// Passed the main index export.  Will bind the decorators to either Persistor or Semotus
function bindDecorators (objectTemplate) {

    objectTemplate = objectTemplate || this;

    this.supertypeClass = function (target, props) {
        return ObjectTemplate.supertypeClass(target, props, objectTemplate)
    };

    this.Supertype = function () {
        return ObjectTemplate.Supertype.call(this, objectTemplate);
    };

    this.property = function (props) {
        return ObjectTemplate.property(props, objectTemplate);
    }

    this.remote = function (defineProperty) {
        return ObjectTemplate.remote(defineProperty, objectTemplate);
    }
}

module.exports = {
    bindDecorators: bindDecorators
};
