package com.chat.dao;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.chat.model.Forum;
@Transactional
@Repository
public class ForumDaoImpl implements ForumDao{

	private static final String Forum_id = null;
	@Autowired
	SessionFactory sessionFactory;

	public void addQuestion(Forum forum) {
		// TODO Auto-generated method stub
		
	}

	public List<Forum> viewQuestions() {
		Session session=sessionFactory.getCurrentSession();
		List<Forum> list = session.createCriteria(Forum.class).list();
		return list;
	}

	public void updateQuestion(Forum forum) {
		Session session=sessionFactory.getCurrentSession();
		 Date date=new Date();
		 String data=date.toString();
		 forum.setDate(data);
		session.update(forum);
		
	}

	public void deleteQuestion(int forum_id) {
Session session=sessionFactory.getCurrentSession();
		
		Forum forum=(Forum) session.get(Forum.class,new Integer(Forum_id));
		session.delete(forum);
		
	}

	public List<Forum> viewMyForum(String postedBy) {
		System.out.println("in view my forum");
		Session session=sessionFactory.getCurrentSession();
		Criteria ct=session.createCriteria(Forum.class);
		ct.add(Restrictions.eq("postedBy",postedBy));
		ct.add(Restrictions.eq("status",true));
		List<Forum> list=ct.list();	
		return list;
		}	
		
}