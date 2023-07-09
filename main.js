let addButton = document.getElementById("addTask");
let removeButton = document.getElementById("removeTask");
let removeCompleted = document.getElementById("removeCompleted");
let taskText = document.getElementById("inputTask");

let todoItems = [];

function CreateTodo(text) {
  this.text = text;
  this.checked = false;
  this.id = Date.now();
}
function addTodo() {
  let text = taskText.value;
  if (text === "" || text.trim() === "") {
    alert("Please add a task!!");
    return;
  } else {
    let newTask = new CreateTodo(text);
    todoItems.push(newTask);
    // console.log(todoItems);
    renderTodo();
    taskText.value = "";
    taskText.focus();
  }
}
// CRUD Operation

function renderTodo() {
  let tasksList = document.getElementById("todo_list");
  tasksList.innerHTML = "";

  todoItems.forEach((todo) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "mark-checked";
    checkbox.checked = todo.checked;
    checkbox.addEventListener("change", () => {
      todo.checked = checkbox.checked;
      updateTodoItem();
    });

    const textSpan = document.createElement("span");

    textSpan.id = "text";
    textSpan.innerText = todo.text;
    if (todo.checked) {
      textSpan.style.textDecoration = "line-through";
    }

    const deleteIcon = document.createElement("span");
    deleteIcon.className = "delete-icon";
    deleteIcon.innerHTML = "&times;";
    deleteIcon.addEventListener("click", () => {
      removeTodoItem(todo);
    });
    const editIcon = document.createElement("span");
    editIcon.className = "edit-icon";
    editIcon.innerHTML = "&#9998";

    editIcon.addEventListener("click", () => {
      editTodoItem(todo);
    });

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(editIcon);
    li.appendChild(deleteIcon);

    tasksList.appendChild(li);
  });
}

function removeLast() {
  if (todoItems.length === 0) {
    alert("You have nothing to remove");
    return;
  } else {
    if (window.confirm("Are you sure?")) {
      todoItems.pop();
      renderTodo();
    }
  }
}
function updateTodoItem() {
  renderTodo();
}

function removeTodoItem(todo) {
  const index = todoItems.findIndex((item) => item.id === todo.id);
  if (index !== -1) {
    if (window.confirm("Are you sure ?!")) {
      todoItems.splice(index, 1);
      renderTodo();
    }
  }
}

function editTodoItem(todo) {
  const newText = prompt("Enter new task");
  if (newText !== null && newText.trim() !== "") {
    todo.text = newText.trim();
    renderTodo();
  }
}

function removeCompletedTasks() {
  if (todoItems.length === 0) {
    alert("You have nothing to remove");
    return;
  } else if (window.confirm("Are you sure?")) {
    todoItems = todoItems.filter((todo) => {
      return !todo.checked;
    });
  }

  renderTodo();
}

addButton.addEventListener("click", addTodo);
removeButton.addEventListener("click", removeLast);
removeCompleted.addEventListener("click", removeCompletedTasks);
