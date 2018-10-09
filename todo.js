var todolists = [];
var listId = 0;

document.getElementsByClassName("fa-bars")[0].addEventListener("click", toggleLeftSideBar);
function toggleLeftSideBar() {
    var left_sidebar=document.getElementsByClassName("left-sidebar")[0];
    if(left_sidebar.style.display != 'none') {
        left_sidebar.style.flex = '0 5%';
     for(index= 0; index<4; index++) {
     document.getElementsByClassName("left-sidebar-font")[index].style.display = 'none';
     document.getElementsByClassName("list-font")[0].style.display = 'none';
     document.getElementsByClassName("list-font")[1].style.display = 'none';
     document.getElementsByClassName("content")[0].style.flex = '0 80%';
     }
    } else {
        left_sidebar.style.display = 'block';
    }
}

document.getElementsByClassName("fa-arrow-circle-left")[0].addEventListener("click", closeRightSideBar);
function closeRightSideBar() {
    document.getElementsByClassName("right-sidebar")[0].style.display = 'none';
    document.getElementsByClassName("content")[0].style.flex = '0 80%';
}

document.getElementsByClassName("fa-exchange")[0].addEventListener("click", openRightSideBar);
function openRightSideBar() {
    document.getElementsByClassName("right-sidebar")[0].style.display= 'block';
    document.getElementsByClassName("content")[0].style.flex = '0 60%';   
}

document.getElementsByClassName("fa-plus")[0].addEventListener("click", createNewList);
function createNewList() {
    document.getElementsByClassName("list-input")[0].classList.replace("display-none", "display-inline");
    document.getElementsByClassName("list-font")[0].classList.remove("display-inline");
}

document.getElementsByClassName("fa-circle")[0].addEventListener("click", createNewTask);
function createNewTask() {
    document.getElementsByClassName("add-task")[0].classList.replace("display-none", "display-inline");
    document.getElementsByClassName("add-new-task")[0].classList.add("display-none");
}

document.getElementsByClassName("fa-home")[0].addEventListener("click", addNewList);
function addNewList() {
var list = {
    name: null,
	id: null,
	tasks: []
};
list.name = document.getElementsByClassName("list-input")[0].value;
todolists.push(list);

var value = document.getElementsByClassName("list-input")[0].value;
var parent = document.getElementsByClassName("my-list")[0];
var child = document.createElement('div');
var childi = document.createElement('i');
var childfont = document.createElement('font');
var node = document.createTextNode(value);
child.className="menu";
childi.className="icon fa fa-list-ul";
childfont.className="list-font";
childfont.appendChild(node);
child.appendChild(childi);
child.appendChild(childfont);
parent.appendChild(child);
document.getElementsByClassName("list-input")[0].value = '';
document.getElementsByClassName("list-input")[0].focus();
}

document.getElementsByClassName("starred")[0].addEventListener("click", addNewTask);
function addNewTask() {
var list = {
	name: null,
	id: null,
	tasks: []
};
var task = {
	name: null,
	id: null
};
task.name = document.getElementsByClassName("task-input")[0].value;
list.tasks.push(task);
    var value = document.getElementsByClassName("task-input")[0].value;
    var oldtask= document.getElementsByClassName("new-task")[0];
    var newtask = document.createElement('div');
    var select =document.createElement('i');
    var taskContent= document.createElement('span');
    var node = document.createTextNode(value);
    select.className="icon fa fa-circle-o pointer";
    newtask.className = "menu";
    taskContent.className="list-font";
    taskContent.appendChild(node);
    newtask.appendChild(select);
    newtask.appendChild(taskContent);
    oldtask.appendChild(newtask);
    document.getElementsByClassName("task-input")[0].value = '';
    document.getElementsByClassName("task-input")[0].focus();
}

