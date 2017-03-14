'use strict';
let unitTestConfig = require('./unitTestConfig');

// Passed the main index export.  Will bind the decorators to either Persistor or Semotus
function bindDecorators (objectTemplate) {

    objectTemplate = objectTemplate || this;

    this.supertypeClass = function (target, props) {
        return objectTemplate.supertypeClass(target, props, objectTemplate)
    };

    this.Supertype = function () {
        return objectTemplate.Supertype.call(this, objectTemplate);
    };

    this.property = function (props) {
        return objectTemplate.property(props, objectTemplate);
    }

    this.remote = function (defineProperty) {
        return objectTemplate.remote(defineProperty, objectTemplate);
    }

    this.Amorphic = objectTemplate;
    this.Amorphic.create = function (appName, appDirectory) {
            objectTemplate.connect = unitTestConfig.startup;
            return objectTemplate;
    };
}

module.exports = {
    bindDecorators: bindDecorators
};
