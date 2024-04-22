// Add JS here

window.onload = function (){
    todoListDisplay = document.getElementById('todo-list');
    const todoList = getTodoList();
    todoList.forEach(item => {
        task = document.createElement('li');
        task.textContent = item;
        todoListDisplay.appendChild(task);
    });
}

function getTodoList(){
    const storedList = localStorage.getItem('todoList');
    if(storedList){
        return JSON.parse(storedList);
    }
    return [];
}

function saveTodoList(todoList){
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

function deleteTodoList(){
    localStorage.removeItem('todoList');

    const todoListDisplay = document.getElementById('todo-list');
    todoListDisplay.innerHTML = '';
}


function addTask(){
    let todoList = getTodoList();

    todoListDisplay = document.getElementById('todo-list');
    taskInput = document.getElementById('task-input');

    task = document.createElement('li');
    task.textContent = taskInput.value;
    todoListDisplay.appendChild(task);

    todoList.push(taskInput.value);
    saveTodoList(todoList);

    taskInput.value = '';
}
