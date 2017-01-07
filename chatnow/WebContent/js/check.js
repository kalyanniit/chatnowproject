var likes=0;
var chat=angular.module('chat',['ngRoute']);
chat.config(function($routeProvider)
{
	$routeProvider.when("/",
			{
				templateUrl:"views/index.html",
				controller:'mainController'
			})
			
			.when("/viewAllBlogs",
			{
				templateUrl:"views/viewBlogs.html",
				controller:'viewBlogsController'
			})
			.when("/login",
			{
				templateUrl:"views/login.html",
				controller:'loginController'
			})
			
			.when("/register",
			{
				templateUrl:"views/register.html",
				controller:'registerController'
			})
			.when("/about",
			{
				templateUrl:"views/about.html",
				controller:'aboutController'
			})
			.when("/forum",
			{
				templateUrl:"views/forum.html",
				controller:'forum1Controller'
			})
			.when("/services",
			{
				templateUrl:"views/services.html",
				controller:'servicesController'
			}).when("/blog",
			{
				templateUrl:"views/blog.html",
				controller:'blogController'
			}).
			when("/logout",
					{
						templateUrl:"views/logout.html",
						controller:'logoutController'
					})
			.when("/userHome",
			{
				templateUrl:"views/userHome.html",
				controller:'userHomeController'
			})
			.when("/jobs",
			{
				templateUrl:"views/jobs.html",
				controller:'jobsController'
			})
			.when("/admin",
			{
				templateUrl:"views/admin.html",
				controller:'adminController'
			})
			.when("/adminBlog",
			{
				templateUrl:"views/adminBlog.html",
				controller:'adminBlogController'
			})
			.when("/adminJobs",
			{
				templateUrl:"views/adminJobs.html",
				controller:'adminJobsController'
			})
			
		});
chat.directive('fileModel', ['$parse', function ($parse) {
    return {
       restrict: 'A',
       link: function(scope, element, attrs) {
          var model = $parse(attrs.fileModel);
          var modelSetter = model.assign;
          
          element.bind('change', function(){
             scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
             });
          });
       }
    };
 }]);

chat.service('fileUpload', ['$http','$location', function ($http,$scope,$location) {
    this.uploadFileToUrl = function(file, uploadUrl,username,password,emailid,contact){
       var fd = new FormData();
       fd.append('file', file);
       fd.append('username',username);
       fd.append('password',password);
       fd.append('emailid',emailid);
       fd.append('contact',contact);
    console.log("fd:"+fd)
       $http.post(uploadUrl, fd, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
       })
       .success(function(){
    	   $scope.message="registered! you can login now!!";
    	    $scope.username="";
    	    $scope.password="";
    	   
       })
    
       .error(function(){
       });
    }
 }])
chat.controller('registerController', ['$scope', '$http','fileUpload', function($scope,fileUpload){
	console.log("iam in register controllerrrrrr");
    $scope.register= function(){
       var file = $scope.myFile;
       var username=$scope.username;
       var password=$scope.password;
       var emailid=$scope.emailid;
       var contact=$scope.contact;
       console.log("username"+username);
       console.log("password:"+$scope.password);
       console.log("emailid:"+$scope.emailid);
       console.log("contact:"+$scope.contact);
       console.log('file is ' );
   console.dir(file);
      var uploadUrl = "http://localhost:8090/chat/fileUpload";
       fileUpload.uploadFileToUrl(file,uploadUrl,username,password,emailid,contact);
    };
 }]);


