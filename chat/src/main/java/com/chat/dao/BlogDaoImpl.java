package com.chat.dao;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Repository;
import com.chat.model.Blog;
@Transactional
@Repository
@ComponentScan("com")
public class BlogDaoImpl implements BlogDao{
@Autowired
SessionFactory sessionFactory;
public void addBlog(Blog blog) {
	Session session=sessionFactory.getCurrentSession();
	  Date date=new Date();
	 String data=date.toString();
	 blog.setDate(data);
	session.save(blog);
	
}
/*public List<Blog> viewBlogs(String name) {
	System.out.println("Inside the  viewBlogs(String name)");
	Session session=sessionFactory.getCurrentSession();
	Criteria crit=session.createCriteria(Blog.class);
	//crit.add(Restrictions.eq("postedBy",name));
	List list=crit.list();
	System.out.println("list:"+list);
	return list;
}*/
public void updateBlog(Blog blog) {
	Session session=sessionFactory.getCurrentSession();
	  Date date=new Date();
		 String data=date.toString();
		 blog.setDate(data);
	session.update(blog);
	
}
public void deleteBlog(int blog_id) {
	Session session=sessionFactory.getCurrentSession();
	Blog blog=(Blog)session.get(Blog.class,new Integer(blog_id));
	session.delete(blog);
	
}
public List<Blog> viewBlogs() {
	Session session=sessionFactory.getCurrentSession();
	List<Blog> list=session.createCriteria(Blog.class).list();
	return list;
		}
public List<Blog> viewMyBlogs(String postedBy) {
	System.out.println("in view my blogs");
	Session session=sessionFactory.getCurrentSession();
	Criteria ct=session.createCriteria(Blog.class);
	ct.add(Restrictions.eq("postedBy",postedBy));
	ct.add(Restrictions.eq("status",true));
	List<Blog> list=ct.list();	
	return list;
	}	

}
