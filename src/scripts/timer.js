function main(){

    let timerInterval = null;;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    isTimerRunning = false;

    // Display stored Times to user
    // function runs as soon as window loads
    window.onload = function (){
        // get display 
        const timesDisplay = document.getElementById('saved-times-display');
        // get stored times from storage
        const savedTimes = getSavedTimes();

        // formate times as list items
        // append to display
        savedTimes.forEach(item => {
            time = document.createElement('li');
            time.textContent = item;
            timesDisplay.appendChild(time);
        });
    }

    // Load stored times from storage
    function getSavedTimes(){
        // storage is named savedTimesList
        const storedTimes = localStorage.getItem('savedTimesList');
        // if storage is not empyty return stored times as list
        // else return empty list
        if(storedTimes){
            return JSON.parse(storedTimes);
        }
        return [];

    }

    // save times to storage
    function saveTimesToStorage(timesList){
        // storage is named savedTimesList
        localStorage.setItem('savedTimesList', JSON.stringify(timesList));
    }


    function getTodaysDate(){
        // Create a new Date object
        const today = new Date();

        // Get the year, month, and day components
        const year = today.getFullYear();
        const month = today.getMonth() + 1; // Months are zero-indexed, so add 1
        const day = today.getDate();

        // Format the date as desired (e.g., DD-MM-YYYY)
        const formattedDate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;

        // Output the formatted date
        console.log("Today's date:", formattedDate);
        return formattedDate;

    }

    // save time
    function saveTime(){

        // get the times from storage so we can update the list
        let savedTimesList = getSavedTimes();
    
        // get the display for time list
        const timesDisplay = document.getElementById('saved-times-display');
        // get hour and minutes from clock
        const hourText = document.getElementById('hours').textContent ;
        const minutesText = document.getElementById('minutes').textContent;

        // get todays date
        const date = getTodaysDate();

        // formate the time string
        newTime = hourText + ":" + minutesText + "---------" + date;
    
        // append time string to the display
        timeItem = document.createElement('li');
        timeItem.textContent = newTime;
        timesDisplay.appendChild(timeItem);
    
        // append time string to the json list from storage
        savedTimesList.push(newTime);
        // save the updated list to storage
        saveTimesToStorage(savedTimesList);
    
        // reset timer
        resetTimer();
    }
    
    // start timer
    function startTimer() {
        // only start when it's not already running
        if (!isTimerRunning){
            // run updateTimer every second 
            // replace 1 with 1000 to run every second
            timerInterval = setInterval(updateTimer, 1);

            // timer is running now
            isTimerRunning = true;

            // active start button
            // deactive pause button
            document.getElementById('start').classList.add('active');
            document.getElementById('pause').classList.remove('active');
        }
    }

    function updateTimer() {

        // This function runs every second and updates the timer display.
        // see timerInterval inside startTimer function

        // increase time variables
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }
        }

        // update timer display
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }

    // pause timer
    function pauseTimer() {
        // pause only if it's running
        if (isTimerRunning) {
            clearInterval(timerInterval);
            // set isTimerRunning to false to indicate it's not running anymore
            isTimerRunning = false;

            // deactive start button
            // activate pause button
            document.getElementById('start').classList.remove('active');
            document.getElementById('pause').classList.add('active');
        }
    }

    // reset timer
    function resetTimer() {
        clearInterval(timerInterval);
        hours = 0;
        minutes = 0;
        seconds = 0;
        isTimerRunning = false;

        // make all values equal to zero
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';

        // deactive buttons by removing active class from buttons
        document.getElementById('start').classList.remove('active');
        document.getElementById('pause').classList.remove('active');
    
    }


    // Listen for button clicks and run their respective function.
    document.getElementById('start').addEventListener('click', startTimer);
    document.getElementById('pause').addEventListener('click', pauseTimer);
    document.getElementById('reset').addEventListener('click', resetTimer);
    document.getElementById('save-time').addEventListener('click', saveTime);

}

main();