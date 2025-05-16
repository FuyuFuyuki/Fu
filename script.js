document.addEventListener("DOMContentLoaded", function () {
    // Discord presence
    async function fetchDiscordPresence() {
        try {
            let response = await fetch("https://api.lanyard.rest/v1/users/867658987418681374");
            let data = await response.json();

            if (data.success && data.data.discord_status) {
                let statusText = "Unknown";
                switch (data.data.discord_status) {
                    case "online":
                        statusText = "Online 🟢"; break;
                    case "idle":
                        statusText = "Idle 🌙"; break;
                    case "dnd":
                        statusText = "Do Not Disturb 🔴"; break;
                    case "offline":
                        statusText = "Offline ⚫"; break;
                }

                let customStatus = "";
                if (data.data.activities && data.data.activities.length > 0) {
                    let customActivity = data.data.activities.find(a => a.type === 4);
                    if (customActivity && customActivity.state) {
                        if (customActivity.emoji) {
                            if (customActivity.emoji.id) {
                                let emojiURL = `https://cdn.discordapp.com/emojis/${customActivity.emoji.id}.${customActivity.emoji.animated ? "gif" : "png"}`;
                                customStatus = `<img src="${emojiURL}" alt="emoji" width="20" height="20" style="vertical-align: middle;"> ${customActivity.state}`;
                            } else {
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

    // Cat rain
    const catGifs = [
        'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
        'https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif',
        'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif',
        'https://media.giphy.com/media/v6aOjy0Qo1fIA/giphy.gif',
        'https://media.giphy.com/media/13borq7Zo2kulO/giphy.gif'
    ];

    function createCat() {
        const cat = document.createElement("div");
        cat.classList.add("cat");
        cat.style.left = Math.random() * 100 + "vw";
        cat.style.animationDuration = 2 + Math.random() * 3 + "s";
        cat.style.opacity = Math.random() * 0.8 + 0.2;

        const randomCat = catGifs[Math.floor(Math.random() * catGifs.length)];
        cat.style.backgroundImage = `url('${randomCat}')`;

        document.getElementById("cat-rain").appendChild(cat);

        setTimeout(() => {
            cat.remove();
        }, 5000);
    }

    setInterval(createCat, 300);
});
