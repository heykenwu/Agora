//Create a Form for user to enter the name and room number
function CreateForm(){
    let container = document.getElementById("formcontainer");
    let userform = document.createElement('div');
    userform.setAttribute("class","form-row");
    let col1 = document.createElement('div');
    col1.setAttribute("class","form-group col-md-6");
    let namelab = document.createElement("label");
    namelab.innerText="Name: ";
    namelab.setAttribute("for","name");
    let name = document.createElement("input");
    name.setAttribute("id","name");
    name.setAttribute("type","text");
    name.setAttribute("placeholder","Enter name");
    name.setAttribute("size","4");
    col1.append(namelab);
    col1.append(name);
    userform.append(col1);
    let col2 = document.createElement("div");
    col2.setAttribute("class","form-group col-md-6");
    let roomlab = document.createElement("label");
    roomlab.setAttribute("for","channel");
    roomlab.innerText="Room: ";
    let room = document.createElement("input");
    room.setAttribute("id","channel");
    room.setAttribute("type","text");
    room.setAttribute("placeholder","Enter Room");
    room.setAttribute("size","4");
    col2.append(roomlab);
    col2.append(room);
    userform.append(col2);
    let btn = document.createElement("button");
    btn.setAttribute("id","join");
    btn.setAttribute("class","btn btn-primary");
    btn.setAttribute("onclick","join()");
    btn.innerText="Join";
    userform.append(btn);
    container.append(userform);
}

//init the index
function init(){
    CreateForm();
}