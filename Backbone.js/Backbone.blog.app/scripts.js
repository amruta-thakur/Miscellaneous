//Backbone Model
var Blog = Backbone.Model.extend({
	defaults:{
		author:'',
		title:'',
		url:''
	}
});

//Backbone Collection
var Blogs = Backbone.Collection.extend({

});

var blog1 = new Blog({
	author: 'Amruta',
	title: 'Amruta\' Blogs',
	url: 'http://amrutaBlog.com'
});

var blog2 = new Blog({
	author: 'Amt',
	title: 'Amt\' Blogs',
	url: 'http://amtBlog.com'
});

var blogs = new Blogs([blog1, blog2]);

//Bakcbone view for one blog

var BlogView = Bakcbone.View.extend({
	model: new Blog(),
	tagName: 'tr',
	initialize: function(){
		this.template = _.template($('#blogs-template').html);
	}
});

//Backbone View for all blogs

var BlogsView = Backbone.View.extend({

});