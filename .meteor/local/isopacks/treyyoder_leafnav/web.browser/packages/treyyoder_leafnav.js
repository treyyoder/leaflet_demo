(function () {

//////////////////////////////////////////////////////////////////////////
//                                                                      //
// packages/treyyoder:leafnav/leafnav.js                                //
//                                                                      //
//////////////////////////////////////////////////////////////////////////
                                                                        //
Meteor.leafnav = {                                                      // 1
	markIntervals : [],                                                    // 2
	getDistance : function(currentPosition, destination, unit) {           // 3
		var radlat1 = currentPosition[0].toRad();                             // 4
		var radlat2 = destination[0].toRad();                                 // 5
		var radlon1 = currentPosition[1].toRad();                             // 6
		var radlon2 = destination[1].toRad();                                 // 7
		var theta = currentPosition[1] - destination[1]                       // 8
		var radtheta = theta.toRad();                                         // 9
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1)  // 10
				* Math.cos(radlat2) * Math.cos(radtheta);                           // 11
		dist = Math.acos(dist) * 180 / Math.PI * 60 * 1.1515                  // 12
		if (unit == "K") {                                                    // 13
			dist = dist * 1.609344                                               // 14
		}                                                                     // 15
		if (unit == "N") {                                                    // 16
			dist = dist * 0.8684                                                 // 17
		}                                                                     // 18
		return dist                                                           // 19
	},                                                                     // 20
                                                                        // 21
	getBearing : function(currentPosition, destination) {                  // 22
		var startLat = currentPosition[0].toRad();                            // 23
		var startLng = currentPosition[1].toRad();                            // 24
		var endLat = destination[0].toRad();                                  // 25
		var endLng = destination[1].toRad();                                  // 26
		var dLng = Math.sin(endLng - startLng) * Math.cos(endLat);            // 27
		var dLat = Math.cos(startLat) * Math.sin(endLat) - Math.sin(startLat) // 28
				* Math.cos(endLat) * Math.cos(endLng - startLng);                   // 29
		var bearing = Math.atan2(dLng, dLat) * 57.2957795;                    // 30
		return bearing;                                                       // 31
	},                                                                     // 32
                                                                        // 33
	calculateNewPosition : function(currentPosition, distance, bearing) {  // 34
		// distance = 150.0/6371.0;                                           // 35
		distance = distance / 6371.0;                                         // 36
		var oldLat = currentPosition[0].toRad();                              // 37
		var oldLng = currentPosition[1].toRad();                              // 38
		bearing = bearing.toRad();                                            // 39
		var newLat = Math.asin(Math.sin(oldLat) * Math.cos(distance)          // 40
				+ Math.cos(oldLat) * Math.sin(distance) * Math.cos(bearing));       // 41
		var a = Math.atan2(Math.sin(bearing) * Math.sin(distance)             // 42
				* Math.cos(oldLat), Math.cos(distance) - Math.sin(oldLat)           // 43
				* Math.sin(newLat));                                                // 44
		var newLng = oldLng + a;                                              // 45
		newLng = (newLng + 3 * Math.PI) % (2 * Math.PI) - Math.PI;            // 46
		return [ newLat * 57.2957795, newLng * 57.2957795 ];                  // 47
	},                                                                     // 48
                                                                        // 49
	getRandomLatLng : function() {                                         // 50
		return [ this.getRandomInRange(-85, 85, 3),                           // 51
				this.getRandomInRange(-180, 180, 3) ]                               // 52
	},                                                                     // 53
                                                                        // 54
	getRandomInRange : function(from, to, fixed) {                         // 55
		return (Math.random() * (to - from) + from).toFixed(fixed) * 1;       // 56
	},                                                                     // 57
	getCurrentPosition : function(marker) {                                // 58
		return [ marker.getLatLng().lat, marker.getLatLng().lng ];            // 59
	},                                                                     // 60
	rotateMarker : function(marker, angle) {                               // 61
		marker.setIconAngle(angle);                                           // 62
		marker.setBearing(angle);                                             // 63
	},                                                                     // 64
	stopMarker : function(marker) {                                        // 65
		for (var i = 0; i < Meteor.leafnav.markIntervals.length; i++) {       // 66
			if (Meteor.leafnav.markIntervals[i].marker == marker) {              // 67
				clearInterval(Meteor.leafnav.markIntervals[i].interval);            // 68
				Meteor.leafnav.markIntervals.splice(i,1);                           // 69
			}                                                                    // 70
		}                                                                     // 71
	}                                                                      // 72
                                                                        // 73
};                                                                      // 74
                                                                        // 75
Number.prototype.toRad = function() {                                   // 76
	return this * Math.PI / 180;                                           // 77
}                                                                       // 78
//////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////
//                                                                      //
// packages/treyyoder:leafnav/Marker.NavAids.js                         //
//                                                                      //
//////////////////////////////////////////////////////////////////////////
                                                                        //
var _old__setPos = L.Marker.prototype._setPos;                          // 1
L.Marker.include({                                                      // 2
	setBearing: function (bearing) {                                       // 3
		this.options.bearing = bearing;                                       // 4
		if (this._map)                                                        // 5
			this.update();                                                       // 6
	},                                                                     // 7
	getBearing: function () {                                              // 8
		return this.options.bearing;			                                       // 9
	},		                                                                   // 10
	setCoordinates: function (newPosition) {                               // 11
		marker.setLatLng(newPosition).update();			                            // 12
	},                                                                     // 13
	getMilestone: function () {                                            // 14
		return this.options.milestone;			                                     // 15
	},                                                                     // 16
	setMilestone: function (milestone) {                                   // 17
		this.options.milestone = milestone;                                   // 18
		if (this._map)                                                        // 19
			this.update();			                                                    // 20
	},	                                                                    // 21
	getSpeed: function () {                                                // 22
		return this.options.speed;			                                         // 23
	},                                                                     // 24
	setSpeed: function (speed) {                                           // 25
		this.options.speed = speed;                                           // 26
		if (this._map)                                                        // 27
			this.update();			                                                    // 28
	},	                                                                    // 29
	getDistanceTraveled: function () {                                     // 30
		return this.options.distanceTraveled;			                              // 31
	},                                                                     // 32
	setDistanceTraveled: function (distanceTraveled) {                     // 33
		this.options.distanceTraveled = distanceTraveled;                     // 34
		if (this._map)                                                        // 35
			this.update();			                                                    // 36
	},                                                                     // 37
	getTripDistance: function () {                                         // 38
		return this.options.tripDistance;			                                  // 39
	},                                                                     // 40
	setTripDistance: function (tripDistance) {                             // 41
		this.options.tripDistance = tripDistance;                             // 42
		if (this._map)                                                        // 43
			this.update();			                                                    // 44
	},                                                                     // 45
	getArrivalTime: function () {                                          // 46
		return this.options.arrivalTime;			                                   // 47
	},                                                                     // 48
	setArrivalTime: function (arrivalTime) {                               // 49
		this.options.arrivalTime = arrivalTime;                               // 50
		if (this._map)                                                        // 51
			this.update();			                                                    // 52
	},                                                                     // 53
	_updateImg: function(i, a, s) {                                        // 54
		a = L.point(s).divideBy(2)._subtract(L.point(a));                     // 55
		var transform = '';                                                   // 56
		transform += ' translate(' + -a.x + 'px, ' + -a.y + 'px)';            // 57
		transform += ' rotate(' + this.options.iconAngle + 'deg)';            // 58
		transform += ' translate(' + a.x + 'px, ' + a.y + 'px)';              // 59
		i.style[L.DomUtil.TRANSFORM] += transform;                            // 60
	},                                                                     // 61
                                                                        // 62
	setIconAngle: function (iconAngle) {                                   // 63
		this.options.iconAngle = iconAngle;                                   // 64
		if (this._map)                                                        // 65
			this.update();                                                       // 66
	},                                                                     // 67
	                                                                       // 68
	getIconAngle: function () {                                            // 69
		return this.options.iconAngle;			                                     // 70
	},                                                                     // 71
                                                                        // 72
	_setPos: function (pos) {                                              // 73
		if (this._icon)                                                       // 74
			this._icon.style[L.DomUtil.TRANSFORM] = '';                          // 75
		if (this._shadow)                                                     // 76
			this._shadow.style[L.DomUtil.TRANSFORM] = '';                        // 77
                                                                        // 78
		_old__setPos.apply(this,[pos]);                                       // 79
                                                                        // 80
		if (this.options.iconAngle) {                                         // 81
			var a = this.options.icon.options.iconAnchor;                        // 82
			var s = this.options.icon.options.iconSize;                          // 83
			var i;                                                               // 84
			if (this._icon) {                                                    // 85
				i = this._icon;                                                     // 86
				this._updateImg(i, a, s);                                           // 87
			}                                                                    // 88
			if (this._shadow) {                                                  // 89
				if (this.options.icon.options.shadowAnchor)                         // 90
					a = this.options.icon.options.shadowAnchor;                        // 91
				s = this.options.icon.options.shadowSize;                           // 92
				i = this._shadow;                                                   // 93
				this._updateImg(i, a, s);                                           // 94
			}                                                                    // 95
		}                                                                     // 96
	}                                                                      // 97
	                                                                       // 98
});                                                                     // 99
                                                                        // 100
//////////////////////////////////////////////////////////////////////////

}).call(this);
