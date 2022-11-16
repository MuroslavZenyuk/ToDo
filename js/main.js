//находимо елементи на сторінці
const form = document.querySelector('#form');
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = [];

if (localStorage.getItem('tasks',)) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
}

tasks.forEach(element => {
    //сформували css клас
    const cssClass = element.done ? 'task-title task-title--done' : 'task-title';


    //Відображаємо розмітку для кожної задачі
    const taskHtml = `
      <li id="${element.id}" class="list-group-item d-flex justify-content-between task-item">
                       <span class="${cssClass}">${element.text}</span>
                       <div class="task-item__buttons">
                           <button type="button" data-action="done" class="btn-action">
                               <img src="./img/tick.svg" alt="Done" width="18" height="18">
                           </button>
                           <button type="button" data-action="delete" class="btn-action">
                               <img src="./img/cross.svg" alt="Done" width="18" height="18">
                           </button>
                       </div>
                   </li>`

    //добавляємо на сторінку
    taskList.insertAdjacentHTML('beforeend', taskHtml);
});

checkEmptyList();

//добавлення задач
form.addEventListener('submit', addTask);

function addTask(event) {
    //відміняємо відправку форми
    event.preventDefault();

    //Дістаємо значенняз поля вводу
    const taskText = taskInput.value;

    //Описали задачу у вигляді об'єкту
    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    };

    //добавляємо в масив
    tasks.push(newTask);

    //зберігаємо масив у локал Сторедж
    saveToLocalStorage();

    //сформували css клас
    const cssClass = newTask.done ? 'task-title task-title--done' : 'task-title';


    //Відображаємо розмітку для кожної задачі
    const taskHtml = `
   <li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
                    <span class="${cssClass}">${newTask.text}</span>
                    <div class="task-item__buttons">
                        <button type="button" data-action="done" class="btn-action">
                            <img src="./img/tick.svg" alt="Done" width="18" height="18">
                        </button>
                        <button type="button" data-action="delete" class="btn-action">
                            <img src="./img/cross.svg" alt="Done" width="18" height="18">
                        </button>
                    </div>
                </li>`

    //добавляємо на сторінку
    taskList.insertAdjacentHTML('beforeend', taskHtml);

    // чистимо поле вводу і вертаємо фокус на нього
    taskInput.value = '';
    taskInput.focus();



    checkEmptyList();


}

//видалення задач
taskList.addEventListener('click', deleteTask);

function deleteTask(event) {
    // перевіряємо що клік був по кнопкці "видалити задачу"
    if (event.target.dataset.action === 'delete') {
        const parentNode = event.target.closest('.list-group-item');

        //знаходми айді задачі
        const id = Number(parentNode.id);

        ////находми індекс задачі в масиві 
        //const index = tasks.findIndex((task) => task.id === id);

        ////видаляємо задачу із масива задач через індекси
        //tasks.splice(index, 1);

        //видаляємо задачу через фільтрацію масива
        tasks = tasks.filter((task) => task.id !== id);

        //зберігаємо масив у локал Сторедж
        saveToLocalStorage();

        //Видаляємо задачу з розмітки
        parentNode.remove();

    }

    checkEmptyList();
}

// мітка, що задача виконана
taskList.addEventListener('click', doneTask);

function doneTask(event) {

    if (event.target.dataset.action === 'done') {
        const parentNode = event.target.closest('.list-group-item');

        const id = Number(parentNode.id);

        //визначаємо id задачі
        const task = tasks.find((task) => task.id === id);
        task.done = !task.done;

        //зберігаємо масив у локал Сторедж
        saveToLocalStorage();


        const taskTitle = parentNode.querySelector('.task-title');
        taskTitle.classList.toggle('task-title--done');

    }

}


function checkEmptyList() {
    if (tasks.length === 0) {
        const emptyListHtml = `<li id="emptyList" class="list-group-item empty-list">
        <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
        <div class="empty-list__title">List is empty</div>
        </li>`;

        taskList.insertAdjacentHTML('afterbegin', emptyListHtml);
    }

    if (tasks.length > 0) {
        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove() : null;
    }
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}























