// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
	// Enable dynamicNavbar so we can use different navbar on different pages
    dynamicNavbar: true, 
	domCache: true
});















/*	==============================
	CREATE MAPBOX MAP
	==============================*/
	mapboxgl.accessToken = 'pk.eyJ1Ijoic29yZW5obGF1cnNlbiIsImEiOiJjaXN4bWs0NTkwMDNzMnVtbjJjNndlcnQ2In0.JHostizgDheGR63-fOcyVQ';
	var map = new mapboxgl.Map({
		container: 'map',
		center: [-122.420679, 37.772537],
		style: 'mapbox://styles/mapbox/outdoors-v9',
		zoom: 13
	});
	mapboxgl.accessToken = 'pk.eyJ1Ijoic29yZW5obGF1cnNlbiIsImEiOiJjaXN4bWs0NTkwMDNzMnVtbjJjNndlcnQ2In0.JHostizgDheGR63-fOcyVQ';
	var mymap = new mapboxgl.Map({
		container: 'mymap',
		center: [-122.420679, 37.772537],
		style: 'mapbox://styles/mapbox/outdoors-v9',
		zoom: 8
	});

	var layerList = document.getElementById('maplayer');
	var inputs = layerList.getElementsByTagName('input');

	function switchLayer(layer) {
		var layerId = layer.target.id;
		map.setStyle('mapbox://styles/mapbox/' + layerId + '-v9');
	}

	for (var i = 0; i < inputs.length; i++) {
		inputs[i].onclick = switchLayer;
	}

/* ==============================
	MAP Functions
	=============================*/
    map.on('touchend', updateGPScoordinate);
    map.on('mouseup', updateGPScoordinate);
    function updateGPScoordinate() {
        $$('.gps-coordinates').html(map.getCenter());
    }

    /*	MANUALLY ENVOKE GPS LOCATION*/
    $$('#map-get-location-manual').on('click', function (e) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true });
    });


	var onSuccess = function(position) {
		alert('Latitude: '          + position.coords.latitude          + '\n' +
			  'Longitude: '         + position.coords.longitude         + '\n' +
			  'Altitude: '          + position.coords.altitude          + '\n' +
			  'Accuracy: '          + position.coords.accuracy          + '\n' +
			  'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
			  'Heading: '           + position.coords.heading           + '\n' +
			  'Speed: '             + position.coords.speed             + '\n' +
			  'Timestamp: '         + position.timestamp                + '\n');
		//Moving map to gps-location
		map.setCenter([position.coords.longitude, position.coords.latitude]);
		map.setZoom(15);
		$$('.gps-coordinates').html(map.getCenter());
	};


	var onSuccessMyMap = function(position) {
		//Moving map to gps-location
		mymap.setCenter([position.coords.longitude, position.coords.latitude]);
		mymap.setZoom(15);
	};

	// onError Callback receives a PositionError object		//
	function onError(error) {
		//alert('code: '    + error.code    + '\n' +
		//	  'message: ' + error.message + '\n');
	}

    myApp.onPageInit('add-location', function (page) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true });
    });
    myApp.onPageReinit('add-location', function (page) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true });
    });
    myApp.onPageInit('my-locations', function (page) {
        navigator.geolocation.getCurrentPosition(onSuccessMyMap, onError, { enableHighAccuracy: true });
    });


/* ==============================
	LOGIN / CREATER USER FUNCTIONS
	=============================*/
$$('form#LoginForm').on('submitted', function (e) {
	alert("submitted");
	// actual XHR object
	var xhr = e.detail.xhr;
	// Ajax response from action file
	var data = e.detail.data;
	
	// PARSE JSON DATA
	var userData = JSON.parse(data);
	alert(userData);
	if(userData.login == 'true') {		
		alert("You're logged in");
		var loginUserData;
		$$.each(userData, function(k, v) {
			//display the key and value pair
			loginUserData = loginUserData + '['+k+':'+v+']';
			//alert(k + ' is ' + v);
		});	
		alert(loginUserData);
	}
	
	
/*	
	//SOME LOCAL STORAGE THING
	localStorage.setItem('someSetting', 'off');
	var someSetting = localStorage.getItem('someSetting');
*/
	alert(data);
});




/* =========================
	INJECT ALL SVG AS INLINE
	========================*/

    // Elements to inject
    var mySVGsToInject = document.querySelectorAll('img.svg');
    // Do the injection
    SVGInjector(mySVGsToInject);

    myApp.onPageBack('*', function (page) {
        // Elements to inject
        var mySVGsToInject = document.querySelectorAll('img.svg');
        // Do the injection
        SVGInjector(mySVGsToInject);
    });
    myApp.onPageReinit('*', function (page) {
        // Elements to inject
        var mySVGsToInject = document.querySelectorAll('img.svg');
        // Do the injection
        SVGInjector(mySVGsToInject);
    });
    myApp.onPageInit('*', function (page) {
        // Elements to inject
        var mySVGsToInject = document.querySelectorAll('img.svg');
        // Do the injection
        SVGInjector(mySVGsToInject);
    });
