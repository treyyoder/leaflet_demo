//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
//                                                                      //
// If you are using Chrome, open the Developer Tools and click the gear //
// icon in its lower right corner. In the General Settings panel, turn  //
// on 'Enable source maps'.                                             //
//                                                                      //
// If you are using Firefox 23, go to `about:config` and set the        //
// `devtools.debugger.source-maps-enabled` preference to true.          //
// (The preference should be on by default in Firefox 24; versions      //
// older than 23 do not support source maps.)                           //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;

(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/fuatsengul:leaflet-routing-machine/fuatsengul:leaflet-routing-machine.js                             //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
L.Routing = {};                                                                                                  // 1
                                                                                                                 // 2
L.Routing.Autocomplete = L.Class.extend({                                                                        // 3
	options: {                                                                                                      // 4
		timeout: 500,                                                                                                  // 5
		blurTimeout: 100,                                                                                              // 6
		noResultsMessage: 'No results found.'                                                                          // 7
	},                                                                                                              // 8
                                                                                                                 // 9
	initialize: function(elem, callback, context, options) {                                                        // 10
		L.setOptions(this, options);                                                                                   // 11
                                                                                                                 // 12
		this._elem = elem;                                                                                             // 13
		this._resultFn = options.resultFn ? L.Util.bind(options.resultFn, options.resultContext) : null;               // 14
		this._autocomplete = options.autocompleteFn ? L.Util.bind(options.autocompleteFn, options.autocompleteContext) : null;
		this._selectFn = L.Util.bind(callback, context);                                                               // 16
		this._container = L.DomUtil.create('div', 'leaflet-routing-geocoder-result');                                  // 17
		this._resultTable = L.DomUtil.create('table', '', this._container);                                            // 18
                                                                                                                 // 19
		// TODO: looks a bit like a kludge to register same for input and keypress -                                   // 20
		// browsers supporting both will get duplicate events; just registering                                        // 21
		// input will not catch enter, though.                                                                         // 22
		L.DomEvent.addListener(this._elem, 'input', this._keyPressed, this);                                           // 23
		L.DomEvent.addListener(this._elem, 'keypress', this._keyPressed, this);                                        // 24
		L.DomEvent.addListener(this._elem, 'keydown', this._keyDown, this);                                            // 25
		L.DomEvent.addListener(this._elem, 'blur', function() {                                                        // 26
			if (this._isOpen) {                                                                                           // 27
				this.close();                                                                                                // 28
			}                                                                                                             // 29
		}, this);                                                                                                      // 30
	},                                                                                                              // 31
                                                                                                                 // 32
	close: function() {                                                                                             // 33
		L.DomUtil.removeClass(this._container, 'leaflet-routing-geocoder-result-open');                                // 34
		this._isOpen = false;                                                                                          // 35
	},                                                                                                              // 36
                                                                                                                 // 37
	_open: function() {                                                                                             // 38
		var sibling = this._elem.nextSibling;                                                                          // 39
		if (!this._container.parentElement) {                                                                          // 40
			if (sibling) {                                                                                                // 41
				this._elem.parentElement.insertBefore(this._container, sibling);                                             // 42
			} else {                                                                                                      // 43
				this._elem.parentElement.appendChild(this._container);                                                       // 44
			}                                                                                                             // 45
			this._container.style.left = this._elem.offsetLeft + 'px';                                                    // 46
			this._container.style.top = (this._elem.offsetTop + this._elem.offsetHeight) + 'px';                          // 47
			this._container.style.width = this._elem.offsetWidth + 'px';                                                  // 48
		}                                                                                                              // 49
                                                                                                                 // 50
		L.DomUtil.addClass(this._container, 'leaflet-routing-geocoder-result-open');                                   // 51
		this._isOpen = true;                                                                                           // 52
	},                                                                                                              // 53
                                                                                                                 // 54
	_setResults: function(results) {                                                                                // 55
		var i,                                                                                                         // 56
		    tr,                                                                                                        // 57
		    td,                                                                                                        // 58
		    text;                                                                                                      // 59
                                                                                                                 // 60
		delete this._selection;                                                                                        // 61
		this._results = results;                                                                                       // 62
                                                                                                                 // 63
		while (this._resultTable.firstChild) {                                                                         // 64
			this._resultTable.removeChild(this._resultTable.firstChild);                                                  // 65
		}                                                                                                              // 66
                                                                                                                 // 67
		for (i = 0; i < results.length; i++) {                                                                         // 68
			tr = L.DomUtil.create('tr', '', this._resultTable);                                                           // 69
			tr.setAttribute('data-result-index', i);                                                                      // 70
			td = L.DomUtil.create('td', '', tr);                                                                          // 71
			text = document.createTextNode(results[i].name);                                                              // 72
			td.appendChild(text);                                                                                         // 73
			// mousedown + click because:                                                                                 // 74
			// http://stackoverflow.com/questions/10652852/jquery-fire-click-before-blur-event                            // 75
			L.DomEvent.addListener(td, 'mousedown', L.DomEvent.preventDefault);                                           // 76
			L.DomEvent.addListener(td, 'click', this._resultSelected(results[i]), this);                                  // 77
		}                                                                                                              // 78
                                                                                                                 // 79
		if (!i) {                                                                                                      // 80
			tr = L.DomUtil.create('tr', '', this._resultTable);                                                           // 81
			td = L.DomUtil.create('td', 'leaflet-routing-geocoder-no-results', tr);                                       // 82
			td.innerHTML = this.options.noResultsMessage;                                                                 // 83
		}                                                                                                              // 84
                                                                                                                 // 85
		this._open();                                                                                                  // 86
                                                                                                                 // 87
		if (results.length > 0) {                                                                                      // 88
			// Select the first entry                                                                                     // 89
			this._select(1);                                                                                              // 90
		}                                                                                                              // 91
	},                                                                                                              // 92
                                                                                                                 // 93
	_resultSelected: function(r) {                                                                                  // 94
		return L.bind(function() {                                                                                     // 95
			this.close();                                                                                                 // 96
			this._elem.value = r.name;                                                                                    // 97
			this._lastCompletedText = r.name;                                                                             // 98
			this._selectFn(r);                                                                                            // 99
		}, this);                                                                                                      // 100
	},                                                                                                              // 101
                                                                                                                 // 102
	_keyPressed: function(e) {                                                                                      // 103
		var index;                                                                                                     // 104
                                                                                                                 // 105
		if (this._isOpen && e.keyCode === 13 && this._selection) {                                                     // 106
			index = parseInt(this._selection.getAttribute('data-result-index'), 10);                                      // 107
			this._resultSelected(this._results[index])();                                                                 // 108
			L.DomEvent.preventDefault(e);                                                                                 // 109
			return;                                                                                                       // 110
		}                                                                                                              // 111
                                                                                                                 // 112
		if (e.keyCode === 13) {                                                                                        // 113
			this._complete(this._resultFn, true);                                                                         // 114
			return;                                                                                                       // 115
		}                                                                                                              // 116
                                                                                                                 // 117
		if (this._autocomplete && document.activeElement === this._elem) {                                             // 118
			if (this._timer) {                                                                                            // 119
				clearTimeout(this._timer);                                                                                   // 120
			}                                                                                                             // 121
			this._timer = setTimeout(L.Util.bind(function() { this._complete(this._autocomplete); }, this),               // 122
				this.options.timeout);                                                                                       // 123
			return;                                                                                                       // 124
		}                                                                                                              // 125
                                                                                                                 // 126
		this._unselect();                                                                                              // 127
	},                                                                                                              // 128
                                                                                                                 // 129
	_select: function(dir) {                                                                                        // 130
		var sel = this._selection;                                                                                     // 131
		if (sel) {                                                                                                     // 132
			L.DomUtil.removeClass(sel.firstChild, 'leaflet-routing-geocoder-selected');                                   // 133
			sel = sel[dir > 0 ? 'nextSibling' : 'previousSibling'];                                                       // 134
		}                                                                                                              // 135
		if (!sel) {                                                                                                    // 136
			sel = this._resultTable[dir > 0 ? 'firstChild' : 'lastChild'];                                                // 137
		}                                                                                                              // 138
                                                                                                                 // 139
		if (sel) {                                                                                                     // 140
			L.DomUtil.addClass(sel.firstChild, 'leaflet-routing-geocoder-selected');                                      // 141
			this._selection = sel;                                                                                        // 142
		}                                                                                                              // 143
	},                                                                                                              // 144
                                                                                                                 // 145
	_unselect: function() {                                                                                         // 146
		if (this._selection) {                                                                                         // 147
			L.DomUtil.removeClass(this._selection.firstChild, 'leaflet-routing-geocoder-selected');                       // 148
		}                                                                                                              // 149
		delete this._selection;                                                                                        // 150
	},                                                                                                              // 151
                                                                                                                 // 152
	_keyDown: function(e) {                                                                                         // 153
		if (this._isOpen) {                                                                                            // 154
			switch (e.keyCode) {                                                                                          // 155
			// Up                                                                                                         // 156
			case 38:                                                                                                      // 157
				this._select(-1);                                                                                            // 158
				L.DomEvent.preventDefault(e);                                                                                // 159
				return;                                                                                                      // 160
			// Down                                                                                                       // 161
			case 40:                                                                                                      // 162
				this._select(1);                                                                                             // 163
				L.DomEvent.preventDefault(e);                                                                                // 164
				return;                                                                                                      // 165
			}                                                                                                             // 166
		}                                                                                                              // 167
	},                                                                                                              // 168
                                                                                                                 // 169
	_complete: function(completeFn, trySelect) {                                                                    // 170
		var v = this._elem.value;                                                                                      // 171
		function completeResults(results) {                                                                            // 172
			this._lastCompletedText = v;                                                                                  // 173
			if (trySelect && results.length === 1) {                                                                      // 174
				this._resultSelected(results[0])();                                                                          // 175
			} else {                                                                                                      // 176
				this._setResults(results);                                                                                   // 177
			}                                                                                                             // 178
		}                                                                                                              // 179
                                                                                                                 // 180
		if (!v) {                                                                                                      // 181
			return;                                                                                                       // 182
		}                                                                                                              // 183
                                                                                                                 // 184
		if (v !== this._lastCompletedText) {                                                                           // 185
			completeFn(v, completeResults, this);                                                                         // 186
		} else if (trySelect) {                                                                                        // 187
			completeResults.call(this, this._results);                                                                    // 188
		}                                                                                                              // 189
	}                                                                                                               // 190
});                                                                                                              // 191
                                                                                                                 // 192
L.Routing._jsonpCallbackId = 0;                                                                                  // 193
L.Routing._jsonp = function(url, callback, context, jsonpParam) {                                                // 194
	var callbackId = '_l_routing_machine_' + (L.Routing._jsonpCallbackId++),                                        // 195
	    script;                                                                                                     // 196
	url += '&' + jsonpParam + '=' + callbackId;                                                                     // 197
	window[callbackId] = L.Util.bind(callback, context);                                                            // 198
	script = document.createElement('script');                                                                      // 199
	script.type = 'text/javascript';                                                                                // 200
	script.src = url;                                                                                               // 201
	script.id = callbackId;                                                                                         // 202
	document.getElementsByTagName('head')[0].appendChild(script);                                                   // 203
};                                                                                                               // 204
                                                                                                                 // 205
L.Routing.OSRM = L.Class.extend({                                                                                // 206
	options: {                                                                                                      // 207
		serviceUrl: '//router.project-osrm.org/viaroute',                                                              // 208
		geometryPrecision: 6                                                                                           // 209
	},                                                                                                              // 210
                                                                                                                 // 211
	initialize: function(options) {                                                                                 // 212
		L.Util.setOptions(this, options);                                                                              // 213
		this._hints = {                                                                                                // 214
			locations: {}                                                                                                 // 215
		};                                                                                                             // 216
	},                                                                                                              // 217
                                                                                                                 // 218
	route: function(waypoints, callback, context) {                                                                 // 219
		var url = this._buildRouteUrl(waypoints);                                                                      // 220
                                                                                                                 // 221
		L.Routing._jsonp(url, function(data) {                                                                         // 222
			this._routeDone(data, waypoints, callback, context);                                                          // 223
		}, this, 'jsonp');                                                                                             // 224
                                                                                                                 // 225
		return this;                                                                                                   // 226
	},                                                                                                              // 227
                                                                                                                 // 228
	_routeDone: function(response, waypoints, callback, context) {                                                  // 229
		context = context || callback;                                                                                 // 230
		if (response.status !== 0) {                                                                                   // 231
			callback.call(context, {                                                                                      // 232
				status: response.status,                                                                                     // 233
				message: response.message                                                                                    // 234
			});                                                                                                           // 235
			return;                                                                                                       // 236
		}                                                                                                              // 237
                                                                                                                 // 238
		var alts = [{                                                                                                  // 239
				name: response.route_name.join(', '),                                                                        // 240
				coordinates: this._decode(response.route_geometry, this.options.geometryPrecision),                          // 241
				instructions: this._convertInstructions(response.route_instructions),                                        // 242
				summary: this._convertSummary(response.route_summary),                                                       // 243
				waypoints: response.via_points                                                                               // 244
			}],                                                                                                           // 245
		    i;                                                                                                         // 246
                                                                                                                 // 247
		if (response.alternative_geometries) {                                                                         // 248
			for (i = 0; i < response.alternative_geometries.length; i++) {                                                // 249
				alts.push({                                                                                                  // 250
					name: response.alternative_names[i].join(', '),                                                             // 251
					coordinates: this._decode(response.alternative_geometries[i], this.options.geometryPrecision),              // 252
					instructions: this._convertInstructions(response.alternative_instructions[i]),                              // 253
					summary: this._convertSummary(response.alternative_summaries[i]),                                           // 254
					waypoints: response.via_points                                                                              // 255
				});                                                                                                          // 256
			}                                                                                                             // 257
		}                                                                                                              // 258
                                                                                                                 // 259
		this._saveHintData(response, waypoints);                                                                       // 260
		callback.call(context, null, alts);                                                                            // 261
	},                                                                                                              // 262
                                                                                                                 // 263
	_buildRouteUrl: function(waypoints) {                                                                           // 264
		var locs = [],                                                                                                 // 265
		    locationKey,                                                                                               // 266
		    hint;                                                                                                      // 267
                                                                                                                 // 268
		for (var i = 0; i < waypoints.length; i++) {                                                                   // 269
			locationKey = this._locationKey(waypoints[i].latLng);                                                         // 270
			locs.push('loc=' + locationKey);                                                                              // 271
                                                                                                                 // 272
			hint = this._hints.locations[locationKey];                                                                    // 273
			if (hint) {                                                                                                   // 274
				locs.push('hint=' + hint);                                                                                   // 275
			}                                                                                                             // 276
		}                                                                                                              // 277
                                                                                                                 // 278
		return this.options.serviceUrl + '?' +                                                                         // 279
			'instructions=true&' +                                                                                        // 280
			locs.join('&') +                                                                                              // 281
			(this._hints.checksum !== undefined ? '&checksum=' + this._hints.checksum : '');                              // 282
	},                                                                                                              // 283
                                                                                                                 // 284
	_locationKey: function(location) {                                                                              // 285
		return location.lat + ',' + location.lng;                                                                      // 286
	},                                                                                                              // 287
                                                                                                                 // 288
	_saveHintData: function(route, waypoints) {                                                                     // 289
		var hintData = route.hint_data,                                                                                // 290
		    loc;                                                                                                       // 291
		this._hints = {                                                                                                // 292
			checksum: hintData.checksum,                                                                                  // 293
			locations: {}                                                                                                 // 294
		};                                                                                                             // 295
		for (var i = hintData.locations.length - 1; i >= 0; i--) {                                                     // 296
			loc = waypoints[i].latLng;                                                                                    // 297
			this._hints.locations[this._locationKey(loc)] = hintData.locations[i];                                        // 298
		}                                                                                                              // 299
	},                                                                                                              // 300
                                                                                                                 // 301
	// Adapted from                                                                                                 // 302
	// https://github.com/DennisSchiefer/Project-OSRM-Web/blob/develop/WebContent/routing/OSRM.RoutingGeometry.js   // 303
	_decode: function(encoded, precision) {                                                                         // 304
		var len = encoded.length,                                                                                      // 305
		    index=0,                                                                                                   // 306
		    lat=0,                                                                                                     // 307
		    lng = 0,                                                                                                   // 308
		    array = [];                                                                                                // 309
                                                                                                                 // 310
		precision = Math.pow(10, -precision);                                                                          // 311
                                                                                                                 // 312
		while (index < len) {                                                                                          // 313
			var b,                                                                                                        // 314
			    shift = 0,                                                                                                // 315
			    result = 0;                                                                                               // 316
			do {                                                                                                          // 317
				b = encoded.charCodeAt(index++) - 63;                                                                        // 318
				result |= (b & 0x1f) << shift;                                                                               // 319
				shift += 5;                                                                                                  // 320
			} while (b >= 0x20);                                                                                          // 321
			var dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));                                                   // 322
			lat += dlat;                                                                                                  // 323
			shift = 0;                                                                                                    // 324
			result = 0;                                                                                                   // 325
			do {                                                                                                          // 326
				b = encoded.charCodeAt(index++) - 63;                                                                        // 327
				result |= (b & 0x1f) << shift;                                                                               // 328
				shift += 5;                                                                                                  // 329
			} while (b >= 0x20);                                                                                          // 330
			var dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));                                                   // 331
			lng += dlng;                                                                                                  // 332
			//array.push( {lat: lat * precision, lng: lng * precision} );                                                 // 333
			array.push( [lat * precision, lng * precision] );                                                             // 334
		}                                                                                                              // 335
		return array;                                                                                                  // 336
	},                                                                                                              // 337
                                                                                                                 // 338
	_convertSummary: function(osrmSummary) {                                                                        // 339
		return {                                                                                                       // 340
			totalDistance: osrmSummary.total_distance,                                                                    // 341
			totalTime: osrmSummary.total_time                                                                             // 342
		};                                                                                                             // 343
	},                                                                                                              // 344
                                                                                                                 // 345
	_convertInstructions: function(osrmInstructions) {                                                              // 346
		var result = [],                                                                                               // 347
		    i,                                                                                                         // 348
		    instr,                                                                                                     // 349
		    type,                                                                                                      // 350
		    driveDir;                                                                                                  // 351
                                                                                                                 // 352
		for (i = 0; i < osrmInstructions.length; i++) {                                                                // 353
			instr = osrmInstructions[i];                                                                                  // 354
			type = this._drivingDirectionType(instr[0]);                                                                  // 355
			driveDir = instr[0].split('-');                                                                               // 356
			if (type) {                                                                                                   // 357
				result.push({                                                                                                // 358
					type: type,                                                                                                 // 359
					distance: instr[2],                                                                                         // 360
					time: instr[4],                                                                                             // 361
					road: instr[1],                                                                                             // 362
					direction: instr[6],                                                                                        // 363
					exit: driveDir.length > 1 ? driveDir[1] : undefined,                                                        // 364
					index: instr[3]                                                                                             // 365
				});                                                                                                          // 366
			}                                                                                                             // 367
		}                                                                                                              // 368
                                                                                                                 // 369
		return result;                                                                                                 // 370
	},                                                                                                              // 371
                                                                                                                 // 372
	_drivingDirectionType: function(d) {                                                                            // 373
		switch (parseInt(d, 10)) {                                                                                     // 374
		case 1:                                                                                                        // 375
			return 'Straight';                                                                                            // 376
		case 2:                                                                                                        // 377
			return 'SlightRight';                                                                                         // 378
		case 3:                                                                                                        // 379
			return 'Right';                                                                                               // 380
		case 4:                                                                                                        // 381
			return 'SharpRight';                                                                                          // 382
		case 5:                                                                                                        // 383
			return 'TurnAround';                                                                                          // 384
		case 6:                                                                                                        // 385
			return 'SharpLeft';                                                                                           // 386
		case 7:                                                                                                        // 387
			return 'Left';                                                                                                // 388
		case 8:                                                                                                        // 389
			return 'SlightRight';                                                                                         // 390
		case 9:                                                                                                        // 391
			return 'WaypointReached';                                                                                     // 392
		case 10:                                                                                                       // 393
			// TODO: "Head on"                                                                                            // 394
			// https://github.com/DennisOSRM/Project-OSRM/blob/master/DataStructures/TurnInstructions.h#L48               // 395
			return 'Straight';                                                                                            // 396
		case 11:                                                                                                       // 397
		case 12:                                                                                                       // 398
			return 'Roundabout';                                                                                          // 399
		case 15:                                                                                                       // 400
			return 'DestinationReached';                                                                                  // 401
		default:                                                                                                       // 402
			return null;                                                                                                  // 403
		}                                                                                                              // 404
	}                                                                                                               // 405
});                                                                                                              // 406
                                                                                                                 // 407
