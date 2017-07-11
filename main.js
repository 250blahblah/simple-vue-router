const Page1 = {
	title: "Page 1",
	template: "<p>First page</p>"
}
const Page2 = {
	//title: "Page 2",
	template: "<p>Second page</p>"
}
const Page3 = {
	title: "Page 3",
	template: "<p>Third page</p>"
}
const Page4 = {
	title: "Page 4",
	template: "<p>Fourth page</p>"
}
const NotFound = {
	title: "Error 404",
	template: "<p>Page Not Found</p>"
}

var Router = {
	root: '/',
	routes: {
		'': Page1,
		'#/': Page1,
		'#/1': Page1,
		'#/2': Page2,
		'#/3': Page3,
		'#/4': Page4,
		'#/404': NotFound
	},
	config: function(options){
		this.root = options && options.root ? options.root : '/';
		this.setAnchors()
		window.addEventListener('popstate', () => {
			this.render()
			this.setAnchors()
		})
	},
	setAnchors: function(){
		$(document).ready(function() {
			$link = $('a');
			$link.click(function(event) {
				href = $(this).attr('href')
				console.log('link clicked' + href)				 	
				if (href[0] == "#") {
					title = Router.routes[href].title
					event.preventDefault()
					window.history.pushState(null, title, href)
					if(title){
						document.title = title
					}
					Router.render()
				}
			})
		})
	},
	render: function(){
		App.currentRoute = window.location.hash
	}
}

Router.config();

var App = window.App = new Vue({
	el: "#site-wrapper",
	data: function(){
		return {
			currentRoute: window.location.hash
		}
	},
	methods: {
		ViewComponent: function(){
			//console.log('current route: ' + this.currentRoute)
			return Router.routes[this.currentRoute] || Router.routes['#/404'];
		}
	},
	render(h) { 
		return h(this.ViewComponent()) 
	}
})
