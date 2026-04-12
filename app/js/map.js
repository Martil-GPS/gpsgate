/**
 * map.js — Menaxhimi i hartës Google Maps
 *
 * Përdor Google Maps JavaScript API për të shfaqur
 * pozicionet e mjeteve me markers custom.
 */

/* Variablat globale të hartës */
var map = null;
var markers = {};       // { vehicleId: google.maps.Marker }
var infoWindows = {};   // { vehicleId: google.maps.InfoWindow }
var carIconUrl = '../assets/icons/car.svg';

/**
 * Inicializo hartën — thirret kur Google Maps API ngarkohet
 * Qendra fillestare: Shqipëria (41.33, 19.82)
 */
function initMap() {
  var defaultCenter = { lat: 41.33, lng: 19.82 };

  map = new google.maps.Map(document.getElementById('map'), {
    center: defaultCenter,
    zoom: 8,
    mapTypeId: 'roadmap',
    styles: [
      // Dark theme për hartën
      { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
      { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
      { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#38414e' }]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#212a37' }]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9ca5b3' }]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#17263c' }]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#515c6d' }]
      }
    ]
  });
}

/**
 * Shto ose përditëso marker për një mjet
 * @param {Object} vehicle - të dhënat e mjetit
 * @param {Object} position - { latitude, longitude, speed, time }
 */
function updateMarker(vehicle, position) {
  if (!position || !position.latitude || !position.longitude) return;
  if (!map) return;

  var vehicleId = vehicle.id || vehicle.Id || vehicle.ID;
  var vehicleName = vehicle.name || vehicle.Name || vehicle.username || vehicle.Username || ('Mjet ' + vehicleId);
  var lat = parseFloat(position.latitude || position.Latitude);
  var lng = parseFloat(position.longitude || position.Longitude);
  var speed = position.speed || position.Speed || 0;
  var time = position.time || position.Time || position.timestamp || '';

  if (isNaN(lat) || isNaN(lng)) return;

  var pos = { lat: lat, lng: lng };

  if (markers[vehicleId]) {
    // Përditëso pozicionin ekzistues
    markers[vehicleId].setPosition(pos);
  } else {
    // Krijo marker të ri me ikonë custom
    var marker = new google.maps.Marker({
      position: pos,
      map: map,
      title: vehicleName,
      icon: {
        url: carIconUrl,
        scaledSize: new google.maps.Size(32, 32),
        anchor: new google.maps.Point(16, 16)
      }
    });

    // InfoWindow kur klikohet markeri
    var infoWindow = new google.maps.InfoWindow();
    marker.addListener('click', function () {
      var content = '<div style="color:#333;font-size:13px;line-height:1.5">' +
        '<strong>' + vehicleName + '</strong><br>' +
        'Shpejtësia: ' + Math.round(speed) + ' km/h<br>' +
        'Koha: ' + formatTime(time) +
        '</div>';
      infoWindow.setContent(content);
      infoWindow.open(map, marker);
    });

    markers[vehicleId] = marker;
    infoWindows[vehicleId] = infoWindow;
  }

  // Përditëso InfoWindow content
  if (infoWindows[vehicleId]) {
    var content = '<div style="color:#333;font-size:13px;line-height:1.5">' +
      '<strong>' + vehicleName + '</strong><br>' +
      'Shpejtësia: ' + Math.round(speed) + ' km/h<br>' +
      'Koha: ' + formatTime(time) +
      '</div>';
    infoWindows[vehicleId].setContent(content);
  }
}

/**
 * Zoom te një mjet specifik
 * @param {string|number} vehicleId
 */
function focusVehicle(vehicleId) {
  var marker = markers[vehicleId];
  if (marker && map) {
    map.panTo(marker.getPosition());
    map.setZoom(15);

    // Hap InfoWindow
    if (infoWindows[vehicleId]) {
      // Mbyll të gjitha të tjerat
      Object.values(infoWindows).forEach(function (iw) { iw.close(); });
      infoWindows[vehicleId].open(map, marker);
    }
  }
}

/**
 * Përditëso të gjitha markers nga lista e mjeteve me pozicione
 * @param {Array} vehiclesWithPositions
 */
function updateAllMarkers(vehiclesWithPositions) {
  if (!vehiclesWithPositions || !Array.isArray(vehiclesWithPositions)) return;

  var bounds = new google.maps.LatLngBounds();
  var hasValidPosition = false;

  vehiclesWithPositions.forEach(function (v) {
    if (v.position) {
      updateMarker(v, v.position);
      var lat = parseFloat(v.position.latitude || v.position.Latitude);
      var lng = parseFloat(v.position.longitude || v.position.Longitude);
      if (!isNaN(lat) && !isNaN(lng)) {
        bounds.extend({ lat: lat, lng: lng });
        hasValidPosition = true;
      }
    }
  });

  // Fit bounds nëse ka pozicione valide
  if (hasValidPosition && map) {
    map.fitBounds(bounds);
    // Mos zoom shumë afër nëse ka vetëm 1 mjet
    var listener = google.maps.event.addListener(map, 'idle', function () {
      if (map.getZoom() > 16) map.setZoom(16);
      google.maps.event.removeListener(listener);
    });
  }
}

/**
 * Formato kohën për shfaqje
 * @param {string} timeStr
 * @returns {string}
 */
function formatTime(timeStr) {
  if (!timeStr) return 'N/A';
  try {
    var d = new Date(timeStr);
    if (isNaN(d.getTime())) return timeStr;
    return d.toLocaleString('sq-AL');
  } catch (e) {
    return timeStr;
  }
}