L.Routing.osrm = function(options) {                                                                             // 408
	return new L.Routing.OSRM(options);                                                                             // 409
};                                                                                                               // 410
                                                                                                                 // 411
L.Routing.Line = L.Class.extend({                                                                                // 412
	includes: L.Mixin.Events,                                                                                       // 413
                                                                                                                 // 414
	options: {                                                                                                      // 415
		styles: [                                                                                                      // 416
			{color: 'black', opacity: 0.15, weight: 7},                                                                   // 417
			{color: 'white', opacity: 0.8, weight: 4},                                                                    // 418
			{color: 'orange', opacity: 1, weight: 2}                                                                      // 419
		],                                                                                                             // 420
		addWaypoints: true                                                                                             // 421
	},                                                                                                              // 422
                                                                                                                 // 423
	initialize: function(route, options) {                                                                          // 424
		L.Util.setOptions(this, options);                                                                              // 425
		this._route = route;                                                                                           // 426
                                                                                                                 // 427
		this._wpIndices = this._findWaypointIndices();                                                                 // 428
	},                                                                                                              // 429
                                                                                                                 // 430
	addTo: function(map) {                                                                                          // 431
		map.addLayer(this);                                                                                            // 432
		return this;                                                                                                   // 433
	},                                                                                                              // 434
                                                                                                                 // 435
	onAdd: function(map) {                                                                                          // 436
		var geom = this._route.coordinates,                                                                            // 437
		    i,                                                                                                         // 438
		    pl;                                                                                                        // 439
                                                                                                                 // 440
		this._map = map;                                                                                               // 441
		this._layers = [];                                                                                             // 442
		for (i = 0; i < this.options.styles.length; i++) {                                                             // 443
			pl = L.polyline(geom, this.options.styles[i])                                                                 // 444
				.addTo(map);                                                                                                 // 445
			if (this.options.addWaypoints) {                                                                              // 446
				pl.on('mousedown', this._onLineTouched, this);                                                               // 447
			}                                                                                                             // 448
			this._layers.push(pl);                                                                                        // 449
		}                                                                                                              // 450
	},                                                                                                              // 451
                                                                                                                 // 452
	onRemove: function(map) {                                                                                       // 453
		var i;                                                                                                         // 454
		for (i = 0; i < this._layers.length; i++) {                                                                    // 455
			map.removeLayer(this._layers[i]);                                                                             // 456
		}                                                                                                              // 457
                                                                                                                 // 458
		delete this._map;                                                                                              // 459
	},                                                                                                              // 460
                                                                                                                 // 461
	getBounds: function() {                                                                                         // 462
		return L.latLngBounds(this._route.coordinates);                                                                // 463
	},                                                                                                              // 464
                                                                                                                 // 465
	_findWaypointIndices: function() {                                                                              // 466
		var wps = this._route.waypoints,                                                                               // 467
		    indices = [],                                                                                              // 468
		    i;                                                                                                         // 469
		for (i = 0; i < wps.length; i++) {                                                                             // 470
			indices.push(this._findClosestRoutePoint(L.latLng(wps[i])));                                                  // 471
		}                                                                                                              // 472
                                                                                                                 // 473
		return indices;                                                                                                // 474
	},                                                                                                              // 475
                                                                                                                 // 476
	_findClosestRoutePoint: function(latlng) {                                                                      // 477
		var minDist = Number.MAX_VALUE,                                                                                // 478
			minIndex,                                                                                                     // 479
		    i,                                                                                                         // 480
		    d;                                                                                                         // 481
                                                                                                                 // 482
		for (i = this._route.coordinates.length - 1; i >= 0 ; i--) {                                                   // 483
			// TODO: maybe do this in pixel space instead?                                                                // 484
			d = latlng.distanceTo(this._route.coordinates[i]);                                                            // 485
			if (d < minDist) {                                                                                            // 486
				minIndex = i;                                                                                                // 487
				minDist = d;                                                                                                 // 488
			}                                                                                                             // 489
		}                                                                                                              // 490
                                                                                                                 // 491
		return minIndex;                                                                                               // 492
	},                                                                                                              // 493
                                                                                                                 // 494
	_findNearestWpBefore: function(i) {                                                                             // 495
		var j = this._wpIndices.length - 1;                                                                            // 496
		while (j >= 0 && this._wpIndices[j] > i) {                                                                     // 497
			j--;                                                                                                          // 498
		}                                                                                                              // 499
                                                                                                                 // 500
		return j;                                                                                                      // 501
	},                                                                                                              // 502
                                                                                                                 // 503
	_onLineTouched: function(e) {                                                                                   // 504
		var afterIndex = this._findNearestWpBefore(this._findClosestRoutePoint(e.latlng));                             // 505
		this.fire('linetouched', {                                                                                     // 506
			afterIndex: afterIndex,                                                                                       // 507
			latlng: e.latlng                                                                                              // 508
		});                                                                                                            // 509
	},                                                                                                              // 510
});                                                                                                              // 511
                                                                                                                 // 512
