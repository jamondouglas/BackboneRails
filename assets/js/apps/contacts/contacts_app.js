ContactManager.module('ContactsApp', function(ContactsApp,ContactManager,Backbone,Marionette,$,_){
	
	ContactsApp.Router=Marionette.AppRouter.extend({
		appRoutes:{
		"contacts":"listContacts",
		"contacts/:id":"showContact",
		}
	});
	

	var API = {
		listContacts: function(){
			console.log("Made it to list contacts inside contacts_app sub.");
			ContactsApp.List.Controller.listContacts();
			console.log("route to list contacts was triggered");
		},
		showContact:function(id){
			ContactsApp.Show.Controller.showContact(id);
		}
	};

	ContactManager.on('contacts:list',function(){
		ContactManager.navigate("contacts");
		API.listContacts();
	});

	ContactManager.on('contact:show',function(id){
		ContactManager.navigate("contacts/"+id);
		API.showContact(id);
	});

	ContactManager.addInitializer(function(){
		new ContactsApp.Router({
			controller:API
		});
	});
});