const addBtn = document.getElementById('add-btn');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

addBtn.addEventListener('click', () => {
  const task = todoInput.value.trim();
  if (task !== '') {
    addTask(task);
    todoInput.value = '';
  }
});

function addTask(task) {
  const li = document.createElement('li');
  
  const taskText = document.createElement('span');
  taskText.textContent = task;
  taskText.className = 'task-text';

  const actions = document.createElement('div');
  actions.className = 'todo-actions';

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.className = 'edit-btn';
  editBtn.addEventListener('click', () => editTask(taskText));

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete-btn';
  deleteBtn.addEventListener('click', () => li.remove());

  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(taskText);
  li.appendChild(actions);
  todoList.appendChild(li);
}

function editTask(taskText) {
  const currentTask = taskText.textContent;
  const newTask = prompt('Edit your task:', currentTask);
  if (newTask !== null && newTask.trim() !== '') {
    taskText.textContent = newTask.trim();
  }
}

