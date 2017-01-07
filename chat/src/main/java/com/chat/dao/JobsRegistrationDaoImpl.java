package com.chat.dao;

import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;

import com.chat.model.Jobs;
import com.chat.model.JobsRegistration;

@Transactional
@Repository
public class JobsRegistrationDaoImpl implements JobsRegistrationDao {
@Autowired
SessionFactory sessionFactory;

	public void createJobsRegistration(JobsRegistration jobsRegistration) {
		// TODO Auto-generated method stub
		sessionFactory.getCurrentSession().save(jobsRegistration);
	}

}
