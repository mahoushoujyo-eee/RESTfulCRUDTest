window.onload = initialize;

const table_th =
    "<caption>Employee List</caption>" +
    "<tr class=\"employee_table_tr\">\n" +
    "<th>ID</th>\n" +
    "<th>Name</th>\n" +
    "<th>Age</th>\n" +
    "<th>Salary</th>\n" +
    "<th>Actions</th>\n" +
    "</tr>"

const query_nameHTML =
    "<form name='query_name_form' action='/queryByName' method='post'>" +
    "<input type='text' class='employee_name' id='employee_name' placeholder='EmployeeName'>" +
    "<input type='button' value='Query' class='temp_query_button' onclick='queryEmployeeByNameEnd(document.getElementById(\"employee_name\").value)'></form>"

const query_salaryHTML =
    "<form name='query_salary_form' action='/queryBySalary' method='post'>" +
    "<input type='text' class='employee_salary' id='employee_salary' placeholder='EmployeeSalary'>" +
    "<input type='button' value='Query' class='temp_query_button' onclick='queryEmployeeBySalaryEnd(document.getElementById(\"employee_salary\").value)'></form>"

const query_allHTML =
    "<form name='query_name_and_salary_form' action='/queryByNameAndSalary' method='post'>" +
    "<input type='text' class='employee_name' id='employee_name' placeholder='EmployeeName'>" +
    "<input type='text' class='employee_salary' id='employee_salary' placeholder='EmployeeSalary'>" +
    "<input type='button' value='Query' class='temp_query_button' onclick='queryEmployeeByNameAndSalaryEnd()'></form>"

function addEmployeeBegin()
{
    let table = document.getElementById("employee_table")
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
    let name = temp_tr.children[1].children[0].value
    let age = temp_tr.children[2].children[0].value
    let salary = temp_tr.children[3].children[0].value
    let xhr = new XMLHttpRequest()
    xhr.open("POST", "/addEmployee", true)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify({"name": name, "age": age, "salary": salary}))
    xhr.onload = function ()
    {
        let id = JSON.parse(xhr.responseText).id
        addEmployeeToPage(temp_tr, id, name, salary, age)
    }
}


function queryEmployeeByNameBegin()
{
    let query_block= document.getElementById("query_block")
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
    let xhr = new XMLHttpRequest()
    xhr.open("POST", "/queryByName", true)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify({"name": employee_name, "age": null, "salary": null}))
    if (employee_name == null)
        console.log("null")
    else
        console.log(employee_name)
    xhr.onload = function ()
    {
        let employee_table = document.getElementById("employee_table")
        let data = JSON.parse(xhr.responseText)
        employee_table.innerHTML = table_th
        refreshPage("employee_table", data)
        let query_block = document.getElementById("query_block")
        query_block.innerHTML = ""
    }
}

function queryEmployeeBySalaryBegin()
{
    let query_block= document.getElementById("query_block")
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
    let xhr = new XMLHttpRequest()
    xhr.open("POST", "/queryBySalary", true)
    xhr.setRequestHeader("Content-Type", "text/plain")
    xhr.send(document.getElementById("employee_salary").value)
    xhr.onload = function ()
    {
        let employee_table = document.getElementById("employee_table")
        employee_table.innerHTML = table_th
        let data = JSON.parse(xhr.responseText)
        refreshPage("employee_table", data)
        let query_block = document.getElementById("query_block")
        query_block.innerHTML = " "
    }
}

function queryEmployeeByNameAndSalaryEnd()
{
    let xhr = new XMLHttpRequest()
    xhr.open("POST", "/queryByNameAndSalary", true)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify({"name": document.getElementById("employee_name").value, "salary": document.getElementById("employee_salary").value}))
    xhr.onload = function ()
    {
        let employee_table = document.getElementById("employee_table")
        employee_table.innerHTML = table_th
        let data = JSON.parse(xhr.responseText)
        refreshPage("employee_table", data)
        let query_block = document.getElementById("query_block")
        query_block.innerHTML = " "
    }
}

function deleteEmployee()
{
    console.log("delete")
    let tr_node = this.parentNode.parentNode
    let id = tr_node.querySelector('td').textContent
    console.log(tr_node)
    console.log(id)
    let xhr = new XMLHttpRequest()
    xhr.open("POST", "/deleteEmployee", true)
    xhr.setRequestHeader("Content-Type", "text/plain")
    xhr.send(id)

    tr_node.parentNode.removeChild(tr_node)
}

function updateEmployeeBegin()
{
    console.log("update")
    let tr_node = this.parentNode.parentNode
    console.log(tr_node)
    let id = this.parentNode.parentNode.querySelector('td').textContent
    let name = tr_node.children[1].textContent
    let age = tr_node.children[2].textContent
    let salary = tr_node.children[3].textContent

    tr_node.innerHTML =
        "<td class='employee_table_td'><input type='text' value='" + id + "' disabled='disabled'></td>" +
        "<td class='employee_table_td'><input type='text' value='" + name + "'></td>" +
        "<td class='employee_table_td'><input type='text' value='" + age + "'></td>" +
        "<td class='employee_table_td'><input type='text' value='" + salary+ "'></td>" +
        "<td class='employee_table_td'><input type='button' value='Update' id='temp_update_button' class='temp_update_button'>" +
        "</td>"

    let temp_update_button = document.getElementById("temp_update_button")
    temp_update_button.addEventListener("click", updateEmployeeEnd)
}

function updateEmployeeEnd()
{
    let tr_node = this.parentNode.parentNode
    let id = tr_node.querySelector('td').querySelector('input').value
    let name = tr_node.children[1].children[0].value
    let age = tr_node.children[2].children[0].value
    let salary = tr_node.children[3].children[0].value

    console.log(tr_node)
    console.log(id)

    let xhr = new XMLHttpRequest()
    xhr.open("POST", "/updateEmployee", true)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify({"id": id, "name": name, "age": age, "salary": salary}))

    xhr.onload = function ()
    {
        addEmployeeToPage(tr_node, id, name, salary, age)
    }
}

function reloadPage()
{
    let employee_table = document.getElementById("employee_table")
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
        "<td class='employee_table_td'><input type='button' value='Update' class='update_button'>" +
        "<input type='button' value='Delete' class='delete_button'></td>"

    let update_button = temp_tr.querySelector(".update_button")
    update_button.addEventListener("click", updateEmployeeBegin)
    let delete_button = temp_tr.querySelector(".delete_button")
    delete_button.addEventListener("click", deleteEmployee)
}

function refreshPage(page_id, data)
{
    let table = document.getElementById(page_id)
    for(let i = 0; i < data.length; i++)
    {
        var temp_tr = document.createElement("tr")
        table.appendChild(temp_tr)
        addEmployeeToPage(temp_tr, data[i].id, data[i].name, data[i].salary, data[i].age)
    }
}

function initialize()
{
    let xhr = new XMLHttpRequest()
    xhr.open("POST", "/initialize", true)
    fetch("/initialize")
        .then(response =>{return response.json()})
        .then(data =>
        {
            refreshPage("employee_table", data)
            addDeleteAndUpdateEventsListener()
        })
}

function addDeleteAndUpdateEventsListener()
{
    let delete_buttons = document.getElementsByClassName("delete_button")
    for (let i = 0; i < delete_buttons.length; i++)
        delete_buttons[i].addEventListener("click", deleteEmployee)
    let update_buttons = document.getElementsByClassName("update_button")
    for (let i = 0; i < update_buttons.length; i++)
        update_buttons[i].addEventListener("click", updateEmployeeBegin)
    console.log(delete_buttons)
    console.log(update_buttons)
}