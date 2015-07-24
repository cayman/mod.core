#mod.core - Компонента ядра портала
## Описание
Компонента реализована provider Angular. Задача компоненты подтянуть объектую структуру
объединенного файла настроек всего портала и предоставить его остальным компонентам и приложениям.
Для использования необходимо в зависимости модуля добавить модуль Angular 'coreMod'

### Зависимости
Так как компонента базовая, то в зависит от библиотек [bower.io](http://bower.io/search)

 - [Ядро Angular](https://github.com/angular/bower-angular) ("angular": "~1.2.0"),
 - [Реcурсы Angular](https://github.com/angular/bower-angular-resource)  ("angular-resource": "~1.2.0"),
 - [Работа с куки в Angular](https://github.com/angular/bower-angular-cookies) ("angular-cookies": "~1.2.0"),
 - [Работа с HTML в Angular](https://github.com/angular/bower-angular-sanitize) ("angular-sanitize": "~1.2.0"),
 - [Маршрутизация в Angular](https://github.com/angular-ui/ui-router) ("angular-ui-router": "~0.2.0"),


###Реализация
В каждом компоненте необходимо реализовать провайдер получающий объект с настроками текущего компонента
coreModProvider.getMod('current_mod_name')
и предоставить как функции сервиса, которые можно будет использовать в директивах и контроллерах компонентов,
через функции. Далее пример использования провайдере навигационного меню:

    angular.module('navigationModProvider', ['coreMod'])
        .provider('navigationMod', function (coreModProvider) {
            console.log('navigationMod.provider');
            var config = coreModProvider.getMod('navigation');
            var template = null;
            var menu = config.menu;
            this.setTemplate = function (templ) {
                template = templ;
            };
            this.getMenu = function () {
                return menu;
            };
            this.getTemplate = function () {
                return template;
            };
            this.$get = function ($log) {
                $log.log('navigationMod.provider.$get');
                return {
                    getMenu: function () {
                        return menu;
                    },
                    getTemplate: function () {
                        return template;
                    }
                };
            };
            this.$get.$inject = ['$log'];
        });

**Важная особенность компоненты mod.core в том, что его можно использовать только на этапе конфигурирования Angular
(через провайдер сoreModProvider),
на этапе работы модуля Angular, доступа к меню нет. Поэтому каждая компонента использующая coreMod должна
реализовать свой провайдер, получающий конфигурацию на этапе конфигурирования Angular и отдающая настройки
на этапе работы Angular, через реализацию this.$get = function (){...}**


###Настройки компоненты
**config.yml**

    mod:
        core:
            name: core
            
 Специальныйх настроек нет

###Сборка
При сборки портала, файла конфигурации перезаписывает значения полей конфигурационным файлом
приложения а затем общим конфигурационным файлом портала (при наличии схожих полей).

## Использование
- Обязательно используется всеми компонентами портала

## Дополнительная функциональность

### Дополнительная директива on-enter (Используется как атрибут html тега input)
При нажатии ввод на элементе осуществляется действие указанное в параметрах атрибута

    <input type="text" ng-model="request.params.number" on-enter="searchRequest()" />

### Дополнительная директива stop-event (Используется как атрибут html тега div)
Позволяет предотвратить возникновения события указанного в параметрах атрибута внутри заданной области div

    <div class="modal-body" stop-event="touchend">
        ...        
    </div>
    
Реализовано как

    element.on(attrs.stopEvent, function (e) {
               e.stopPropagation();
    });