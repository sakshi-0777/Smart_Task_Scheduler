package com.task_scheduler.backend.repository;

import com.task_scheduler.backend.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import com.task_scheduler.backend.entity.User;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long>{
    List<Task> findByUser(User user);
}
