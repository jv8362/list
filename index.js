const taskList = document.querySelector("#task-list");
const taskForm = document.querySelector("form");
const taskInput = document.querySelector("#task");

let tasks = [];

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = taskInput.value.trim();
    if (task) {
        addTask(task);
        taskInput.value = "";
    }
});

function addTask(task) {
    const taskHTML = `
        <li class="task">
            <span>${task}</span>
            <button class="delete-btn">Delete</button>
            <button class="complete-btn">Complete</button>
            <button class="edit-btn">Edit</button>
        </li>
    `;
    taskList.innerHTML += taskHTML;
    const taskElement = taskList.lastChild;
    taskElement.querySelector(".delete-btn").addEventListener("click", () => {
        removeTask(taskElement);
    });
    taskElement.querySelector(".complete-btn").addEventListener("click", () => {
        completeTask(taskElement);
    });
    taskElement.querySelector(".edit-btn").addEventListener("click", () => {
        editTask(taskElement);
    });
    tasks.push({ text: task, completed: false });
}

function removeTask(taskElement) {
    taskElement.remove();
    const taskIndex = tasks.findIndex((task) => task.text === taskElement.querySelector("span").textContent.trim());
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
    }
}

function completeTask(taskElement) {
    taskElement.classList.toggle("completed");
    const taskIndex = tasks.findIndex((task) => task.text === taskElement.querySelector("span").textContent.trim());
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
    }
}

function editTask(taskElement) {
    taskElement.classList.add("edit-mode");
    const taskText = taskElement.querySelector("span").textContent.trim();
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value