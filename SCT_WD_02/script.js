let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

function formatTime(ms) {
  let centiseconds = Math.floor((ms % 1000) / 10);
  let seconds = Math.floor(ms / 1000) % 60;
  let minutes = Math.floor(ms / 60000) % 60;
  let hours = Math.floor(ms / 3600000);

  return (
    (hours < 10 ? "0" : "") + hours + ":" +
    (minutes < 10 ? "0" : "") + minutes + ":" +
    (seconds < 10 ? "0" : "") + seconds + "." +
    (centiseconds < 10 ? "0" : "") + centiseconds
  );
}

function updateStatus(text) {
  document.getElementById("status").innerHTML = `Status: <span class="running">${text}</span>`;
}

function startStopwatch() {
  if (isRunning) return;
  isRunning = true;
  updateStatus("Running");
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    document.getElementById("display").textContent = formatTime(elapsedTime);
  }, 10);
}

function pauseStopwatch() {
  if (!isRunning) return;
  isRunning = false;
  clearInterval(timerInterval);
  updateStatus("Paused");
}

function resetStopwatch() {
  isRunning = false;
  clearInterval(timerInterval);
  elapsedTime = 0;
  document.getElementById("display").textContent = "00:00:00.00";
  document.getElementById("laps").innerHTML = "";
  updateStatus("Stopped");
}

function recordLap() {
  if (!isRunning) return;
  const lapTime = formatTime(elapsedTime);
  const lapList = document.getElementById("laps");
  const lapItem = document.createElement("li");
  lapItem.innerHTML = `<i class="fas fa-clock"></i> Lap ${lapList.children.length + 1}: ${lapTime}`;
  lapList.appendChild(lapItem);
}
