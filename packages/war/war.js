Meteor.War = {
	tbms : 20,
	missle : null,
	usflag : null,
	nkflag : null,
	srflag : null,
	nuclearExplosion : null,
	ms:5000,
	detonationDistance : 100,	
	pentaPoint : [ 38.870991, -77.055955 ],
	moscow : [ 55.754915, 37.617218 ],
	pyongyang : [ 39.038897, 125.763194 ],
	NYC : [ 40.712576, -74.006514 ],	
	getMissle : function() {
		if (Meteor.War.missle === null) {
			return Meteor.War.missle = L.icon({
				iconUrl : '/packages/treyyoder_war/images/missle.png',
				iconSize : [ 20, 40 ],
				iconAnchor : [ 7.5, 0 ],
				popupAnchor : [ 0, 40 ]
			});
		}
		return Meteor.War.missle;
	},

	getUSflag : function() {
		if (Meteor.War.usflag === null) {
			return Meteor.War.usflag = L.icon({
				iconUrl : '/packages/treyyoder_war/images/usflag.png',
				iconSize : [ 20, 40 ],
				iconAnchor : [ 7.5, 0 ],
				popupAnchor : [ 0, 40 ]
			});
		}
		return Meteor.War.usflag;
	},
	getNKflag : function() {
		if (Meteor.War.nkflag === null) {
			return Meteor.War.nkflag = L.icon({
				iconUrl : '/packages/treyyoder_war/images/nkflag.png',
				iconSize : [ 20, 40 ],
				iconAnchor : [ 7.5, 0 ],
				popupAnchor : [ 0, 40 ]
			});
		}
		return Meteor.War.nkflag;
	},
	getSRflag : function() {
		if (Meteor.War.srflag === null) {
			return Meteor.War.srflag = L.icon({
				iconUrl : '/packages/treyyoder_war/images/srflag.png',
				iconSize : [ 20, 40 ], // size of the icon
				iconAnchor : [ 7.5, 0 ],
				popupAnchor : [ 0, 40 ]
			});
		}
		return Meteor.War.srflag;
	},
	getNuclearExplosion : function() {
		if (Meteor.War.nuclearExplosion === null) {
			return Meteor.War.nuclearExplosion = L
					.icon({
						iconUrl : '/packages/treyyoder_war/images/nuclearExplosion.png',
						iconSize : [ 30, 40 ],
						iconAnchor : [ 7.5, 0 ],
						popupAnchor : [ 0, 40 ]

					});
		}
		return Meteor.War.nuclearExplosion;
	},

	init : function() {
		for (var tbmc = 0; tbmc < Meteor.War.tbms; tbmc++) {
			var ms = 50
			switch (tbmc % 4) {
			case 0:
				var marker = new L.Marker(Meteor.leafnav
						.getRandomLatLng(window.LUtil.map), {
					draggable : true,
					icon : Meteor.War.getNKflag()
				});
				var interval = setInterval(Meteor.War.directMarkerLocation, ms,
						marker, Meteor.War.pyongyang);
				break;
			case 1:
				var marker = new L.Marker(Meteor.leafnav
						.getRandomLatLng(window.LUtil.map), {
					draggable : true,
					icon : Meteor.War.getSRflag()
				});
				var interval = setInterval(Meteor.War.directMarkerLocation, ms,
						marker, Meteor.War.moscow);
				break;
			case 2:
				var marker = new L.Marker(Meteor.leafnav
						.getRandomLatLng(window.LUtil.map), {
					draggable : true,
					icon : Meteor.War.getUSflag()
				});
				var interval = setInterval(Meteor.War.directMarkerLocation, ms,
						marker, Meteor.War.NYC);
				break;
			case 3:
				var marker = new L.Marker(Meteor.leafnav
						.getRandomLatLng(window.LUtil.map), {
					draggable : true,
					icon : Meteor.War.getMissle()
				});
				var interval = setInterval(Meteor.War.directMarkerLocation, ms,
						marker, Meteor.War.pentaPoint);
				break;
			}

			var markInterval = {
				marker : marker,
				interval : interval
			};

			Meteor.leafnav.markIntervals.push(markInterval);

			Meteor.leafnav.rotateMarker(markInterval.marker, 90);
			markInterval.marker.addTo(window.LUtil.map);

			marker.bindPopup("<b>Interval:</b> " + ms / 1000);

		}
	},
	directMarkerLocation : function(marker, destination) {
		var currBearing = marker.getIconAngle();

		var latlon = Meteor.leafnav.calculateNewPosition(
				Meteor.leafnav.getCurrentPosition(marker), 25, marker.getIconAngle())

		marker.setLatLng(latlon).update();

		if (Meteor.leafnav.getDistance(Meteor.leafnav.getCurrentPosition(marker), destination, "K") < Meteor.War.detonationDistance) {
			marker.setIcon(Meteor.War.getNuclearExplosion());
			Meteor.leafnav.rotateMarker(marker, 0);
			Meteor.leafnav.stopMarker(marker);
			return;
		}

		var bearing = Meteor.leafnav.getBearing(Meteor.leafnav.getCurrentPosition(marker), destination)
		Meteor.leafnav.rotateMarker(marker, bearing);
		marker.setPopupContent("<b>Interval:</b> " + Meteor.War.ms / 1000
				+ "<br> <b>Bearing:</b> " + bearing);
	}
}