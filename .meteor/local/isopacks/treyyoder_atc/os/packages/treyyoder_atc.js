(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/treyyoder:atc/atc.js                                                                //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
Meteor.ATC = {                                                                                  // 1
	intervalRate : 1000, // milliseconds                                                           // 2
	squawkRate : 100,                                                                              // 3
	speedRange : [ 500, 1000000 ], // km/h                                                         // 4
	milliSecondInHour : 1000 * 60 * 60,                                                            // 5
	landingDistance : 20,                                                                          // 6
	currentPlanesAirborne : 0,                                                                     // 7
	trackLineIntervals : [],                                                                       // 8
	info : null,                                                                                   // 9
                                                                                                // 10
	getPlane : function() {                                                                        // 11
		var icon = L.icon({                                                                           // 12
			iconUrl : '/packages/treyyoder_atc/images/plane.png',                                        // 13
			iconSize : [ 15, 20 ], // size of the icon                                                   // 14
			iconAnchor : [ 7.5, 0 ], // point of the icon which will                                     // 15
			// correspond                                                                                // 16
			// to marker's location                                                                      // 17
			popupAnchor : [ 0, -10 ]                                                                     // 18
		// point from which the popup should open                                                     // 19
		// relative to the iconAnchor                                                                 // 20
		});                                                                                           // 21
                                                                                                // 22
		return icon;                                                                                  // 23
	},                                                                                             // 24
                                                                                                // 25
	startTraffic : function(airport) {                                                             // 26
		var ms = Meteor.ATC.getRandomInt(1000, 5000)                                                  // 27
		setInterval(Meteor.ATC.createFlight, ms, airport);                                            // 28
	},                                                                                             // 29
                                                                                                // 30
	getRandomInt : function(min, max) {                                                            // 31
		return Math.floor(Math.random() * (max - min + 1)) + min;                                     // 32
	},                                                                                             // 33
                                                                                                // 34
	getRandomAirport : function() {                                                                // 35
		return Airports[Meteor.ATC.getRandomInt(0, Airports.length - 1)];                             // 36
	},                                                                                             // 37
                                                                                                // 38
	getCurrentPosition : function(marker) {                                                        // 39
		return [ marker.getLatLng().lat, marker.getLatLng().lng ];                                    // 40
	},                                                                                             // 41
                                                                                                // 42
	rotateMarker : function(marker, angle) {                                                       // 43
		marker.setIconAngle(angle);                                                                   // 44
		marker.setBearing(angle);                                                                     // 45
	},                                                                                             // 46
                                                                                                // 47
	createFlight : function(origin) {                                                              // 48
		var marker = new L.Marker(                                                                    // 49
				[ origin.latitude_deg, origin.longitude_deg ], {                                            // 50
					draggable : true,                                                                          // 51
					icon : Meteor.ATC.getPlane()                                                               // 52
				});                                                                                         // 53
		marker.setIconAngle(0);                                                                       // 54
		marker.setBearing(0);                                                                         // 55
		marker.setDistanceTraveled(0);                                                                // 56
		marker.setSpeed(Meteor.ATC.getRandomInt(Meteor.ATC.speedRange[0],                             // 57
				Meteor.ATC.speedRange[1]));                                                                 // 58
                                                                                                // 59
		window.LUtil.map.addLayer(marker);                                                            // 60
		var destination = Meteor.ATC.getRandomAirport();                                              // 61
                                                                                                // 62
		var popupText = "<b>Interval:</b> " + Meteor.ATC.intervalRate                                 // 63
                                                                                                // 64
		marker.bindPopup(popupText);                                                                  // 65
		Meteor.ATC.rotateMarker(marker, 90);                                                          // 66
                                                                                                // 67
		var interval = setInterval(Meteor.ATC.directMarkerLocation,                                   // 68
				Meteor.ATC.squawkRate, marker, origin, destination);                                        // 69
		var markInterval = {                                                                          // 70
			marker : marker,                                                                             // 71
			interval : interval                                                                          // 72
		};                                                                                            // 73
                                                                                                // 74
		Meteor.leafnav.markIntervals.push(markInterval);                                              // 75
		Meteor.ATC.currentPlanesAirborne++;                                                           // 76
		Meteor.ATC.info.update();                                                                     // 77
	},                                                                                             // 78
	directMarkerLocation : function(marker, origin, destination) {                                 // 79
		var currBearing = marker.getIconAngle();                                                      // 80
                                                                                                // 81
		var initialCoordinates = Meteor.ATC.getCurrentPosition(marker);                               // 82
                                                                                                // 83
		// New coordinates, ie distance traveled is a function of time                                // 84
                                                                                                // 85
		var speed = Meteor.ATC.getRandomInt(marker.getSpeed() - 5, marker                             // 86
				.getSpeed() + 5);// km/h                                                                    // 87
                                                                                                // 88
		var distanceTraveled = (speed / Meteor.ATC.milliSecondInHour)                                 // 89
				* Meteor.ATC.squawkRate;                                                                    // 90
                                                                                                // 91
		var newCoordinates = Meteor.leafnav.calculateNewPosition(                                     // 92
				initialCoordinates, distanceTraveled, marker.getIconAngle())                                // 93
                                                                                                // 94
		marker.setLatLng(newCoordinates).update();                                                    // 95
                                                                                                // 96
		if ((initialCoordinates[1] * newCoordinates[1]) > 0) {                                        // 97
			var firstpolyline = new L.Polyline([ initialCoordinates,                                     // 98
					newCoordinates ], {                                                                        // 99
				color : 'red',                                                                              // 100
				weight : 1,                                                                                 // 101
				opacity : 0.5,                                                                              // 102
				smoothFactor : 1                                                                            // 103
                                                                                                // 104
			}).addTo(window.LUtil.map);                                                                  // 105
                                                                                                // 106
			var interval = setInterval(Meteor.ATC.clearLine, 5000,                                       // 107
					firstpolyline);                                                                            // 108
                                                                                                // 109
			var trackLineInterval = {                                                                    // 110
				line : firstpolyline,                                                                       // 111
				interval : interval                                                                         // 112
			};                                                                                           // 113
                                                                                                // 114
			Meteor.ATC.trackLineIntervals.push(trackLineInterval);                                       // 115
                                                                                                // 116
		}                                                                                             // 117
                                                                                                // 118
		if (Meteor.leafnav.getDistance(newCoordinates, [                                              // 119
				destination.latitude_deg, destination.longitude_deg ], "K") < Meteor.ATC.landingDistance) { // 120
			Meteor.leafnav.stopMarker(marker)                                                            // 121
			window.LUtil.map.removeLayer(marker);                                                        // 122
			Meteor.ATC.currentPlanesAirborne--;                                                          // 123
			Meteor.ATC.info.update();                                                                    // 124
			return;                                                                                      // 125
		}                                                                                             // 126
                                                                                                // 127
		marker.setDistanceTraveled(marker.getDistanceTraveled()                                       // 128
				+ distanceTraveled);                                                                        // 129
                                                                                                // 130
		var bearing = Meteor.leafnav.getBearing(Meteor.ATC                                            // 131
				.getCurrentPosition(marker), [ destination.latitude_deg,                                    // 132
				destination.longitude_deg ])                                                                // 133
		Meteor.ATC.rotateMarker(marker, bearing);                                                     // 134
		var popupContent = "<b>Squawk Rate:</b> " + Meteor.ATC.squawkRate                             // 135
				+ "ms" + "<br>" + "<b>Speed:</b> " + speed + " km/h" + "<br>"                               // 136
				+ "<b>Bearing:</b> " + bearing + "<br>"                                                     // 137
				+ "<b>Distance Traveled:</b> " + marker.getDistanceTraveled()                               // 138
				+ "<br>" + "<b>Origin:</b> " + origin.name + ", "                                           // 139
				+ origin.country + " : " + origin.region + "<br>"                                           // 140
				+ "<b>Destination:</b> " + destination.name + ", "                                          // 141
				+ destination.country + " : " + destination.region                                          // 142
		marker.setPopupContent(popupContent);                                                         // 143
	},                                                                                             // 144
	init : function() {                                                                            // 145
		Meteor.ATC.info = L.control();                                                                // 146
                                                                                                // 147
		Meteor.ATC.info.onAdd = function(map) {                                                       // 148
			this._div = L.DomUtil.create('div', 'info'); // create a div with                            // 149
			// a class "info"                                                                            // 150
			this.update();                                                                               // 151
			return this._div;                                                                            // 152
		};                                                                                            // 153
                                                                                                // 154
		// method that we will use to update the control based on feature                             // 155
		// properties passed                                                                          // 156
		Meteor.ATC.info.update = function() {                                                         // 157
			this._div.innerHTML = '<h4>Planes Airborne: '                                                // 158
					+ Meteor.ATC.currentPlanesAirborne + '</h4>';                                              // 159
		};                                                                                            // 160
                                                                                                // 161
		Meteor.ATC.info.addTo(window.LUtil.map);                                                      // 162
                                                                                                // 163
		for (var airport = 0; airport < Airports.length; airport++) {                                 // 164
			Meteor.ATC.startTraffic(Meteor.ATC.getRandomAirport());                                      // 165
			if (airport == 10) {                                                                         // 166
				return;                                                                                     // 167
			}                                                                                            // 168
		}                                                                                             // 169
	},                                                                                             // 170
	clearLine : function(line) {                                                                   // 171
		window.LUtil.map.removeLayer(line);                                                           // 172
		for (var i = 0; i < Meteor.ATC.trackLineIntervals.length; i++) {                              // 173
			if (Meteor.ATC.trackLineIntervals[i].line === line) {                                        // 174
				clearInterval(Meteor.ATC.trackLineIntervals[i].interval);                                   // 175
				Meteor.ATC.trackLineIntervals.splice(i, 1);                                                 // 176
			}                                                                                            // 177
		}                                                                                             // 178
	}                                                                                              // 179
}                                                                                               // 180
//////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
