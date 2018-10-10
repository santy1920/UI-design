var todolists = [];
var listId = 0;
var taskId = 0;
var doc = document;

doc.getElementsByClassName("fa-bars")[0].addEventListener("click", toggleLeftSideBar);
function toggleLeftSideBar() {
    var left_sidebar=doc.getElementsByClassName("left-sidebar")[0];
    if(left_sidebar.style.display != 'none') {
        left_sidebar.style.flex = '0 5%';
     for(index= 0; index<4; index++) {
     doc.getElementsByClassName("left-sidebar-font")[index].style.display = 'none';
     doc.getElementsByClassName("list-font")[0].style.display = 'none';
     doc.getElementsByClassName("list-font")[1].style.display = 'none';
     doc.getElementsByClassName("content")[0].style.flex = '0 80%';
     }
    } else {
        left_sidebar.style.display = 'block';
    }
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
    doc.getElementsByClassName("right-sidebar")[0].style.display= 'block';
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

function showTask() {
	var listId = event.target.id;
	var list;
	for (index = 0; index < todolists.length; index++) { 
	if (listId == todolists[index].id) {
	list = (todolists[index]);
	}
	}
    doc.getElementsByClassName("mylist pointer")[0].innerHTML = (list.name);
    doc.getElementsByClassName("add-task")[0].id = (list.id);
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
var newListValue = createElement({name:'div',attribute:{class:'my-list',id:list.id}});
var value = doc.getElementsByClassName("list-input")[0].value;
var childi = doc.createElement('i');
var childfont = doc.createElement('font');
var node = doc.createTextNode(value);
childi.className="icon fa fa-list-ul";
childfont.className="list-font";
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
	id : ++taskId,
	name : null,
	isSelected : false,
	isStarred : false,
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
    var oldtask= doc.getElementsByClassName("new-task")[0];
    var newtask = doc.createElement('div');
    newtask.id = task.id;
    var select =doc.createElement('button');
    var taskContent= doc.createElement('span');
    var star = doc.createElement('button');
    var node = doc.createTextNode(value);
    select.className="button icon fa fa-circle-o pointer";
    newtask.className = "task-detail pointer";
    taskContent.className="list-font";
    star.className="button icon fa fa-star-o";
    taskContent.appendChild(node);
    newtask.appendChild(select);
    newtask.appendChild(taskContent);
    newtask.appendChild(star);
    oldtask.appendChild(newtask);
    doc.getElementsByClassName("task-input")[0].value = '';
    doc.getElementsByClassName("task-input")[0].focus();
    newtask.addEventListener("click", showRightContent);
    select.addEventListener("click",selectTask);
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
    doc.getElementsByClassName("fa-trash")[0].addEventListener("click", deleteTask);

}

function deleteTask() {
    var taskId = doc.getElementsByClassName("task-detail").id;
    listId = doc.getElementsByClassName("new-task").id;
    var list;
	for (index = 0; index < todolists.length; index++) { 
	if (listId == todolists[index].id) {
	list = (todolists[index]);
	}
    }
    for(index = 0; index<list.tasks.length;index++) {
        if(taskId == list.tasks[index].id){
        list.tasks.splice(index,1);
        break;
    }
    }
}

function selectTask(e){
    if( e.currentTarget.classList.contains("fa-circle-o")) {
    e.currentTarget.classList.replace("fa-circle-o","fa-check-circle");
    } else {
    e.currentTarget.classList.replace("fa-check-circle","fa-circle-o");
    }
    }
    
function important(e){
    if( e.currentTarget.classList.contains("fa-star-o")) {
    e.currentTarget.classList.replace("fa-star-o","fa-star");
    } else {
    e.currentTarget.classList.replace("fa-star","fa-star-o");
    }
}