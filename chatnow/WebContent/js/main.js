var likes=0;
var chat=angular.module('chat',['ngRoute']);
chat.config(function($routeProvider)
{
	$routeProvider
	
	.when("/index",
			{
				templateUrl:"index.html",
				controller:'mainController'
			})
			
			/*.when("/viewAllBlogs",
			{
				templateUrl:"views/viewBlogs.html",
				controller:'viewBlogsController'
			})*/
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
				controller:'forumController'
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
			.when("/viewJobs",
			{
				templateUrl:"views/viewJobs.html",
				controller:'viewJobsController'
			})
			.when("/adminBlog",
			{
				templateUrl:"views/adminBlog.html",
				controller:'adminBlogController'
			})
			.when("/adminHome",
			{
				templateUrl:"views/adminHome.html",
				controller:'adminHomeController'
			})
			.when("/adminJobs",
			{
				templateUrl:"views/adminJobs.html",
				controller:'adminJobsController'
			})
			.when("/viewBlogs",
			{
				templateUrl:"views/viewBlogs.html",
				controller:'viewBlogsController'
			})
			.when("/viewForum",
			{
				templateUrl:"views/viewForum.html",
				controller:'viewForumController'
			})
			.when("/adminForum",
			{
				templateUrl:"views/adminForum.html",
				controller:'adminForumController'
			})
			.when("/chat",
						{
							templateUrl:"views/chat.html",
							controller:'chatController'
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
chat.controller('registerController', ['$scope','fileUpload', function($scope,fileUpload){
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
       $scope.username="";
	    $scope.password="";
	    $scope.emailid="";
	    $scope.contact="";
    };
 }]);


chat.controller('loginController',['$scope','$http','$location','$rootScope',function($scope,$http,$location,$rootScope)		
                                 		{
	                                    
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
                                			$rootScope.adminForum=true;
                                			$rootScope.home=false;
                                			$rootScope.adminBlog=true;
                                			$rootScope.users=false;
                                			$rootScope.blog=false;
                                			$rootScope.forum=false;
                                			$rootScope.viewForum=false;
                                 			
                                			$rootScope.jobs=true;
                                			$rootScope.viewJobs=false;
                                			$rootScope.registeredUsers=true;
                                			$rootScope.logout=true;
                                			
                                 		$location.path('/adminHome');
                                 		}
                                 		
                                  });  
                                 			 }
                                 		}]
                                 		);

 chat.controller('userHomeController',function($scope)		
 		{
 			$scope.message="you are in userhome page";
 			$scope.findfriends=function()
			{
			console.log(" in findfriends function");
			console.log("name in  findfriends:"+$rootScope.uname);
					 $http.get("http://localhost:8090/chat/findFriends/"+$rootScope.uname)
					    .then(function (response) {
					    	
					    	$scope.friends = response.data;
					    	
					    	console.log("data:"+response.data);
					    
					    });
					 }
			
				$scope.makeFriend=function(user)
				{
					console.log("in add friend");
					$scope.friend=user;
					console.log("friendname:"+$scope.friend.username);
					console.log("username:"+$rootScope.uname);
					var friend={
							username:$rootScope.uname,
							friend_Name:$scope.friend.username
					}
					$http.post("http://localhost:8090/chat/makeFriend/",friend);

				}
				$scope.listFriends=function()
				{
				console.log(" in friendslist function");
				console.log("name in  friendslist:"+$rootScope.uname);
						 $http.get("http://localhost:8090/chat/seeFriends/"+$rootScope.uname)
						    .then(function (response) {
						    	
						    	$scope.listFriends = response.data;
						    	
						    	console.log("data:"+response.data);
						    
						    });
						 }
			
			
				});
 chat.controller('adminHomeController',function($scope)		
			{
				$scope.message="you are in adminHome page";
			}
			);
		




 chat.controller("blogController",function($scope,$http,$rootScope)
		 {
		 $rootScope.forum=true;
	$rootScope.jobs=true;
	$rootScope.adminblog=false;
	$rootScope.adminforum=false;
	$rootScope.register=false;
	$rootScope.services=false;
	$rootScope.about=false;
	$rootScope.home=false;
	$rootScope.addjobs=false;
	$rootScope.viewBlogs=true;
	$rootScope.login=false;
	$rootScope.jobs=false;
	$rootScope.blogs=true;
	$rootScope.chat=true;
	$rootScope.logout=true;

	             console.log("I am in blog controller");
	             console.log("username in blog controller:"+$rootScope.uname);
	
			 $http.get("http://localhost:8090/chat/viewMyBlogs/"+$rootScope.uname)
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
				 $http.get("http://localhost:8090/chat/viewMyBlogs/"+$rootScope.uname)
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
				 $http.get("http://localhost:8090/chat/viewMyBlogs/"+$rootScope.uname)
		 	    .then(function (response) {$scope.blogs = response.data;});
			}
			$scope.deleteBlog=function(blogDataToEdit)
			{
				console.log("delete blog called");
				blog_id:$scope.blogDataToEdit.blog_id;
				console.log("blog_id:"+blogDataToEdit.blog_id);
				$http['delete']('http://localhost:8090/chat/deleteBlog/'+blogDataToEdit.blog_id);
				 $http.get("http://localhost:8090/chat/viewMyBlogs/"+$rootScope.uname)
			 	    .then(function (response) {$scope.blogs = response.data;});
			}
			
			
			
		}

		);
 chat.controller('viewBlogsController',function($scope,$rootScope,$http)		
		 {
	 $rootScope.userjobs=true;
	$rootScope.adminblog=false;
	$rootScope.adminforum=false;
	$rootScope.register=false;
	$rootScope.home=false;
	$rootScope.addjobs=false;
	$rootScope.login=false;
	$rootScope.jobs=false;
	$rootScope.blogs=true;
	$rootScope.forum=true;
	$rootScope.logout=true;
	$rootScope.forum=true;

	console.log("username in allmyblog controller:"+$rootScope.uname);
	 $http.get("http://localhost:8090/chat/viewAllBlogs")
	    .then(function (response) {
	    	
	    	$scope.blogs = response.data;
	    	
	    	console.log("data:"+response.data);
	    });
	 $scope.likeBlog=function(myblogs)
	 { 
		 $scope.allblogslike=myblogs;
		 console.log("category:"+$scope.allblogslike.likes);
		like= $scope.allblogslike.likes;
    likes=like+1
    console.log("likes:",likes);
    $scope.likes=likes;
    console.log("scope likes:"+$scope.likes);   	
    var like=
			{
 		   blog_id:$scope.allblogslike.blog_id,
 		   category:$scope.allblogslike.category,
		       blogTitle:$scope.allblogslike.blogTitle,
	        	blogDescription:$scope.allblogslike.blogDescription,
	        	postedby:$scope.allblogslike.postedby,
	        	status:$scope.allblogslike.status,
	       	    likes:$scope.likes
			}
		console.log("data in like:"+like);
		console.log("postedby:"+$rootScope.uname);
		 $http.put('http://localhost:8090/chat/updateBlog',like);
		 $http.get("http://localhost:8090/chat/viewBlogs")
		    .then(function (response) {
		    	
		    	$scope.blogs = response.data;
		    	
		    	console.log("data:"+response.data);
		    });
		 
	 }
	 $scope.viewcomments=function(myblogs)
	 {
		 
		 console.log("in viewcomments fn");
		 $scope.viewcomments=myblogs;
		 console.log("blogid:"+$scope.viewcomments.blog_id);
$http.get("http://localhost:8090/chat/viewComments/"+$scope.viewcomments.blog_id)
		    .then(function (response) {
		    	
		    	$scope.comments = response.data;
		    	
		    	console.log("data:"+response.data);
		    	
		    });

	 }
	
$scope.comment=function(myblogs)
{
	console.log("in comment function");
	
	$scope.commentblog=myblogs;
	console.log("comment is"+$scope.commentblog.Comment);
	var comment=
		{
			blog_id:$scope.commentblog.blog_id,
			username:$rootScope.uname,
			comment:$scope.commentblog.Comment
		};
	$http.post('http://localhost:8090/chat/addComment',comment);
	 $http.get("http://localhost:8090/chat/viewBlogs")
	    .then(function (response) {
	    	
	    	$scope.blogs = response.data;
	    	
	    	console.log("data:"+response.data);
	    });
	 console.log("out of addcomment");
}	 
});


 chat.controller("adminBlogController",function($scope,$http,$rootScope)	
 		{	
	 $rootScope.login=false;
		$rootScope.register=false;
		$rootScope.services=false;
		$rootScope.about=false;
		$rootScope.home=false;
		$rootScope.adminBlog=true;
		$rootScope.userHome=true;
		$rootScope.registeredUsers=true;
		$rootScope.logout=true;
		$rootScope.adminJobs=true;
		console.log("i am in adminblog controller");
		console.log("after this");
				 $http.get("http://localhost:8090/chat/viewAllBlogs")
				    .then(function (response) {
				    	
				    	$scope.blogs = response.data;
				    	
				    	console.log("data:"+response.data);
				    });
				 
				 $scope.appdisapp=function(adminBlog)
					{
						console.log("inside appdisappblog");
						console.log("adminBlog:"+adminBlog);
						$scope.blogstatus=adminBlog;
						
					}
					$scope.approveBlog=function()
					{
						console.log("postedBy:"+$scope.blogstatus.postedBy);
						console.log("in approveblog");
						var edit=
							{
								blog_id:$scope.blogstatus.blog_id,
								category:$scope.blogstatus.category,
								blogTitle:$scope.blogstatus.blogTitle,
								blogDescription:$scope.blogstatus.blogDescription,
								postedBy:$scope.blogstatus.postedBy,
								status:true
							}
						
						$http.put("http://localhost:8090/chat/updateBlog",edit);
						 $http.get("http://localhost:8090/chat/viewAllBlogs")
						    .then(function (response) {
						    	
						    	$scope.blogs = response.data;
						    	
						    	console.log("data:"+response.data);
						    });
					}
					$scope.disapproveBlog=function()
					{
						console.log("postedBy:"+$scope.blogstatus.postedBy);
						console.log("in disapproveblog");
						var edit=
							{
								blog_id:$scope.blogstatus.blog_id,
								category:$scope.blogstatus.category,
								blogTitle:$scope.blogstatus.blogTitle,
								blogDescription:$scope.blogstatus.blogDescription,
								postedBy:$scope.blogstatus.postedBy,
								status:false
							}
						$http.put("http://localhost:8090/chat/updateBlog",edit);
						 $http.get("http://localhost:8090/chat/viewAllBlogs")
						    .then(function (response) {
						    	
						    	$scope.blogs = response.data;
						    	
						    	console.log("data:"+response.data);
						    });
					}
					
				 
			});
 chat.controller("forumController",function($scope,$http,$rootScope)	
			{	
		$rootScope.forum=true;
		$rootScope.jobs=true;
		$rootScope.adminblog=false;
		$rootScope.adminforum=false;
		$rootScope.register=false;
		$rootScope.services=false;
		$rootScope.about=false;
		$rootScope.home=false;
		$rootScope.addjobs=false;
		$rootScope.viewBlogs=true;
		$rootScope.login=false;
		$rootScope.jobs=false;
		$rootScope.blogs=true;
		$rootScope.chat=true;
		$rootScope.logout=true;

		             console.log("I am in forum controller");
		             console.log("username in forum controller:"+$rootScope.uname);
		
				 $http.get("http://localhost:8090/chat/viewMyForum/"+$rootScope.uname)
				    .then(function (response) {$scope.forums = response.data;});
				
				$scope.newforum={};
				console.log("In Controller");
				$scope.addForum=function(newforum)
				{				
					var dataObj = {
							questionTitle:$scope.questionTitle,
			    			questionDescription:$scope.questionDescription,
			 				postedBy:$rootScope.uname
			 		};
					console.log("title:"+dataObj);
					 var res = $http.post('http://localhost:8090/chat/addQuestion',dataObj);
					 $http.get("http://localhost:8090/chat/viewMyForum/"+$rootScope.uname)
				 	    .then(function (response) {$scope.forums = response.data;});
				 		res.success(function(data, status, headers, config) {
				 			$scope.message = data;
				 			console.log("status:"+status);
				 		});
				 		 
				};
				$scope.editForum=function(forum)
				{
					console.log("inside editForum");
					console.log("forum:"+forum);
					$scope.forumDataToEdit=forum;
				}
				$scope.saveEdit=function()
				{
					var dataObj = {
							questionTitle:$scope.forumDataToEdit.questionTitle,
							questionDescription:$scope.forumDataToEdit.questionDescription,
			 			
			    			forum_id:$scope.forumDataToEdit.forum_id
			 		};
					$http.put('http://localhost:8090/chat/updateQuestion', dataObj);
					 $http.get("http://localhost:8090/chat/viewMyForum/"+$rootScope.uname)
			 	    .then(function (response) {$scope.forums = response.data;});
				}
				$scope.deleteQuestion=function(forumDataToEdit)
				{
					console.log("delete forum  called");
					forum_id:$scope.forumDataToEdit.forum_id;
					console.log("blog_id:"+forumDataToEdit.forum_id);
					$http['delete']('http://localhost:8090/chat/deleteQuestion/'+forumDataToEdit.forum_id);
					 $http.get("http://localhost:8090/chat/viewMyForum/"+$rootScope.uname)
				 	    .then(function (response) {$scope.forums = response.data;});
				}
				
				
				
			}

			);
 chat.controller('viewForumController',function($scope,$rootScope,$http)		
			{ 
		
			
			$rootScope.userjobs=true;
			$rootScope.adminblog=false;
			$rootScope.adminforum=false;
			$rootScope.register=false;
			$rootScope.home=false;
			$rootScope.addjobs=false;
			$rootScope.login=false;
			$rootScope.jobs=false;
			$rootScope.blogs=true;
			$rootScope.forum=true;
			$rootScope.logout=true;
	     	$rootScope.forum=true;
		
	     	console.log("username in viewQuestions controller:"+$rootScope.uname);
			 $http.get("http://localhost:8090/chat/viewQuestions")
			    .then(function (response) {
			    	
			    	$scope.forums= response.data;
			    	
			    	console.log("data:"+response.data);
			    });
			 
			 $scope.answer=function(forum)
				{
					$scope.answerforum=forum;
					
					var ans=
						{
							forum_id:$scope.answerforum.forum_id,
					answer:$scope.answerforum.answer
						}	
					 $http.post('http://localhost:8090/chat/answerForum',ans);
					$http.get("http://localhost:8090/chat/viewForum")
				    .then(function (response) {
				    	
				    	$scope.forums = response.data;
				    	
				    	console.log("data:"+response.data);
				    });
					}
				$scope.viewanswers=function(forum)
				{
					$scope.answerforum=forum;
					console.log("forumid:"+$scope.answerforum.forum_id);
					 $http.get("http://localhost:8090/chat/viewAnswers/"+$scope.answerforum.forum_id)
					    .then(function (response) {
					    	
					    	$scope.ansforums = response.data;
					    	
					    	console.log("data:"+response.data);
					    });
				}
			 
			 });
 chat.controller("adminForumController",function($scope,$http,$rootScope)	
			{	
		$rootScope.login=false;
		$rootScope.register=false;
		$rootScope.services=false;
		$rootScope.about=false;
		$rootScope.home=false;
		$rootScope.adminBlog=true;
		$rootScope.userHome=true;
		$rootScope.registeredUsers=true;
		$rootScope.logout=true;
		$rootScope.adminJobs=true;
		console.log("i am in adminforum controller");
		console.log("after this");
				 $http.get("http://localhost:8090/chat/viewQuestions")
				    .then(function (response) {
				    	
				    	$scope.forums = response.data;
				    	
				    	console.log("data:"+response.data);
				    });
				 
				 $scope.appdisapp=function(adminforum)
					{
						console.log("inside appdisappblog");
						console.log("adminBlog:"+adminforum);
						$scope.forumstatus=adminforum;
						
					}
					$scope.approveforum=function()
					{
						console.log("postedBy:"+$scope.forumstatus.postedBy);
						console.log("in approveforum");
						var edit=
							{
								forum_id:$scope.forumstatus.forum_id,
							
								questionTitle:$scope.forumstatus.questionTitle,
								questionDescription:$scope.forumstatus.questionDescription,
								postedBy:$scope.forumstatus.postedBy,
								status:true
							}
						
						$http.put("http://localhost:8090/chat/updateQuestion",edit);
						 $http.get("http://localhost:8090/chat/viewQuestions")
						    .then(function (response) {
						    	
						    	$scope.forums = response.data;
						    	
						    	console.log("data:"+response.data);
						    });
					}
					$scope.disapproveforum=function()
					{
						console.log("postedBy:"+$scope.forumstatus.postedBy);
						console.log("in disapproveforum");
						var edit=
							{
								forum_id:$scope.forumstatus.forum_id,
							
								questionTitle:$scope.forumstatus.questionTitle,
								questionDescription:$scope.forumstatus.questionDescription,
								postedBy:$scope.forumstatus.postedBy,
								status:false
							}
						$http.put("http://localhost:8090/chat/updateQuestion",edit);
						 $http.get("http://localhost:8090/chat/viewQuestions")
						    .then(function (response) {
						    	
						    	$scope.forums = response.data;
						    	
						    	console.log("data:"+response.data);
						    });
					}
					
				 
			});
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
		console.log("iam job controller");
		$scope.jobs=function()
		{
		

		var job =
		{
				
				jobsName :  $scope.jobsName ,
				jobsDescription : $scope.jobsDescription,

				jobsLocation :  $scope.jobsLocation
		    
		};

		  console.log("name:"+job.jobName);
		//adduser from controller
		var res =$http.post("http://localhost:8090/chat/createJobs",job);
		res.success(function(data,status,header,config)
			{
		console.log("status:"+status);
		
		
			
		});
		};
		$scope.editJob=function(jobs)
		{
			console.log("inside editjobs");
			console.log("jobs:"+jobs);
			$scope.jobDataToEdit=jobs;
		}
		$scope.saveEdit=function()
		{
			var jobs={
					jobsName:$scope.jobDataToEdit.jobsName,
					jobsDescription:$scope.jobDataToEdit.jobsDescription,
					jobsLocation:$scope.jobDataToEdit.jobsLocation
			};
			$http.put('http://localhost:8090/chat/updateJob', jobs);
			$http.get("http://localhost:8090/chat/viewJobs").then(function (response) {$scope.jobs = response.data;});
		}
		$scope.deletejob=function(jobDataToEdit)
		{
			console.log("delete job called");
			jobId:$scope.jobDataToEdit.jobId;
			console.log("jobId:"+jobDataToEdit.jobId);
			$http['delete']('http://localhost:8090/chat/deleteJob/'+jobDataToEdit.jobId);
			 $http.get("http://localhost:8090/chat/viewJobs")
		 	    .then(function (response) {$scope.jobs = response.data;});
		}
		
		
	

		
		console.log("username in alljobs controller:"+$rootScope.uname);
		 $http.get("http://localhost:8090/chat/viewJobs")
		    .then(function (response) {
		    	
		    	$scope.jobs = response.data;
		    	
		    	console.log("data:"+response.data);
		    });
		}	
		
	);
 chat.controller('viewJobsController',function($scope,$rootScope,$http)		
			{ 
		
			
			$rootScope.userjobs=true;
			$rootScope.adminblog=false;
			$rootScope.adminforum=false;
			$rootScope.register=false;
			$rootScope.home=false;
			$rootScope.addjobs=false;
			$rootScope.login=false;
			$rootScope.jobs=false;
			$rootScope.blogs=true;
			$rootScope.forum=true;
			$rootScope.logout=true;
	     	$rootScope.forum=true;
		
	     	console.log("username in alljobs controller:"+$rootScope.uname);
			 $http.get("http://localhost:/chat/viewJobs")
			    .then(function (response) {
			    	
			    	$scope.jobs = response.data;
			    	
			    	console.log("data:"+response.data);
			    });
		});

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
