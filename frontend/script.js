let map;

function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 44.865, lng: 13.849},
        zoom: 14,
        mapId: '7b0894ba46d3402e'
        });
}

window.initMap = initMap;