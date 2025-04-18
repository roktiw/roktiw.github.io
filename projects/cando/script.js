document.addEventListener('DOMContentLoaded', function () {
    const emojiPickerButton = document.getElementById('emojiPickerButton');
    const selectedMood = document.getElementById('selectedMood');
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const tasks = document.getElementById('tasks');

    // Emoji picker functionality
    emojiPickerButton.addEventListener('click', () => {
        const mood = prompt('Enter your mood emoji:');
        if (mood) {
            selectedMood.textContent = mood;
        }
    });

    // Add task functionality
    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value;
        if (taskText.trim() === '') {
            alert('Please enter a task.');
            return;
        }

        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');

        const mood = selectedMood.textContent;
        const date = new Date().toLocaleString();
        
        taskItem.innerHTML = `
            <span>${mood}</span>
            <span>${taskText}</span>
            <span>${date}</span>
        `;

        tasks.appendChild(taskItem);
        taskInput.value = '';
    });
});
