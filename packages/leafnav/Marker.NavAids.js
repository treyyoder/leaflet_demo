var _old__setPos = L.Marker.prototype._setPos;
L.Marker.include({
	setBearing: function (bearing) {
		this.options.bearing = bearing;
		if (this._map)
			this.update();
	},
	getBearing: function () {
		return this.options.bearing;			
	},		
	setCoordinates: function (newPosition) {
		marker.setLatLng(newPosition).update();			
	},
	getMilestone: function () {
		return this.options.milestone;			
	},
	setMilestone: function (milestone) {
		this.options.milestone = milestone;
		if (this._map)
			this.update();			
	},	
	getSpeed: function () {
		return this.options.speed;			
	},
	setSpeed: function (speed) {
		this.options.speed = speed;
		if (this._map)
			this.update();			
	},	
	getDistanceTraveled: function () {
		return this.options.distanceTraveled;			
	},
	setDistanceTraveled: function (distanceTraveled) {
		this.options.distanceTraveled = distanceTraveled;
		if (this._map)
			this.update();			
	},
	getTripDistance: function () {
		return this.options.tripDistance;			
	},
	setTripDistance: function (tripDistance) {
		this.options.tripDistance = tripDistance;
		if (this._map)
			this.update();			
	},
	getArrivalTime: function () {
		return this.options.arrivalTime;			
	},
	setArrivalTime: function (arrivalTime) {
		this.options.arrivalTime = arrivalTime;
		if (this._map)
			this.update();			
	},
	_updateImg: function(i, a, s) {
		a = L.point(s).divideBy(2)._subtract(L.point(a));
		var transform = '';
		transform += ' translate(' + -a.x + 'px, ' + -a.y + 'px)';
		transform += ' rotate(' + this.options.iconAngle + 'deg)';
		transform += ' translate(' + a.x + 'px, ' + a.y + 'px)';
		i.style[L.DomUtil.TRANSFORM] += transform;
	},

	setIconAngle: function (iconAngle) {
		this.options.iconAngle = iconAngle;
		if (this._map)
			this.update();
	},
	
	getIconAngle: function () {
		return this.options.iconAngle;			
	},

	_setPos: function (pos) {
		if (this._icon)
			this._icon.style[L.DomUtil.TRANSFORM] = '';
		if (this._shadow)
			this._shadow.style[L.DomUtil.TRANSFORM] = '';

		_old__setPos.apply(this,[pos]);

		if (this.options.iconAngle) {
			var a = this.options.icon.options.iconAnchor;
			var s = this.options.icon.options.iconSize;
			var i;
			if (this._icon) {
				i = this._icon;
				this._updateImg(i, a, s);
			}
			if (this._shadow) {
				if (this.options.icon.options.shadowAnchor)
					a = this.options.icon.options.shadowAnchor;
				s = this.options.icon.options.shadowSize;
				i = this._shadow;
				this._updateImg(i, a, s);
			}
		}
	}
	
});
