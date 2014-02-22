ContactManager.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _) {
	
	Entities.Contact = Backbone.Model.extend({
		urlRoot: 'contacts',
		defaults: {
			firstName: 'Jam The Man',
			lastName: 'Douglas',
			phoneNumber: 'No phone number saved'
		}
	});

	Entities.configureStorage(Entities.Contact);

	Entities.ContactCollection = Backbone.Collection.extend({
		url: 'contacts',
		model: Entities.Contact,
		comparator: function(contact) {
			return contact.get('firstName') + "" + contact.get('lastName');
		}
	});

	Entities.configureStorage(Entities.ContactCollection);

	var initializeContacts = function() {
		contacts = new Entities.ContactCollection([
			{
				id: 1,
				lastName: 'Smiley',
				phoneNumber: '7779311'
			}, {
				id: 2,
				firstName: 'Hype',
				lastName: 'Williams',
				phoneNumber: '1234567'
			}, {
				id: 3,
				firstName: 'Hype',
				lastName: 'William',
				phoneNumber: '1234567'
			}, {
				id: 4,
				firstName: 'Slappy',
				lastName: 'Fanga',
				phoneNumber: '1231234'
			}, {
				id: 5,
				firstName: 'Slappy',
				lastName: 'Tanga',
				phoneNumber: '1231234'
			}
		]);
		contacts.forEach(function(contact) {
			contact.save();
		});
		return contacts.models;
	};
	var API = {
		getContactsEntities: function() {
			/*if(contacts === undefined){
				initializeContacts();
			}*/
			var contacts = new Entities.ContactCollection();
			var defer = $.Deferred();
			contacts.fetch({
				success: function(data) {
					defer.resolve(data);
				}
			});
			var promise = defer.promise();
			$.when(promise).done(function(contacts) {
				if (contacts.length === 0) {
					var models = initializeContacts();
					contacts.reset(models);
				}
			});
			return promise;
		},
		getContactEntity: function(contactId) {
			
			var contact = new Entities.Contact({
				id: contactId
			});

			var defer = $.Deferred();
			setTimeout(function(){
			contact.fetch({
				success: function(data) {
					defer.resolve(data);
				},
				error: function(data) {
					defer.resolve(undefined);
				}
			});
		},2000);
			return defer.promise();
		}
	};

	ContactManager.reqres.setHandler("contact:entities", function() {
		return API.getContactsEntities();
	});
	ContactManager.reqres.setHandler("contact:entity", function(id) {
		return API.getContactEntity(id);
	});
});