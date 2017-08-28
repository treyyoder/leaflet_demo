Meteor.ATC = {
	intervalRate : 1000, // milliseconds
	squawkRate : 100,
	speedRange : [ 500, 1000000 ], // km/h
	milliSecondInHour : 1000 * 60 * 60,
	landingDistance : 20,
	currentPlanesAirborne : 0,
	trackLineIntervals : [],
	info : null,

	getPlane : function() {
		var icon = L.icon({
			iconUrl : '/packages/treyyoder_atc/images/plane.png',
			iconSize : [ 15, 20 ], // size of the icon
			iconAnchor : [ 7.5, 0 ], // point of the icon which will
			// correspond
			// to marker's location
			popupAnchor : [ 0, -10 ]
		// point from which the popup should open
		// relative to the iconAnchor
		});

		return icon;
	},

	startTraffic : function(airport) {
		var ms = Meteor.ATC.getRandomInt(1000, 5000)
		setInterval(Meteor.ATC.createFlight, ms, airport);
	},

	getRandomInt : function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	getRandomAirport : function() {
		return Airports[Meteor.ATC.getRandomInt(0, Airports.length - 1)];
	},

	getCurrentPosition : function(marker) {
		return [ marker.getLatLng().lat, marker.getLatLng().lng ];
	},

	rotateMarker : function(marker, angle) {
		marker.setIconAngle(angle);
		marker.setBearing(angle);
	},

	createFlight : function(origin) {
		var marker = new L.Marker(
				[ origin.latitude_deg, origin.longitude_deg ], {
					draggable : true,
					icon : Meteor.ATC.getPlane()
				});
		marker.setIconAngle(0);
		marker.setBearing(0);
		marker.setDistanceTraveled(0);
		marker.setSpeed(Meteor.ATC.getRandomInt(Meteor.ATC.speedRange[0],
				Meteor.ATC.speedRange[1]));

		window.LUtil.map.addLayer(marker);
		var destination = Meteor.ATC.getRandomAirport();

		var popupText = "<b>Interval:</b> " + Meteor.ATC.intervalRate

		marker.bindPopup(popupText);
		Meteor.ATC.rotateMarker(marker, 90);

		var interval = setInterval(Meteor.ATC.directMarkerLocation,
				Meteor.ATC.squawkRate, marker, origin, destination);
		var markInterval = {
			marker : marker,
			interval : interval
		};

		Meteor.leafnav.markIntervals.push(markInterval);
		Meteor.ATC.currentPlanesAirborne++;
		Meteor.ATC.info.update();
	},
	directMarkerLocation : function(marker, origin, destination) {
		var currBearing = marker.getIconAngle();

		var initialCoordinates = Meteor.ATC.getCurrentPosition(marker);

		// New coordinates, ie distance traveled is a function of time

		var speed = Meteor.ATC.getRandomInt(marker.getSpeed() - 5, marker
				.getSpeed() + 5);// km/h

		var distanceTraveled = (speed / Meteor.ATC.milliSecondInHour)
				* Meteor.ATC.squawkRate;

		var newCoordinates = Meteor.leafnav.calculateNewPosition(
				initialCoordinates, distanceTraveled, marker.getIconAngle())

		marker.setLatLng(newCoordinates).update();

		if ((initialCoordinates[1] * newCoordinates[1]) > 0) {
			var firstpolyline = new L.Polyline([ initialCoordinates,
					newCoordinates ], {
				color : 'red',
				weight : 1,
				opacity : 0.5,
				smoothFactor : 1

			}).addTo(window.LUtil.map);

			var interval = setInterval(Meteor.ATC.clearLine, 5000,
					firstpolyline);

			var trackLineInterval = {
				line : firstpolyline,
				interval : interval
			};

			Meteor.ATC.trackLineIntervals.push(trackLineInterval);

		}

		if (Meteor.leafnav.getDistance(newCoordinates, [
				destination.latitude_deg, destination.longitude_deg ], "K") < Meteor.ATC.landingDistance) {
			Meteor.leafnav.stopMarker(marker)
			window.LUtil.map.removeLayer(marker);
			Meteor.ATC.currentPlanesAirborne--;
			Meteor.ATC.info.update();
			return;
		}

		marker.setDistanceTraveled(marker.getDistanceTraveled()
				+ distanceTraveled);

		var bearing = Meteor.leafnav.getBearing(Meteor.ATC
				.getCurrentPosition(marker), [ destination.latitude_deg,
				destination.longitude_deg ])
		Meteor.ATC.rotateMarker(marker, bearing);
		var popupContent = "<b>Squawk Rate:</b> " + Meteor.ATC.squawkRate
				+ "ms" + "<br>" + "<b>Speed:</b> " + speed + " km/h" + "<br>"
				+ "<b>Bearing:</b> " + bearing + "<br>"
				+ "<b>Distance Traveled:</b> " + marker.getDistanceTraveled()
				+ "<br>" + "<b>Origin:</b> " + origin.name + ", "
				+ origin.country + " : " + origin.region + "<br>"
				+ "<b>Destination:</b> " + destination.name + ", "
				+ destination.country + " : " + destination.region
		marker.setPopupContent(popupContent);
	},
	init : function() {
		Meteor.ATC.info = L.control();

		Meteor.ATC.info.onAdd = function(map) {
			this._div = L.DomUtil.create('div', 'info'); // create a div with
			// a class "info"
			this.update();
			return this._div;
		};

		// method that we will use to update the control based on feature
		// properties passed
		Meteor.ATC.info.update = function() {
			this._div.innerHTML = '<h4>Planes Airborne: '
					+ Meteor.ATC.currentPlanesAirborne + '</h4>';
		};

		Meteor.ATC.info.addTo(window.LUtil.map);

		for (var airport = 0; airport < Airports.length; airport++) {
			Meteor.ATC.startTraffic(Meteor.ATC.getRandomAirport());
			if (airport == 10) {
				return;
			}
		}
	},
	clearLine : function(line) {
		window.LUtil.map.removeLayer(line);
		for (var i = 0; i < Meteor.ATC.trackLineIntervals.length; i++) {
			if (Meteor.ATC.trackLineIntervals[i].line === line) {
				clearInterval(Meteor.ATC.trackLineIntervals[i].interval);
				Meteor.ATC.trackLineIntervals.splice(i, 1);
			}
		}
	}
}