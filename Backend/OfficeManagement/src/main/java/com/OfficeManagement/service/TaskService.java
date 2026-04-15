package com.OfficeManagement.service;

import com.OfficeManagement.model.Employee;
import com.OfficeManagement.model.Task;
import com.OfficeManagement.repository.EmployeeRepository;
import com.OfficeManagement.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepo;
    private final EmployeeRepository empRepo;

    public TaskService(TaskRepository taskRepo, EmployeeRepository empRepo) {
        this.taskRepo = taskRepo;
        this.empRepo = empRepo;
    }

    public Task assignTask(Long employeeId, Task task) {
        Employee emp = empRepo.findById(employeeId).orElseThrow();
        task.setEmployee(emp);
        return taskRepo.save(task);
    }

    public List<Task> getTasksByEmployee(Long employeeId) {
        return taskRepo.findByEmployeeId(employeeId);
    }
}