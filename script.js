// localStorage.setItem("name", "akash");
// localStorage.setItem("city", "amritsar");

// const key = prompt("Enter a Key:");
// const value = prompt("Enter a Value:");
// localStorage.setItem(key, value);

// localStorage.removeItem("obj");
//localStorage.removeItem("null");
//console.log(`The value of ${key} is ${localStorage.getItem(key)}`);

// console.log(localStorage.length);
// localStorage.clear();
// localStorage.setItem("array", "[1,2,3,4]");
// localStorage.setItem(
//   "obj",
//   JSON.stringify({ name: "akash", city: "Amritsar" })
// );
// console.log(JSON.parse(localStorage.getItem("obj")));

//daily tasks manager
const formToggle = document.querySelector("#form-toggle");
const form = document.querySelector("#form");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
deleteCompletedTasks();
function deleteCompletedTasks() {
  let date = new Date().getDate();
  tasks = tasks.filter((ele) => {
    if (ele.completed) {
      if (ele.date === date) {
        return ele;
      }
    } else {
      return ele;
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  viewHandler();
}
formToggle.addEventListener("click", () => {
  form.innerHTML = `<input type="text" id="taskname" placeholder="Add Task"> <button class="btn btn-primary ms-2" id="addNewTask" onclick="addNewTask()">+Add</button>`;
});

function addNewTask() {
  const taskselect = document.querySelector("#taskname");
  const date = new Date();
  const obj = {
    name: taskselect.value,
    date: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
    completed: false,
    id:
      new Date().getMilliseconds() *
      Math.random() *
      Math.pow(2, 2 * Math.random() * 1.5) *
      10009,
  };
  tasks.push(obj);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  form.innerHTML = ``;
  viewHandler();
}
// localStorage.setItem(
//   "tasks",
//   JSON.stringify([
//     {
//       name: "sixth",
//       date: 28,
//       month: 1,
//       year: 2024,
//       id: 23,
//     },
//   ])
// );

function viewHandler() {
  const tasksView = document.querySelector("#tasks");
  const previoustasksView = document.querySelector("#previoustasks");

  let date = new Date();
  document.querySelector("#dateH").innerHTML = `${date.toDateString()}`;

  let today = [];
  let previous = [];
  let tdate = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();

  tasks.forEach((ele) => {
    if (year > ele.year) {
      previous.push(ele);
    } else {
      if (month > ele.month) {
        previous.push(ele);
      } else {
        if (tdate > ele.date) {
          previous.push(ele);
        } else {
          today.push(ele);
        }
      }
    }
  });
  const prev = previous
    .map((ele, i) => {
      return `
      <div class="tasks">
      ${ele.name}
      <button class="btn btn-info" id=${ele.id} onclick="changeTaskDeadline(this.id)">Move to Today</button>
      </div>
      <br>
      `;
    })
    .join("");

  const todayt = today
    .map((ele, i) => {
      return `
      <div class="tasks">
      <input type="checkbox" id=${ele.id} ${
        ele.completed ? "checked" : null
      } onclick="markAsCompleted(this.id)">
      <span  class=${ele.completed ? "done" : null}>${ele.name}</span></div>
      <br>
      `;
    })
    .join("");

  if (previous.length === 0) {
    previoustasksView.innerHTML = "Nothing to Show!";
  } else {
    previoustasksView.innerHTML = prev;
  }

  if (today.length === 0) {
    tasksView.innerHTML = "Nothing to Show!";
  } else {
    tasksView.innerHTML = todayt;
  }
}

function changeTaskDeadline(id) {
  const index = tasks.findIndex((ele) => {
    if (ele.id == id) return true;
  });
  let temp = tasks[index];
  let date = new Date();
  let tdate = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  temp.date = tdate;
  temp.month = month;
  temp.year = year;
  tasks[index] = temp;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  viewHandler();
}

function markAsCompleted(id) {
  const index = tasks.findIndex((ele) => {
    if (ele.id == id) return true;
  });
  let temp = tasks[index];
  temp.completed = true;
  tasks[index] = temp;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  viewHandler();
}

//tasks manager for upcoming months
let monthlyTasks =
  JSON.parse(localStorage.getItem("monthlyPlannerTasks")) || [];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const monthlySelector = document.querySelector("#monthly");
let date = new Date();
let tdate = date.getDate() + 1;
let month = date.getMonth() + 1;
if (tdate < 10) {
  tdate = "0" + tdate;
}
if (month < 10) {
  month = "0" + month;
}
let year = date.getFullYear();
let minDate = year + "-" + month + "-" + tdate;
monthlySelector.setAttribute("min", minDate);

const monthlyTitle = document.querySelector("#monthlyPlannerTitle");
document.querySelector("#addMonthly").addEventListener("click", () => {
  let date = monthlySelector.value.split("-");
  let monthlyObj = {
    title: monthlyTitle.value,
    date: parseInt(date[2]),
    month: months[parseInt(date[1]) - 1],
    year: parseInt(date[0]),
    id:
      new Date().getMilliseconds() *
      Math.random() *
      Math.pow(2, 2 * Math.random() * 1.5) *
      10009,
  };
  monthlyTasks.push(monthlyObj);
  localStorage.setItem("monthlyPlannerTasks", JSON.stringify(monthlyTasks));
  monthlyTitle.value = "";
  monthlySelector.value = "";
  monthlyViewHandler();
});
monthlyViewHandler();
function monthlyViewHandler() {
  let monthlyTasks =
    JSON.parse(localStorage.getItem("monthlyPlannerTasks")) || [];
  let trackerObj = {};
  months.forEach((ele) => {
    trackerObj[ele] = [];
  });
  for (let month in trackerObj) {
    monthlyTasks.forEach((ele) => {
      if (ele.month === month) {
        trackerObj[month].push(ele);
      }
    });
  }
  let str = "";
  for (let month in trackerObj) {
    if (trackerObj[month].length === 0) continue;

    let currentMonth = `<div class="card p-2 shadow-lg mx-2"><p>${month}</p><hr><ol>`;
    currentMonth += trackerObj[month]
      .map((ele) => {
        return `
      <li>
      ${ele.title} &nbsp; ${ele.date}/${
          months.findIndex((el) => el === ele.month) + 1
        }/${ele.year} &nbsp;
        <svg xmlns="http://www.w3.org/2000/svg" id=${
          ele.id
        } width="16" height="16" fill="red" class="bi bi-trash" viewBox="0 0 16 16" onclick="deleteMonthlyHandler(this.id)">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>

      </li>
      `;
      })
      .join("");
    currentMonth += "</ol></div>";
    str += currentMonth;
  }
  document.querySelector("#monthlyCards").innerHTML = str;
}

function deleteMonthlyHandler(id) {
  const taskTemp = monthlyTasks.filter((ele) => {
    if (ele.id != id) return ele;
  });
  monthlyTasks = taskTemp;
  localStorage.setItem("monthlyPlannerTasks", JSON.stringify(monthlyTasks));
  monthlyViewHandler();
}
moveMonthlyToToday();
function moveMonthlyToToday() {
  let date = new Date();
  let tdate = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  monthlyTasks.forEach((ele) => {
    if (
      ele.date === tdate &&
      ele.month === months[month] &&
      ele.year === year
    ) {
      let tempTask = {};
      tempTask.name = ele.title;
      tempTask.date = ele.date;
      tempTask.completed = false;
      tempTask.id = ele.id;
      tempTask.month = month;
      tempTask.year = ele.year;
      tasks.push(tempTask);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  });
  const taskTempMonthly = monthlyTasks.filter((ele) => {
    if (ele.date != tdate || ele.month != months[month] || ele.year != year)
      return ele;
  });
  monthlyTasks = taskTempMonthly;
  localStorage.setItem("monthlyPlannerTasks", JSON.stringify(monthlyTasks));
  viewHandler();
  monthlyViewHandler();
}
