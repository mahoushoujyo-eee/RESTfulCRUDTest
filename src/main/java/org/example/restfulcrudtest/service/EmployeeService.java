package org.example.restfulcrudtest.service;

import org.example.restfulcrudtest.bean.Employee;
import org.example.restfulcrudtest.mapper.EmployeeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public class EmployeeService
{
    private final EmployeeMapper employeeMapper;

    @Autowired
    public EmployeeService(EmployeeMapper employeeMapper)
    {
        this.employeeMapper = employeeMapper;
    }

    public void insertEmployee(Employee employee)
    {
        employeeMapper.insertEmp(employee);
    }

    public List<Employee> initialize()
    {
        return employeeMapper.getAllEmployees();
    }

    public String getLatestId()
    {
        int id = employeeMapper.getLatestId() + 1;
        return id+"";
    }
}