L.Routing.line = function(route, options) {                                                                      // 513
	return new L.Routing.Line(route, options);                                                                      // 514
};                                                                                                               // 515
                                                                                                                 // 516
L.Routing.Itinerary = L.Control.extend({                                                                         // 517
	includes: L.Mixin.Events,                                                                                       // 518
                                                                                                                 // 519
	options: {                                                                                                      // 520
		units: 'metric',                                                                                               // 521
		pointMarkerStyle: {                                                                                            // 522
			radius: 5,                                                                                                    // 523
			color: '#03f',                                                                                                // 524
			fillColor: 'white',                                                                                           // 525
			opacity: 1,                                                                                                   // 526
			fillOpacity: 0.7                                                                                              // 527
		},                                                                                                             // 528
		summaryTemplate: '<h2>{name}</h2><h3>{distance}, {time}</h3>',                                                 // 529
		distanceTemplate: '{value} {unit}',                                                                            // 530
		timeTemplate: '{time}',                                                                                        // 531
		unitNames: {                                                                                                   // 532
			meters: 'm',                                                                                                  // 533
			kilometers: 'km',                                                                                             // 534
			yards: 'yd',                                                                                                  // 535
			miles: 'mi',                                                                                                  // 536
			hours: 'h',                                                                                                   // 537
			minutes: 'mín',                                                                                               // 538
			seconds: 's'                                                                                                  // 539
		},                                                                                                             // 540
		containerClassName: '',                                                                                        // 541
		alternativeClassName: '',                                                                                      // 542
		minimizedClassName: '',                                                                                        // 543
		itineraryClassName: '',                                                                                        // 544
		roundingSensitivity: 1,                                                                                        // 545
		show: true                                                                                                     // 546
	},                                                                                                              // 547
                                                                                                                 // 548
	initialize: function(options) {                                                                                 // 549
		L.setOptions(this, options);                                                                                   // 550
	},                                                                                                              // 551
                                                                                                                 // 552
	onAdd: function() {                                                                                             // 553
		this._container = L.DomUtil.create('div', 'leaflet-routing-container leaflet-bar ' +                           // 554
			(!this.options.show ? 'leaflet-routing-container-hide' : '') +                                                // 555
			this.options.containerClassName);                                                                             // 556
		L.DomEvent.disableClickPropagation(this._container);                                                           // 557
		L.DomEvent.addListener(this._container, 'mousewheel', function(e) {                                            // 558
			L.DomEvent.stopPropagation(e);                                                                                // 559
		});                                                                                                            // 560
		return this._container;                                                                                        // 561
	},                                                                                                              // 562
                                                                                                                 // 563
	onRemove: function() {                                                                                          // 564
	},                                                                                                              // 565
                                                                                                                 // 566
	setAlternatives: function(routes) {                                                                             // 567
		var i,                                                                                                         // 568
		    alt,                                                                                                       // 569
		    altDiv;                                                                                                    // 570
                                                                                                                 // 571
		this._clearAlts();                                                                                             // 572
                                                                                                                 // 573
		this._routes = routes;                                                                                         // 574
                                                                                                                 // 575
		for (i = 0; i < this._routes.length; i++) {                                                                    // 576
			alt = this._routes[i];                                                                                        // 577
			altDiv = this._createAlternative(alt, i);                                                                     // 578
			this._container.appendChild(altDiv);                                                                          // 579
			this._altElements.push(altDiv);                                                                               // 580
		}                                                                                                              // 581
                                                                                                                 // 582
		this.fire('routeselected', {route: this._routes[0]});                                                          // 583
                                                                                                                 // 584
		return this;                                                                                                   // 585
	},                                                                                                              // 586
                                                                                                                 // 587
	show: function() {                                                                                              // 588
		L.DomUtil.removeClass(this._container, 'leaflet-routing-container-hide');                                      // 589
	},                                                                                                              // 590
                                                                                                                 // 591
	hide: function() {                                                                                              // 592
		L.DomUtil.addClass(this._container, 'leaflet-routing-container-hide');                                         // 593
	},                                                                                                              // 594
                                                                                                                 // 595
	_createAlternative: function(alt, i) {                                                                          // 596
		var altDiv = L.DomUtil.create('div', 'leaflet-routing-alt ' +                                                  // 597
			this.options.alternativeClassName +                                                                           // 598
			(i > 0 ? ' leaflet-routing-alt-minimized ' + this.options.minimizedClassName : ''));                          // 599
		altDiv.innerHTML = L.Util.template(this.options.summaryTemplate, {                                             // 600
			name: alt.name,                                                                                               // 601
			distance: this._formatDistance(alt.summary.totalDistance),                                                    // 602
			time: this._formatTime(alt.summary.totalTime)                                                                 // 603
		});                                                                                                            // 604
		L.DomEvent.addListener(altDiv, 'click', this._onAltClicked, this);                                             // 605
                                                                                                                 // 606
		altDiv.appendChild(this._createItineraryTable(alt));                                                           // 607
		return altDiv;                                                                                                 // 608
	},                                                                                                              // 609
                                                                                                                 // 610
	_clearAlts: function() {                                                                                        // 611
		var i,                                                                                                         // 612
			alt;                                                                                                          // 613
		// TODO: this is really inelegant                                                                              // 614
		for (i = 0; this._container && i < this._container.children.length; i++) {                                     // 615
			alt = this._container.children[i];                                                                            // 616
			if (L.DomUtil.hasClass(alt, 'leaflet-routing-alt')) {                                                         // 617
				this._container.removeChild(alt);                                                                            // 618
				i--;                                                                                                         // 619
			}                                                                                                             // 620
		}                                                                                                              // 621
                                                                                                                 // 622
		this._altElements = [];                                                                                        // 623
	},                                                                                                              // 624
                                                                                                                 // 625
	_createItineraryTable: function(r) {                                                                            // 626
		var table = L.DomUtil.create('table', this.options.itineraryClassName),                                        // 627
		    body = L.DomUtil.create('tbody', '', table),                                                               // 628
		    i,                                                                                                         // 629
		    instr,                                                                                                     // 630
		    row,                                                                                                       // 631
		    td;                                                                                                        // 632
                                                                                                                 // 633
		for (i = 0; i < r.instructions.length; i++) {                                                                  // 634
			instr = r.instructions[i];                                                                                    // 635
			row = L.DomUtil.create('tr', '', body);                                                                       // 636
			td = L.DomUtil.create('td', '', row);                                                                         // 637
			td.appendChild(document.createTextNode(this._instruction(instr, i)));                                         // 638
			td = L.DomUtil.create('td', '', row);                                                                         // 639
			td.appendChild(document.createTextNode(this._formatDistance(instr.distance)));                                // 640
			this._addRowListeners(row, r.coordinates[instr.index]);                                                       // 641
		}                                                                                                              // 642
                                                                                                                 // 643
		return table;                                                                                                  // 644
	},                                                                                                              // 645
                                                                                                                 // 646
	_addRowListeners: function(row, coordinate) {                                                                   // 647
		var _this = this,                                                                                              // 648
		    marker;                                                                                                    // 649
		L.DomEvent.addListener(row, 'mouseover', function() {                                                          // 650
			marker = L.circleMarker(coordinate,                                                                           // 651
				_this.options.pointMarkerStyle).addTo(_this._map);                                                           // 652
		});                                                                                                            // 653
		L.DomEvent.addListener(row, 'mouseout', function() {                                                           // 654
			if (marker) {                                                                                                 // 655
				_this._map.removeLayer(marker);                                                                              // 656
				marker = null;                                                                                               // 657
			}                                                                                                             // 658
		});                                                                                                            // 659
		L.DomEvent.addListener(row, 'click', function(e) {                                                             // 660
			_this._map.panTo(coordinate);                                                                                 // 661
			L.DomEvent.stopPropagation(e);                                                                                // 662
		});                                                                                                            // 663
	},                                                                                                              // 664
                                                                                                                 // 665
	_onAltClicked: function(e) {                                                                                    // 666
		var altElem,                                                                                                   // 667
		    j,                                                                                                         // 668
		    n,                                                                                                         // 669
		    isCurrentSelection,                                                                                        // 670
		    classFn;                                                                                                   // 671
                                                                                                                 // 672
		altElem = e.target || window.event.srcElement;                                                                 // 673
		while (!L.DomUtil.hasClass(altElem, 'leaflet-routing-alt')) {                                                  // 674
			altElem = altElem.parentElement;                                                                              // 675
		}                                                                                                              // 676
                                                                                                                 // 677
		if (L.DomUtil.hasClass(altElem, 'leaflet-routing-alt-minimized')) {                                            // 678
			for (j = 0; j < this._altElements.length; j++) {                                                              // 679
				n = this._altElements[j];                                                                                    // 680
				isCurrentSelection = altElem === n;                                                                          // 681
				classFn = isCurrentSelection ? 'removeClass' : 'addClass';                                                   // 682
				L.DomUtil[classFn](n, 'leaflet-routing-alt-minimized');                                                      // 683
				if (this.options.minimizedClassName) {                                                                       // 684
					L.DomUtil[classFn](n, this.options.minimizedClassName);                                                     // 685
				}                                                                                                            // 686
                                                                                                                 // 687
				if (isCurrentSelection) {                                                                                    // 688
					// TODO: don't fire if the currently active is clicked                                                      // 689
					this.fire('routeselected', {route: this._routes[j]});                                                       // 690
				}                                                                                                            // 691
			}                                                                                                             // 692
		}                                                                                                              // 693
                                                                                                                 // 694
		L.DomEvent.stop(e);                                                                                            // 695
	},                                                                                                              // 696
                                                                                                                 // 697
	_formatDistance: function(d /* Number (meters) */) {                                                            // 698
		var un = this.options.unitNames,                                                                               // 699
		    v,                                                                                                         // 700
			data;                                                                                                         // 701
                                                                                                                 // 702
		if (this.options.units === 'imperial') {                                                                       // 703
			d = d / 1.609344;                                                                                             // 704
			if (d >= 1000) {                                                                                              // 705
				data = {                                                                                                     // 706
					value: (this._round(d) / 1000),                                                                             // 707
					unit: un.miles                                                                                              // 708
				};                                                                                                           // 709
			} else {                                                                                                      // 710
				data = {                                                                                                     // 711
					value: this._round(d / 1.760),                                                                              // 712
					unit: un.yards                                                                                              // 713
				};                                                                                                           // 714
			}                                                                                                             // 715
		} else {                                                                                                       // 716
			v = this._round(d);                                                                                           // 717
			data = {                                                                                                      // 718
				value: v >= 1000 ? (v / 1000) : v,                                                                           // 719
				unit: v >= 1000 ? un.kilometers : un.meters                                                                  // 720
			};                                                                                                            // 721
		}                                                                                                              // 722
                                                                                                                 // 723
		return L.Util.template(this.options.distanceTemplate, data);                                                   // 724
	},                                                                                                              // 725
                                                                                                                 // 726
	_round: function(d) {                                                                                           // 727
		var pow10 = Math.pow(10, (Math.floor(d / this.options.roundingSensitivity) + '').length - 1),                  // 728
			r = Math.floor(d / pow10),                                                                                    // 729
			p = (r > 5) ? pow10 : pow10 / 2;                                                                              // 730
                                                                                                                 // 731
		return Math.round(d / p) * p;                                                                                  // 732
	},                                                                                                              // 733
                                                                                                                 // 734
	_formatTime: function(t /* Number (seconds) */) {                                                               // 735
		if (t > 86400) {                                                                                               // 736
			return Math.round(t / 3600) + ' h';                                                                           // 737
		} else if (t > 3600) {                                                                                         // 738
			return Math.floor(t / 3600) + ' h ' +                                                                         // 739
				Math.round((t % 3600) / 60) + ' min';                                                                        // 740
		} else if (t > 300) {                                                                                          // 741
			return Math.round(t / 60) + ' min';                                                                           // 742
		} else if (t > 60) {                                                                                           // 743
			return Math.floor(t / 60) + ' min ' +                                                                         // 744
				(t % 60) + ' s';                                                                                             // 745
		} else {                                                                                                       // 746
			return t + ' s';                                                                                              // 747
		}                                                                                                              // 748
	},                                                                                                              // 749
                                                                                                                 // 750
	_instruction: function(instr, i) {                                                                              // 751
		if (instr.type !== undefined) {                                                                                // 752
			return L.Util.template(this._getInstructionTemplate(instr, i),                                                // 753
				L.extend({exit: this._formatOrder(instr.exit), dir: this._dir[instr.direction]},                             // 754
					instr));                                                                                                    // 755
		} else {                                                                                                       // 756
			return instr.text;                                                                                            // 757
		}                                                                                                              // 758
	},                                                                                                              // 759
                                                                                                                 // 760
	_getInstructionTemplate: function(instr, i) {                                                                   // 761
		switch (instr.type) {                                                                                          // 762
		case 'Straight':                                                                                               // 763
			return (i === 0 ? 'Head' : 'Continue') + ' {dir}' + (instr.road ? ' on {road}' : '');                         // 764
		case 'SlightRight':                                                                                            // 765
			return 'Slight right' + (instr.road ? ' onto {road}' : '');                                                   // 766
		case 'Right':                                                                                                  // 767
			return 'Right' + (instr.road ? ' onto {road}' : '');                                                          // 768
		case 'SharpRight':                                                                                             // 769
			return 'Sharp right' + (instr.road ? ' onto {road}' : '');                                                    // 770
		case 'TurnAround':                                                                                             // 771
			return 'Turn around';                                                                                         // 772
		case 'SharpLeft':                                                                                              // 773
			return 'Sharp left' + (instr.road ? ' onto {road}' : '');                                                     // 774
		case 'Left':                                                                                                   // 775
			return 'Left' + (instr.road ? ' onto {road}' : '');                                                           // 776
		case 'SlightLeft':                                                                                             // 777
			return 'Slight left' + (instr.road ? ' onto {road}' : '');                                                    // 778
		case 'WaypointReached':                                                                                        // 779
			return 'Waypoint reached';                                                                                    // 780
		case 'Roundabout':                                                                                             // 781
			return  'Take the {exit} exit in the roundabout';                                                             // 782
		case 'DestinationReached':                                                                                     // 783
			return  'Destination reached';                                                                                // 784
		}                                                                                                              // 785
	},                                                                                                              // 786
                                                                                                                 // 787
	_formatOrder: function(n) {                                                                                     // 788
		var i = n % 10 - 1,                                                                                            // 789
			suffix = ['st', 'nd', 'rd'];                                                                                  // 790
                                                                                                                 // 791
		return suffix[i] ? n + suffix[i] : n + 'th';                                                                   // 792
	},                                                                                                              // 793
                                                                                                                 // 794
	_dir: {                                                                                                         // 795
		N: 'north',                                                                                                    // 796
		NE: 'northeast',                                                                                               // 797
		E: 'east',                                                                                                     // 798
		SE: 'southeast',                                                                                               // 799
		S: 'south',                                                                                                    // 800
		SW: 'southwest',                                                                                               // 801
		W: 'west',                                                                                                     // 802
		NW: 'northwest'                                                                                                // 803
	}                                                                                                               // 804
});                                                                                                              // 805
                                                                                                                 // 806
