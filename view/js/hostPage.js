var map;
var toronto = {lat: 43.700 , lng: -79.410};
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: toronto
    });

    var marker = new google.maps.Marker({
        position: toronto,
        map: map,
        title: 'location!'
    });
}

$("#mapTrigger").on('shown.bs.tab', function() {
    google.maps.event.trigger(map, 'resize');
    map.setCenter(toronto);
});
