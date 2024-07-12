document.addEventListener('DOMContentLoaded', function() {
    fetchTasks();

    document.getElementById('task-form').addEventListener('submit', function(e) {
        e.preventDefault();
        addTask();
    });

    document.getElementById('task-list').addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON') {
            deleteTask(e.target.dataset.id);
        } else if (e.target.tagName === 'LI') {
            toggleTask(e.target.dataset.id);
        }
    });

    document.getElementById('theme-toggle').addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        document.querySelector('.container').classList.toggle('dark-theme');
        document.querySelector('button').classList.toggle('dark-theme');
        document.querySelector('input[type="text"]').classList.toggle('dark-theme');
    });
});

function fetchTasks() {
    fetch('fetch_tasks.php')
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById('task-list');
            taskList.innerHTML = '';
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.textContent = task.task;
                li.dataset.id = task.id;
                if (task.status == 1) {
                    li.classList.add('completed');
                }
                const button = document.createElement('button');
                button.textContent = 'Delete';
                button.dataset.id = task.id;
                li.appendChild(button);
                taskList.appendChild(li);
            });
        });
}

function addTask() {
    const newTask = document.getElementById('new-task').value;
    fetch('add_task.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task: newTask })
    })
    .then(response => response.json())
    .then(task => {
        const taskList = document.getElementById('task-list');
        const li = document.createElement('li');
        li.textContent = task.task;
        li.dataset.id = task.id;
        const button = document.createElement('button');
        button.textContent = 'Delete';
        button.dataset.id = task.id;
        li.appendChild(button);
        taskList.appendChild(li);
        document.getElementById('new-task').value = '';
    });
}

function deleteTask(id) {
    fetch(`delete_task.php?id=${id}`, { method: 'DELETE' })
        .then(() => {
            fetchTasks();
        });
}

function toggleTask(id) {
    fetch(`toggle_task.php?id=${id}`, { method: 'POST' })
        .then(() => {
            fetchTasks();
        });
}