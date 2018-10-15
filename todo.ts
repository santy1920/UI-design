var todolists: List[] = [];
var listId: number = 0;
var taskId: number = 0;
const doc = document;

class List {
    private name: String;
    private id: Number;
    private tasks: Task[] = [];

    public getId() : Number {
        return this.id;
    }
    public setId(id: Number) : void {
        this.id = id;
    }
    public getName() : String {
        return this.name;
    }
    public setName(name: String) : void {
        this.name = name;
    }
    public getTasks() : Task[] {
        return this.tasks;
    }
    public setTasks(tasks: Task[]) : void {
        this.tasks = tasks;
    }
}

class Task {
    private id: String;
    private name: String;
    private isSelected: Boolean = false;
    private isImportant: Boolean = false;
    private note: String = null;
    private dueDate: String = null;

    public getId() : String {
        return this.id;
    }
    public setId(id: String) : void {
        this.id = id;
    }
    public getName() : String {
        return this.name;
    }
    public setName(name: String) : void {
        this.name = name;
    }
    public getIsSelected() : Boolean {
        return this.isSelected;
    }
    public setIsSelected(isSelected: Boolean) : void {
        this.isSelected = isSelected;
    }
    public getIsImportant() : Boolean {
        return this.isImportant;
    }
    public setIsImportant(isImportant: Boolean) : void {
        this.isImportant = isImportant;
    }
    public getNote() : String {
        return this.note;
    }
    public setNote(note: String) : void {
        this.note = note;
    }
    public getDueDate() : String {
        return this.dueDate;
    }
    public setDueDate(dueDate: String) : void {
        this.dueDate = dueDate;
    }
}

function getElementsByClassName(className) : any {
    return doc.getElementsByClassName(className)[0];
}

function createTextNode(value) : any {
    return doc.createTextNode(value);
}