L.Routing.Itinerary._instructions = {                                                                            // 807
};                                                                                                               // 808
                                                                                                                 // 809
L.Routing.itinerary = function(router) {                                                                         // 810
	return new L.Routing.Itinerary(router);                                                                         // 811
};                                                                                                               // 812
                                                                                                                 // 813
var Waypoint = L.Class.extend({                                                                                  // 814
		initialize: function(latLng, name) {                                                                           // 815
			this.latLng = latLng;                                                                                         // 816
			this.name = name;                                                                                             // 817
		}                                                                                                              // 818
	});                                                                                                             // 819
                                                                                                                 // 820
                                                                                                                 // 821
L.Routing.Plan = L.Class.extend({                                                                                // 822
	includes: L.Mixin.Events,                                                                                       // 823
                                                                                                                 // 824
	options: {                                                                                                      // 825
		dragStyles: [                                                                                                  // 826
			{color: 'black', opacity: 0.15, weight: 7},                                                                   // 827
			{color: 'white', opacity: 0.8, weight: 4},                                                                    // 828
			{color: 'orange', opacity: 1, weight: 2, dashArray: '7,12'}                                                   // 829
		],                                                                                                             // 830
		draggableWaypoints: true,                                                                                      // 831
		addWaypoints: true,                                                                                            // 832
		maxGeocoderTolerance: 200,                                                                                     // 833
		autocompleteOptions: {},                                                                                       // 834
		geocodersClassName: '',                                                                                        // 835
		geocoderPlaceholder: function(i, numberWaypoints) {                                                            // 836
			return i === 0 ?                                                                                              // 837
				'Start' :                                                                                                    // 838
				(i < numberWaypoints - 1 ?                                                                                   // 839
								'Via ' + i :                                                                                             // 840
								'End');                                                                                                  // 841
		},                                                                                                             // 842
		geocoderClass: function() {                                                                                    // 843
			return '';                                                                                                    // 844
		}                                                                                                              // 845
	},                                                                                                              // 846
                                                                                                                 // 847
	initialize: function(waypoints, options) {                                                                      // 848
		L.Util.setOptions(this, options);                                                                              // 849
		this._waypoints = [];                                                                                          // 850
		this.setWaypoints(waypoints);                                                                                  // 851
	},                                                                                                              // 852
                                                                                                                 // 853
	isReady: function() {                                                                                           // 854
		var i;                                                                                                         // 855
		for (i = 0; i < this._waypoints.length; i++) {                                                                 // 856
			if (!this._waypoints[i].latLng) {                                                                             // 857
				return false;                                                                                                // 858
			}                                                                                                             // 859
		}                                                                                                              // 860
                                                                                                                 // 861
		return true;                                                                                                   // 862
	},                                                                                                              // 863
                                                                                                                 // 864
	getWaypoints: function() {                                                                                      // 865
		var i,                                                                                                         // 866
			wps = [];                                                                                                     // 867
                                                                                                                 // 868
		for (i = 0; i < this._waypoints.length; i++) {                                                                 // 869
			wps.push(this._waypoints[i]);                                                                                 // 870
		}                                                                                                              // 871
                                                                                                                 // 872
		return wps;                                                                                                    // 873
	},                                                                                                              // 874
                                                                                                                 // 875
	setWaypoints: function(waypoints) {                                                                             // 876
		var args = [0, this._waypoints.length].concat(waypoints);                                                      // 877
		this.spliceWaypoints.apply(this, args);                                                                        // 878
		return this;                                                                                                   // 879
	},                                                                                                              // 880
                                                                                                                 // 881
	spliceWaypoints: function() {                                                                                   // 882
		var args = [arguments[0], arguments[1]],                                                                       // 883
		    i,                                                                                                         // 884
		    wp;                                                                                                        // 885
                                                                                                                 // 886
		for (i = 2; i < arguments.length; i++) {                                                                       // 887
			args.push(arguments[i] && arguments[i].hasOwnProperty('latLng') ? arguments[i] : new Waypoint(arguments[i])); // 888
		}                                                                                                              // 889
                                                                                                                 // 890
		[].splice.apply(this._waypoints, args);                                                                        // 891
                                                                                                                 // 892
		while (this._waypoints.length < 2) {                                                                           // 893
			wp = new Waypoint();                                                                                          // 894
			this._waypoints.push(wp);                                                                                     // 895
			args.push(wp);                                                                                                // 896
		}                                                                                                              // 897
                                                                                                                 // 898
		this._updateMarkers();                                                                                         // 899
		this._fireChanged.apply(this, args);                                                                           // 900
	},                                                                                                              // 901
                                                                                                                 // 902
	onAdd: function(map) {                                                                                          // 903
		this._map = map;                                                                                               // 904
		this._updateMarkers();                                                                                         // 905
	},                                                                                                              // 906
                                                                                                                 // 907
	onRemove: function() {                                                                                          // 908
		var i;                                                                                                         // 909
		this._removeMarkers();                                                                                         // 910
                                                                                                                 // 911
		if (this._newWp) {                                                                                             // 912
			for (i = 0; i < this._newWp.lines.length; i++) {                                                              // 913
				this._map.removeLayer(this._newWp.lines[i]);                                                                 // 914
			}                                                                                                             // 915
		}                                                                                                              // 916
                                                                                                                 // 917
		delete this._map;                                                                                              // 918
	},                                                                                                              // 919
                                                                                                                 // 920
	createGeocoders: function() {                                                                                   // 921
		var container = L.DomUtil.create('div', 'leaflet-routing-geocoders ' + this.options.geocodersClassName),       // 922
			waypoints = this._waypoints,                                                                                  // 923
		    i,                                                                                                         // 924
		    geocoderElem,                                                                                              // 925
		    addWpBtn;                                                                                                  // 926
                                                                                                                 // 927
		this._geocoderContainer = container;                                                                           // 928
		this._geocoderElems = [];                                                                                      // 929
                                                                                                                 // 930
		for (i = 0; i < waypoints.length; i++) {                                                                       // 931
			geocoderElem = this._createGeocoder(i);                                                                       // 932
			container.appendChild(geocoderElem);                                                                          // 933
			this._geocoderElems.push(geocoderElem);                                                                       // 934
		}                                                                                                              // 935
                                                                                                                 // 936
		addWpBtn = L.DomUtil.create('button', '', container);                                                          // 937
		addWpBtn.setAttribute('type', 'button');                                                                       // 938
		addWpBtn.innerHTML = '+';                                                                                      // 939
		if (this.options.addWaypoints) {                                                                               // 940
			L.DomEvent.addListener(addWpBtn, 'click', function() {                                                        // 941
				this.spliceWaypoints(waypoints.length, 0, null);                                                             // 942
			}, this);                                                                                                     // 943
		} else {                                                                                                       // 944
			addWpBtn.style.display = 'none';                                                                              // 945
		}                                                                                                              // 946
                                                                                                                 // 947
		this.on('waypointsspliced', this._updateGeocoders);                                                            // 948
                                                                                                                 // 949
		return container;                                                                                              // 950
	},                                                                                                              // 951
                                                                                                                 // 952
	_createGeocoder: function(i) {                                                                                  // 953
		var geocoderElem = L.DomUtil.create('input', ''),                                                              // 954
			wp = this._waypoints[i];                                                                                      // 955
		geocoderElem.setAttribute('placeholder', this.options.geocoderPlaceholder(i, this._waypoints.length));         // 956
		geocoderElem.className = this.options.geocoderClass(i, this._waypoints.length);                                // 957
                                                                                                                 // 958
		this._updateWaypointName(i, geocoderElem);                                                                     // 959
		// This has to be here, or geocoder's value will not be properly                                               // 960
		// initialized.                                                                                                // 961
		// TODO: look into why and make _updateWaypointName fix this.                                                  // 962
		geocoderElem.value = wp.name;                                                                                  // 963
                                                                                                                 // 964
		L.DomEvent.addListener(geocoderElem, 'click', function() {                                                     // 965
			this.select();                                                                                                // 966
		}, geocoderElem);                                                                                              // 967
                                                                                                                 // 968
		new L.Routing.Autocomplete(geocoderElem, function(r) {                                                         // 969
				geocoderElem.value = r.name;                                                                                 // 970
				wp.name = r.name;                                                                                            // 971
				wp.latLng = r.center;                                                                                        // 972
				this._updateMarkers();                                                                                       // 973
				this._fireChanged();                                                                                         // 974
			}, this, L.extend({                                                                                           // 975
				resultFn: this.options.geocoder.geocode,                                                                     // 976
				resultContext: this.options.geocoder,                                                                        // 977
				autocompleteFn: this.options.geocoder.suggest,                                                               // 978
				autocompleteContext: this.options.geocoder                                                                   // 979
			}, this.options.autocompleteOptions));                                                                        // 980
                                                                                                                 // 981
		return geocoderElem;                                                                                           // 982
	},                                                                                                              // 983
                                                                                                                 // 984
	_updateGeocoders: function(e) {                                                                                 // 985
		var newElems = [],                                                                                             // 986
		    i,                                                                                                         // 987
		    geocoderElem,                                                                                              // 988
		    beforeElem;                                                                                                // 989
                                                                                                                 // 990
		// Determine where to insert geocoders for new waypoints                                                       // 991
		if (e.index >= this._geocoderElems.length) {                                                                   // 992
			// lastChild is the "add new wp" button                                                                       // 993
			beforeElem = this._geocoderContainer.lastChild;                                                               // 994
		} else {                                                                                                       // 995
			beforeElem = this._geocoderElems[e.index];                                                                    // 996
		}                                                                                                              // 997
                                                                                                                 // 998
		// Insert new geocoders for new waypoints                                                                      // 999
		for (i = 0; i < e.added.length; i++) {                                                                         // 1000
			geocoderElem = this._createGeocoder(e.index + i);                                                             // 1001
			this._geocoderContainer.insertBefore(geocoderElem, beforeElem);                                               // 1002
			newElems.push(geocoderElem);                                                                                  // 1003
		}                                                                                                              // 1004
		//newElems.reverse();                                                                                          // 1005
                                                                                                                 // 1006
		for (i = e.index; i < e.index + e.nRemoved; i++) {                                                             // 1007
			this._geocoderContainer.removeChild(this._geocoderElems[i]);                                                  // 1008
		}                                                                                                              // 1009
                                                                                                                 // 1010
		newElems.splice(0, 0, e.index, e.nRemoved);                                                                    // 1011
		[].splice.apply(this._geocoderElems, newElems);                                                                // 1012
                                                                                                                 // 1013
		for (i = 0; i < this._geocoderElems.length; i++) {                                                             // 1014
			this._geocoderElems[i].placeholder = this.options.geocoderPlaceholder(i, this._waypoints.length);             // 1015
			this._geocoderElems[i].className = this.options.geocoderClass(i, this._waypoints.length);                     // 1016
		}                                                                                                              // 1017
	},                                                                                                              // 1018
                                                                                                                 // 1019
	_updateGeocoder: function(i, geocoderElem) {                                                                    // 1020
		var wp = this._waypoints[i],                                                                                   // 1021
		    value = wp && wp.name ? wp.name : '';                                                                      // 1022
		geocoderElem.value = value;                                                                                    // 1023
	},                                                                                                              // 1024
                                                                                                                 // 1025
	_updateWaypointName: function(i, geocoderElem, force) {                                                         // 1026
		var wp = this._waypoints[i];                                                                                   // 1027
                                                                                                                 // 1028
		wp.name = wp.name || '';                                                                                       // 1029
                                                                                                                 // 1030
		if (wp.latLng && (force || !wp.name)) {                                                                        // 1031
			if (this.options.geocoder && this.options.geocoder.reverse) {                                                 // 1032
				this.options.geocoder.reverse(wp.latLng, 67108864 /* zoom 18 */, function(rs) {                              // 1033
					if (rs.length > 0 && rs[0].center.distanceTo(wp.latLng) < this.options.maxGeocoderTolerance) {              // 1034
						wp.name = rs[0].name;                                                                                      // 1035
					} else {                                                                                                    // 1036
						wp.name = '';                                                                                              // 1037
					}                                                                                                           // 1038
					this._updateGeocoder(i, geocoderElem);                                                                      // 1039
				}, this);                                                                                                    // 1040
			} else {                                                                                                      // 1041
				wp.name = '';                                                                                                // 1042
			}                                                                                                             // 1043
                                                                                                                 // 1044
			this._updateGeocoder(i, geocoderElem);                                                                        // 1045
		}                                                                                                              // 1046
                                                                                                                 // 1047
	},                                                                                                              // 1048
                                                                                                                 // 1049
	_removeMarkers: function() {                                                                                    // 1050
		var i;                                                                                                         // 1051
		if (this._markers) {                                                                                           // 1052
			for (i = 0; i < this._markers.length; i++) {                                                                  // 1053
				if (this._markers[i]) {                                                                                      // 1054
					this._map.removeLayer(this._markers[i]);                                                                    // 1055
				}                                                                                                            // 1056
			}                                                                                                             // 1057
		}                                                                                                              // 1058
		this._markers = [];                                                                                            // 1059
	},                                                                                                              // 1060
                                                                                                                 // 1061
	_updateMarkers: function() {                                                                                    // 1062
		var i,                                                                                                         // 1063
		    icon,                                                                                                      // 1064
		    m;                                                                                                         // 1065
                                                                                                                 // 1066
		if (!this._map) {                                                                                              // 1067
			return;                                                                                                       // 1068
		}                                                                                                              // 1069
                                                                                                                 // 1070
		this._removeMarkers();                                                                                         // 1071
                                                                                                                 // 1072
		for (i = 0; i < this._waypoints.length; i++) {                                                                 // 1073
			if (this._waypoints[i].latLng) {                                                                              // 1074
				icon = (typeof(this.options.waypointIcon) === 'function') ?                                                  // 1075
					this.options.waypointIcon(i, this._waypoints[i].name, this._waypoints.length) :                             // 1076
					this.options.waypointIcon;                                                                                  // 1077
				m = this._createMarker(icon, i);                                                                             // 1078
				if (this.options.draggableWaypoints) {                                                                       // 1079
					this._hookWaypointEvents(m, i);                                                                             // 1080
				}                                                                                                            // 1081
			} else {                                                                                                      // 1082
				m = null;                                                                                                    // 1083
			}                                                                                                             // 1084
			this._markers.push(m);                                                                                        // 1085
		}                                                                                                              // 1086
	},                                                                                                              // 1087
                                                                                                                 // 1088
	_createMarker: function(icon, i) {                                                                              // 1089
		var options = {                                                                                                // 1090
			draggable: true                                                                                               // 1091
		};                                                                                                             // 1092
		if (icon) {                                                                                                    // 1093
			options.icon = icon;                                                                                          // 1094
		}                                                                                                              // 1095
                                                                                                                 // 1096
		return L.marker(this._waypoints[i].latLng, options).addTo(this._map);                                          // 1097
	},                                                                                                              // 1098
                                                                                                                 // 1099
	_fireChanged: function() {                                                                                      // 1100
		this.fire('waypointschanged', {waypoints: this.getWaypoints()});                                               // 1101
                                                                                                                 // 1102
		if (arguments.length >= 2) {                                                                                   // 1103
			this.fire('waypointsspliced', {                                                                               // 1104
				index: Array.prototype.shift.call(arguments),                                                                // 1105
				nRemoved: Array.prototype.shift.call(arguments),                                                             // 1106
				added: arguments                                                                                             // 1107
			});                                                                                                           // 1108
		}                                                                                                              // 1109
	},                                                                                                              // 1110
                                                                                                                 // 1111
	_hookWaypointEvents: function(m, i) {                                                                           // 1112
		m.on('dragstart', function(e) {                                                                                // 1113
			this.fire('waypointdragstart', this._createWaypointEvent(i, e));                                              // 1114
		}, this);                                                                                                      // 1115
		m.on('drag', function(e) {                                                                                     // 1116
			this.fire('waypointdrag', this._createWaypointEvent(i, e));                                                   // 1117
		}, this);                                                                                                      // 1118
		m.on('dragend', function(e) {                                                                                  // 1119
			this.fire('waypointdragend', this._createWaypointEvent(i, e));                                                // 1120
			this._waypoints[i].latLng = e.target.getLatLng();                                                             // 1121
			this._waypoints[i].name = '';                                                                                 // 1122
			this._updateWaypointName(i, this._geocoderElems[i], true);                                                    // 1123
			this._fireChanged();                                                                                          // 1124
		}, this);                                                                                                      // 1125
	},                                                                                                              // 1126
                                                                                                                 // 1127
	_createWaypointEvent: function(i, e) {                                                                          // 1128
		return {index: i, latlng: e.target.getLatLng()};                                                               // 1129
	},                                                                                                              // 1130
                                                                                                                 // 1131
	dragNewWaypoint: function(e) {                                                                                  // 1132
		var i;                                                                                                         // 1133
		this._newWp = {                                                                                                // 1134
			afterIndex: e.afterIndex,                                                                                     // 1135
			marker: L.marker(e.latlng).addTo(this._map),                                                                  // 1136
			lines: []                                                                                                     // 1137
		};                                                                                                             // 1138
                                                                                                                 // 1139
		for (i = 0; i < this.options.dragStyles.length; i++) {                                                         // 1140
			this._newWp.lines.push(L.polyline([                                                                           // 1141
				this._waypoints[e.afterIndex].latLng,                                                                        // 1142
				e.latlng,                                                                                                    // 1143
				this._waypoints[e.afterIndex + 1].latLng                                                                     // 1144
			], this.options.dragStyles[i]).addTo(this._map));                                                             // 1145
		}                                                                                                              // 1146
                                                                                                                 // 1147
		this._markers.splice(e.afterIndex + 1, 0, this._newWp.marker);                                                 // 1148
		this._map.on('mousemove', this._onDragNewWp, this);                                                            // 1149
		this._map.on('mouseup', this._onWpRelease, this);                                                              // 1150
	},                                                                                                              // 1151
                                                                                                                 // 1152
	_onDragNewWp: function(e) {                                                                                     // 1153
		var i;                                                                                                         // 1154
		this._newWp.marker.setLatLng(e.latlng);                                                                        // 1155
		for (i = 0; i < this._newWp.lines.length; i++) {                                                               // 1156
			this._newWp.lines[i].spliceLatLngs(1, 1, e.latlng);                                                           // 1157
		}                                                                                                              // 1158
	},                                                                                                              // 1159
                                                                                                                 // 1160
	_onWpRelease: function(e) {                                                                                     // 1161
		var i;                                                                                                         // 1162
		this._map.off('mouseup', this._onWpRelease, this);                                                             // 1163
		this._map.off('mousemove', this._onDragNewWp, this);                                                           // 1164
		for (i = 0; i < this._newWp.lines.length; i++) {                                                               // 1165
			this._map.removeLayer(this._newWp.lines[i]);                                                                  // 1166
		}                                                                                                              // 1167
		this.spliceWaypoints(this._newWp.afterIndex + 1, 0, e.latlng);                                                 // 1168
		delete this._newWp;                                                                                            // 1169
	}                                                                                                               // 1170
});                                                                                                              // 1171
                                                                                                                 // 1172
