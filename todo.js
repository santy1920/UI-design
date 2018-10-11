var todolists = [];
var listId = 0;
var taskId = 0;
var doc = document;

doc.getElementsByClassName("fa-bars")[0].addEventListener("click", closeLeftSideBar);
function closeLeftSideBar() {
    var left_sidebar = doc.getElementsByClassName("left-sidebar")[0];
    if (left_sidebar.style.display != 'none') {
        left_sidebar.style.flex = '0 5%';
        for (index = 0; index < 4; index++) {
            doc.getElementsByClassName("left-sidebar-font")[index].style.display = 'none';
        }
        doc.getElementsByClassName("list-font")[0].style.display = 'none';
        doc.getElementsByClassName("list-font")[1].style.display = 'none';
        doc.getElementsByClassName("content")[0].style.flex = '0 80%';
    }
}
doc.getElementsByClassName("fa-sun-o")[0].addEventListener("click", openLeftSideBar);
function openLeftSideBar() {
        doc.getElementsByClassName("left-sidebar-font")[0].style.display = 'block';
        left_sidebar.style.flex = '0 20%';
}

doc.getElementsByClassName("fa-arrow-circle-left")[0].addEventListener("click", closeRightSideBar);
function closeRightSideBar() {
    doc.getElementsByClassName("right-sidebar")[0].style.display = 'none';
    doc.getElementsByClassName("content")[0].style.flex = '0 80%';
    doc.getElementsByClassName("content-header")[0].style.width = '65rem';
    doc.getElementsByClassName("task-list")[0].style.width = '65rem';
}

doc.getElementsByClassName("add-task")[0].addEventListener("click", openRightSideBar);
function openRightSideBar() {
    doc.getElementsByClassName("right-sidebar")[0].style.display = 'block';
    doc.getElementsByClassName("content")[0].style.flex = '0 60%';
    doc.getElementsByClassName("content-header")[0].style.width = '47rem';
    doc.getElementsByClassName("content-header")[0].style.width = '47rem';
    doc.getElementsByClassName("task-list")[0].style.width = '47rem';
}

doc.getElementsByClassName("create-list")[0].addEventListener("click", createNewList);
function createNewList() {
    doc.getElementsByClassName("list-input")[0].classList.replace("display-none", "display-inline");
    doc.getElementsByClassName("list-font")[0].classList.remove("display-inline");
}

doc.getElementsByClassName("fa-circle-o")[0].addEventListener("click", createNewTask);
function createNewTask() {
    doc.getElementsByClassName("add-task")[0].classList.replace("display-none", "display-inline");
    doc.getElementsByClassName("add-new-task")[0].classList.add("display-none");
}

function createElement(element) {
    var elementObj = document.createElement(element.name);
    if (element.attribute) {
        if (element.attribute.class) {
            elementObj.className = element.attribute.class;
        }
        if (element.attribute.data) {
            elementObj.innerText = element.attribute.data;
        }
        if (element.attribute.id) {
            elementObj.id = element.attribute.id;
        }
    }
    if (element.style) {
        if (element.style.cursor) {
            elementObj.style.cursor = element.style.cursor;
        }
    }
    return elementObj;
}

doc.getElementsByClassName("fa-plus")[0].addEventListener("click", addNewList);
function addNewList() {
    var list = {
        name: null,
        id: ++listId,
        tasks: []
    };
    list.name = doc.getElementsByClassName("list-input")[0].value;
    list.id = listId;
    todolists.push(list);
    var parent = doc.getElementsByClassName("new-menu")[0];
    var newListValue = createElement({ name: 'div', attribute: { class: 'my-list', id: list.id } });
    var value = doc.getElementsByClassName("list-input")[0].value;
    var childi = doc.createElement('i');
    var childfont = doc.createElement('font');
    var node = doc.createTextNode(value);
    childi.className = "icon fa fa-list-ul";
    childfont.className = "list-font";
    childfont.appendChild(node);
    newListValue.appendChild(childi);
    newListValue.appendChild(childfont);
    parent.appendChild(newListValue);
    doc.getElementsByClassName("list-input")[0].value = '';
    doc.getElementsByClassName("list-input")[0].focus();
    newListValue.addEventListener("click", showTask);
}

doc.getElementsByClassName("starred")[0].addEventListener("click", addNewTask);



