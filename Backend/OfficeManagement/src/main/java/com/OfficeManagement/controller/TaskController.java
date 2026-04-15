package com.OfficeManagement.controller;

import com.OfficeManagement.model.Task;
import com.OfficeManagement.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    @PostMapping("/assign/{employeeId}")
    public Task assignTask(@PathVariable Long employeeId, @RequestBody Task task) {
        return service.assignTask(employeeId, task);
    }

    @GetMapping("/employee/{employeeId}")
    public List<Task> getTasks(@PathVariable Long employeeId) {
        return service.getTasksByEmployee(employeeId);
    }
}
