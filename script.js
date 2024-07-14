document.addEventListener('DOMContentLoaded', function() {
    loadTasks();

    document.getElementById('task-form').addEventListener('submit', function(e) {
        e.preventDefault();
        addTask();
    });

    document.getElementById('task-list').addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON') {
            deleteTask(e.target.parentElement.dataset.id);
        } else if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
            toggleTask(e.target.parentElement.dataset.id);
        }
    });

    document.getElementById('theme-toggle').addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        document.querySelector('.container').classList.toggle('dark-theme');
        document.querySelector('button[type="submit"]').classList.toggle('dark-theme');
        document.querySelector('input[type="text"]').classList.toggle('dark-theme');
        const icon = document.querySelector('#theme-toggle');
        if (document.body.classList.contains('dark-theme')) {
            icon.textContent = '🌞'; // Sun emoji for light mode
        } else {
            icon.textContent = '🌙'; // Moon emoji for dark mode
        }
    });
});

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        displayTask(task);
    });
}

function addTask() {
    const taskInput = document.getElementById('new-task');
    const newTask = { id: Date.now().toString(), task: taskInput.value, completed: false };
    taskInput.value = '';

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    displayTask(newTask);
}

function displayTask(task) {
    const taskList = document.getElementById('task-list');
    const li = document.createElement('li');
    li.textContent = task.task;
    li.dataset.id = task.id;
    if (task.completed) {
        li.classList.add('completed');
    }

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    li.prepend(checkbox);

    const button = document.createElement('button');
    button.textContent = 'Delete';
    button.dataset.id = task.id;
    li.appendChild(button);

    taskList.appendChild(li);
}

function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    document.querySelector(`li[data-id="${id}"]`).remove();
}

function toggleTask(id) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find(task => task.id === id);
    task.completed = !task.completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));

    const li = document.querySelector(`li[data-id="${id}"]`);
    li.classList.toggle('completed');
}