function createElement(element) : any {
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

function init() : void {
getElementsByClassName("fa-bars").addEventListener("click", closeLeftSideBar);
getElementsByClassName("fa-sun-o").addEventListener("click", openLeftSideBar);
getElementsByClassName("fa-arrow-circle-left").addEventListener("click", closeRightSideBar);
getElementsByClassName("new-task").addEventListener("click", openRightSideBar);
getElementsByClassName("create-list").addEventListener("click", createNewList);
getElementsByClassName("fa-plus").addEventListener("click", createNewTask);
getElementsByClassName("fa-plus").addEventListener("click", addNewList);
getElementsByClassName("add-button").addEventListener("click", addNewTask);
getElementsByClassName("fa-trash").addEventListener("click", deleteTask);
getElementsByClassName("fa-trash-o").addEventListener("click", deleteList);
getElementsByClassName("due-date").addEventListener("focusout", addDueDate);
getElementsByClassName("note").addEventListener("focusout", addNote);
getElementsByClassName("due-date").addEventListener("click", selectDueDate);
}

init();

function closeLeftSideBar() : void {
    var left_sidebar = getElementsByClassName("left-sidebar");
    if (left_sidebar.style.display != 'none') {
        left_sidebar.style.flex = '0 5%';
        for (var index = 0; index < 4; index++) {
            (<HTMLInputElement>doc.getElementsByClassName("left-sidebar-font")[index]).style.display = 'none';
        }
        for (var index=0; index < todolists.length; index++) {
            (<HTMLInputElement>doc.getElementsByClassName("list-font")[index]).style.display = 'none';
        }
        getElementsByClassName("content").style.flex = '0 80%';
        getElementsByClassName("create-list").classList.add("display-none");
    }
}
function openLeftSideBar() : void {
    var left_sidebar = getElementsByClassName("left-sidebar");
    for (var index = 0; index < 4; index++) {
        (<HTMLInputElement>doc.getElementsByClassName("left-sidebar-font")[index]).style.display = 'inline';
    }
    for (var index=0 ;index < todolists.length; index++) {
        (<HTMLInputElement>doc.getElementsByClassName("list-font")[index]).style.display = 'inline';
    }
    getElementsByClassName("create-list").classList.remove("display-none");
    getElementsByClassName("content").style.flex = '0 60%';
    left_sidebar.style.flex = '0 20%';
}

function closeRightSideBar() : void {
    getElementsByClassName("right-sidebar").style.display = 'none';
    getElementsByClassName("content").style.flex = '0 80%';
    getElementsByClassName("content-header").style.width = '65rem';
    getElementsByClassName("task-list").style.width = '65rem';
}

function openRightSideBar() : void {
    getElementsByClassName("right-sidebar").style.display = 'block';
    getElementsByClassName("content").style.flex = '0 60%';
    getElementsByClassName("content-header").style.width = '47rem';
    getElementsByClassName("content-header").style.width = '47rem';
    getElementsByClassName("task-list").style.width = '47rem';
}

function createNewList() : void {
    getElementsByClassName("list-input").classList.replace("display-none", "display-inline");
    getElementsByClassName("list-font").classList.replace("display-inline", "display-none");
}

function createNewTask() : void {
    getElementsByClassName("add-task").classList.replace("display-none", "display-inline");
    getElementsByClassName("add-new-task").classList.add("display-none");
}

function addNewList() : void {
    var list:List = new List();
    list.setId(++listId);
    var name = getElementsByClassName("list-input").value;
    list.setName(name);
    todolists.push(list);
    var parent = getElementsByClassName("new-menu");
    var newListValue:HTMLElement = createElement({ name: 'div', attribute: { class: 'my-list', id: list.getId() } });
    var value = getElementsByClassName("list-input").value;
    var childi = createElement('i');
    var childfont = createElement('font');
    var node = createTextNode(value);
    childi.className = "icon fa fa-list-ul";
    childfont.className = "list-font";
    childfont.appendChild(node);
    newListValue.appendChild(childi);
    newListValue.appendChild(childfont);
    parent.appendChild(newListValue);
    getElementsByClassName("list-input").value = '';
    getElementsByClassName("list-input").focus();
    newListValue.addEventListener("click", showTask);
}

function addNewTask(event) : void {
    var task = new Task();
    task.setId("task" + ++taskId);
    var name = getElementsByClassName("task-input").value;
    task.setName(name);
    var listId;
    listId = event.target.parentNode.id;
    var list;
    for (var index = 0; index < todolists.length; index++) {
        if (listId == todolists[index].getId()) {
            list = (todolists[index]);
        }
    }
    list.getTasks().push(task);
    getElementsByClassName("new-task").id = listId;
    var value = getElementsByClassName("task-input").value;
    var oldtask = getElementsByClassName("new-task");
    var newtask = createElement('div');
    newtask.id = task.getId();
    var select = createElement('button');
    var taskContent = createElement('span');
    var star = createElement('button');
    var taskContent = createTextNode(value);
    select.className = "button1 icon fa fa-circle-o pointer";
    newtask.className = "task-detail pointer";
    taskContent.className = "list-font";
    star.className = "button2 icon fa fa-star-o";
    newtask.appendChild(select);
    newtask.appendChild(taskContent);
    newtask.appendChild(star);
    oldtask.appendChild(newtask);
    getElementsByClassName("task-input").value = '';
    getElementsByClassName("task-input").focus();
    select.addEventListener("click", selectTask);
    star.addEventListener("click", starTask);
    newtask.addEventListener("click", showTaskDescription);
}

function showTask(event) : void {
    var listId = event.target.id;
    var list;
    for (var index = 0; index < todolists.length; index++) {
        if (listId == todolists[index].getId()) {
            list = (todolists[index]);
        }
    }
    getElementsByClassName("mylist").innerHTML = (list.name);
    getElementsByClassName("add-task").id = (list.id);
    var listTasks = getElementsByClassName("new-task");
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
            select = 'button1 icon fa fa-circle-o pointer';
            } else {
            select='button1 icon fa fa-check-circle pointer';
        }
        if(!task.isImportant) {
            star = 'button2 icon fa fa-star-o';
        } else {
            star = 'button2 icon fa fa-star';
        } 
        getElementsByClassName("new-task").innerHTML += "<div class='task-detail' id=" + task.id + "><button class='" + select + "'></button><span class='task-content'>" + task.name + "</span><button class='" + star + "'></button></div>";
    });
    for (index=0 ; index < list.tasks.length; index++) {
        doc.getElementsByClassName("task-content")[index].addEventListener("click", showRightContent);
        doc.getElementsByClassName("button1")[index].addEventListener("click", selectTask);
        doc.getElementsByClassName("button2")[index].addEventListener("click", starTask);
    }
    closeRightSideBar();
}

