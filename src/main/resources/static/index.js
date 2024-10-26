window.onload = initialize;

var table_th =
    "<caption>Employee List</caption>" +
    "<tr class=\"employee_table_tr\">\n" +
    "<th>ID</th>\n" +
    "<th>Name</th>\n" +
    "<th>Age</th>\n" +
    "<th>Salary</th>\n" +
    "<th>Actions</th>\n" +
    "</tr>"

var query_nameHTML =
    "<form name='query_name_form' action='/queryByName' method='post'>" +
    "<input type='text' class='employee_name' id='employee_name' placeholder='EmployeeName'>" +
    "<input type='button' value='Query' class='temp_query_button' onclick='queryEmployeeByNameEnd(document.getElementById(\"employee_name\").value)'></form>"

var query_salaryHTML =
    "<form name='query_salary_form' action='/queryBySalary' method='post'>" +
    "<input type='text' class='employee_salary' id='employee_salary' placeholder='EmployeeSalary'>" +
    "<input type='button' value='Query' class='temp_query_button' onclick='queryEmployeeBySalaryEnd(document.getElementById(\"employee_salary\").value)'></form>"

var query_allHTML =
    "<form name='query_name_and_salary_form' action='/queryByNameAndSalary' method='post'>" +
    "<input type='text' class='employee_name' id='employee_name' placeholder='EmployeeName'>" +
    "<input type='text' class='employee_salary' id='employee_salary' placeholder='EmployeeSalary'>" +
    "<input type='button' value='Query' class='temp_query_button' onclick='queryEmployeeByNameAndSalaryEnd()'></form>"

function addEmployeeBegin()
{
    var table = document.getElementById("employee_table")
    var temp_tr = document.createElement("tr")
    temp_tr.id = "temp_tr"
    temp_tr.innerHTML =
        "<td><input type='text' disabled='disabled'></td>" +
        "<td><input type='text'></td>" +
        "<td><input type='text'></td>" +
        "<td><input type='text'></td>" +
        "<td><input type='button' value='add' id='temp_add_button' class='temp_add_button' onclick='addEmployeeEnd(temp_tr)'></td>"
    table.appendChild(temp_tr)
}

function addEmployeeEnd(temp_tr)
{
    var name = temp_tr.children[1].children[0].value
    var age = temp_tr.children[2].children[0].value
    var salary = temp_tr.children[3].children[0].value
    var xhr = new XMLHttpRequest()
    xhr.open("POST", "/addEmployee", true)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify({"name": name, "age": age, "salary": salary}))
    xhr.onload = function ()
    {
        var id = JSON.parse(xhr.responseText).id
        addEmployeeToPage(temp_tr, id, name, salary, age)
    }
}


function queryEmployeeByNameBegin()
{
    var query_block= document.getElementById("query_block")
    if (query_block.innerHTML === " ")
    {
        query_block.innerHTML = query_nameHTML
    }
    else
    {
        query_block.innerHTML = query_allHTML
    }


}

function queryEmployeeByNameEnd(employee_name)
{
    var xhr = new XMLHttpRequest()
    xhr.open("POST", "/queryByName", true)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify({"name": employee_name, "age": null, "salary": null}))
    if (employee_name == null)
        console.log("null")
    else
        console.log(employee_name)
    xhr.onload = function ()
    {
        var employee_table = document.getElementById("employee_table")
        var data = JSON.parse(xhr.responseText)
        employee_table.innerHTML = table_th
        refreshPage("employee_table", data)
        var query_block = document.getElementById("query_block")
        query_block.innerHTML = ""
    }
}

function queryEmployeeBySalaryBegin()
{
    var query_block= document.getElementById("query_block")
    if (query_block.innerHTML === " ")
    {
        query_block.innerHTML = query_salaryHTML
    }
    else
    {
        query_block.innerHTML = query_allHTML
    }
}

function queryEmployeeBySalaryEnd()
{
    var xhr = new XMLHttpRequest()
    xhr.open("POST", "/queryBySalary", true)
    xhr.setRequestHeader("Content-Type", "text/plain")
    xhr.send(document.getElementById("employee_salary").value)
    xhr.onload = function ()
    {
        var employee_table = document.getElementById("employee_table")
        employee_table.innerHTML = table_th
        var data = JSON.parse(xhr.responseText)
        refreshPage("employee_table", data)
        var query_block = document.getElementById("query_block")
        query_block.innerHTML = " "
    }
}

function queryEmployeeByNameAndSalaryEnd()
{
    var xhr = new XMLHttpRequest()
    xhr.open("POST", "/queryByNameAndSalary", true)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify({"name": document.getElementById("employee_name").value, "salary": document.getElementById("employee_salary").value}))
    xhr.onload = function ()
    {
        var employee_table = document.getElementById("employee_table")
        employee_table.innerHTML = table_th
        var data = JSON.parse(xhr.responseText)
        refreshPage("employee_table", data)
        var query_block = document.getElementById("query_block")
        query_block.innerHTML = " "
    }
}

function reloadPage()
{
    var employee_table = document.getElementById("employee_table")
    employee_table.innerHTML = table_th
    initialize()
}


function addEmployeeToPage(temp_tr, id, name, salary, age)
{
    temp_tr.innerHTML =
        "<td class='employee_table_td'>" + id + "</td>" +
        "<td class='employee_table_td'>" + name + "</td>" +
        "<td class='employee_table_td'>" + age + "</td>" +
        "<td class='employee_table_td'>" + salary + "</td>" +
        "<td class='employee_table_td'><input type='button' value='Update' class='update_button' onclick='updateEmployee()'>" +
        "<input type='button' value='Delete' class='delete_button' onclick='deleteEmployee()'></td>"
}

function refreshPage(page_id, data)
{
    var table = document.getElementById(page_id)
    for(var i = 0; i < data.length; i++)
    {
        var temp_tr = document.createElement("tr")
        table.appendChild(temp_tr)
        addEmployeeToPage(temp_tr, data[i].id, data[i].name, data[i].salary, data[i].age)
    }
}

function initialize()
{
    var xhr = new XMLHttpRequest()
    xhr.open("POST", "/initialize", true)
    fetch("/initialize")
        .then(response =>{return response.json()})
        .then(data =>
        {
            refreshPage("employee_table", data)
        })
}

