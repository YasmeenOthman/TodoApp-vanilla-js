let taskForm = document.getElementById("taskForm");
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
    showMessage("Please add a task!", "warning");
    return;
  } else {
    let newTask = new CreateTodo(text);
    todoItems.push(newTask);
    saveTodoItems();
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
      saveTodoItems();
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
    showMessage("You have nothing to remove!", "error");

    return;
  } else {
    if (window.confirm("Are you sure?")) {
      todoItems.pop();
      renderTodo();
      showMessage("Last task removed!", "success");
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
      saveTodoItems();
      renderTodo();
    }
  }
}

function editTodoItem(todo) {
  if (todo.checked) {
    showMessage(
      "The task is already completed, mark it un complete then edit it ",
      "warning"
    );

    return;
  }
  const newText = prompt("Enter new task");
  if (newText !== null && newText.trim() !== "") {
    todo.text = newText.trim();
    saveTodoItems();
    renderTodo();
  }
}

function removeCompletedTasks() {
  if (todoItems.length === 0) {
    showMessage("Your list is empty, You have nothing to remove", "error");
    return;
  }
  let itemsStatus = todoItems.filter((todo) => todo.checked);
  if (itemsStatus.length > 0) {
    if (window.confirm("Are you sure?")) {
      todoItems = todoItems.filter((todo) => {
        return !todo.checked;
      });
    }
  } else {
    showMessage("Nothing is completed yet", "error");
  }

  saveTodoItems();
  renderTodo();
}

function saveTodoItems() {
  localStorage.setItem("todoItems", JSON.stringify(todoItems));
}

function loadTodoItems() {
  const storedItems = localStorage.getItem("todoItems");
  if (storedItems) {
    todoItems = JSON.parse(storedItems);
    renderTodo();
  }
}

function showMessage(text, type = "success", duration = 3000) {
  const box = document.getElementById("messageBox");
  const messageText = document.getElementById("messageText");

  box.className = ""; // Reset classes
  box.classList.add(type, "show");
  messageText.textContent = text;

  // Scroll to message
  box.scrollIntoView({ behavior: "smooth", block: "start" });

  // Auto-dismiss after duration
  clearTimeout(box.dismissTimer); // Clear previous timer if any
  box.dismissTimer = setTimeout(() => {
    box.classList.remove("show");
  }, duration);
}

document.getElementById("dismissMessage").addEventListener("click", () => {
  document.getElementById("messageBox").classList.remove("show");
});

// Load todo items from local storage on page load
loadTodoItems();

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  addTodo();
});
removeButton.addEventListener("click", removeLast);
removeCompleted.addEventListener("click", removeCompletedTasks);
