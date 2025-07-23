const taskInput = document.getElementById("taskInput");
const addTask = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const clearTask = document.getElementById("clearTask");
const toggleBtn = document.getElementById("toggleBtn");
const body = document.getElementById("body");
const taskStats = document.getElementById("taskStats");
const showAllBtn = document.getElementById("showAllBtn");
const showCompletedBtn = document.getElementById("showCompletedBtn");
const showPendingBtn = document.getElementById("showPendingBtn");

addTask.addEventListener("click", (e) => {
  e.preventDefault();
  const task = taskInput.value.trim();


  if (task.length >= 50) {
    showWarning("Maximum 50 words are aloud");
    return;
  }

  // Check for duplicates
  const isDuplicate = Array.from(taskList.children).some(
    (li) =>
      li.querySelector("span")?.textContent.toLowerCase() === task.toLowerCase()
  );

  if (isDuplicate) {
    showWarning("Task already exists!");
    return;
  }


  if (task === "") {
    showWarning("Task field is empty");
    return;
  } else {
    const li = document.createElement("li");

    //create checkbox
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.addEventListener("click", () => {
      taskSpan.classList.toggle("completed");
      updateTask();
    });
    li.appendChild(checkBox);

    //created taskSpan
    const taskSpan = document.createElement("span");
    taskSpan.textContent = task;
    li.appendChild(taskSpan);

    //Edit each task
    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.addEventListener("click", () => {
      const editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = taskSpan.textContent;
      delBtn.disabled = false;

      li.replaceChild(editInput, taskSpan);

      editInput.addEventListener("blur", () => {
        taskSpan.textContent = editInput.value;
        li.replaceChild(taskSpan, editInput);

        delBtn.disabled = true;
      });

      editInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          editInput.blur();
          delBtn.disabled = false;
        }
      });
      editInput.focus();
    });
    li.appendChild(editBtn);

    // Delete each task
    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.addEventListener("click", () => {
      li.remove();
      updateTask();
    });
    li.appendChild(delBtn);

    //Show All Tasks
    showAllBtn.addEventListener("click", () => {
      const showtotalTasks = document.querySelectorAll("#taskList li");
      showtotalTasks.forEach((task) => {
        task.style.display = "flex";
      });
    });

    //ShowCompletedTasks
    showCompletedBtn.addEventListener("click", () => {
      const allcompletedTasks = document.querySelectorAll("#taskList li");

      const completedTasks = Array.from(allcompletedTasks).filter((li) =>
        li.querySelector("span").classList.contains("completed")
      );
      if (completedTasks.length === 0) {
        showWarning("Note : Their are no completed tasks");
      }

      allcompletedTasks.forEach((li) => {
        if (li.querySelector("span").classList.contains("completed")) {
          li.style.display = "flex"; // Show completed
        } else {
          li.style.display = "none"; // Hide others
        }
      });
    });

     //pending tasks
    showPendingBtn.addEventListener("click", () => {
      const allpendingTasks = document.querySelectorAll("#taskList li");

      const pendingTasks = Array.from(allpendingTasks).filter(li => !li.querySelector("span").classList.contains("completed"));

      if(pendingTasks.length === 0){
        showWarning("Note : Their are no pending tasks")
      }


      allpendingTasks.forEach((li) => {
        if (li.querySelector("span").classList.contains("completed")) {
          li.style.display = "none"; // Show completed
        } else {
          li.style.display = "flex"  ; // Hide others
          
        }
      });
    })

    taskList.append(li);
    updateTask();
    taskInput.value = "";
  }
});

function updateTask() {
  const totalTasks = taskList.children.length;
  console.log(totalTasks);
  const completedTasks = document.querySelectorAll(".completed").length;
  console.log(completedTasks);
  const pendingTasks = totalTasks - completedTasks;
  console.log(pendingTasks);

  taskStats.textContent = `Total : ${totalTasks} | Completed : ${completedTasks} | Pending : ${pendingTasks}`;
}

clearTask.addEventListener("click", () => {
  taskList.textContent = "";
  updateTask();
});

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("light-mode");
});


function showWarning(message) {
  const warning = document.getElementById("warning");
  warning.textContent = message;

  setTimeout(() => {
    warning.textContent = "";
  },1800);
}
