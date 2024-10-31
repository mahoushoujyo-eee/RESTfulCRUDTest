package org.example.restfulcrudtest.controller;

import org.example.restfulcrudtest.bean.Employee;
import org.example.restfulcrudtest.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
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
        System.out.println(result);
        return result;
    }


    @RequestMapping("/initialize")
    public ResponseEntity<List<Employee>> initialize()
    {
        List<Employee> initializeInformation = employeeService.initialize();
        return new ResponseEntity<>(initializeInformation, null, HttpStatus.OK);
    }

    @RequestMapping("/deleteEmployee")
    public void deleteEmployee(@RequestBody String id)
    {
        Integer idInt = Integer.parseInt(id);
        employeeService.deleteEmpById(idInt);
    }

    @RequestMapping("/updateEmployee")
    public void updateEmployee(@RequestBody Employee employee)
    {
        System.out.println("Updated employee: " + employee);
        employeeService.updateEmp(employee);
    }

    @RequestMapping("/queryByName")
    public List<Employee> queryByNameApproximately(@RequestBody Employee employee)
    {
        System.out.println("Query by name: " + employee.getName());
        List<Employee> result = employeeService.queryByNameApproximately(employee.getName());
        return result;
    }

    @RequestMapping("/queryBySalary")
    public List<Employee> queryBySalary(@RequestBody String salaryInformation)
    {
        List<Employee> result = employeeService.queryBySalary(salaryInformation);
        System.out.println("Query by salary: " + salaryInformation);
        System.out.println("Query result: " + result);
        return result;
    }

    @RequestMapping("/queryByNameAndSalary")
    public List<Employee> queryByNameAndSalary(@RequestBody Map<String, String> queryInformation)
    {
        String name = queryInformation.get("name");
        String salaryInformation = queryInformation.get("salary");
        return employeeService.queryByNameAndSalary(name, salaryInformation);
    }
}
