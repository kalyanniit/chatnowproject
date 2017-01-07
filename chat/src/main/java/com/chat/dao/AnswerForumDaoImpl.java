package com.chat.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.chat.model.AnswerForum;

@Transactional
@Repository
@ComponentScan("com")
public class AnswerForumDaoImpl implements AnswerForumDao{
	@Autowired
	SessionFactory sessionfactory;
	public void answerForum(AnswerForum answerForum) {
		
		sessionfactory.getCurrentSession().save(answerForum);
	}

	public List<AnswerForum> viewAnswers(String forumid) {
		System.out.println("in comment daoimpl");
		Criteria ct=sessionfactory.getCurrentSession().createCriteria(AnswerForum.class);
		 ct.add(Restrictions.eq("forumid", forumid));
		 List list=ct.list();
		return list;
	}  

}
