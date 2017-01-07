package com.chat.dao;

import java.util.List;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Repository;

import com.chat.model.AnswerForum;
import com.chat.model.BlogComment;

@Repository
@ComponentScan("com.chat")
public interface AnswerForumDao {
	void answerForum(AnswerForum answerForum);
	List<AnswerForum> viewAnswers(String forumid);
}
