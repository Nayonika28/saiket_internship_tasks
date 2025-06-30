const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

addBtn.onclick = () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }
  addTask(taskText);
  taskInput.value = "";
};

function addTask(text) {
  const li = document.createElement("li");
  li.innerHTML = `
    <span class="task-text">${text}</span>
    <div class="actions">
      <button class="complete-btn">✔</button>
      <button class="edit-btn">✏</button>
      <button class="delete-btn">🗑</button>
    </div>
  `;
  taskList.appendChild(li);

  const completeBtn = li.querySelector(".complete-btn");
  const editBtn = li.querySelector(".edit-btn");
  const deleteBtn = li.querySelector(".delete-btn");
  const taskText = li.querySelector(".task-text");

  completeBtn.onclick = () => {
    li.classList.toggle("completed");
  };

  editBtn.onclick = () => {
    const newTask = prompt("Edit your task:", taskText.textContent);
    if (newTask !== null && newTask.trim() !== "") {
      taskText.textContent = newTask;
    }
  };

  deleteBtn.onclick = () => {
    if (confirm("Delete this task?")) {
      taskList.removeChild(li);
    }
  };
}
