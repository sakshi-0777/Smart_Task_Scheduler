package com.task_scheduler.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import com.task_scheduler.backend.repository.TaskRepository;
import com.task_scheduler.backend.entity.Task;
import com.task_scheduler.backend.entity.User;
import com.task_scheduler.backend.repository.UserRepository;

import java.util.List;



@Service
public class TaskService {


    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    public Task addTask(Task task, String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        task.setUser(user);

        return taskRepository.save(task);
    }

    public List<Task> getAllTasks(String email){
        User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));
        
        return taskRepository.findByUser(user);
    }

    public Task getTaskById(Long id, String email){
        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));

        if(!task.getUser().getEmail().equals(email)){
            throw new AccessDeniedException("You are not authorized to view this task.");
        }

        return task;
    }

    public Task updateTask(Long id, Task updatedTask, String email){

        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));

        if(!task.getUser().getEmail().equals(email)){
            throw new AccessDeniedException("You are not authorized to update this task.");
        }

        task.setTitle(updatedTask.getTitle());
        task.setDescription(updatedTask.getDescription());
        task.setPriority(updatedTask.getPriority());
        task.setStatus(updatedTask.getStatus());
        task.setDueDate(updatedTask.getDueDate());

        return taskRepository.save(task);

    }

    public String deleteTask(Long id, String email){

        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));

        if(!task.getUser().getEmail().equals(email)){
            throw new AccessDeniedException("You are not authorized to delete this task.");
        }

        taskRepository.delete(task);

        return "Task deleted successfully!";
    }

    public List<Task> getTaskByUser(User user){
        return taskRepository.findByUser(user);
    }
}
