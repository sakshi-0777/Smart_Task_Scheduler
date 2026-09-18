package com.task_scheduler.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.task_scheduler.backend.entity.Task;
import com.task_scheduler.backend.service.TaskService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.security.core.Authentication;
import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {


    @Autowired
    private TaskService taskService;

    @PostMapping
    public Task addTask(
            @RequestBody Task task,
            Authentication authentication
    ) {

        return taskService.addTask(
                task,
                authentication.getName()
        );
    }

    @GetMapping
    public List<Task> getAllTasks(Authentication authentication){

        System.out.println("Logged in email: " + authentication.getName());

        return taskService.getAllTasks(authentication.getName());
    }
    

    @GetMapping("/{id}")
    public Task getTask(@PathVariable Long id, Authentication authentication){
        return taskService.getTaskById(id, authentication.getName());
    }
    
    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task task, Authentication authentication){
        return taskService.updateTask(id, task, authentication.getName());
    }

    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable Long id, Authentication authentication){
        return taskService.deleteTask(id, authentication.getName());
    }
      
    
}
