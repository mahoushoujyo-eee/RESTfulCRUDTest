package org.example.restfulcrudtest.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.example.restfulcrudtest.bean.Employee;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
public interface EmployeeMapper
{
    Employee getEmpById(Integer id);
    Employee getEmpByName(String name);
    List<Employee> getAllEmployees();

    void insertEmp(Employee employee);

    void updateEmp(Employee employee);

    void deleteEmpById(Integer id);

    Integer getLatestId();

}