function selectTask(event) : void {
    var taskId = event.target.parentNode.id;
    var listId = getElementsByClassName("new-task").id;
    var list;
    var task;
    for (var index = 0; index < todolists.length; index++) {
        if (listId == todolists[index].getId()) {
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
    var task1 = doc.getElementById(task.id);
    (<HTMLElement>task1.firstChild).classList.replace("fa-circle-o", "fa-check-circle");
    getElementsByClassName("description").innerHTML = "<div class='desc' id=" + task.id + "><button class='button1 icon fa fa-check-circle pointer'></button><span class='right-sidebar-font'>" + task.name + "</span><button class='button2 icon fa fa-star-o pointer'></button></div>";
    } else {
    task.isSelected = false;
    var task2 = doc.getElementById(task.id);
    (<HTMLElement>task2.firstChild).classList.replace("fa-check-circle", "fa-circle-o");
    getElementsByClassName("description").innerHTML = "<div class='desc' id=" + task.id + "><button class='button1 icon fa fa-circle-o pointer'></button><span class='right-sidebar-font'>" + task.name + "</span><button class='button2 icon fa fa-star-o pointer'></button></div>";    
    }
    getElementsByClassName("note").innerHTML = "<textarea class='text-area'>" + task.note + "</textarea>";
}

function starTask(event) : void {
    var taskId = event.target.parentNode.id;
    var listId = getElementsByClassName("new-task").id;
    var list;
    var task;
    for (var index = 0; index < todolists.length; index++) {
        if (listId == todolists[index].getId()) {
            list = (todolists[index]);
        }
    }
    for (var index = 0; index < list.tasks.length; index++) {
        if (taskId == list.tasks[index].id) {
            task = (list.tasks[index]);
        }
    }
    if(task.isSelected === true) {
        var select = 'button1 icon fa fa-check-circle pointer';
    } else {
        select = 'button1 icon fa fa-circle-o pointer';
    }

    if(task.isImportant === false) {
        task.isImportant = true;
        var task1 = doc.getElementById(task.id);
        (<HTMLElement>task1.lastChild).classList.replace("fa-star-o", "fa-star");
        getElementsByClassName("description").innerHTML = "<div class='desc' id=" + task.id + "><button class='" + select + "'></button><span class='right-sidebar-font'>" + task.name + "</span><button class='button2 icon fa fa-star pointer'></button></div>";
    } else {
        task.isImportant = false;
        var task2 = doc.getElementById(task.id);
        (<HTMLElement>task2.lastChild).classList.replace("fa-star", "fa-star-o");
        getElementsByClassName("description").innerHTML = "<div class='desc' id=" + task.id + "><button class='" + select + "'></button><span class='right-sidebar-font'>" + task.name + "</span><button class='button2 icon fa fa-star-o pointer'></button></div>";
    }
}

function showRightContent(event) : void {
    var listId;
    listId = getElementsByClassName("new-task").id;
    var list;
    for (var index = 0; index < todolists.length; index++) {
        if (listId == todolists[index].getId()) {
            list = (todolists[index]);
        }
    }
    var taskId = event.target.parentNode.id;
    var task;
    for (index = 0; index < list.tasks.length; index++) {
        if (taskId == list.tasks[index].id) {
            task = (list.tasks[index]);
        }
    }
    getElementsByClassName("right-sidebar-font").innerHTML = (task.name);
    getElementsByClassName("right-sidebar").id = (task.id);
    getElementsByClassName("note").innerHTML = "<textarea class='text-area'>" + task.note + "</textarea>";
    getElementsByClassName("date").innerHTML = "<input type='date' class='date'>" + task.date;
}

function showTaskDescription(event) : void {
    var listId;
    listId = getElementsByClassName("new-task").id;
    var list;
    for (var index = 0; index < todolists.length; index++) {
        if (listId == todolists[index].getId()) {
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
    getElementsByClassName("right-sidebar-font").innerHTML = (task.name);
    getElementsByClassName("right-sidebar").id = (task.id);
}

function deleteTask() : void {
    var taskId = getElementsByClassName("right-sidebar").id;
    var listId = getElementsByClassName("new-task").id;
    var list;
    for (var index = 0; index < todolists.length; index++) {
        if (listId == todolists[index].getId()) {
            list = (todolists[index]);
        }
    }
    for (index = 0; index < list.tasks.length; index++) {
        if (taskId == list.tasks[index].id) {
            list.tasks.splice(index, 1);
            break;
        }
    }
    getElementsByClassName("mylist").innerHTML = (list.name);
    getElementsByClassName("add-task").id = (list.id);
    var listTasks = getElementsByClassName("new-task");
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
            select = 'button1 icon fa fa-circle-o pointer';
            } else {
            select='button1 icon fa fa-check-circle pointer';
        }
        if(!task.isImportant) {
            star = 'button2 icon fa fa-star-o';
        } else {
            star = 'button2 icon fa fa-star';
        } 
        getElementsByClassName("new-task").innerHTML += "<div class='task-detail' id=" + task.id + "><button class='" + select + "'></button><span class='taskContent'>" + task.name + "</span><button class='" + star + "'></button></div>";
    });
    closeRightSideBar();
}

function deleteList() : void {
    var listId = getElementsByClassName("new-task").id;
    for (var index = 0; index < todolists.length; index++) {
        if (listId == todolists[index].getId()) {
            todolists.splice(index, 1);
        }
    }
}   

function addNote() : void {
    var taskId = getElementsByClassName("right-sidebar").id;
    var listId = getElementsByClassName("new-task").id;
    var list;
    var task;
    for (var index = 0; index < todolists.length; index++) {
        if (listId == todolists[index].getId()) {
            list = (todolists[index]);
        }
    }
    for (index = 0; index < list.tasks.length; index++) {
        if (taskId == list.tasks[index].getId()) {
            task = list.tasks[index];
        }
    }
    task.note = getElementsByClassName("text-area").value;
}

function selectDueDate() : void {
    getElementsByClassName("date").classList.replace("display-none", "display-inline");
}

function addDueDate() : void {
    var taskId = getElementsByClassName("right-sidebar").id;
    listId = getElementsByClassName("new-task").id;
    var list;
    for (var index = 0; index < todolists.length; index++) {
        if (listId == todolists[index].getId()) {
            list = (todolists[index]);
        }
    }
    for (var index = 0; index < list.tasks.length; index++) {
        if (taskId == list.tasks[index].id) {
            var task = list.tasks[index];
        }
    }
    task.dueDate = getElementsByClassName("date").value;
}
