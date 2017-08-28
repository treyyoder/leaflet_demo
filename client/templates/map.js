/*LUtil is inspired by leaflet-demo (https://github.com/MeteorHudsonValley/leaflet-demo) */
/*globals window, L, $, Blaze, Template, Meteor, console, _, ReactiveVar, moment*/
/*globals FoodRecalls, StatesData */
(function() {
	"use strict";
	window.LUtil = {
		// reference to the single 'map' object to control
		map : null,		
		baseLayers : null,
		// location of marker images
		imagePath : 'packages/fuatsengul_leaflet/images',
		// init function to be called ONCE on startup
		initLeaflet : function() {
			$(window).resize(function() {
				$('#map').css('height', window.innerHeight);
			});
			$(window).resize(); // trigger resize event
		},
		// (element=div to populate, view=latlong for center)
		initMap : function(element, view) {
			var self = this;
			L.Icon.Default.imagePath = self.imagePath;
			// sensible defaults if nothing specified
			element = element || 'map';
			view = view || {};
			view.zoom = view.zoom || 5;
			view.latlong = view.latlong || [ 37.8, -92 ];
			var mbUrl = 'https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png';
			var grayscale = L.tileLayer(mbUrl, {
				id : 'examples.map-20v6611k'
			}), streets = L.tileLayer(mbUrl, {
				id : 'examples.map-i875mjb7'
			}), Esri_WorldImagery = L
					.tileLayer(
							'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
							{

							}), cloudmade = L.tileLayer(
					'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
						key : '1234',
						styleId : 22677
					});
			var baseLayer = L.tileLayer(
					'https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
						maxZoom : 18,
						id : 'examples.map-20v6611k'
					});

			var Stamen_Watercolor = L
					.tileLayer(
							'http://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png',
							{
								attribution : 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
								subdomains : 'abcd',
								minZoom : 1,
								maxZoom : 16,
								ext : 'png'
							});

			this.map = L.map(element, {
				zoomControl : false,
				layers : [ streets ]
			}).setView(view.latlong, view.zoom);

			this.baseLayers = {
				"Stamen Watercolor" : Stamen_Watercolor,
				"Base" : baseLayer,
				"Grayscale" : grayscale,
				"Streets" : streets,
				"Esri WorldImagery" : Esri_WorldImagery,
				"Cloudmade" : cloudmade
			};

			L.control.layers(this.baseLayers).addTo(this.map);

			this.addControls();
		},
		addControls : function() {
			var self = this;
			var moduleSelector = L.control({
				position : 'topleft'
			});
			moduleSelector.onAdd = self
					.onAddHandler('info',
							'<b> Select a Module </b><div id="moduleSelectorDiv"></div>');
			moduleSelector.addTo(this.map);
			$("#moduleSelector").appendTo("#moduleSelectorDiv").show();

		},
		onAddHandler : function(selector, html) {
			return function() {
				this._div = L.DomUtil.create('div', selector);
				this._div.innerHTML = html;
				L.DomEvent.disableClickPropagation(this._div);
				L.DomEvent.disableScrollPropagation(this._div);
				return this._div;
			};
		}
	};

	Template.map.created = function() {

	};

	Template.map.rendered = function() {
		window.LUtil.initMap();
	};
})();