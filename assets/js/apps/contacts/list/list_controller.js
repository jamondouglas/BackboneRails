ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _) {
	List.Controller = {
		listContacts: function() {
			var loadingView= new ContactManager.Common.Views.Loading();
			var fetchingContacts = ContactManager.request("contact:entities");

			var contactslistLayout = new List.Layout();
			var contactsListPanel = new List.Panel();

			$.when(fetchingContacts).done(function(contacts){
				var contactsListView = new List.Contacts({
					collection: contacts
				});
			
			contactslistLayout.on("show",function(){
				contactslistLayout.panelRegion.show(contactsListPanel);
				contactslistLayout.contactsRegion.show(contactsListView);
			});



			contactsListPanel.on("contact:new", function(){
				console.log("in contact new triggered an event");
				var newContact = new ContactManager.Entities.Contact();
				var view = new ContactManager.ContactsApp.New.Contact({
					model:newContact,
					asModal:true
				});
				view.on("form:submit",function(data){
					if(contacts.length > 0){
						var highestId = contacts.max(function(c){
							console.log(c.id);
							return c.id;}).get("id");
						data.id = highestId + 1;
					}else{
						data.id=1;
					}
					if(newContact.save(data)){
						contacts.add(newContact);
						ContactManager.dialogRegion.close();
						contactsListView.children.findByModel(newContact).flash("success");
					}else{
						view.triggerMethod("form:data:invalid",newContact.validationError);
					}
				});
				ContactManager.dialogRegion.show(view);
			});

			contactsListView.on("itemview:contact:delete", function(childView, model) {
				model.destroy();
			});

			contactsListView.on('itemview:contact:highlighting:toggled', function(childView, model) {});

			contactsListView.on('itemview:contact:show', function(childView, model) {
				//ContactManager.ContactsApp.Show.Controller.showContact(model);
				ContactManager.trigger("contact:show", model.get("id"));
			});
			contactsListView.on("itemview:contact:edit", function(childView,model){
				var view = new ContactManager.ContactsApp.Edit.Contact({
					model:model,
					asModal:true
				});

				view .on("form:submit",function(data){
					if(model.save(data)){
						childView.render();
						ContactManager.dialogRegion.close();
						childView.flash("success");
					}else{
						view.triggerMethod("form:data:invalid",model.validationError);
					}
				});
				ContactManager.dialogRegion.show(view);
			});

			ContactManager.mainRegion.show(contactslistLayout);
		});
		}
	};
});