$(function(){
	var questions = new QuestionCollection();
	_.each(Questions, function(question, index){
		questions.add(new QuestionModel(question));

		var questionViewObject = new QuestionView({model:questions.at(index), el:$("#questionContainer")});
    	questionViewObject.render();
	});
    
});