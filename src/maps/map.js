export default start;

export function start(a, b){
    function init() {

        var multiRoute = new ymaps.multiRouter.MultiRoute({
            // Описание опорных точек мультимаршрута.
            referencePoints: [
                a,
                b
            ],
            // Параметры маршрутизации.
            params: {
                // Ограничение на максимальное количество маршрутов, возвращаемое маршрутизатором.
                results: 2
            }
        }, {
            // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
            boundsAutoApply: true
        });

        // Создаем карту
        var myMap = new ymaps.Map('map', {
            center: [55.750625, 37.626],
            zoom: 7,
        }, {
            buttonMaxWidth: 300
        });

        // Добавляем мультимаршрут на карту.
        myMap.geoObjects.add(multiRoute);
    }
    ymaps.ready(init);
}

