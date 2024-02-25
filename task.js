let inputEle = document.querySelector('#todo-input');
let completedTasksBtn = document.querySelector('#completed-tasks');
let clearCompletedBtn = document.querySelector('#clear-completed');
let taskInputDiv = document.querySelector('#task-input-div')
let todoDiv = document.querySelector('#todo-div');
let inputBtn = document.querySelector('#input-btn');
let taskList = document.querySelector('#task-list');
let completedTaskList = document.querySelector('#completed-task-list')
let spanNumTasks = document.querySelector("#task-left");

let completeTaskBtn = document.querySelector("#complete-task-btn");
let uncompleteTaskBtn = document.querySelector('#uncomplete-task-btn');
let allTaskBtn = document.querySelector('#all-task-btn');

let taskListDiv = document.querySelector("#task-list-div")
let completedTaskDiv = document.querySelector("#completed-task")



taskCreated = {
    completedTask:[],
    pendingTask:[],
};

displayTasksCount();

inputEle.addEventListener('input',()=>{
    inputBtn.style.display = "inline";
});

inputEle.addEventListener('change',addToDo)

inputBtn.addEventListener("click",addToDo)


function addToDo(){
 
        let listEle = document.createElement("li");
        listEle.style.height = "30px";

        taskCreated.pendingTask.push(inputEle.value);
        displayTasksCount();
    
    
        let checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.style.borderRadius = "5%";
        checkBox.style.marginRight = "40px";
        checkBox.style.verticalAlign = "bottom";
        let inputVal = inputEle.value;
        checkBox.addEventListener("change",()=>{

            if(checkBox.checked){
                // console.log("checked");
                let index = taskCreated.pendingTask.indexOf(inputVal);
                let pop = taskCreated.pendingTask.splice(index,1);
                // console.log(pop);
                completedTaskList.append(listEle);
                //basically append can remove a element from normal flow,
                //without creating a copy and place it whereever we want.

                taskCreated.completedTask.push(pop[0])
                displayTasksCount();
            }
            else{
                let index = taskCreated.completedTask.indexOf(inputVal);
                let pop = taskCreated.completedTask.splice(index,1)

                taskList.append(listEle);
                // listEle.remove();

                taskCreated.pendingTask.push(pop[0]);
                displayTasksCount();
            }

            // console.log(taskCreated);
            // renderLists();
        });
    
        let spanEle = document.createElement("span")
        spanEle.textContent = inputEle.value;
        spanEle.style.fontSize = "1.3rem"
    
        let deleteBtn = document.createElement("button")
        deleteBtn.textContent = 'X';
        deleteBtn.style.borderRadius = "50%";
        deleteBtn.style.backgroundColor = "white";
        deleteBtn.style.border = "1px solid black";
        deleteBtn.style.float = "right"
        deleteBtn.style.marginLeft = "30px";
    
        deleteBtn.addEventListener("click",()=>{
            let spanEleList = listEle.querySelector('span');
            textSearch = spanEleList.textContent;
            for(i of taskCreated.pendingTask){
                if(textSearch==i){
                    let index = taskCreated.pendingTask.indexOf(i);
                    taskCreated.pendingTask.splice(index,1);
                }
            }
            for(i of taskCreated.completedTask){
                if(textSearch == i){
                    let index = taskCreated.completedTask.indexOf(i);
                    taskCreated.completedTask.splice(index,1);
                }
            }
            // console.log(taskCreated);
            displayTasksCount();
            listEle.remove();
        });

        inputEle.value="";
        inputBtn.style.display="none";

        listEle.append(checkBox);
        listEle.append(spanEle);
        listEle.append(deleteBtn);
    
        taskList.append(listEle);
}


completedTasksBtn.addEventListener("click",()=>{
    for(i of taskCreated.pendingTask){
        taskCreated.completedTask.push(i);
    }
    taskCreated.pendingTask.splice(0,taskCreated.pendingTask.length);

    for(i of document.querySelectorAll("#task-list li")){
        completedTaskList.append(i);
        checkBox = i.querySelector("input");
        checkBox.checked = true;
    }
    displayTasksCount();

})

clearCompletedBtn.addEventListener("click",()=>{
    for(i of document.querySelectorAll("#completed-task-list li")){
        i.remove();
    }
})

function displayTasksCount(){
    // console.log(taskCreated);
    let taskCount = taskCreated.pendingTask.length;
    spanNumTasks.style.fontSize = "1rem";
    spanNumTasks.textContent = `${taskCount} tasks left`;
}

completeTaskBtn.addEventListener("click",()=>{
    taskListDiv.style.display="none";
    completedTaskDiv.style.display="block";
})

uncompleteTaskBtn.addEventListener("click",()=>{
    taskListDiv.style.display="block";
    completedTaskDiv.style.display="none";
})

allTaskBtn.addEventListener("click",()=>{
    taskListDiv.style.display="block";
    completedTaskDiv.style.display="block";
})