function addNewTask() {

    var task = {
        id: ++taskId,
        name: null,
        isSelected: false,
        isImportant: false,
        note: null,
        dueDate: null,
    };
    task.name = doc.getElementsByClassName("task-input")[0].value;
    var listId;
    listId = event.target.parentNode.id;
    var list;
    for (index = 0; index < todolists.length; index++) {
        if (listId == todolists[index].id) {
            list = (todolists[index]);
        }
    }
    list.tasks.push(task);
    doc.getElementsByClassName("new-task")[0].id = listId;
    var value = doc.getElementsByClassName("task-input")[0].value;
    var oldtask = doc.getElementsByClassName("new-task")[0];
    var newtask = doc.createElement('div');
    newtask.id = task.id;
    var select = doc.createElement('button');
    var taskContent = doc.createElement('span');
    var star = doc.createElement('button');
    var taskContent = doc.createTextNode(value);
    select.className = "button1 icon fa fa-circle-o pointer";
    newtask.className = "task-detail pointer";
    taskContent.className = "list-font";
    star.className = "button2 icon fa fa-star-o";
    newtask.appendChild(select);
    newtask.appendChild(taskContent);
    newtask.appendChild(star);
    oldtask.appendChild(newtask);
    doc.getElementsByClassName("task-input")[0].value = '';
    doc.getElementsByClassName("task-input")[0].focus();
    select.addEventListener("click", selectTask);
    star.addEventListener("click", starTask);
    newtask.addEventListener("click", showRightContent);
}

function starTask() {
    var taskId = event.target.parentNode.id;
    var listId = doc.getElementsByClassName("new-task")[0].id;
    var list;
    var task;
    for (index = 0; index < todolists.length; index++) {
        if (listId == todolists[index].id) {
            list = (todolists[index]);
        }
    }
    for (index = 0; index < list.tasks.length; index++) {
        if (taskId == list.tasks[index].id) {
            task = (list.tasks[index]);
        }
    }
    if(task.isImportant === false) {
        task.isImportant = true;
        doc.getElementsByClassName("button2")[0].classList.replace("fa-star-o", "fa-star");
        doc.getElementsByClassName("description")[0].innerHTML += "<div class='desc' id=" + task.id + "><button class='button1 icon fa fa-check-circle pointer'></button><span class='taskContent'>" + task.name + "</span><button class='button2 icon fa fa-star-o pointer'></button></div>";
    } else {
        task.isImportant = false;
        doc.getElementsByClassName("button2")[0].classList.replace("fa-star", "fa-star-o");
        doc.getElementsByClassName("description")[0].innerHTML += "<div class='desc' id=" + task.id + "><button class='button1 icon fa fa-circle-o pointer'></button><span class='taskContent'>" + task.name + "</span><button class='button2 icon fa fa-star pointer'></button></div>";
    }
}

function selectTask() {
    var taskId = event.target.parentNode.id;
    var listId = doc.getElementsByClassName("new-task")[0].id;
    var list;
    var task;
    for (index = 0; index < todolists.length; index++) {
        if (listId == todolists[index].id) {
            list = (todolists[index]);
        }
    }
    for (index = 0; index < list.tasks.length; index++) {
        if (taskId == list.tasks[index].id) {
            task = (list.tasks[index]);
        }
    }
    if(task.isSelected === false) {
    task.isSelected = true;
    doc.getElementsByClassName("button1")[0].classList.replace("fa-circle-o", "fa-check-circle");
    doc.getElementsByClassName("description")[0].innerHTML += "<div class='desc' id=" + task.id + "><button class='button1 icon fa fa-check-circle pointer'></button><span class='taskContent'>" + task.name + "</span><button class='button2 icon fa fa-star-o pointer'></button></div>";
    } else {
    task.isSelected = false;
    doc.getElementsByClassName("button1")[0].classList.replace("fa-check-circle", "fa-circle-o");
    doc.getElementsByClassName("description")[0].innerHTML += "<div class='desc' id=" + task.id + "><button class='button1 icon fa fa-circle-o pointer'></button><span class='taskContent'>" + task.name + "</span><button class='button2 icon fa fa-star-o pointer'></button></div>";
    }
}

function showTask() {
    var listId = event.target.id;
    var list;
    for (index = 0; index < todolists.length; index++) {
        if (listId == todolists[index].id) {
            list = (todolists[index]);
        }
    }
    doc.getElementsByClassName("mylist")[0].innerHTML = (list.name);
    doc.getElementsByClassName("add-task")[0].id = (list.id);
    var listTasks = doc.getElementsByClassName("new-task")[0];
    listTasks.id = list.id;
    var taskContent = doc.getElementsByClassName("task-detail");
    var select = null;
    var star = null;
    console.log(listTasks);
    for (index = 0; index < taskContent.length; index++) {
        if (taskContent[index].parentElement.className == "new-task") {
            listTasks.removeChild(taskContent[index]);
            index--;
        }
    }
    list.tasks.forEach(task => {
        if(!task.isSelected){
            select = 'button icon fa fa-circle-o pointer';
            } else {
            select='button icon fa fa-circle pointer';
        }
        if(!task.isImportant) {
            star = 'button icon fa fa-star-o';
        } else {
            star = 'button icon fa fa-star';
        } 
        doc.getElementsByClassName("new-task")[0].innerHTML += "<div class='task-detail' id=" + task.id + "><button class='" + select + "'></button><span class='taskContent'>" + task.name + "</span><button class='" + star + "'></button></div>";
    });
    
}

