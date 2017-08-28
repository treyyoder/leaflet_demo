Meteor.leafnav = {
	markIntervals : [],
	getDistance : function(currentPosition, destination, unit) {
		var radlat1 = currentPosition[0].toRad();
		var radlat2 = destination[0].toRad();
		var radlon1 = currentPosition[1].toRad();
		var radlon2 = destination[1].toRad();
		var theta = currentPosition[1] - destination[1]
		var radtheta = theta.toRad();
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1)
				* Math.cos(radlat2) * Math.cos(radtheta);
		dist = Math.acos(dist) * 180 / Math.PI * 60 * 1.1515
		if (unit == "K") {
			dist = dist * 1.609344
		}
		if (unit == "N") {
			dist = dist * 0.8684
		}
		return dist
	},

	getBearing : function(currentPosition, destination) {
		var startLat = currentPosition[0].toRad();
		var startLng = currentPosition[1].toRad();
		var endLat = destination[0].toRad();
		var endLng = destination[1].toRad();
		var dLng = Math.sin(endLng - startLng) * Math.cos(endLat);
		var dLat = Math.cos(startLat) * Math.sin(endLat) - Math.sin(startLat)
				* Math.cos(endLat) * Math.cos(endLng - startLng);
		var bearing = Math.atan2(dLng, dLat) * 57.2957795;
		return bearing;
	},

	calculateNewPosition : function(currentPosition, distance, bearing) {
		// distance = 150.0/6371.0;
		distance = distance / 6371.0;
		var oldLat = currentPosition[0].toRad();
		var oldLng = currentPosition[1].toRad();
		bearing = bearing.toRad();
		var newLat = Math.asin(Math.sin(oldLat) * Math.cos(distance)
				+ Math.cos(oldLat) * Math.sin(distance) * Math.cos(bearing));
		var a = Math.atan2(Math.sin(bearing) * Math.sin(distance)
				* Math.cos(oldLat), Math.cos(distance) - Math.sin(oldLat)
				* Math.sin(newLat));
		var newLng = oldLng + a;
		newLng = (newLng + 3 * Math.PI) % (2 * Math.PI) - Math.PI;
		return [ newLat * 57.2957795, newLng * 57.2957795 ];
	},

	getRandomLatLng : function() {
		return [ this.getRandomInRange(-85, 85, 3),
				this.getRandomInRange(-180, 180, 3) ]
	},

	getRandomInRange : function(from, to, fixed) {
		return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
	},
	getCurrentPosition : function(marker) {
		return [ marker.getLatLng().lat, marker.getLatLng().lng ];
	},
	rotateMarker : function(marker, angle) {
		marker.setIconAngle(angle);
		marker.setBearing(angle);
	},
	stopMarker : function(marker) {
		for (var i = 0; i < Meteor.leafnav.markIntervals.length; i++) {
			if (Meteor.leafnav.markIntervals[i].marker == marker) {
				clearInterval(Meteor.leafnav.markIntervals[i].interval);
				Meteor.leafnav.markIntervals.splice(i,1);
			}
		}
	}

};

Number.prototype.toRad = function() {
	return this * Math.PI / 180;
}