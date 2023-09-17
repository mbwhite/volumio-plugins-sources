'use strict';

var libQ = require('kew');
var fs = require('fs-extra');
var config = new (require('v-conf'))();
var exec = require('child_process').exec;
var execSync = require('child_process').execSync;

const MPR121 = require('./lib/mpr121.js');



class TouchButtons {
	TouchButtons(context) {

		this.context = context;
		this.commandRouter = this.context.coreCommand;
		this.logger = this.context.logger;
		this.configManager = this.context.configManager;
		this.logger.info(this.commandRouter)

	}

	onVolumioStart() {
		var self = this;
		var configFile = this.commandRouter.pluginManager.getConfigurationFile(this.context, 'config.json');
		this.config = new (require('v-conf'))();
		this.config.loadFile(configFile);

		this.mpr121 = new MPR121(0x5A, 1);

		this.mpr121.on('touch', (pin) => {
			this.logger.info(`pin ${pin} touched`);
		});

		return libQ.resolve();
	}

	onVolumioStart() {
		var self = this;
		var configFile = this.commandRouter.pluginManager.getConfigurationFile(this.context, 'config.json');
		this.config = new (require('v-conf'))();
		this.config.loadFile(configFile);

		this.mpr121 = new MPR121(0x5A, 1);

		this.mpr121.on('touch', (pin) => {
			this.logger.info(`pin ${pin} touched`);
		});

		return libQ.resolve();
	}

	onStart() {
		var self = this;
		var defer = libQ.defer();


		// Once the Plugin has successfull started resolve the promise
		defer.resolve();

		return defer.promise;
	};

	onStop() {
		var self = this;
		var defer = libQ.defer();

		// Once the Plugin has successfull stopped resolve the promise
		defer.resolve();

		return libQ.resolve();
	};

	onRestart() {
		var self = this;
		// Optional, use if you need it
	};

	getUIConfig() {
		var defer = libQ.defer();
		var self = this;

		var lang_code = this.commandRouter.sharedVars.get('language_code');

		self.commandRouter.i18nJson(__dirname + '/i18n/strings_' + lang_code + '.json',
			__dirname + '/i18n/strings_en.json',
			__dirname + '/UIConfig.json')
			.then(function (uiconf) {


				defer.resolve(uiconf);
			})
			.fail(function () {
				defer.reject(new Error());
			});

		return defer.promise;
	};

	getConfigurationFiles() {
		return ['config.json'];
	}
	// Configuration Methods -----------------------------------------------------------------------------


	setUIConfig(data) {
		var self = this;
		//Perform your installation tasks here
	};

	getConf(varName) {
		var self = this;
		//Perform your installation tasks here
	};

	setConf(varName, varValue) {
		var self = this;
		//Perform your installation tasks here
	};

	stop() {
		var self = this;
		self.commandRouter.pushConsoleMessage('[' + Date.now() + '] ' + 'TouchButtons::stop');


	};

	// Spop pause
	pause() {
		var self = this;
		self.commandRouter.pushConsoleMessage('[' + Date.now() + '] ' + 'TouchButtons::pause');


	};

	// Get state
	getState() {
		var self = this;
		self.commandRouter.pushConsoleMessage('[' + Date.now() + '] ' + 'TouchButtons::getState');

	};

	//Parse state
	parseState(sState) {
		var self = this;
		self.commandRouter.pushConsoleMessage('[' + Date.now() + '] ' + 'TouchButtons::parseState');

		//Use this method to parse the state and eventually send it with the following function
	};

	// Announce updated State
	pushState(state) {
		var self = this;
		self.commandRouter.pushConsoleMessage('[' + Date.now() + '] ' + 'TouchButtons::pushState');

		return self.commandRouter.servicePushState(state, self.servicename);
	};


}
module.exports = TouchButtons;