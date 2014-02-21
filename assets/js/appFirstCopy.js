var ContactManager = new Marionette.Application();

ContactManager.addRegions({
	mainRegion: '#main-region'
});

/*ContactManager.module("Entities",function(Entities,ContactManager,Backbone,Marionette,$,_){
	var alertPrivate= function(message){
		alert('Private message '+message);
	};
	Entities.alertPublic = function(message){
		alert("I will now call alertPrivate");
		alertPrivate(message);
	};
});
*/