chat.controller('loginController',['$scope','$http','$location','$rootScope',function($scope,$http,$location,$rootScope)		
                                 		{
	                                     $scope.message="you are in login controller";
                                              console.log(" login controller");
                                 			 $scope.login=function()
                                 			 {
                                 				  var loginData={
                                 						  username:$scope.username,	
                                 							password:$scope.password,  
                                 				  }
                                  $http.post('http://localhost:8090/chat/authenticate',loginData).then(function (response) {
                                 	 console.log("result   data:"+response.data);
                                 	 var r=response.data.toString();
                                 	 console.log("response:"+r);
                                      
                                 		if(r==1)
                                 			{
                                 			$rootScope.blog=true;
                                 			$rootScope.forum=true;
                                 			$rootScope.jobs=true;
                                 			$rootScope.login=false;
                                 			$rootScope.register=false;
                                 			$rootScope.services=false;
                                 			$rootScope.about=false;
                                 			$rootScope.home=false;
                                 			$rootScope.logout=true;
                                 			$rootScope.chat=true;
                                 			$rootScope.viewBlogs=true;
                                 			console.log('logout:'+$rootScope.logout);
                                 			console.log("jaffa:"+response.data);
                                 			/* var path="/userHome?username="+$scope.username;
                                 			$location.path(path);*/
                                 			console.log("uname from root scope:"+$rootScope.uname);
                                 			$rootScope.uname=$scope.username;
                                 			console.log("uname:"+$rootScope.uname);
                                 			$location.path("/userHome");
                                 			}
                                 		if(r==0)
                                 			{
                                 			$scope.username="";
                                 			$scope.password="";
                                 			$scope.message="username/password incorrect";
                                 			$location.path('/login');
                                 			}
                                 		if(r==2)
                                 		{
                                 			$rootScope.login=false;
                                 			$rootScope.register=false;
                                 			$rootScope.services=false;
                                 			$rootScope.about=false;
                                 			$rootScope.home=false;
                                 			$rootScope.adminBlog=true;
                                 			$rootScope.users=true;
                                 			$rootScope.registeredUsers=true;
                                 			$rootScope.logout=true;
                                 			
                                 		$location.path('/admin');
                                 		}
                                 		
                                  });  
                                 			 }
                                 		}]
                                 		);

 chat.controller('userHomeController',function($scope)		
 		{
 			$scope.message="you are in userhome page";
 		}
 		);



 chat.controller('forum1Controller', function($scope,$http)
 		{
 			
 		console.log("I am in forum controller");
 		$scope.forum = function()
 		{
 		console.log("in forum controller");	

 		var forum=
 			{
 				 questiontitle:$scope.questionTitle,
 				 category: $scope.category,
 				 questionDescription:$scope.questionDescription
 			};
 		console.log("forum.questionTitle");
 	       console.log("questionTitle:"+questionTitle);
 	       console.log("category:"+$scope.category);
 	       console.log("questionDescription:"+$scope.questionDescription);
 
 		var res  = $http.post("http://localhost:8090//chat//addQuestion",forum);
 		res.success(function(data,status,header,config)
 				{
 			console.log("status:"+status);
 			var message;
 			$scope.message="you are successfully created forum";
 			$scope.questionTitle="";
 			$scope.category="";
 				$scope.questionDescription="";

 				});
 		}
 		});
 chat.controller("blogController",function($scope,$http,$rootScope)	
 		{	
 	             console.log("I am in blog controller");
 	             console.log("username in blog controller:"+$rootScope.uname);
 	
 			 $http.get("http://localhost:8090/chat/viewBlogs?name="+$rootScope.uname)
 			    .then(function (response) {$scope.blogs = response.data;});
 			
 			$scope.newBlog={};
 			console.log("In Controller");
 			$scope.addBlog=function(newBlog)
 			{				
 				var dataObj = {
 		    			blogTitle:$scope.blogTitle,
 		    			blogDescription:$scope.blogDescription,
 		 				category:$scope.category,
 		 				postedBy:$rootScope.uname
 		 		};
 				console.log("title:"+dataObj);
 				 var res = $http.post('http://localhost:8090/chat/addBlog',dataObj);
 				 $http.get("http://localhost:8090/chat/viewBlogs")
 			 	    .then(function (response) {$scope.blogs = response.data;});
 			 		res.success(function(data, status, headers, config) {
 			 			$scope.message = data;
 			 			console.log("status:"+status);
 			 		});
 			 		 
 			};
 			$scope.editBlog=function(blog)
 			{
 				console.log("inside editblog");
 				console.log("blog:"+blog);
 				$scope.blogDataToEdit=blog;
 			}
 			$scope.saveEdit=function()
 			{
 				var dataObj = {
 		    			blogTitle:$scope.blogDataToEdit.blogTitle,
 		    			blogDescription:$scope.blogDataToEdit.blogDescription,
 		 				category:$scope.blogDataToEdit.category,
 		 				blog_id:$scope.blogDataToEdit.blog_id
 		 		};
 				$http.put('http://localhost:8090/chat/updateBlog', dataObj);
 				$http.get("http://localhost:8090/chat/viewBlogs")
 		 	    .then(function (response) {$scope.blogs = response.data;});
 			}
 			$scope.deleteBlog=function(blogDataToEdit)
 			{
 				console.log("delete blog called");
 				blog_id:$scope.blogDataToEdit.blog_id;
 				console.log("blog_id:"+blogDataToEdit.blog_id);
 				$http['delete']('http://localhost:8090/chat/deleteBlog/'+blogDataToEdit.blog_id);
 				 $http.get("http://localhost:8090/chat/viewBlogs")
 			 	    .then(function (response) {$scope.blogs = response.data;});
 			}
 			
 			
 			
 		}

 		);

 chat.controller('viewBlogsController',function($scope,$rootScope,$http)		
 		{   
 	$rootScope.forum=true;
 	console.log("root scope likes:"+$rootScope.likes);
 	console.log("this is viewblogs controller");
 			$scope.message="you are in view blogs";
 			$scope.like=function () {
 				console.log("inside the like function");
 			     likes=likes+1;	
 			     console.log("no of likes:"+likes);
 			     $rootScope.likes=likes;
 			     console.log("root scope likes:"+$rootScope.likes);
 			}
 		        console.log("scope like:"+$scope.likes);
 			 $http.get("http://localhost:8090/chat/viewAllBlogs")
 			    .then(function (response) {$scope.blogs = response.data;});	
 			$scope.newBlog={};
 			console.log("In Controller");
 			$scope.addBlog=function(newBlog)
 			{				
 				var dataObj = {
 		    			blogTitle:$scope.blogTitle,
 		    			blogDescription:$scope.blogDescription,
 		 				category:$scope.category
 		 		};
 				console.log("title:"+dataObj);
 				 var res = $http.post('http://localhost:8090/chat/addBlog',dataObj);
 				 $http.get("http://localhost:8090/chatnow/viewBlogs")
 			 	    .then(function (response) {$scope.blogs = response.data;});
 			 		res.success(function(data, status, headers, config) {
 			 			$scope.message = data;
 			 			console.log("status:"+status);
 			 		});
 			 		 
 			};
 			$scope.editBlog=function(blog)
 			{
 				console.log("inside editblog");
 				console.log("blog:"+blog);
 				$scope.blogDataToEdit=blog;
 			}
 			$scope.saveEdit=function()
 			{
 				var dataObj = {
 		    			blogTitle:$scope.blogDataToEdit.blogTitle,
 		    			blogDescription:$scope.blogDataToEdit.blogDescription,
 		 				category:$scope.blogDataToEdit.category,
 		 				blog_id:$scope.blogDataToEdit.blog_id
 		 		};
 				$http.put('http://localhost:8090/chat/updateBlog', dataObj);
 				$http.get("http://localhost:8090/chat/viewBlogs")
 		 	    .then(function (response) {$scope.blogs = response.data;});
 			}
 			$scope.deleteBlog=function(blogDataToEdit)
 			{
 				console.log("delete blog called");
 				blog_id:$scope.blogDataToEdit.blog_id;
 				console.log("blog_id:"+blogDataToEdit.blog_id);
 			
 				$http['delete']('http://localhost:8090/chat/deleteBlog/'+blogDataToEdit.blog_id);
 				 $http.get("http://localhost:8090/chat/viewBlogs")
 			 	    .then(function (response) {$scope.blogs = response.data;});
 			}
 			
 			
 			
 		}

 		);


 chat.controller("adminBlogController",function($scope,$http,$rootScope)	
 		{	
 	$rootScope.login=false;
 	$rootScope.register=false;
 	$rootScope.services=false;
 	$rootScope.about=false;
 	$rootScope.home=false;
 	$rootScope.adminBlog=true;
 	$rootScope.users=true;
 	$rootScope.registeredUsers=true;
 	$rootScope.logout=true;
 	$rootScope.adminJobs=true;
 	console.log("i am in adminblog controller");
 	console.log("after this");
 			 $http.get("http://localhost:8090/chat/viewBlogs")
 			    .then(function (response) {
 			    	
 			    	$scope.blogs = response.data;
 			    	
 			    	console.log("data:"+response.data);
 			    });
 			$scope.newBlog={};
 			console.log("In Controller");
 			$scope.addBlog=function(newBlog)
 			{
 				var dataObj = {
 		    			blogTitle:$scope.blogTitle,
 		    			blogDescription:$scope.blogDescription,
 		 				category:$scope.category
 		 		};
 				console.log("title:"+dataObj);
 				 var res = $http.post('http://localhost:8090/chat/addBlog',dataObj);
 				 $http.get("http://localhost:8090/chat/viewBlogs")
 			 	    .then(function (response) {$scope.blogs = response.data;});
 			 		res.success(function(data, status, headers, config) {
 			 			$scope.message = data;
 			 			console.log("status:"+status);
 			 		});
 			 		 
 			};
 			$scope.editBlog=function(blog)
 			{
 				console.log("inside editblog");
 				console.log("blog:"+blog);
 				$scope.blogDataToEdit=blog;
 			}
 			$scope.saveEdit=function()
 			{
 				var dataObj = {
 		    			blogTitle:$scope.blogDataToEdit.blogTitle,
 		    			blogDescription:$scope.blogDataToEdit.blogDescription,
 		 				category:$scope.blogDataToEdit.category,
 		 				blog_id:$scope.blogDataToEdit.blog_id
 		 		};
 				$http.put('http://localhost:8090/chat/updateBlog', dataObj);
 				$http.get("http://localhost:8090/chat/viewBlogs")
 		 	    .then(function (response) {$scope.blogs = response.data;});
 			}
 			$scope.deleteBlog=function(blogDataToEdit)
 			{
 				console.log("delete blog called");
 				blog_id:$scope.blogDataToEdit.blog_id;
 				console.log("blog_id:"+blogDataToEdit.blog_id);
 				$http['delete']('http://localhost:8090/chat/deleteBlog/'+blogDataToEdit.blog_id);
 				 $http.get("http://localhost:8090/chat/viewBlogs")
 			 	    .then(function (response) {$scope.blogs = response.data;});
 			}
 			
 		}

 		);
 chat.controller('logoutController',function($scope,$rootScope)		
 		{
 			console.log("logout controller called");
 			$rootScope.login=true;
 			$rootScope.register=true;
 			$rootScope.services=true;
 			$rootScope.about=true;
 			$rootScope.home=true;
 			$rootScope.blog=false;
 			$rootScope.viewBlogs=false;
 			$rootScope.forum=false;
 			$rootScope.jobs=false;
 			$rootScope.logout=false;
 			$rootScope.chat=false;
 			$rootScope.adminBlog=false;
 			$rootScope.users=false;
 		}
 		);
 chat.controller("adminJobsController",function($scope,$http,$rootScope)
 		{
 			 $rootScope.login=false;
 				$rootScope.register=false;
 				$rootScope.services=false;
 				$rootScope.about=false;
 				$rootScope.home=false;
 				$rootScope.adminBlog=true;
 				$rootScope.users=true;
 				$rootScope.registeredUsers=true;
 				$rootScope.logout=true;
 				$rootScope.adminJobs=true;
 			  console.log("you are in adminjobs");
 			  console.log("inside job controller");
 			    $http.get("http://localhost:8090/chat/viewAllJobs")
 			    .then(function (response) {$scope.jobs = response.data;});
 			   
 		});
 chat.controller('jobsController',function($scope,$http,$rootScope)		
 		{
 	console.log("inside job controller");
     $http.get("http://localhost:8090/chat//viewAllJobs")
     .then(function (response) {$scope.jobs = response.data;});
     
     $scope.applyJob=function()
     {
     	 console.log("applyJob function called");
     	 var jobData={
            jobId:$scope.jobId,
     	 registrationNumber:$scope.registrationNumber,
     	 studentId:$scope.studentId,
     	 certificateNumber:$scope.certificateNumber	
     	 };
     	 var res = $http.post('http://localhost:8090/chat/registerJob',jobData);
     }
 		}
        
 		);
