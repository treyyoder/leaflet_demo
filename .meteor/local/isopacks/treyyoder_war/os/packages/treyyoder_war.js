(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages/treyyoder:war/war.js                                                                  //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
Meteor.War = {                                                                                    // 1
	tbms : 20,                                                                                       // 2
	missle : null,                                                                                   // 3
	usflag : null,                                                                                   // 4
	nkflag : null,                                                                                   // 5
	srflag : null,                                                                                   // 6
	nuclearExplosion : null,                                                                         // 7
	ms:5000,                                                                                         // 8
	detonationDistance : 100,	                                                                       // 9
	pentaPoint : [ 38.870991, -77.055955 ],                                                          // 10
	moscow : [ 55.754915, 37.617218 ],                                                               // 11
	pyongyang : [ 39.038897, 125.763194 ],                                                           // 12
	NYC : [ 40.712576, -74.006514 ],	                                                                // 13
	getMissle : function() {                                                                         // 14
		if (Meteor.War.missle === null) {                                                               // 15
			return Meteor.War.missle = L.icon({                                                            // 16
				iconUrl : '/packages/treyyoder_war/images/missle.png',                                        // 17
				iconSize : [ 20, 40 ],                                                                        // 18
				iconAnchor : [ 7.5, 0 ],                                                                      // 19
				popupAnchor : [ 0, 40 ]                                                                       // 20
			});                                                                                            // 21
		}                                                                                               // 22
		return Meteor.War.missle;                                                                       // 23
	},                                                                                               // 24
                                                                                                  // 25
	getUSflag : function() {                                                                         // 26
		if (Meteor.War.usflag === null) {                                                               // 27
			return Meteor.War.usflag = L.icon({                                                            // 28
				iconUrl : '/packages/treyyoder_war/images/usflag.png',                                        // 29
				iconSize : [ 20, 40 ],                                                                        // 30
				iconAnchor : [ 7.5, 0 ],                                                                      // 31
				popupAnchor : [ 0, 40 ]                                                                       // 32
			});                                                                                            // 33
		}                                                                                               // 34
		return Meteor.War.usflag;                                                                       // 35
	},                                                                                               // 36
	getNKflag : function() {                                                                         // 37
		if (Meteor.War.nkflag === null) {                                                               // 38
			return Meteor.War.nkflag = L.icon({                                                            // 39
				iconUrl : '/packages/treyyoder_war/images/nkflag.png',                                        // 40
				iconSize : [ 20, 40 ],                                                                        // 41
				iconAnchor : [ 7.5, 0 ],                                                                      // 42
				popupAnchor : [ 0, 40 ]                                                                       // 43
			});                                                                                            // 44
		}                                                                                               // 45
		return Meteor.War.nkflag;                                                                       // 46
	},                                                                                               // 47
	getSRflag : function() {                                                                         // 48
		if (Meteor.War.srflag === null) {                                                               // 49
			return Meteor.War.srflag = L.icon({                                                            // 50
				iconUrl : '/packages/treyyoder_war/images/srflag.png',                                        // 51
				iconSize : [ 20, 40 ], // size of the icon                                                    // 52
				iconAnchor : [ 7.5, 0 ],                                                                      // 53
				popupAnchor : [ 0, 40 ]                                                                       // 54
			});                                                                                            // 55
		}                                                                                               // 56
		return Meteor.War.srflag;                                                                       // 57
	},                                                                                               // 58
	getNuclearExplosion : function() {                                                               // 59
		if (Meteor.War.nuclearExplosion === null) {                                                     // 60
			return Meteor.War.nuclearExplosion = L                                                         // 61
					.icon({                                                                                      // 62
						iconUrl : '/packages/treyyoder_war/images/nuclearExplosion.png',                            // 63
						iconSize : [ 30, 40 ],                                                                      // 64
						iconAnchor : [ 7.5, 0 ],                                                                    // 65
						popupAnchor : [ 0, 40 ]                                                                     // 66
                                                                                                  // 67
					});                                                                                          // 68
		}                                                                                               // 69
		return Meteor.War.nuclearExplosion;                                                             // 70
	},                                                                                               // 71
                                                                                                  // 72
	init : function() {                                                                              // 73
		for (var tbmc = 0; tbmc < Meteor.War.tbms; tbmc++) {                                            // 74
			var ms = 50                                                                                    // 75
			switch (tbmc % 4) {                                                                            // 76
			case 0:                                                                                        // 77
				var marker = new L.Marker(Meteor.leafnav                                                      // 78
						.getRandomLatLng(window.LUtil.map), {                                                       // 79
					draggable : true,                                                                            // 80
					icon : Meteor.War.getNKflag()                                                                // 81
				});                                                                                           // 82
				var interval = setInterval(Meteor.War.directMarkerLocation, ms,                               // 83
						marker, Meteor.War.pyongyang);                                                              // 84
				break;                                                                                        // 85
			case 1:                                                                                        // 86
				var marker = new L.Marker(Meteor.leafnav                                                      // 87
						.getRandomLatLng(window.LUtil.map), {                                                       // 88
					draggable : true,                                                                            // 89
					icon : Meteor.War.getSRflag()                                                                // 90
				});                                                                                           // 91
				var interval = setInterval(Meteor.War.directMarkerLocation, ms,                               // 92
						marker, Meteor.War.moscow);                                                                 // 93
				break;                                                                                        // 94
			case 2:                                                                                        // 95
				var marker = new L.Marker(Meteor.leafnav                                                      // 96
						.getRandomLatLng(window.LUtil.map), {                                                       // 97
					draggable : true,                                                                            // 98
					icon : Meteor.War.getUSflag()                                                                // 99
				});                                                                                           // 100
				var interval = setInterval(Meteor.War.directMarkerLocation, ms,                               // 101
						marker, Meteor.War.NYC);                                                                    // 102
				break;                                                                                        // 103
			case 3:                                                                                        // 104
				var marker = new L.Marker(Meteor.leafnav                                                      // 105
						.getRandomLatLng(window.LUtil.map), {                                                       // 106
					draggable : true,                                                                            // 107
					icon : Meteor.War.getMissle()                                                                // 108
				});                                                                                           // 109
				var interval = setInterval(Meteor.War.directMarkerLocation, ms,                               // 110
						marker, Meteor.War.pentaPoint);                                                             // 111
				break;                                                                                        // 112
			}                                                                                              // 113
                                                                                                  // 114
			var markInterval = {                                                                           // 115
				marker : marker,                                                                              // 116
				interval : interval                                                                           // 117
			};                                                                                             // 118
                                                                                                  // 119
			Meteor.leafnav.markIntervals.push(markInterval);                                               // 120
                                                                                                  // 121
			Meteor.leafnav.rotateMarker(markInterval.marker, 90);                                          // 122
			markInterval.marker.addTo(window.LUtil.map);                                                   // 123
                                                                                                  // 124
			marker.bindPopup("<b>Interval:</b> " + ms / 1000);                                             // 125
                                                                                                  // 126
		}                                                                                               // 127
	},                                                                                               // 128
	directMarkerLocation : function(marker, destination) {                                           // 129
		var currBearing = marker.getIconAngle();                                                        // 130
                                                                                                  // 131
		var latlon = Meteor.leafnav.calculateNewPosition(                                               // 132
				Meteor.leafnav.getCurrentPosition(marker), 25, marker.getIconAngle())                         // 133
                                                                                                  // 134
		marker.setLatLng(latlon).update();                                                              // 135
                                                                                                  // 136
		if (Meteor.leafnav.getDistance(Meteor.leafnav.getCurrentPosition(marker), destination, "K") < Meteor.War.detonationDistance) {
			marker.setIcon(Meteor.War.getNuclearExplosion());                                              // 138
			Meteor.leafnav.rotateMarker(marker, 0);                                                        // 139
			Meteor.leafnav.stopMarker(marker);                                                             // 140
			return;                                                                                        // 141
		}                                                                                               // 142
                                                                                                  // 143
		var bearing = Meteor.leafnav.getBearing(Meteor.leafnav.getCurrentPosition(marker), destination) // 144
		Meteor.leafnav.rotateMarker(marker, bearing);                                                   // 145
		marker.setPopupContent("<b>Interval:</b> " + Meteor.War.ms / 1000                               // 146
				+ "<br> <b>Bearing:</b> " + bearing);                                                         // 147
	}                                                                                                // 148
}                                                                                                 // 149
////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
