package com.chat.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.chat.model.Jobs;
@Transactional
@Repository
public class JobsDaoImpl implements JobsDao{

	@Autowired
	SessionFactory sessionFactory;
	public void createJobs(Jobs jobs) {
		sessionFactory.getCurrentSession().save(jobs);
	}
	public List<Jobs> viewJobs() {
		Session session=sessionFactory.getCurrentSession();
		List<Jobs> list=session.createCriteria(Jobs.class).list();
		return list;
	}
	
	public Jobs viewJobs(int id) {
		Session session=sessionFactory.getCurrentSession();
		Jobs jobs=(Jobs) session.get(Jobs.class, new Integer(id));
		return jobs;
	}
	public void updateJobs(Jobs jobs) {
		sessionFactory.getCurrentSession().update(jobs);
		
	}
	public void deleteJobs(int job_Id) {
		Session session=sessionFactory.getCurrentSession();
		Jobs jobs=(Jobs) session.get(Jobs.class, new Integer(job_Id));
		 session.delete(job_Id);
	}
	public void addJob(Jobs job) {
		// TODO Auto-generated method stub
		
	}
	public void deleteJob(int id) {
		// TODO Auto-generated method stub
		
	}
	public void updateJob(Jobs job) {
		// TODO Auto-generated method stub
		
	}
	public Jobs viewJob(int id) {
		// TODO Auto-generated method stub
		return null;
	}
}