chat.service("ChatService", function($q, $timeout) {
	    console.log("in chat service");
	    var service = {}, listener = $q.defer(), socket = {
	      client: null,
	      stomp: null
	    }, messageIds = [];
	    
	    service.RECONNECT_TIMEOUT = 30000;
	    service.SOCKET_URL = "/chat/chat";
	    service.CHAT_TOPIC = "/topic/message";
	    service.CHAT_BROKER = "/app/chat";
	    
	    service.receive = function() {
	      return listener.promise;
	    };
	    
	    service.send = function(message) {
	    	console.log("in send function");
	      var id = Math.floor(Math.random() * 1000000);
	      socket.stomp.send(service.CHAT_BROKER, {
	        priority: 9
	      }, JSON.stringify({
	        message: message,
	        id: id
	      }));
	      messageIds.push(id);
	    };
	    
	    var reconnect = function() {
	      $timeout(function() {
	        initialize();
	      }, this.RECONNECT_TIMEOUT);
	    };
	    
	    var getMessage = function(data) {
	      var message = JSON.parse(data), out = {};
	      out.message = message.message;
	      out.username = message.username;
	      out.time = new Date(message.time);
	      if (_.contains(messageIds, message.id)) {
	        out.self = true;
	        messageIds = _.remove(messageIds, message.id);
	      }
	      return out;
	    };
	    
	    var startListener = function() {
	      socket.stomp.subscribe(service.CHAT_TOPIC, function(data) {
	        listener.notify(getMessage(data.body));
	      });
	    };
	    
	    var initialize = function() {
	      socket.client = new SockJS(service.SOCKET_URL);
	      socket.stomp = Stomp.over(socket.client);
	      socket.stomp.connect({}, startListener);
	      socket.stomp.onclose = reconnect;
	    };
	    
	    initialize();
	    return service;
	  });
	chat.controller("chatController",function($scope,$http,ChatService)
			{
		console.log("in chat  controller");
		$scope.messages = [];
		  $scope.message = "";
		  $scope.max = 140;
		  
		  $scope.addMessage = function() {
			  console.log("in addmessage fn");
		    ChatService.send($scope.message);
		    $scope.message = "";
		  };
		  console.log("in getmessage fn");
		  ChatService.receive
		  ().then(null, null, function(message) {
			  console.log("inside recieeve:"+message);
			  console.log("inside recieeve:"+$scope.message);
		    $scope.messages.push(message);
		  });
		});
