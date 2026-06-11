async function loadTopicData() {
    // 1. Parse the ?day=X parameter out of the browser URL bar
    const urlParams = new URLSearchParams(window.location.search);
    const dayId = urlParams.get('day');

    if (!dayId) {
        showError("No practice day selected.");
        return;
    }

    try {
        // 2. Fetch the JSON data file asynchronously 
        const response = await fetch('topics.json');
        if (!response.ok) throw new Error("Failed to load topic database.");
        
        const topicsData = await response.json();
        const currentDay = topicsData[dayId];

        // 3. If day exists in JSON, inject it; otherwise show an error
        if (currentDay) {
        document.getElementById('topic-title').textContent = `Day ${dayId}: ${currentDay.title}`;
        document.getElementById('topic-task').textContent = currentDay.task;
        document.getElementById('topic-concept').textContent = currentDay.concept;
        document.getElementById('topic-code').textContent = currentDay.code;
        
        // Update browser tab title dynamically
        document.title = `Day ${dayId} - ${currentDay.title}`;
        } else {
        showError(`Day ${dayId} notes have not been added to the database yet.`);
        }

        const videoFrame = document.getElementById('topic-video-frame');

        if (currentDay.videoUrl) {
        // Convert standard watch links into direct embed players
        const embedUrl = currentDay.videoUrl.replace("watch?v=", "embed/");
        videoFrame.src = embedUrl;
        videoFrame.style.display = "block";
        } else {
        videoFrame.style.display = "none";
        }

    } catch (error) {
        console.error(error);
        showError("An error occurred while setting up the study room.");
    }
    }

    function showError(message) {
    document.getElementById('content-area').innerHTML = `
        <div class="error-msg">
        <h2>⚠️ Dynamic Load Error</h2>
        <p>${message}</p>
        <a href="index.html" style="color: #0076ff;">Return to Main Dashboard</a>
        </div>
    `;
}

// Run the script on page load
loadTopicData();