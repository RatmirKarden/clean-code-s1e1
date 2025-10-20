// DOM
const taskInput = document.getElementById("new-task");
const addButton = document.querySelector(".todo__button");
const incompleteTaskHolder = document.getElementById("incomplete-tasks");
const completedTasksHolder = document.getElementById("completed-tasks");


//New task list item
function createNewTaskElement(text){
    const li = document.createElement("li");
    li.className = "todo__item";


    const check = document.createElement("input");
    check.type = "checkbox";
    check.className = "todo__checkbox";
    

    const label = document.createElement("label");
    label.className = "todo__text";
    label.innerText = text;


    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "todo__input";
    

    const editButton = document.createElement("button");
    editButton.className = "todo__edit";
    editButton.innerText = "Edit";

    
    const deleteButton = document.createElement("button");
    deleteButton.className = "todo__delete";
    const deleteButtonImg = document.createElement("img");
    deleteButtonImg.src = "./remove.svg";
    deleteButtonImg.alt = "remove task";
    deleteButton.append(deleteButtonImg);


    li.append(check, label, editInput, editButton, deleteButton);
    return li;
}

// Add task
function addTask(e) {
    e?.preventDefault();
    const value = taskInput.value.trim();
    if (!value) return;


    const li = createNewTaskElement(value);
    incompleteTaskHolder.appendChild(li);
    bindTaskEvents(li, taskCompleted);
    taskInput.value="";
}

//Edit an existing task.
function editTask() {
    const li = this.parentNode;
    const input = li.querySelector('input[type="text"]');
    const label = li.querySelector(".todo__text");
    const isEdit = li.classList.contains("todo__item--edit");
    

    if(isEdit){
        label.innerText = input.value;
        this.innerText="Edit";
    }else{
        input.value = label.innerText;
        this.innerText = "Save";
    }
    li.classList.toggle("todo__item--edit");
}


//Delete task.
function deleteTask(){
    const li = this.parentNode;
    li.parentNode.removeChild(li);
}

//Mark task completed
function taskCompleted(){
    const li = this.parentNode;
    completedTasksHolder.appendChild(li);
    bindTaskEvents(li, taskIncomplete);
}


function taskIncomplete(){
    const li = this.parentNode;
    incompleteTaskHolder.appendChild(li);
    bindTaskEvents(li,taskCompleted);
}


function bindTaskEvents(taskListItem,checkBoxEventHandler){
    const checkBox = taskListItem.querySelector('input[type="checkbox"]');
    const editButton = taskListItem.querySelector(".todo__edit");
    const deleteButton = taskListItem.querySelector(".todo__delete");


    if (editButton) editButton.onclick = editTask;
    if (deleteButton) deleteButton.onclick = deleteTask;
    if (checkBox) checkBox.onchange = checkBoxEventHandler;
}

// Init for existing items
[...incompleteTaskHolder.children].forEach((li)=>
    bindTaskEvents(li, taskCompleted)
); 
[...completedTasksHolder.children].forEach((li) =>
    bindTaskEvents(li, taskIncomplete)
);

// Add button
addButton.addEventListener("click",addTask);