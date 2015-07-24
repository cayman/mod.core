_coreMod.directive('onEnter', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('keydown keypress', function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.onEnter);
                    });
                    event.preventDefault();
                }
            });
        }
    };
});

_coreMod.directive('stopEvent', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on(attrs.stopEvent, function (e) {
                e.stopPropagation();
            });
        }
    };
});
