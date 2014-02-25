ContactManager.module('ContactsApp.Edit',function(Edit,ContactManager,Backbone,Marionette,$,_) {
	Edit.Contact = ContactManager.ContactsApp.Common.Views.Form.extend({
		template:"#contact-form",

		initialize: function(){
			this.title = "Edit " + this.model.get("firstName");
			this.title += " " + this.model.get("lastName");
		}
	});
});
