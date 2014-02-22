ContactManager.module('ContactsApp.Edit',function(Edit,ContactManager,Backbone,Marionette,$,_) {
	Edit.Contact = Marionette.ItemView.extend({
		template:"#contact-form",

		events: {
			'click button.js-submit':"submitClicked"
		},

		submitClicked:function(e){
			e.preventDefault();
			var data = Backbone.Syphon.serialize(this);
			this.trigger("form:submit",data);
		},
		onFormDataInvalid: function(errors){
			var $view = this.$el;
			console.log($view);
			var clearFormErrors = function(){
			var $form = $view.find("form");
			$form.find(".help-inline.error").each(function(){
				$(this).remove();
			});
			$form.find(".control-group.error").each(function(){
				$(this).removeClass("error");
			});
			};
			var self = this;
			var markErrors = function(value,key){
				var $controlGroup = self.$el.find("#contact-"+key).parent();
				console.log($controlGroup);
				console.log("This is the value: "+value+" This is the key: "+key);
				var $errorEL = $("<span>",{class:"help-inline error",text: value});
				$controlGroup.append($errorEL).addClass("error");
			};
			clearFormErrors();
			_.each(errors,markErrors);
		}
	});
});
