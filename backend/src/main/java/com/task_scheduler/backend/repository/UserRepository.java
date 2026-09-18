package com.task_scheduler.backend.repository;

import com.task_scheduler.backend.entity.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

}
