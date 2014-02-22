ContactManager.module("Common.Views", function(Views,ContactManager,Backbone,Marionette,$,_){
Views.Loading = Marionette.ItemView.extend({
	template:'#loading-view',

	initialize:function(options){
		var options = options || {};
		this.title = options.title || 'Loading Data';
		this.message = options.message || "Pleae wait, data is loading";
	},

	serializeData: function(){
		return {
			title: this.title,
			message: this.message
		};
	},
	onShow:function(){
		var opts = {
			lines:13,
			length:10,
			radius:30,
			coreners:1,
			rotate:0,
			direction:1,
			color:'#000',
			speed:1,
			traile:60,
			shadow:false,
			hwaccel:false,
			className:"spinner",
			zIndex:'2e9',
			top:'30%',
			left:'auto'
		};
		$("#spinner").spin(opts);
	}
});

});