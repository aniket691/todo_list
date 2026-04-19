const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const totalTasks = document.getElementById('totalTasks');
const completedTasks = document.getElementById('completedTasks');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks on page load
document.addEventListener('DOMContentLoaded', renderTasks);

// Add task on button click
addBtn.addEventListener('click', addTask);

// Add task on Enter key press
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    renderTasks();
    taskInput.value = '';
    taskInput.focus();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

function renderTasks() {
    taskList.innerHTML = '';

    if (tasks.length === 0) {
        taskList.innerHTML = '<div class="empty-message">No tasks yet. Add one to get started!</div>';
    } else {
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <input 
                    type="checkbox" 
                    class="task-checkbox" 
                    ${task.completed ? 'checked' : ''}
                    onchange="toggleTask(${task.id})"
                >
                <span class="task-text">${escapeHtml(task.text)}</span>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            `;
            taskList.appendChild(li);
        });
    }

    updateStats();
}

function updateStats() {
    const completed = tasks.filter(task => task.completed).length;
    totalTasks.textContent = tasks.length;
    completedTasks.textContent = completed;
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
