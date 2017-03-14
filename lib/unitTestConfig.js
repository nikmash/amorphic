'use strict';

// Internal modules
let AmorphicContext = require('./AmorphicContext');
let ConfigBuilder = require('./utils/configBuilder').ConfigBuilder;
let ConfigApi = require('./utils/configBuilder').ConfigAPI;
let logMessage = require('./utils/logger').logMessage;
let startApplication = require('./startApplication');
let startUpServer = require('./startUpServer').startUpServer;
let readFile = require('./utils/readFile').readFile;

// Npm modules
let connect = require('connect');

AmorphicContext.appContext.sendToLog = logMessage;

/**
 * Connect to the database
 *
 * @param {unknown} appDirectory unknown
 */
function startup(configPath, schemaPath) {
    if (!configPath) {
        throw new Error('startup(configPath, schemaPath?) called without a config path');
    }
    schemaPath = schemaPath || configPath;


    let builder = new ConfigBuilder(new ConfigApi());
    let configStore = builder.build(configPath);
    let config = configStore['root'].get();
    config.nconf = configStore['root']; // Global config
    config.configStore = configStore;



    let schema = JSON.parse((readFile(schemaPath + '/schema.json')).toString());
    console.log(JSON.stringify(configStore.root.get()));

    return startApplication.setUpInjectObjectTemplate('__noapp__', config, schema)
        .then (function (injectObjectTemplate) {
            return injectObjectTemplate(this);
        }.bind(this))
        .then (function () {
            this.performInjections();
        }.bind(this));
}
module.exports = {
    startup: startup,
};
