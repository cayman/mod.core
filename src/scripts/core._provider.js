_coreMod.provider('coreMod', function () {
    console.log('coreMod.provider');
    var _config = null;

    if (!Date.now) {
        Date.now = function () {
            return new Date().getTime();
        };
    }

    this.setConfig = function (config) {
        if (_config) {
            throw new Error('coreMod.provider: not allow set config twice');
        } else {
            _config = config;
        }
    };

    function getConfig() {
        if (_config) {
            return _config;
        } else {
            throw new Error('coreMod.provider: application config object is not set');
        }
    }

    function getApp() {
        if (getConfig().app) {
            return _config.app;
        } else {
            throw new Error('coreMod.provider: not found "app" object in config');
        }
    }

    function getTemplate() {
        if (getConfig().template) {
            return _config.template;
        } else {
            throw new Error('coreMod.provider: not found "template" object in config');
        }
    }

    this.getConfig = getConfig;
    this.getApp = getApp;

    this.$get = function ($log) {
        $log.log('coreMod.provider.$get');
        var _config = getConfig();
        return {
            getApp: getApp,

            getAppUrl: function () {
                if(!getApp().path){
                    $log.error('variable "app.path" not exist in config');
                }
                return getApp().path || getApp().baseUrl;
            },

            getAssets: function () {
                if(!getTemplate().path){
                    $log.error('variable "template.path" not exist in config');
                }
                return getTemplate().path || getTemplate().baseUrl;
            },

            getTime: function (dateString) {
                if (dateString) {
                    dateString = dateString.split(' ').join('T');
                    return new Date(dateString);
                } else {
                    return Date.now();
                }
            },

            getMod: function (name) {
                if (_config.mod && _config.mod[name]) {
                    return _config.mod[name];
                } else {
                    throw new Error('coreMod.provider: not found config.mod:'+name);
                }
            },
            configMod: function (object) {
                if (!object) {
                    throw new Error('config object not set');
                }
                if (typeof object === 'string') {
                    return this.getMod(object);
                } else {
                    return object;
                }
            }
        };
    };
    this.$get.$inject = ['$log'];
});