function showRightContent() {
    var listId;
    listId = event.target.parentNode.id;
    var list;
    for (index = 0; index < todolists.length; index++) {
        if (listId == todolists[index].id) {
            list = (todolists[index]);
        }
    }
    var taskId = event.target.id;
    var task;
    for (index = 0; index < list.tasks.length; index++) {
        if (taskId == list.tasks[index].id) {
            task = (list.tasks[index]);
        }
    }
    doc.getElementsByClassName("right-sidebar-font")[0].innerHTML = (task.name);
    doc.getElementsByClassName("right-sidebar")[0].id = (task.id);
}


doc.getElementsByClassName("fa-trash")[0].addEventListener("click", deleteTask);
function deleteTask() {
    var taskId = doc.getElementsByClassName("right-sidebar")[0].id;
    listId = doc.getElementsByClassName("new-task")[0].id;
    var list;
    for (index = 0; index < todolists.length; index++) {
        if (listId == todolists[index].id) {
            list = (todolists[index]);
        }
    }
    for (index = 0; index < list.tasks.length; index++) {
        if (taskId == list.tasks[index].id) {
            list.tasks.splice(index, 1);
            break;
        }
    }

    doc.getElementsByClassName("mylist")[0].innerHTML = (list.name);
    doc.getElementsByClassName("add-task")[0].id = (list.id);
    var listTasks = doc.getElementsByClassName("new-task")[0];
    listTasks.id = list.id;
    var taskContent = doc.getElementsByClassName("task-detail");
    var select = null;
    var star = null;
    console.log(listTasks);
    for (index = 0; index < taskContent.length; index++) {
        if (taskContent[index].parentElement.className == "new-task") {
            listTasks.removeChild(taskContent[index]);
            index--;
        }
    }
    list.tasks.forEach(task => {
        if(!task.isSelected){
            select = 'button icon fa fa-circle-o pointer';
            } else {
            select='button icon fa fa-circle pointer';
        }
        if(!task.isImportant) {
            star = 'button icon fa fa-star-o';
        } else {
            star = 'button icon fa fa-star';
        } 
        doc.getElementsByClassName("new-task")[0].innerHTML += "<div class='task-detail' id=" + task.id + "><button class='" + select + "'></button><span class='taskContent'>" + task.name + "</span><button class='" + star + "'></button></div>";
    });
    
}

doc.getElementsByClassName("fa-trash-o")[0].addEventListener("click", deleteList);
function deleteList() {
    var listId = doc.getElementsByClassName("new-task")[0].id;
    for (index = 0; index < todolists.length; index++) {
        if (listId == todolists[index].id) {
            todolists.splice(index, 1);
        }
    }
    doc.getElementsByClassName("")
}   

doc.getElementsByClassName("note")[0].addEventListener("focusout", addNote);
function addNote() {
    var taskId = doc.getElementsByClassName("right-sidebar")[0].id;
    listId = doc.getElementsByClassName("new-task")[0].id;
    var list;
    for (index = 0; index < todolists.length; index++) {
        if (listId == todolists[index].id) {
            list = (todolists[index]);
        }
    }
    for (index = 0; index < list.tasks.length; index++) {
        if (taskId == list.tasks[index].id) {
            task = list.tasks[index];
        }
    }
    task.note = doc.getElementsByClassName("textarea")[0].value;
}

doc.getElementsByClassName("due-date")[0].addEventListener("click", selectDueDate);
function selectDueDate() {
    doc.getElementsByClassName("date")[0].classList.replace("display-none", "display-inline");
}

doc.getElementsByClassName("due-date")[0].addEventListener("focusout", addDueDate);
function addDueDate() {
    var taskId = doc.getElementsByClassName("right-sidebar")[0].id;
    listId = doc.getElementsByClassName("new-task")[0].id;
    var list;
    for (index = 0; index < todolists.length; index++) {
        if (listId == todolists[index].id) {
            list = (todolists[index]);
        }
    }
    for (index = 0; index < list.tasks.length; index++) {
        if (taskId == list.tasks[index].id) {
            task = list.tasks[index];
        }
    }
    task.dueDate = doc.getElementsByClassName("date")[0].value;
}
