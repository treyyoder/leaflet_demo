(function(){/*globals Meteor, LUtil, Session */
(function () {  
	Meteor.startup(function(){
		LUtil.initLeaflet();
		$(".map").click();		
	});
	
	Template.body.helpers({
		template_name: function(){
			return Session.get("module")
		}
	});

	Template.body.events({
		"click .ww3": function() {					
			Session.set("module", "ww3");	
			Meteor.War.init();
		},
		"click .routing": function() {
			Session.set("module", "routing");
			Meteor.Routing.init();
		},
		"click .atc": function() {
			Session.set("module", "atc");
			Meteor.ATC.init();
		},
		"click .kys": function() {
			Session.set("module", "kys");
			Meteor.KnowYourStates.init();
		},
		"click .coffeescriptleaflet": function() {
			Session.set("module", "coffeescriptleaflet");
			Meteor.CoffeeScriptLeaflet.init();
		}
	});	
})();

})();
