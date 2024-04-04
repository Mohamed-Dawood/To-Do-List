const taskInput = document.getElementById("inputTask");
const addBtn = document.getElementById("addBtn");
const updateBtn = document.getElementById("updateBtn");
const tasks = document.querySelector(".tasks");
const clearAllBtn = document.getElementById("clearAll");

let listContainer = [];

if (localStorage.getItem("lists")) {
  listContainer = JSON.parse(localStorage.getItem("lists"));
  displayList();
}

addBtn.addEventListener("click", addToList);

// add update on key down
taskInput.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    if (updateBtn.classList.contains("d-none")) {
      addToList();
    } else {
      updateToDoList();
    }
  }
});
function addToList() {
  let taskValue = taskInput.value.trim();
  if (taskValue !== "") {
    listContainer.push({ task: taskInput.value, completed: false });
    taskInput.value = "";
    displayList();
    localStorage.setItem("lists", JSON.stringify(listContainer));
  } else {
    Swal.fire({
      text: "Task cannot be empty!",
      customClass: {
        confirmButton: "swal-button-color", // Specify custom class for the button
      },
    });
  }
}

function displayList() {
  let m = "";
  for (let i = 0; i < listContainer.length; i++) {
    const item = listContainer[i];
    m += `<li class="li-${i}">
        <span id="span-${i}" class="${
      item.completed ? "fa-solid fa-circle-check" : "fa-regular fa-circle"
    }" onclick="(toggle(${i}))"></span>
        <section id="text-${i}" style="text-decoration: ${
      item.completed ? "line-through" : "none"
    }">${item.task}</section>
        <div class="buttons">
            <i class="fas fa-pen-to-square" onclick="setToInput(${i}) "></i>
            <i class="fas fa-trash-can" onclick="removeToDoList(${i})"></i>
        </div>
    </li>`;
  }
  document.getElementById("showList").innerHTML = m;

  // display tasks div
  if (listContainer.length > 0) {
    tasks.style.display = "block";
  } else {
    tasks.style.display = "none";
  }
}

function removeToDoList(index) {
  listContainer.splice(index, 1);
  localStorage.setItem("lists", JSON.stringify(listContainer));
  displayList();
}

let x = 0;

function setToInput(index) {
  x = index;
  taskInput.value = listContainer[index].task;
  taskInput.focus();
  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
}

function updateToDoList() {
  listContainer[x].task = taskInput.value;
  addBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");
  taskInput.value = "";
  localStorage.setItem("lists", JSON.stringify(listContainer));
  displayList();
}

updateBtn.addEventListener("click", updateToDoList);

function toggle(index) {
  listContainer[index].completed = !listContainer[index].completed;
  localStorage.setItem("lists", JSON.stringify(listContainer));
  displayList();
}

clearAllBtn.addEventListener("click", function () {
  listContainer = [];
  localStorage.removeItem("lists");
  displayList();
});
