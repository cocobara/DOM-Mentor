document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const tasksList = document.getElementById('todo-list');
    const cancelBtn = document.querySelector('.cancel-btn');
    const modalWindow = document.querySelector('.modalOverlay');
    const plusTask = document.querySelector('.plusTask');
    const emptyPage = document.querySelector('.empty-page');
    const searchInput = document.querySelector('.search__input');
    const selectCurrent = document.querySelector('.select__current');

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
        renderTasks(getCurrentTaskList());
    });

    tasksList.addEventListener('click', (e) => {
        const liElem = e.target.closest("li");
        if (!liElem) return;

        const taskId = Number(liElem.dataset.id);
        const task = tasks.find((task) => task.id === taskId);

        if (e.target.tagName === 'SPAN' || e.target.classList.contains('markAsCompleted')) {
            task.completed = !task.completed;
            renderTasks(getCurrentTaskList());
        }

        if (e.target.classList.contains('delete-btn')) {
            tasks = tasks.filter((task) => task.id !== taskId);
            if (filteredTasks.length > 0) {
                filteredTasks = filteredTasks.filter((task) => task.id !== taskId);
            }
            renderTasks(getCurrentTaskList());
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
                renderTasks(getCurrentTaskList());
            });

            inputField.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    task.text = inputField.value.trim() || originalText;
                    renderTasks(getCurrentTaskList());
                }
            });
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

    function getCurrentTaskList() {
        return filteredTasks.length > 0 ? filteredTasks : tasks;
    }

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
        if (tasks.length) {
            emptyPage.style.display = 'none';
        } else {
            emptyPage.style.display = 'flex';
        }
    }

    function filterTasksByStatus(status) {
        let filtered = [];
        if (status === "COMPLETE") {
            filtered = tasks.filter(task => task.completed === true);
        } else if (status === "INCOMPLETE") {
            filtered = tasks.filter(task => task.completed === false);
        } else {
            filtered = tasks;
        }
        filteredTasks = filtered;
        renderTasks(filtered);
    }

    let select = function () {
        let selectHeader = document.querySelectorAll('.select__header');
        let selectItem = document.querySelectorAll('.select__item');

        selectHeader.forEach(item => {
            item.addEventListener('click', selectToggle);
        });

        selectItem.forEach(item => {
            item.addEventListener('click', selectChoose);
        });

        function selectToggle() {
            this.parentElement.classList.toggle('is-active');
        }

        function selectChoose() {
            let text = this.innerText;
            let select = this.closest('.select');
            let currentText = select.querySelector('.select__current');
            currentText.innerText = text;
            select.classList.add('is-active');
            filterTasksByStatus(text);
        }
    };

    select();
});
