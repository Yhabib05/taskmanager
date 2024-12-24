package com.project.taskmanager.repositories;

import com.project.taskmanager.domain.entities.LoginUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginUserRepository extends JpaRepository<LoginUser, String> {
}