L.Routing.plan = function(waypoints, options) {                                                                  // 1173
	return new L.Routing.Plan(waypoints, options);                                                                  // 1174
};                                                                                                               // 1175
                                                                                                                 // 1176
L.Routing.Control = L.Routing.Itinerary.extend({                                                                 // 1177
	options: {                                                                                                      // 1178
		fitSelectedRoutes: true                                                                                        // 1179
	},                                                                                                              // 1180
                                                                                                                 // 1181
	initialize: function(options) {                                                                                 // 1182
		L.Util.setOptions(this, options);                                                                              // 1183
                                                                                                                 // 1184
		this._router = this.options.router || new L.Routing.OSRM();                                                    // 1185
		this._plan = this.options.plan || L.Routing.plan(undefined, { geocoder: this.options.geocoder });              // 1186
		if (this.options.geocoder) {                                                                                   // 1187
			this._plan.options.geocoder = this.options.geocoder;                                                          // 1188
		}                                                                                                              // 1189
		if (this.options.waypoints) {                                                                                  // 1190
			this._plan.setWaypoints(this.options.waypoints);                                                              // 1191
		}                                                                                                              // 1192
                                                                                                                 // 1193
		L.Routing.Itinerary.prototype.initialize.call(this, options);                                                  // 1194
                                                                                                                 // 1195
		this.on('routeselected', this._routeSelected, this);                                                           // 1196
		this._plan.on('waypointschanged', function(e) {                                                                // 1197
			this._route();                                                                                                // 1198
			this.fire('waypointschanged', {waypoints: e.waypoints});                                                      // 1199
		}, this);                                                                                                      // 1200
                                                                                                                 // 1201
		this._route();                                                                                                 // 1202
	},                                                                                                              // 1203
                                                                                                                 // 1204
	onAdd: function(map) {                                                                                          // 1205
		var container = L.Routing.Itinerary.prototype.onAdd.call(this, map);                                           // 1206
                                                                                                                 // 1207
		this._map = map;                                                                                               // 1208
		this._map.addLayer(this._plan);                                                                                // 1209
                                                                                                                 // 1210
		if (this.options.geocoder) {                                                                                   // 1211
			container.insertBefore(this._plan.createGeocoders(), container.firstChild);                                   // 1212
		}                                                                                                              // 1213
                                                                                                                 // 1214
		return container;                                                                                              // 1215
	},                                                                                                              // 1216
                                                                                                                 // 1217
	onRemove: function(map) {                                                                                       // 1218
		if (this._line) {                                                                                              // 1219
			map.removeLayer(this._line);                                                                                  // 1220
		}                                                                                                              // 1221
		map.removeLayer(this._plan);                                                                                   // 1222
		return L.Routing.Itinerary.prototype.onRemove.call(this, map);                                                 // 1223
	},                                                                                                              // 1224
                                                                                                                 // 1225
	getWaypoints: function() {                                                                                      // 1226
		return this._plan.getWaypoints();                                                                              // 1227
	},                                                                                                              // 1228
                                                                                                                 // 1229
	setWaypoints: function(waypoints) {                                                                             // 1230
		this._plan.setWaypoints(waypoints);                                                                            // 1231
		return this;                                                                                                   // 1232
	},                                                                                                              // 1233
                                                                                                                 // 1234
	spliceWaypoints: function() {                                                                                   // 1235
		var removed = this._plan.spliceWaypoints.apply(this._plan, arguments);                                         // 1236
		return removed;                                                                                                // 1237
	},                                                                                                              // 1238
                                                                                                                 // 1239
	getPlan: function() {                                                                                           // 1240
		return this._plan;                                                                                             // 1241
	},                                                                                                              // 1242
                                                                                                                 // 1243
	_routeSelected: function(e) {                                                                                   // 1244
		var route = e.route;                                                                                           // 1245
		this._clearLine();                                                                                             // 1246
                                                                                                                 // 1247
		this._line = L.Routing.line(route, this.options.lineOptions);                                                  // 1248
		this._line.addTo(this._map);                                                                                   // 1249
		this._hookEvents(this._line);                                                                                  // 1250
                                                                                                                 // 1251
		if (this.options.fitSelectedRoutes) {                                                                          // 1252
			this._map.fitBounds(this._line.getBounds());                                                                  // 1253
		}                                                                                                              // 1254
	},                                                                                                              // 1255
                                                                                                                 // 1256
	_hookEvents: function(l) {                                                                                      // 1257
		l.on('linetouched', function(e) {                                                                              // 1258
			this._plan.dragNewWaypoint(e);                                                                                // 1259
		}, this);                                                                                                      // 1260
	},                                                                                                              // 1261
                                                                                                                 // 1262
	_route: function() {                                                                                            // 1263
		var wps;                                                                                                       // 1264
                                                                                                                 // 1265
		this._clearLine();                                                                                             // 1266
		this._clearAlts();                                                                                             // 1267
                                                                                                                 // 1268
		if (this._plan.isReady()) {                                                                                    // 1269
			wps = this._plan.getWaypoints();                                                                              // 1270
			this.fire('routingstart', {waypoints: wps});                                                                  // 1271
			this._router.route(wps, function(err, routes) {                                                               // 1272
				if (err) {                                                                                                   // 1273
					this.fire('routingerror', {error: err});                                                                    // 1274
					return;                                                                                                     // 1275
				}                                                                                                            // 1276
				this.fire('routesfound', {waypoints: wps, routes: routes});                                                  // 1277
				this.setAlternatives(routes);                                                                                // 1278
			}, this);                                                                                                     // 1279
		}                                                                                                              // 1280
	},                                                                                                              // 1281
                                                                                                                 // 1282
	_clearLine: function() {                                                                                        // 1283
		if (this._line) {                                                                                              // 1284
			this._map.removeLayer(this._line);                                                                            // 1285
			delete this._line;                                                                                            // 1286
		}                                                                                                              // 1287
	}                                                                                                               // 1288
});                                                                                                              // 1289
                                                                                                                 // 1290
L.Routing.control = function(options) {                                                                          // 1291
	return new L.Routing.Control(options);                                                                          // 1292
};                                                                                                               // 1293
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['fuatsengul:leaflet-routing-machine'] = {};

})();
