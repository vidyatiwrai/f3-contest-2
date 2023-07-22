document.addEventListener("DOMContentLoaded", () => {
    const startTimerButton = document.getElementById("start-timer-btn");
    startTimerButton.addEventListener("click", startNewTimer);

    const activeTimersSection = document.getElementById("active-timers-section");
    let timers = [];

    function startNewTimer() {
        const hours = parseInt(document.getElementById("hours").value);
        const minutes = parseInt(document.getElementById("minutes").value);
        const seconds = parseInt(document.getElementById("seconds").value);

        if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
            alert("Please enter complete time");
            return; 
        }

        const totalSeconds = hours * 3600 + minutes * 60 + seconds;
        if (totalSeconds === 0) {
            alert("Please enter a non-zero time.");
            return;
        }

        const timer = {
            timeRemaining: totalSeconds,
            intervalId: null
        };

        timers.push(timer);
        createTimerElement(timer);
        startTimer(timer);
    }

    function createTimerElement(timer) {
        const timerElement = document.createElement("div");
        timerElement.classList.add("active-timer");

        const label = document.createElement("span");
        label.classList.add("timer-label");
        label.textContent = "Time Remaining:";

        const timeDisplay = document.createElement("span");
        timeDisplay.classList.add("timer-time");
        timerElement.appendChild(label);
        timerElement.appendChild(timeDisplay);

        const stopButton = document.createElement("button");
        stopButton.classList.add("stop-timer-btn");
        stopButton.textContent = "Stop Timer";
        stopButton.dataset.timerIndex = timers.indexOf(timer);
        stopButton.addEventListener("click", stopTimer);
        timerElement.appendChild(stopButton);

        activeTimersSection.appendChild(timerElement);
    }

    function startTimer(timer) {
        timer.intervalId = setInterval(() => {
            if (timer.timeRemaining > 0) {
                timer.timeRemaining--;
                updateTimerDisplay(timer);
            } else {
                timerComplete(timer);
            }
        }, 1000);
    }

    function updateTimerDisplay(timer) {
        const timeDisplay = activeTimersSection.querySelector(
            `.active-timer:nth-child(${timers.indexOf(timer) + 1}) .timer-time`
        );
        const hours = Math.floor(timer.timeRemaining / 3600);
        const minutes = Math.floor((timer.timeRemaining % 3600) / 60);
        const seconds = timer.timeRemaining % 60;
        timeDisplay.textContent = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }

    function timerComplete(timer) {
        clearInterval(timer.intervalId);
        const timerElement = activeTimersSection.querySelector(
            `.active-timer:nth-child(${timers.indexOf(timer) + 1})`
        );
        timerElement.classList.add("timer-completed");

        const audioAlert = document.getElementById("timer-alert");
        audioAlert.play();
    }

    function stopTimer(event) {
        const timerIndex = parseInt(event.target.dataset.timerIndex);
        const timer = timers[timerIndex];
        clearInterval(timer.intervalId);
        timers.splice(timerIndex, 1);
        activeTimersSection.removeChild(event.target.parentElement);
    }
});