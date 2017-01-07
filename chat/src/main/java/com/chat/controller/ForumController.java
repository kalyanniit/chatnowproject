package com.chat.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.chat.dao.ForumDao;
import com.chat.model.Forum;
@RestController
public class ForumController {
	@Autowired
	ForumDao forumDao;
	@RequestMapping(value="/addQuestion",headers="Accept=application/json",method=RequestMethod.POST)
	  public void addQuestion(@RequestBody Forum forum)
	  {
		 forumDao.addQuestion(forum); 
	  }
	@RequestMapping(value="/viewQuestions",headers="Accept=application/json",method=RequestMethod.GET)
	  public List<Forum> viewQuestions(Forum forum)
	  {
		 return forumDao.viewQuestions();
	  }
	@RequestMapping(value="/updateQuestion",headers="Accept=application/json",method=RequestMethod.PUT)
	public void updateQuestion(@RequestBody Forum forum)
	{
		forumDao.updateQuestion(forum);
	}
	@RequestMapping(value="/deleteQuestion/{forum_id}",headers="Accept=application/json",method=RequestMethod.DELETE)
	public void deleteQuestion(@PathVariable("forum_id") int forum_id)
	{
		forumDao.deleteQuestion(forum_id);
	}
	/*@RequestMapping(value="/getQuestion/{id}",headers="Accept=application/json",method=RequestMethod.GET)
	public Forum getQuestion(@PathVariable("id") int id)
	{
		return forumDao.getQuestion(id);
	}*/
	
	@RequestMapping(value="/viewMyForum/{postedBy}",headers="Accept=Application/json",method=RequestMethod.GET)
	public List<Forum> viewMyForum(@PathVariable("postedBy") String postedBy)
	{
		return forumDao.viewMyForum(postedBy);
		
	}
	
}
