(function () {

//////////////////////////////////////////////////////////////////////////
//                                                                      //
// packages/treyyoder:routing/routing.js                                //
//                                                                      //
//////////////////////////////////////////////////////////////////////////
                                                                        //
Meteor.Routing = {                                                      // 1
	origin : [ 61.220169, -149.901367 ], // Anchorage                      // 2
	destination : [ -53.163884, -70.917080 ], // PuntaArenas               // 3
	trip : [],                                                             // 4
	tripIntervals : null,                                                  // 5
	coordinateIntervals : [],                                              // 6
	init : function() {                                                    // 7
		var self = this;                                                      // 8
		self.trip[0] = L.Routing.control({                                    // 9
			waypoints : [ L.latLng(self.origin), L.latLng(self.destination) ]    // 10
		}).addTo(window.LUtil.map);                                           // 11
                                                                        // 12
		interval = setInterval(Meteor.Routing.getRouteCoordinates, 1000,      // 13
				Meteor.Routing.trip[0]);                                            // 14
                                                                        // 15
		var coordinateInterval = {                                            // 16
			trip : Meteor.Routing.trip[0],                                       // 17
			interval : interval                                                  // 18
		};                                                                    // 19
                                                                        // 20
		Meteor.Routing.coordinateIntervals.push(coordinateInterval);          // 21
	},                                                                     // 22
	getRouteCoordinates : function(trip) {                                 // 23
		if (trip._routes !== undefined) {                                     // 24
			Meteor.Routing.startNavigation(trip);                                // 25
			Meteor.Routing.stopGettingCoordinates(trip);                         // 26
		}                                                                     // 27
	},                                                                     // 28
	startNavigation : function(trip) {                                     // 29
		var marker = new L.Marker(Meteor.Routing.origin, {                    // 30
			draggable : false,                                                   // 31
			icon : Meteor.Routing.getCar()                                       // 32
		});                                                                   // 33
		window.LUtil.map.addLayer(marker);                                    // 34
		navInterval = setInterval(Meteor.Routing.drive, 50, marker, trip);    // 35
	},                                                                     // 36
	getCar : function() {                                                  // 37
		var icon = L.icon({                                                   // 38
			iconUrl : '/packages/treyyoder_routing/images/car.png',              // 39
			iconSize : [ 20, 40 ], // size of the icon                           // 40
			iconAnchor : [ 7.5, 0 ], // point of the icon which will             // 41
			// correspond                                                        // 42
			// to marker's location                                              // 43
			popupAnchor : [ 0, 40 ]                                              // 44
		// point from which the popup should open                             // 45
		// relative to the iconAnchor                                         // 46
		});                                                                   // 47
                                                                        // 48
		return icon;                                                          // 49
	},                                                                     // 50
	drive : function(marker, trip) {                                       // 51
		var currentMilestone = marker.getMilestone();                         // 52
		if (currentMilestone === undefined) {                                 // 53
			marker.setMilestone(0);                                              // 54
			currentMilestone = 0;                                                // 55
		}                                                                     // 56
		var currentPosition = trip._routes[0].coordinates[currentMilestone];  // 57
		var nextPosition = trip._routes[0].coordinates[currentMilestone + 1]; // 58
		if (!isNaN(parseFloat(nextPosition[1])) && isFinite(nextPosition[1])) // 59
			// map.panTo(nextPosition);                                          // 60
                                                                        // 61
			Meteor.leafnav.rotateMarker(marker, Meteor.leafnav.getBearing(       // 62
					currentPosition, nextPosition));                                   // 63
                                                                        // 64
		marker.setLatLng(nextPosition).update();                              // 65
		marker.setMilestone(currentMilestone + 1);                            // 66
                                                                        // 67
	},                                                                     // 68
	stopGettingCoordinates : function(trip) {                              // 69
		for (var i = 0; i < Meteor.Routing.coordinateIntervals.length; i++) { // 70
			if (Meteor.Routing.coordinateIntervals[i].trip == trip) {            // 71
				clearInterval(Meteor.Routing.coordinateIntervals[i].interval);      // 72
			}                                                                    // 73
		}                                                                     // 74
	}                                                                      // 75
}                                                                       // 76
//////////////////////////////////////////////////////////////////////////

}).call(this);
