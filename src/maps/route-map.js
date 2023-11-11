function start(points){
    ymaps.modules.define('MultiRouteCustomView', [
        'util.defineClass'
        ], function (provide, defineClass) {
            // Класс простого текстового отображения модели мультимаршрута.
            function CustomView (multiRouteModel) {
                this.multiRouteModel = multiRouteModel;
                // Объявляем начальное состояние.
                this.state = "init";
                this.stateChangeEvent = null;
                // Элемент, в который будет выводиться текст.
                this.outputElement = $('<div></div>').appendTo('#viewContainer');
    
                this.rebuildOutput();
    
                // Подписываемся на события модели, чтобы
                // обновлять текстовое описание мультимаршрута.
                multiRouteModel.events
                    .add(["requestsuccess", "requestfail", "requestsend"], this.onModelStateChange, this);
            }
    
            // Таблица соответствия идентификатора состояния имени его обработчика.
            CustomView.stateProcessors = {
                init: "processInit",
                requestsend: "processRequestSend",
                requestsuccess: "processSuccessRequest",
                requestfail: "processFailRequest"
            };
    
            // Таблица соответствия типа маршрута имени его обработчика.
            CustomView.routeProcessors = {
                "driving": "processDrivingRoute",
                "masstransit": "processMasstransitRoute",
                "pedestrian": "processPedestrianRoute"
            };
    
            defineClass(CustomView, {
                // Обработчик событий модели.
                onModelStateChange: function (e) {
                    // Запоминаем состояние модели и перестраиваем текстовое описание.
                    this.state = e.get("type");
                    this.stateChangeEvent = e;
                    this.rebuildOutput();
                },
    
                rebuildOutput: function () {
                    // Берем из таблицы обработчик для текущего состояния и исполняем его.
                    var processorName = CustomView.stateProcessors[this.state];
                    this.outputElement.html(
                        this[processorName](this.multiRouteModel, this.stateChangeEvent)
                    );
                },
    
                processInit: function () {
                    return "Инициализация ...";
                },
    
                processRequestSend: function () {
                    return "Запрос данных ...";
                },
    
                processSuccessRequest: function (multiRouteModel, e) {
                    var routes = multiRouteModel.getRoutes(),
                        result = [];
                    if (routes.length) {
                        for (var i = 0, l = routes.length; i < l; i++) {
                            result.push(this.processRoute(i, routes[i]));
                        }
                        //Отправим в УД AJAX с информацией
                        //AJAX будет устанавливать в свойство ответ от Яндекса, тут думаю все понятно
                        $.ajax({
                            url: '/objects/?op=set&object=System_GPS&p=goToJob&v=' + result,
                            success: function(responce) {
                                console.log('Отправлено!');
                            },
                            error: function(responce) {
                                console.log('Ошибка отправки в УД!');
                            }
                        });
                    } else {
                        result.push("Нет маршрутов.");
                    }
    
                    localStorage.setItem('time', result)
                    console.log(result)
                            
                    return result.join("<br/>");
                },
    
                processFailRequest: function (multiRouteModel, e) {
                    return e.get("error").message;
                },
    
                processRoute: function (index, route) {
                    // Берем из таблицы обработчик для данного типа маршрута и применяем его.
                    var processorName = CustomView.routeProcessors[route.properties.get("type")];
                    return this[processorName](route);
                },
    
                processDrivingRoute: function (route) {
                    var result = [];
                    result.push(this.createCommonRouteOutput(route));
                    return result.join("<br/>");
                },
    
                // Метод, формирующий общую часть описания для всех типов маршрутов.
                createCommonRouteOutput: function (route) {
                //формируется строка, которая и будет отправлена в majordomo
                    return route.properties.get("duration").text;
                },
    
                // Метод, строящий список текстовых описаний для
                // всех сегментов маршрута на общественном транспорте.
                createMasstransitRouteOutput: function (route) {
                    var result = [];
                    for (var i = 0, l = route.getPaths().length; i < l; i++) {
                        var path = route.getPaths()[i];
                        for (var j = 0, k = path.getSegments().length; j < k; j++) {
                            result.push("<li>" + path.getSegments()[j].properties.get("text") + "</li>");
                        }
                    }
                    return result.join("");
                },
    
                destroy: function () {
                    this.outputElement.remove();
                    this.multiRouteModel.events
                        .remove(["requestsuccess", "requestfail", "requestsend"], this.onModelStateChange, this);
                }
            });
    
            provide(CustomView);
        });
function init() {

    var multiRouteModel = new ymaps.multiRouter.MultiRouteModel(
        points, 
        {
        wayPointDraggable: true,
        boundsAutoApply: true,
        routingMode: 'driving'
    });

    var multiRoute = new ymaps.multiRouter.MultiRoute(multiRouteModel);
    
    // Создаем карту
    var myMap = new ymaps.Map('map', {
        center: [55.750625, 37.626],
        zoom: 7,
    }, {
        buttonMaxWidth: 300
    });

    // Добавляем мультимаршрут на карту.
    myMap.geoObjects.add(multiRoute);


    routeTypeSelector = new ymaps.control.ListBox({
        data: {
            content: 'Как добраться'
        },
        items: [
            new ymaps.control.ListBoxItem({data: {content: "Авто"},state: {selected: true}}),
            new ymaps.control.ListBoxItem({data: {content: "Общественным транспортом"}}),
            new ymaps.control.ListBoxItem({data: {content: "Пешком"}})
        ],
        options: {
            itemSelectOnClick: false
        }
    }),


    // Получаем прямые ссылки на пункты списка.
    autoRouteItem = routeTypeSelector.get(0),
    masstransitRouteItem = routeTypeSelector.get(1),
    pedestrianRouteItem = routeTypeSelector.get(2);

    // Подписываемся на события нажатия на пункты выпадающего списка.
    autoRouteItem.events.add('click', function (e) { changeRoutingMode('auto', e.get('target')); });

    ymaps.modules.require([
        'MultiRouteCustomView'
    ], function (MultiRouteCustomView) {
        new MultiRouteCustomView(multiRouteModel);
    });

}

function end(){
    const storedData = localStorage.getItem('Data');
    let data = JSON.parse(storedData);
    console.log(data)
    for (let i = 0; i < data.length; i++){
        if (data[i].minutes === 0){
            const match = localStorage.getItem('time').match(/^\d+/);
            const result = match ? match[0] : null;
            if (result !== null){
                localStorage.setItem('dataNow', parseInt(localStorage.getItem('dataNow')) + 1)
                data[i].minutes = parseInt(result)
                const jsonData = JSON.stringify(data)
                localStorage.setItem('Data', jsonData);
    
                localStorage.setItem('firstPoint', data[i + 1].from)
                localStorage.setItem('secondPoint', data[i + 1].to)
                localStorage.removeItem('time')
            }
            window.location.reload();
            break
        }
        
        if (data[data.length - 1].minutes == 0){
            window.location.reload();
        }
      };
    
}


ymaps.ready(init).then( () => {
    setTimeout(() => end(), 1000);
} );

}

const points = [localStorage.getItem('firstPoint'), localStorage.getItem('secondPoint')];
console.log(points)
if (points[0] && points[1] && localStorage.getItem('role') === 'MANAGER'){
    start(points);
}
