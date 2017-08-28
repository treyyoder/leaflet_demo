Meteor.KnowYourStates = {
	currentSelectedState : null,	
	capital:null,
	init : function() {
		var self = this;
		$("span:contains('Stamen Watercolor')").click();
		
		window.LUtil.geojson = L.geoJson(StateGeoData, {
			style : this.styleDefault,
			onEachFeature : this.onEachFeature
		}).addTo(window.LUtil.map);
		
		self.addControls();		
	},
	getImage : function(keys, divID) {
		$.getJSON("https://ajax.googleapis.com/ajax/services/search/images?as_rights=(cc_publicdomain|cc_attribute|cc_sharealike)&callback=?",
					{q : keys,
					 v : '1.0'
					}, function(data) {						
						$.ajax(data.responseData.results[0].url, {
							  statusCode: {
							    404: function() {
							    	$("#"+divID).append(
											'<img src="'
												+ data.responseData.results[1].url
												+ '"width="300" >');
							    },
							    200: function() {
							    	$("#"+divID).append(
											'<img src="'
												+ data.responseData.results[0].url
												+ '"width="300" >');
							    }
							  }
							})						
				   	});
						
	},
	getText : function(keys) {
		$.getJSON("https://ajax.googleapis.com/ajax/services/search/web?callback=?",
					{q : keys,
					 v : '1.0'
					}, function(data) {						
						$("#stateBird").append(
							'<div>'
								+ data.responseData.results[0].title
								+ '</div>');
					   	});
	},
	addControls : function() {
		var self = this;
		self.details = L.control({
			position : 'bottomright'
		});
		self.details.onAdd = self.onAddHandler('state-detail info', '');
		self.details.update = function(props) {
			var self = this;
			if (props) {
				Blaze.renderWithData(Template.mapRecallDetails, props,
						this._div);
			} else {
				self.hide();
			}
		};
		self.details.addTo(window.LUtil.map);

	},
	onAddHandler : function(selector, html) {
		return function() {
			this._div = L.DomUtil.create('div', selector);
			this._div.innerHTML = html;
			L.DomEvent.disableClickPropagation(this._div);
			L.DomEvent.disableScrollPropagation(this._div);
			return this._div;
		};
	},
	onEachFeature : function(feature, layer) {
		
		layer.on({
			click : function() {
				var self = this;
				if (Meteor.KnowYourStates.currentSelectedState !== null) {
					Meteor.KnowYourStates.currentSelectedState.setStyle({
						fillColor : 'white'
					});
				}
				layer.setStyle({
					fillColor : 'yellow'
				});
				$(".image").html("");
				Meteor.KnowYourStates.currentSelectedState = layer;
				var stateAbbr = Meteor.KnowYourStates.currentSelectedState.feature.properties.abbreviation;
				
				var detailHTML = "";
				var currState = null;
				for(state in StateData){
					if(StateData[state].abbreviation === stateAbbr){
						currState = StateData[state]
						break;
					}
				}
				
				detailHTML+="<div><h3>"+currState.name+"</h3></div>"
				detailHTML+="<div><div class='col-md-6 text-right'><b>State Capital:</b></div><div class='col-md-6'>"+currState.state_capital+"</div></div>"
				detailHTML+="<div><div class='col-md-6 text-right'><b>State Motto:</b></div><div class='col-md-6'>"+currState.state_motto+"</div></div>"
				detailHTML+="<div><div class='col-md-6 text-right'><b>State Bird:</b></div><div class='col-md-6'>"+currState.state_bird+"</div></div><div class='col-md-12' id='stateBird'></div>"
				detailHTML+="<div><div class='col-md-6 text-right'><b>State Flower:</b></div><div class='col-md-6'>"+currState.state_flower+"</div></div><div class='col-md-12' id='stateFlower'></div>"
				
				$(".state-detail").html(detailHTML);
				
				Meteor.KnowYourStates.getImage(currState.name+" State Flower "+ currState.state_flower, "stateFlower");				
				Meteor.KnowYourStates.getImage(currState.name+" State Bird "+ currState.state_bird, "stateBird");
				
				if(Meteor.KnowYourStates.capital!==null){
					window.LUtil.map.removeLayer(Meteor.KnowYourStates.capital);
				}
				
				Meteor.KnowYourStates.capital = new L.Marker([currState.cap_lat, currState.cap_lon], {
					draggable : true,
					icon : Meteor.KnowYourStates.getStar()
				});		
				
				window.LUtil.map.addLayer(Meteor.KnowYourStates.capital);
				
			}
		});
	},
	styleDefault : function() {
		return {
			weight : 2,
			opacity : 5,
			color : 'black',
			dashArray : '',
			fillOpacity : 0.1,
			fillColor : 'white'
		};
	},
	getStar : function() {
		var icon = L.icon({
			iconUrl : '/packages/treyyoder_kys/images/star.png',
			iconSize : [ 20, 20 ], // size of the icon
			iconAnchor : [ 10, 10 ], // point of the icon which will
			// correspond
			// to marker's location
			popupAnchor : [ 0, 10 ]
		// point from which the popup should open
		// relative to the iconAnchor
		});

		return icon;
	}
}