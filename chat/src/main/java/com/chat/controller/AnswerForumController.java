package com.chat.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.chat.dao.AnswerForumDao;
import com.chat.model.AnswerForum;

@RestController
public class AnswerForumController {

	@Autowired
	AnswerForumDao answerForumDao;
@RequestMapping(value="/answerForum",headers="accept=Application/json",method=RequestMethod.POST)
public void answerForum(@RequestBody AnswerForum answerForum)
{
	answerForumDao.answerForum(answerForum);
}
@RequestMapping(value="/viewAnswers/{forumid}",headers="accept=Application/json",method=RequestMethod.GET)
public List<AnswerForum> viewComments(@PathVariable("forumid") String forumid)
{
	System.out.println("in answer forum controller");
	return answerForumDao.viewAnswers(forumid);
	
}
}
