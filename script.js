// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {

    // Select the necessary DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to load tasks from Local Storage
    function loadTasks() {
        // Retrieve tasks from Local Storage or initialize an empty array if none exist
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        
        // Loop through each stored task and add it to the task list
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' prevents re-saving to Local Storage
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        // Task creation logic
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button for each task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');
        
        // Append the remove button to the task (li)
        li.appendChild(removeButton);
        
        // Append the new task to the task list (ul)
        taskList.appendChild(li);

        // Event listener to remove a task when clicking the remove button
        removeButton.addEventListener('click', () => {
            taskList.removeChild(li); // Remove from the DOM
            removeTaskFromStorage(taskText); // Remove from Local Storage
        });

        // Clear the input field
        taskInput.value = "";

        // Save task to Local Storage if 'save' is true
        if (save) {
            saveTaskToStorage(taskText);
        }
    }

    // Function to save a task to Local Storage
    function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Function to remove a task from Local Storage
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Event listener for the "Add Task" button
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Please enter a task");
        } else {
            addTask(taskText); // Add the task and save it to Local Storage
        }
    });

    // Event listener for the Enter key to add tasks
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText === "") {
                alert("Please enter a task");
            } else {
                addTask(taskText); // Add the task and save it to Local Storage
            }
        }
    });

    // Load tasks from Local Storage when the page loads
    loadTasks();
});
