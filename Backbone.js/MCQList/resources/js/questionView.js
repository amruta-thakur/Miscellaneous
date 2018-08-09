var QuestionModel = Backbone.Model.extend({});
var QuestionCollection = Backbone.Collection.extend({});

var QuestionView = Backbone.View.extend({

    initialize: function() {


        
    },

    events: {
        'click .submit': 'onSubmitClicked',
        'click .reset': 'onResetClicked',
        'change .option': 'onOptionChanged'
    },

    render: function() {
        var source = $("#mcqTemplate").html();
        var template = Handlebars.compile(source);
        var html = template(this.model.toJSON());
        this.$("#mcqContainer").append(html);
        this.$(".correct").hide();
        this.$(".incorrect").hide();
        return this;
    },

    onOptionChanged: function(e){
    	
    	var currentTargetOpt = $(e.currentTarget).attr("id");
    	var currentQuetionId = currentTargetOpt.split("-")[0];
    	var currentOptionId = currentTargetOpt.split("-")[1];
    	
    	if(this.model.get("id") === currentQuetionId){
    		_.each(this.model.get("options"), function(option, index){
    			option.isSelected = false;
    			if(option.id === currentOptionId) {
    				option.isSelected = true;
    			}
    		}, this);
    	}
    	this.$("#submitId-"+currentQuetionId).prop("disabled",false);
    },

    onSubmitClicked: function(e) {
    	var currentTargetSub = $(e.currentTarget).attr("id");
    	var currentQuetionId = currentTargetSub.split("-")[1];
    	var isCorrectAns = false;
    	if(this.model.get("id") === currentQuetionId){
    		_.each(this.model.get("options"), function(option, index){
    			if(option.isSelected === true && option.isCorrect === true) {
    				isCorrectAns = true;
    			}
    			this.$("#"+currentQuetionId+"-"+ option.id).prop('disabled', true);
    		}, this);
    		if(isCorrectAns){
    			this.$("#correct-"+currentQuetionId).show();
    		} else {
    			this.$("#incorrect-"+currentQuetionId).show();
    		}
    		console.log(this.model.has("actualAttempts"));
    		if(this.model.has("actualAttempts")){
    			
    			if(this.model.get("actualAttempts") !== this.model.get("attempts")){
					this.$("#resetId-"+currentQuetionId).prop('disabled', false);
    			}
    		} else {
    			this.$("#resetId-"+currentQuetionId).prop('disabled', true);
    		}
    	}
    	this.$("#submitId-"+currentQuetionId).prop("disabled",true);
    	
    	
    },

    onResetClicked: function(e) {
    	var currentTargetRes = $(e.currentTarget).attr("id");
    	var currentQuetionId = currentTargetRes.split("-")[1];

    	this.$("#correct-"+currentQuetionId).hide();
    	this.$("#incorrect-"+currentQuetionId).hide();
    	if(this.model.get("id") === currentQuetionId){
    		if(!this.model.has("actualAttempts")){
    			this.model.set("actualAttempts",1);
    		} else {
    			var count = this.model.get("actualAttempts");
				count = count + 1;
				this.model.set("actualAttempts",count);
    		}
	    	_.each(this.model.get("options"), function(option, index){
				this.$("#"+currentQuetionId+"-"+ option.id).prop('checked', false);
				this.$("#"+currentQuetionId+"-"+ option.id).prop('disabled', false);
			}, this);
	    }
		this.$("#submitId-"+currentQuetionId).prop("disabled",false);
    	this.$("#resetId-"+currentQuetionId).prop('disabled', true);
    }
});