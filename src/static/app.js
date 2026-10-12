document.addEventListener("DOMContentLoaded", () => {
    loadActivities();
});

async function loadActivities() {
    try {
        const response = await fetch("/activities");
        const activities = await response.json();
        
        const container = document.getElementById("activities-container");
        if (!container) return;
        
        container.innerHTML = "";
        
        for (const [name, details] of Object.entries(activities)) {
            const card = document.createElement("div");
            card.className = "activity-card";
            
            let participantsHtml = '<ul style="list-style-type: none; padding-left: 0;">';
            details.participants.forEach(email => {
                participantsHtml += `
                    <li style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                        <span>${email}</span>
                        <button onclick="unregisterParticipant('${name}', '${email}')" style="background: transparent; border: none; cursor: pointer; color: red;">❌</button>
                    `;
            });
            participantsHtml += '</ul>';
            
            card.innerHTML = `
                <h3>${name}</h3>
                <p>${details.description}</p>
                <p><strong>Schedule:</strong> ${details.schedule}</p>
                <p><strong>Participants (${details.participants.length}/${details.max_participants}):</strong></p>
                ${participantsHtml}
            `;
            container.appendChild(card);
        }
    } catch (error) {
        console.error("Error loading activities:", error);
    }
}

async function unregisterParticipant(activityName, email) {
    try {
        const response = await fetch(`/activities/${encodeURIComponent(activityName)}/signup?email=${encodeURIComponent(email)}`, {
            method: "DELETE"
        });
        
        if (response.ok) {
            loadActivities();
        } else {
            alert("Failed to unregister participant.");
        }
    } catch (error) {
        console.error("Error unregistering:", error);
    }
                                         }
                                     
