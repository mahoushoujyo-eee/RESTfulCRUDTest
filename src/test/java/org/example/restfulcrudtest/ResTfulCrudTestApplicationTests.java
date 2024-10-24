package org.example.restfulcrudtest;

import org.example.restfulcrudtest.bean.Employee;
import org.example.restfulcrudtest.mapper.EmployeeMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;

@SpringBootTest
class ResTfulCrudTestApplicationTests {

	@Test
	void contextLoads() {
	}


	@Autowired
	EmployeeMapper employeeMapper;

	@Test
	public void test() {
		Employee employee = new Employee();
		employee.setAge(22);
		employee.setName("Jerry");
		employeeMapper.insertEmp(employee);
	}

	@Test
	public void readAllTest() {
		ArrayList<Employee> employees = (ArrayList<Employee>) employeeMapper.getAllEmployees();
		System.out.println(employees);
	}

	@Test
	public void readMaxIdTest()
	{
		System.out.println(employeeMapper.getLatestId());
	}

}