document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const tasksList = document.getElementById('todo-list');
    const cancelBtn = document.querySelector('.cancel-btn');
    const addBtn = document.querySelector('.add-btn');
    const modalWindow = document.querySelector('.modalOverlay');
    const plusTask = document.querySelector('.plusTask');
    const emptyPage = document.querySelector('.empty-page');
    const searchInput = document.querySelector('.search__input');

    let tasks = [];
    let filteredTasks = [];
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        filteredTasks = [];
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].text.toLowerCase().includes(query)) {
                filteredTasks.push(tasks[i]);
            }
        }
        renderTasks(filteredTasks);
    });

    tasksList.addEventListener('click', (e) => {
        const liElem = e.target.closest("li");
        if (!liElem) return;

        const taskId = Number(liElem.dataset.id);
        const task = tasks.find((task) => task.id === taskId);

        if (e.target.tagName === 'SPAN' || e.target.classList.contains('markAsCompleted')) {
            task.completed = !task.completed;
            renderTasks(filteredTasks.length > 0 ? filteredTasks : tasks);
        }

        if (e.target.classList.contains('delete-btn')) {
            tasks = tasks.filter((task) => task.id !== taskId);
            renderTasks(filteredTasks.length > 0 ? filteredTasks : tasks);
        }

        if (e.target.classList.contains('edit-btn')) {
            const taskTextElement = liElem.querySelector('.task__text');
            const originalText = taskTextElement.innerText;
            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.value = originalText;
            inputField.classList.add('edit-input');

            taskTextElement.replaceWith(inputField);
            inputField.focus();

            inputField.addEventListener('blur', () => {
                task.text = inputField.value.trim() || originalText;
                renderTasks(filteredTasks.length > 0 ? filteredTasks : tasks);
            });

            inputField.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    task.text = inputField.value.trim() || originalText;
                    renderTasks(filteredTasks.length > 0 ? filteredTasks : tasks);
                }
            });
        }

        if (tasks.length == 0) {
            emptyPage.style.display = '';
        } else {
            emptyPage.style.display = 'none';
        }
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (input.value.trim() === "") return;

        const newTask = {
            id: Date.now(),
            text: input.value,
            completed: false,
        };
        tasks.push(newTask);
        filteredTasks = tasks;
        renderTasks(filteredTasks);

        if (tasks.length == 0) {
            emptyPage.style.display = '';
        } else {
            emptyPage.style.display = 'none';
        }

        input.value = "";
        modalWindow.style.display = 'none';
    });

    cancelBtn.addEventListener('click', () => {
        input.value = "";
        modalWindow.style.display = 'none';
    });

    plusTask.addEventListener('click', () => {
        modalWindow.style.display = '';
    });

    function renderTasks(taskList) {
        tasksList.innerHTML = taskList
            .map(
                (task) => `
            <li class="list" data-id="${task.id}">
                <div class="elem">
                    <button class="markAsCompleted ${task.completed ? " completed-btn" : ""}"></button>
                    <span class="task__text ${task.completed ? " completed" : ""}">${task.text}</span>
                </div>
                <div class="elem">
                    <button class="delete-btn"><img class="delete-btn" src="icon/trash-svgrepo-com 1.svg" alt=""></button>
                    <button class="edit-btn"><img class="edit-btn" src="icon/Vector (8).svg" alt=""></button>
                </div>
            </li>
            `
            )
            .join("");
    }
});
