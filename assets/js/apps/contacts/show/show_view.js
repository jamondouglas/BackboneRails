ContactManager.module('ContactsApp.Show',function(Show,ContactactManager,Backbone,Marionette,$,_){
	Show.Contact = Marionette.ItemView.extend({
		template:'#contact-view',
		events:{
			'click  a.js-list-contacts':'listContactsClicked',
		},

		listContactsClicked:function(e){
			e.preventDefault();
			ContactManager.trigger("contacts:list");
		}
	});
	Show.MissingContact = Marionette.ItemView.extend({
		template:'#missing-contact-view'
	});
	
	
});