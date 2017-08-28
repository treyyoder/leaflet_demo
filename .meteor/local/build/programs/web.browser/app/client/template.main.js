(function(){
Template.body.addContent((function() {
  var view = this;
  return [ HTML.Raw('<div id="moduleSelector" class="btn-group" role="group" aria-label="...">\n	  <button type="button" class="btn btn-default atc">ATC</button>\n	  <button type="button" class="btn btn-default routing">Routing</button>\n	  <button type="button" class="btn btn-default ww3">WW3</button>\n	  <button type="button" class="btn btn-default kys">Know Your States</button>\n	  <button type="button" class="btn btn-default coffeescriptleaflet">CoffeeScript Leaflet</button>\n	</div>	\n  	'), Spacebars.include(view.lookupTemplate("map")) ];
}));
Meteor.startup(Template.body.renderToDocument);

})();
