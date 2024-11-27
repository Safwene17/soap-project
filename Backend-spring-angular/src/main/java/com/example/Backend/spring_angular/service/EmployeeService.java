package com.example.Backend.spring_angular.service;

import com.example.Backend.spring_angular.model.Employee;
import com.example.Backend.spring_angular.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // Get all employees
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // Get employee by ID
    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    // Create a new employee (registration)
    public Employee createEmployee(Employee employee) {
        // Hash the password before saving
        employee.setPassword(passwordEncoder.encode(employee.getPassword()));
        return employeeRepository.save(employee);
    }

    // Update an employee
    public Employee updateEmployee(Long id, Employee updatedEmployee) {
        return employeeRepository.findById(id).map(employee -> {
            // Update only fields that are allowed to be changed
            employee.setEmail(updatedEmployee.getEmail());
            // Hash the password if it's updated
            if (updatedEmployee.getPassword() != null && !updatedEmployee.getPassword().isEmpty()) {
                employee.setPassword(passwordEncoder.encode(updatedEmployee.getPassword()));
            }
            employee.setName(updatedEmployee.getName());
            employee.setLastname(updatedEmployee.getLastname());
            employee.setPhone(updatedEmployee.getPhone());
            employee.setGender(updatedEmployee.getGender());
            employee.setRole(updatedEmployee.getRole());
            employee.setJob(updatedEmployee.getJob());
            employee.setLeave_type(updatedEmployee.getLeave_type());
            employee.setLeave_start(updatedEmployee.getLeave_start());
            employee.setLeave_end(updatedEmployee.getLeave_end());
            employee.setLeave_decision(updatedEmployee.getLeave_decision());
            return employeeRepository.save(employee);
        }).orElse(null);
    }

    // Delete an employee
    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }

    // Find an employee by email (for login and other purposes)
    public Optional<Employee> findByEmail(String email) {
        return employeeRepository.findByEmail(email);
    }
}
