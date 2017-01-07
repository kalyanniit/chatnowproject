package com.chat.dao;

import java.util.List;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Repository;

import com.chat.model.BlogComment;
@Repository
@ComponentScan("com.chat")
public interface BlogCommentDao {

	void addComment(BlogComment blogComment);
	List<BlogComment> viewComments(String blogid);
}
