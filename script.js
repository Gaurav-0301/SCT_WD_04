// Select DOM Elements
const taskInput = document.getElementById('task-input');
const dateInput = document.getElementById('date-input');
const timeInput = document.getElementById('time-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');

// Initialize tasks array from Local Storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to save to Local Storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to render tasks to the screen
function renderTasks() {
    taskList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        // Format date and time if they exist
        let metaText = '';
        if (task.date) metaText += `<i class="far fa-calendar"></i> ${task.date} `;
        if (task.time) metaText += `&nbsp;&nbsp;<i class="far fa-clock"></i> ${task.time}`;

        li.innerHTML = `
            <div class="task-info">
                <span class="task-name">${task.name}</span>
                ${metaText ? `<span class="task-meta">${metaText}</span>` : ''}
            </div>
            <div class="task-actions">
                <button class="icon-btn complete-btn" onclick="toggleComplete(${index})">
                    <i class="fas ${task.completed ? 'fa-undo' : 'fa-check-circle'}"></i>
                </button>
                <button class="icon-btn edit-btn" onclick="editTask(${index})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="icon-btn delete-btn" onclick="deleteTask(${index})">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
        taskList.appendChild(li);
    });

    // Update Counter
    const pendingTasks = tasks.filter(t => !t.completed).length;
    taskCount.textContent = `${pendingTasks} task${pendingTasks !== 1 ? 's' : ''} remaining`;
}

// Add a new task
function addTask() {
    const taskName = taskInput.value.trim();
    const taskDate = dateInput.value;
    const taskTime = timeInput.value;

    if (taskName === '') {
        alert('Please enter a task description.');
        return;
    }

    const newTask = {
        name: taskName,
        date: taskDate,
        time: taskTime,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();

    // Clear inputs
    taskInput.value = '';
    dateInput.value = '';
    timeInput.value = '';
    taskInput.focus();
}

// Delete a task
window.deleteTask = function(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Toggle Complete status
window.toggleComplete = function(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Edit a task
window.editTask = function(index) {
    const newName = prompt('Edit your task:', tasks[index].name);
    if (newName !== null && newName.trim() !== '') {
        tasks[index].name = newName.trim();
        saveTasks();
        renderTasks();
    }
}

// Event Listeners
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// Initial Render
renderTasks();