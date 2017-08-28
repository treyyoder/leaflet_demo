Meteor.Routing = {
	origin : [ 61.220169, -149.901367 ], // Anchorage
	destination : [ -53.163884, -70.917080 ], // PuntaArenas
	trip : [],
	tripIntervals : null,
	coordinateIntervals : [],
	init : function() {
		var self = this;
		self.trip[0] = L.Routing.control({
			waypoints : [ L.latLng(self.origin), L.latLng(self.destination) ]
		}).addTo(window.LUtil.map);

		interval = setInterval(Meteor.Routing.getRouteCoordinates, 1000,
				Meteor.Routing.trip[0]);

		var coordinateInterval = {
			trip : Meteor.Routing.trip[0],
			interval : interval
		};

		Meteor.Routing.coordinateIntervals.push(coordinateInterval);
	},
	getRouteCoordinates : function(trip) {
		if (trip._routes !== undefined) {
			Meteor.Routing.startNavigation(trip);
			Meteor.Routing.stopGettingCoordinates(trip);
		}
	},
	startNavigation : function(trip) {
		var marker = new L.Marker(Meteor.Routing.origin, {
			draggable : false,
			icon : Meteor.Routing.getCar()
		});
		window.LUtil.map.addLayer(marker);
		navInterval = setInterval(Meteor.Routing.drive, 50, marker, trip);
	},
	getCar : function() {
		var icon = L.icon({
			iconUrl : '/packages/treyyoder_routing/images/car.png',
			iconSize : [ 20, 40 ], // size of the icon
			iconAnchor : [ 7.5, 0 ], // point of the icon which will
			// correspond
			// to marker's location
			popupAnchor : [ 0, 40 ]
		// point from which the popup should open
		// relative to the iconAnchor
		});

		return icon;
	},
	drive : function(marker, trip) {
		var currentMilestone = marker.getMilestone();
		if (currentMilestone === undefined) {
			marker.setMilestone(0);
			currentMilestone = 0;
		}
		var currentPosition = trip._routes[0].coordinates[currentMilestone];
		var nextPosition = trip._routes[0].coordinates[currentMilestone + 1];
		if (!isNaN(parseFloat(nextPosition[1])) && isFinite(nextPosition[1]))
			// map.panTo(nextPosition);

			Meteor.leafnav.rotateMarker(marker, Meteor.leafnav.getBearing(
					currentPosition, nextPosition));

		marker.setLatLng(nextPosition).update();
		marker.setMilestone(currentMilestone + 1);

	},
	stopGettingCoordinates : function(trip) {
		for (var i = 0; i < Meteor.Routing.coordinateIntervals.length; i++) {
			if (Meteor.Routing.coordinateIntervals[i].trip == trip) {
				clearInterval(Meteor.Routing.coordinateIntervals[i].interval);
			}
		}
	}
}