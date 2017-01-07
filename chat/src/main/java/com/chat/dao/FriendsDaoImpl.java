package com.chat.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.chat.model.Friends;
@Transactional
@Repository
public class FriendsDaoImpl implements FriendsDao{
	@Autowired
SessionFactory sessionFactory;

	public void makeFriend(Friends friends) {
		// TODO Auto-generated method stub
		sessionFactory.getCurrentSession().save(friends);
	}

	public void updateFriend(Friends friends) {
		// TODO Auto-generated method stub
		sessionFactory.getCurrentSession().update(friends);
	}

	public void rejectFriend(Friends friends) {
		// TODO Auto-generated method stub
		sessionFactory.getCurrentSession().delete(friends);
	}

	public List<Friends> seeFriends(String username) {
		Criteria ct= sessionFactory.getCurrentSession().createCriteria(Friends.class);
		ct.add(Restrictions.eq("username",username));
		ct.add(Restrictions.eq("status",true));
		List  list = ct.list();
		return list;
	}
} 
	