_coreMod.run(['$log', '$rootScope', 'coreMod', function ($log, $rootScope, coreMod) {
    $log.log('coreMod.run');
    $rootScope.assets = coreMod.getAssets();
    $rootScope.appUrl = coreMod.getAppUrl();
    $rootScope.appConfig = coreMod.getApp();
}]);