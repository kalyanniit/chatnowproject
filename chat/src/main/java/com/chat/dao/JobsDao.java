package com.chat.dao;

import java.util.List;


import com.chat.model.Jobs;

public interface JobsDao {
	
	void createJobs(Jobs jobs);
	  void updateJobs(Jobs jobs);
	  List<Jobs> viewJobs();
	  void deleteJobs(int job_Id);
	  Jobs viewJobs(int id);
		  
		}

