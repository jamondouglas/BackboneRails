ContactManager.module("ContactsApp.List",function(List,ContactManager,Backbone,Marionette,$,_){
	List.Contact = Marionette.ItemView.extend({
		tagName:'tr',
		template:'#contact-list-item',

		events:{
			'click':'highlightName',
			'click button.js-delete':'deleteClicked',
			'click td a.js-show': 'showClicked'
		},

		highlightName:function(){
			this.$el.toggleClass('warning');
			this.trigger('contact:highlighting:toggled',this.model);
		},
		showTableCell: function(e){
			var target = e.target;
		},
		deleteClicked: function(e){
			e.stopPropagation();
			this.trigger('contact:delete',this.model);
		},
		remove: function(){
			var self=this;
			this.$el.fadeOut(function(){
				Marionette.ItemView.prototype.remove.call(self);
			});
		},
		showClicked:function(e){
			e.preventDefault();
			e.stopPropagation();
			this.trigger('contact:show',this.model);
		}
	});
	
	List.Contacts = Marionette.CompositeView.extend({
		tagName:'table',
		className:'table table-hover',
		template:'#contact-list',
		itemView:List.Contact,
		itemViewContainer:'tbody',
	});

	List.ContactPractice = Marionette.CompositeView.extend({
		template:'#practiceComposite',
		itemView:List.Contact,
		itemViewContainer:'ul'
	});
});