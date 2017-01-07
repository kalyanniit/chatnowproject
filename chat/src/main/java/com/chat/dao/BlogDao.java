package com.chat.dao;

import java.util.List;

import com.chat.model.Blog;



public interface BlogDao {
	void addBlog(Blog blog);
	List<Blog> viewBlogs();
	
	void updateBlog(Blog blog);
	void deleteBlog(int blog_id);
	List<Blog> viewMyBlogs(String postedBy);

}
