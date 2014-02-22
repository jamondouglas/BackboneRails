ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _) {
	List.Controller = {
		listContacts: function() {
			var loadingView= new ContactManager.Common.Views.Loading();
			var fetchingContacts = ContactManager.request("contact:entities");

			$.when(fetchingContacts).done(function(contacts) {
				var contactsListView = new List.Contacts({
					collection: contacts
				});
			
			
			contactsListView.on("itemview:contact:delete", function(childView, model) {
				model.destroy();
			});

			contactsListView.on('itemview:contact:highlighting:toggled', function(childView, model) {});

			contactsListView.on('itemview:contact:show', function(childView, model) {
				//ContactManager.ContactsApp.Show.Controller.showContact(model);
				ContactManager.trigger("contact:show", model.get("id"));
			});

			ContactManager.mainRegion.show(contactsListView);
		});
		}
	};
});