var ContactManager = new Marionette.Application();

ContactManager.addRegions({
	mainRegion: '#main-region'
});

ContactManager.navigate = function(route,options){
	Backbone.history.navigate(route,options);
};

ContactManager.getCurrentRoute = function(){
	options || ( options = {});
	return Backbone.history.fragment;
};

ContactManager.on('initialize:after',function(){
	if(Backbone.history){
		Backbone.history.start();

		if(this.getCurrentRoute === ''){
			Backbone.history.navigate("contacts");
			ContactManager.ContactsApp.List.Controller.listContacts();
		}
	}
});