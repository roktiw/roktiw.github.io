document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('date');
    const weatherIcons = document.querySelectorAll('.weather-icon');
    const moodIcons = document.querySelectorAll('.mood-icon');
    const waterCups = document.querySelectorAll('.cup');
    const taskCheckboxes = document.querySelectorAll('.task');
    const breakfastInput = document.getElementById('breakfast');
    const lunchInput = document.getElementById('lunch');
    const dinnerInput = document.getElementById('dinner');

    // Load saved data from local storage
    loadSavedData();

    // Add event listeners
    weatherIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            weatherIcons.forEach(i => i.classList.remove('selected'));
            icon.classList.add('selected');
            saveData();
        });
    });

    moodIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            moodIcons.forEach(i => i.classList.remove('selected'));
            icon.classList.add('selected');
            saveData();
        });
    });

    waterCups.forEach((cup, index) => {
        cup.addEventListener('click', () => {
            waterCups.forEach((c, i) => {
                if (i <= index) {
                    c.classList.add('selected');
                } else {
                    c.classList.remove('selected');
                }
            });
            saveData();
        });
    });

    taskCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', saveData);
    });

    dateInput.addEventListener('change', saveData);
    breakfastInput.addEventListener('input', saveData);
    lunchInput.addEventListener('input', saveData);
    dinnerInput.addEventListener('input', saveData);

    function saveData() {
        const data = {
            date: dateInput.value,
            weather: getSelectedData(weatherIcons, 'data-weather'),
            mood: getSelectedData(moodIcons, 'data-mood'),
            water: Array.from(waterCups).filter(cup => cup.classList.contains('selected')).length,
            tasks: Array.from(taskCheckboxes).map(checkbox => checkbox.checked),
            meals: {
                breakfast: breakfastInput.value,
                lunch: lunchInput.value,
                dinner: dinnerInput.value
            }
        };
        localStorage.setItem('dailyPlanner', JSON.stringify(data));
    }

    function loadSavedData() {
        const savedData = JSON.parse(localStorage.getItem('dailyPlanner'));
        if (!savedData) return;

        dateInput.value = savedData.date;
        selectIcon(weatherIcons, savedData.weather, 'data-weather');
        selectIcon(moodIcons, savedData.mood, 'data-mood');
        waterCups.forEach((cup, index) => {
            if (index < savedData.water) {
                cup.classList.add('selected');
            } else {
                cup.classList.remove('selected');
            }
        });
        taskCheckboxes.forEach((checkbox, index) => {
