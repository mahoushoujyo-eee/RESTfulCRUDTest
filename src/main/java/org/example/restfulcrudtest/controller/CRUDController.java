package org.example.restfulcrudtest.controller;

import org.example.restfulcrudtest.bean.Employee;
import org.example.restfulcrudtest.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class CRUDController
{

    @Autowired
    EmployeeService employeeService;

    @RequestMapping("/employee")
    public Map<Integer, Employee> employees()
    {
        Map<Integer, Employee> employees = new HashMap<>();

        return employees;
    }

    @RequestMapping("/addEmployee")
    public Map<String, String> addEmployee(@RequestBody Employee employee)
    {
        System.out.println("Added employee: " + employee);
        employeeService.insertEmployee(employee);
        Map<String, String> result = new HashMap<>();
        result.put("id", employee.getId().toString());
        return result;
    }


    @RequestMapping("/initialize")
    public ResponseEntity<List<Employee>> initialize()
    {
        List<Employee> initializeInformation = employeeService.initialize();
        return new ResponseEntity<>(initializeInformation, null, HttpStatus.OK);
    }

    @RequestMapping("/getLatestId")
    public Map<String, String> getLatestId()
    {
        String id = employeeService.getLatestId();
        return Map.of("id", id);
    }
}
