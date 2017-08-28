(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;

/* Package-scope variables */
var state;

(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/treyyoder:kys/kys.js                                                                                //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
Meteor.KnowYourStates = {                                                                                       // 1
	currentSelectedState : null,	                                                                                  // 2
	capital:null,                                                                                                  // 3
	init : function() {                                                                                            // 4
		var self = this;                                                                                              // 5
		$("span:contains('Stamen Watercolor')").click();                                                              // 6
		                                                                                                              // 7
		window.LUtil.geojson = L.geoJson(StateGeoData, {                                                              // 8
			style : this.styleDefault,                                                                                   // 9
			onEachFeature : this.onEachFeature                                                                           // 10
		}).addTo(window.LUtil.map);                                                                                   // 11
		                                                                                                              // 12
		self.addControls();		                                                                                         // 13
	},                                                                                                             // 14
	getImage : function(keys, divID) {                                                                             // 15
		$.getJSON("https://ajax.googleapis.com/ajax/services/search/images?as_rights=(cc_publicdomain|cc_attribute|cc_sharealike)&callback=?",
					{q : keys,                                                                                                 // 17
					 v : '1.0'                                                                                                 // 18
					}, function(data) {						                                                                                  // 19
						$.ajax(data.responseData.results[0].url, {                                                                // 20
							  statusCode: {                                                                                          // 21
							    404: function() {                                                                                    // 22
							    	$("#"+divID).append(                                                                                // 23
											'<img src="'                                                                                         // 24
												+ data.responseData.results[1].url                                                                  // 25
												+ '"width="300" >');                                                                                // 26
							    },                                                                                                   // 27
							    200: function() {                                                                                    // 28
							    	$("#"+divID).append(                                                                                // 29
											'<img src="'                                                                                         // 30
												+ data.responseData.results[0].url                                                                  // 31
												+ '"width="300" >');                                                                                // 32
							    }                                                                                                    // 33
							  }                                                                                                      // 34
							})						                                                                                                 // 35
				   	});                                                                                                     // 36
						                                                                                                          // 37
	},                                                                                                             // 38
	getText : function(keys) {                                                                                     // 39
		$.getJSON("https://ajax.googleapis.com/ajax/services/search/web?callback=?",                                  // 40
					{q : keys,                                                                                                 // 41
					 v : '1.0'                                                                                                 // 42
					}, function(data) {						                                                                                  // 43
						$("#stateBird").append(                                                                                   // 44
							'<div>'                                                                                                  // 45
								+ data.responseData.results[0].title                                                                    // 46
								+ '</div>');                                                                                            // 47
					   	});                                                                                                    // 48
	},                                                                                                             // 49
	addControls : function() {                                                                                     // 50
		var self = this;                                                                                              // 51
		self.details = L.control({                                                                                    // 52
			position : 'bottomright'                                                                                     // 53
		});                                                                                                           // 54
		self.details.onAdd = self.onAddHandler('state-detail info', '');                                              // 55
		self.details.update = function(props) {                                                                       // 56
			var self = this;                                                                                             // 57
			if (props) {                                                                                                 // 58
				Blaze.renderWithData(Template.mapRecallDetails, props,                                                      // 59
						this._div);                                                                                               // 60
			} else {                                                                                                     // 61
				self.hide();                                                                                                // 62
			}                                                                                                            // 63
		};                                                                                                            // 64
		self.details.addTo(window.LUtil.map);                                                                         // 65
                                                                                                                // 66
	},                                                                                                             // 67
	onAddHandler : function(selector, html) {                                                                      // 68
		return function() {                                                                                           // 69
			this._div = L.DomUtil.create('div', selector);                                                               // 70
			this._div.innerHTML = html;                                                                                  // 71
			L.DomEvent.disableClickPropagation(this._div);                                                               // 72
			L.DomEvent.disableScrollPropagation(this._div);                                                              // 73
			return this._div;                                                                                            // 74
		};                                                                                                            // 75
	},                                                                                                             // 76
	onEachFeature : function(feature, layer) {                                                                     // 77
		                                                                                                              // 78
		layer.on({                                                                                                    // 79
			click : function() {                                                                                         // 80
				var self = this;                                                                                            // 81
				if (Meteor.KnowYourStates.currentSelectedState !== null) {                                                  // 82
					Meteor.KnowYourStates.currentSelectedState.setStyle({                                                      // 83
						fillColor : 'white'                                                                                       // 84
					});                                                                                                        // 85
				}                                                                                                           // 86
				layer.setStyle({                                                                                            // 87
					fillColor : 'yellow'                                                                                       // 88
				});                                                                                                         // 89
				$(".image").html("");                                                                                       // 90
				Meteor.KnowYourStates.currentSelectedState = layer;                                                         // 91
				var stateAbbr = Meteor.KnowYourStates.currentSelectedState.feature.properties.abbreviation;                 // 92
				                                                                                                            // 93
				var detailHTML = "";                                                                                        // 94
				var currState = null;                                                                                       // 95
				for(state in StateData){                                                                                    // 96
					if(StateData[state].abbreviation === stateAbbr){                                                           // 97
						currState = StateData[state]                                                                              // 98
						break;                                                                                                    // 99
					}                                                                                                          // 100
				}                                                                                                           // 101
				                                                                                                            // 102
				detailHTML+="<div><h3>"+currState.name+"</h3></div>"                                                        // 103
				detailHTML+="<div><div class='col-md-6 text-right'><b>State Capital:</b></div><div class='col-md-6'>"+currState.state_capital+"</div></div>"
				detailHTML+="<div><div class='col-md-6 text-right'><b>State Motto:</b></div><div class='col-md-6'>"+currState.state_motto+"</div></div>"
				detailHTML+="<div><div class='col-md-6 text-right'><b>State Bird:</b></div><div class='col-md-6'>"+currState.state_bird+"</div></div><div class='col-md-12' id='stateBird'></div>"
				detailHTML+="<div><div class='col-md-6 text-right'><b>State Flower:</b></div><div class='col-md-6'>"+currState.state_flower+"</div></div><div class='col-md-12' id='stateFlower'></div>"
				                                                                                                            // 108
				$(".state-detail").html(detailHTML);                                                                        // 109
				                                                                                                            // 110
				Meteor.KnowYourStates.getImage(currState.name+" State Flower "+ currState.state_flower, "stateFlower");				 // 111
				Meteor.KnowYourStates.getImage(currState.name+" State Bird "+ currState.state_bird, "stateBird");           // 112
				                                                                                                            // 113
				if(Meteor.KnowYourStates.capital!==null){                                                                   // 114
					window.LUtil.map.removeLayer(Meteor.KnowYourStates.capital);                                               // 115
				}                                                                                                           // 116
				                                                                                                            // 117
				Meteor.KnowYourStates.capital = new L.Marker([currState.cap_lat, currState.cap_lon], {                      // 118
					draggable : true,                                                                                          // 119
					icon : Meteor.KnowYourStates.getStar()                                                                     // 120
				});		                                                                                                       // 121
				                                                                                                            // 122
				window.LUtil.map.addLayer(Meteor.KnowYourStates.capital);                                                   // 123
				                                                                                                            // 124
			}                                                                                                            // 125
		});                                                                                                           // 126
	},                                                                                                             // 127
	styleDefault : function() {                                                                                    // 128
		return {                                                                                                      // 129
			weight : 2,                                                                                                  // 130
			opacity : 5,                                                                                                 // 131
			color : 'black',                                                                                             // 132
			dashArray : '',                                                                                              // 133
			fillOpacity : 0.1,                                                                                           // 134
			fillColor : 'white'                                                                                          // 135
		};                                                                                                            // 136
	},                                                                                                             // 137
	getStar : function() {                                                                                         // 138
		var icon = L.icon({                                                                                           // 139
			iconUrl : '/packages/treyyoder_kys/images/star.png',                                                         // 140
			iconSize : [ 20, 20 ], // size of the icon                                                                   // 141
			iconAnchor : [ 10, 10 ], // point of the icon which will                                                     // 142
			// correspond                                                                                                // 143
			// to marker's location                                                                                      // 144
			popupAnchor : [ 0, 10 ]                                                                                      // 145
		// point from which the popup should open                                                                     // 146
		// relative to the iconAnchor                                                                                 // 147
		});                                                                                                           // 148
                                                                                                                // 149
		return icon;                                                                                                  // 150
	}                                                                                                              // 151
}                                                                                                               // 152
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['treyyoder:kys'] = {};

})();

//# sourceMappingURL=treyyoder_kys.js.map
