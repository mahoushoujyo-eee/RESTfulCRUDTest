document.readyState === "complete" ? initialize() : window.onload = initialize;
var index=0



function updateEmployee()
{
    console.log("update")
}

function deleteEmployee()
{
    console.log("delete")
}

function addEmployeeBegin()
{
    var table = document.getElementById("employee_table")
    var temp_tr = document.createElement("tr")
    temp_tr.id = "temp_tr"
    temp_tr.innerHTML =
        "<td><input type='text'></td>" +
        "<td><input type='text'></td>" +
        "<td><input type='text'></td>" +
        "<td><input type='text'></td>" +
        "<td><input type='button' value='add' id='temp_add_button' class='temp_add_button' onclick='addEmployeeEnd(temp_tr)'></td>"
    table.appendChild(temp_tr)
}

function addEmployeeEnd(temp_tr)
{
    var id = temp_tr.children[0].children[0].value
    var name = temp_tr.children[1].children[0].value
    var age = temp_tr.children[2].children[0].value
    var salary = temp_tr.children[3].children[0].value
    var xhr = new XMLHttpRequest()
    xhr.open("POST", "/addEmployee", true)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify({"id": id, "name": name, "age": age, "salary": salary}))
    addEmployeeToPage(temp_tr, id, name, salary, age)
}

function addEmployeeToPage(temp_tr, id, name, salary, age)
{
    temp_tr.innerHTML =
        "<td class='employee_table_td'>" + id + "</td>" +
        "<td class='employee_table_td'>" + name + "</td>" +
        "<td class='employee_table_td'>" + age + "</td>" +
        "<td class='employee_table_td'>" + salary + "</td>" +
        "<td class='employee_table_td'><input type='button' value='update' class='update_button' onclick='updateEmployee()'>" +
        "<input type='button' value='delete' class='delete_button' onclick='deleteEmployee()'></td>"
}

function getEmployee()
{

}

function initialize()
{
    var xhr = new XMLHttpRequest()
    xhr.open("POST", "/initialize", true)
    fetch("/initialize")
        .then(response =>{return response.json()})
        .then(data =>
        {
            for(var i = 0; i < data.length; i++)
            {
                var temp_tr = document.createElement("tr")
                var employee_table = document.getElementById("employee_table")
                employee_table.appendChild(temp_tr)
                addEmployeeToPage(temp_tr, data[i].id, data[i].name, data[i].salary, data[i].age)
            }
        })
}

function queryEmployeeByName()
{

}

function queryEmployeeBySalary()
{

}

