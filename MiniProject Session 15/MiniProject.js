
let tasks = [];



const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const completedCount = document.getElementById("completedCount");
const totalCount = document.getElementById("totalCount");
const emptyState = document.querySelector(".empty-state");

function createTaskElement(task) {

    const taskItem = document.createElement("div");
    taskItem.className = "task-item";
    taskItem.dataset.id = task.id;

    // checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", function () {
        toggleTask(task.id);
    });


    // text
    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = task.text;

    if (task.completed) {
        taskText.style.textDecoration = "line-through";
        taskText.style.color = "gray";
    }


    // actions
    const actions = document.createElement("div");
    actions.className = "task-actions";


    // nút sửa
    const editBtn = document.createElement("button");
    editBtn.className = "btn-edit";
    editBtn.textContent = "✏️ Sửa";

    editBtn.addEventListener("click", function () {
        editTask(task.id);
    });


    // nút xóa
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn-delete";
    deleteBtn.textContent = "Xóa";

    deleteBtn.addEventListener("click", function () {
        deleteTask(task.id);
    });


    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskText);
    taskItem.appendChild(actions);

    return taskItem;
}

function renderTasks() {

    taskList.innerHTML = "";

    if (tasks.length === 0) {

        taskList.appendChild(emptyState);
        return;

    }

    for (let i = 0; i < tasks.length; i++) {

        const taskElement = createTaskElement(tasks[i]);

        taskList.appendChild(taskElement);

    }

    updateFooter();
}

function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Vui lòng nhập công việc");
        return;
    }

    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(newTask);

    taskInput.value = "";
    taskInput.focus();

    renderTasks();
}

function deleteTask(id) {

    tasks = tasks.filter(function (task) {
        return task.id !== id;
    });

    renderTasks();
}

function toggleTask(id) {

    for (let i = 0; i < tasks.length; i++) {

        if (tasks[i].id === id) {

            tasks[i].completed = !tasks[i].completed;

        }

    }

    renderTasks();
}

function editTask(id) {

    let newText = prompt("Sửa công việc");

    if (newText === null) return;

    newText = newText.trim();

    if (newText === "") {
        alert("Tên công việc không được rỗng");
        return;
    }

    for (let i = 0; i < tasks.length; i++) {

        if (tasks[i].id === id) {

            tasks[i].text = newText;

        }

    }

    renderTasks();
}


function updateFooter() {

    let completed = 0;

    for (let i = 0; i < tasks.length; i++) {

        if (tasks[i].completed) {
            completed++;
        }

    }

    completedCount.textContent = completed;
    totalCount.textContent = tasks.length;
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {

        addTask();

    }

});

renderTasks();