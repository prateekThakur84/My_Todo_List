const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completionPercentage = document.getElementById("completion-percentage");


// function to add our task

function addTask(){
    if(inputBox.value === ""){ 
        alert("Please write something");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li); 
        let span = document.createElement("span");
        span.innerHTML= "\u00d7";
        li.appendChild(span);
        document.getElementById("completion-percentage").style.display = "flex";
        updatePercentage();
    }
    inputBox.value = '';
    saveData();
}

// handling click event on row to make task as done or to clear the task

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
        updatePercentage();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
        updatePercentage();
    }
},false);

// saving data temporary in local storage

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
};



    function showList(){
    listContainer.innerHTML = localStorage.getItem("data");
    updatePercentage();
};

// calculate the percentage of how much task is completed
function updatePercentage() {
    const tasks = listContainer.getElementsByTagName("li");
    const completedTasks = listContainer.getElementsByClassName("checked");
    const totalTasks = tasks.length;
    const totalCompleted = completedTasks.length;
    const percentage = totalTasks === 0 ? 0 : Math.round((totalCompleted / totalTasks) * 100);
    completionPercentage.innerHTML = `${percentage}% tasks completed`;
}

showList();


