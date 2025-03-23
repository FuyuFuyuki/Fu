document.addEventListener("DOMContentLoaded", function () {
    async function fetchDiscordPresence() {
        try {
            let response = await fetch("https://api.lanyard.rest/v1/users/867658987418681374");
            let data = await response.json();

            if (data.success && data.data.discord_status) {
                let statusText = "Unknown";
                switch (data.data.discord_status) {
                    case "online":
                        statusText = "Online 🟢";
                        break;
                    case "idle":
                        statusText = "Idle 🌙";
                        break;
                    case "dnd":
                        statusText = "Do Not Disturb 🔴";
                        break;
                    case "offline":
                        statusText = "Offline ⚫";
                        break;
                }

                let customStatus = "";
                if (data.data.activities && data.data.activities.length > 0) {
                    let customActivity = data.data.activities.find(activity => activity.type === 4); // Type 4 = Custom Status
                    if (customActivity && customActivity.state) {
                        if (customActivity.emoji) {
                            if (customActivity.emoji.id) {
                                // Custom Discord emoji (server-specific)
                                let emojiURL = `https://cdn.discordapp.com/emojis/${customActivity.emoji.id}.${customActivity.emoji.animated ? "gif" : "png"}`;
                                customStatus = `<img src="${emojiURL}" alt="emoji" width="20" height="20" style="vertical-align: middle;"> ${customActivity.state}`;
                            } else {
                                // Standard Unicode emoji
                                customStatus = `${customActivity.emoji.name} ${customActivity.state}`;
                            }
                        } else {
                            customStatus = customActivity.state;
                        }
                    }
                }

                document.getElementById("discord-status").innerHTML = `
                    <p>Discord Status: ${statusText}</p>
                    ${customStatus ? `<p>${customStatus}</p>` : ""}
                `;
            }
        } catch (error) {
            document.getElementById("discord-status").textContent = "Error fetching status.";
        }
    }

    fetchDiscordPresence();
    setInterval(fetchDiscordPresence, 60000);
});
