const toDo = document.querySelector("#toDoEntry");
const btn = document.querySelector(".submit");
const output = document.querySelector("#out");
const errorMessage = document.querySelector("#errorMessage");

const textLis = [
  "Live life to the fullest",
  "Be the best version of yourself",
  "Don't settle for less"
];

let toDoList = [];
let deletedTasks = [];

const createToDo = (text) => {
  errorMessage.style.display = "none";
  let newOut = document.createElement("li");
  let icon = document.createElement("i");
  icon.setAttribute("class", "fa-regular fa-square");
  newOut.appendChild(icon);
  output.appendChild(newOut);

  if (toDo.value === "") {
    newOut.innerHTML += `${text}`;
  } else {
    newOut.innerHTML += `${toDo.value}`;
  }

  newOut.className = "taskStyles";
  let button = document.createElement("button");
  button.setAttribute("class", "cancel");
  button.innerHTML = "+";
  newOut.appendChild(button);
  toDo.value = "";

  toDoList.push(newOut);
};

for (let text of textLis) {
  createToDo(text);
}

const displayError = (p) => {
  p.style.display = "block";
  toDo.onmouseover = () => {
    p.style.display = "none";
  };
  toDo.onclick = () => {
    p.style.display = "none";
  };
  setTimeout(() => {
    p.style.display = "none";
  }, 5000);
};
const crOrDispErr = () => {
  if (toDo.value.trim().length === 0) {
    displayError(errorMessage);
  } else {
    createToDo();
  }
};

toDo.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    crOrDispErr();
  }
});

btn.addEventListener("click", () => {
  crOrDispErr();
  toDo.focus();
});

const trashText = document.querySelector(".fa-trash-can span");
const checkedText = document.querySelector("#doneTrash .fa-square-check span");
trashText.innerHTML = "Trash";
checkedText.innerHTML = "Completed";

output.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-regular")) {
    let parentElement = e.target.closest(".taskStyles");

    if (e.target.classList.contains("fa-square")) {
      e.target.className = "fa-regular fa-square-check";
      parentElement.id = "done";
      const doneTasks = toDoList.filter((d) => d.id === "done");
      checkedText.innerHTML = `Completed(${doneTasks.length})`;
    } else {
      e.target.className = "fa-regular fa-square";
      parentElement.id = "";
      const doneTasks = toDoList.filter((d) => d.id === "done");
      checkedText.innerHTML = `Completed(${doneTasks.length})`;
    }
  }

  if (e.target.className === "cancel") {
    let parentElement = e.target.closest(".taskStyles");
    deletedTasks.push(parentElement);
    parentElement.remove();
    trashText.innerHTML = `Trash (${deletedTasks.length})`;
  }
});

let unDoBut = document.querySelector("#unDo");
let noTaskError = document.querySelector("#noDeletedMessage");

unDoBut.addEventListener("click", () => {
  if (deletedTasks.length < 1) {
    displayError(noTaskError);
  } else {
    noTaskError.style.display = "none";
    let recent = deletedTasks.pop();
    output.append(recent);
    trashText.innerHTML = `Trash (${deletedTasks.length})`;
  }
});

//add a button to move a task up my todo list
//add favorite tasks

// output.addEventListener("click", function (e) {
//   if(e.target.classList.contains('cancel')){
//     e.target.closest('.taskStyles').remove();
//   }
// });
