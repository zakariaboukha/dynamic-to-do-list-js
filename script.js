// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {

    // Select the necessary DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        // Get and trim the input value
        const taskText = taskInput.value.trim();

        // Check if the input is empty
        if (taskText === "") {
            alert("Please enter a task");
            return;
        }

        // Create a new list item (li) element
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

        // Clear the input field
        taskInput.value = "";

        // Event listener to remove a task when clicking the remove button
        removeButton.addEventListener('click', () => {
            taskList.removeChild(li);
        });
    }

    // Event listener for the "Add Task" button
    addButton.addEventListener('click', addTask);

    // Event listener for the Enter key to add tasks
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
