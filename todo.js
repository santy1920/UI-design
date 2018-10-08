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
      x.style.display = 'block';
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

document.getElementsByClassName("fa-plus")[0].addEventListener("click", myFunction);
function myFunction() {
   var iDiv = document.createElement('div');
   iDiv.id = 'block';
   iDiv.className = 'block';
   var innerDiv = document.createElement('div');
   innerDiv.className = 'block-2';
   iDiv.appendChild(innerDiv);
   document.getElementsByClassName("content")[0].appendChild(iDiv);
}


