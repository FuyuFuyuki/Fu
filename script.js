document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.getElementById("enter-overlay");
    const musicPlayer = document.getElementById("music-player");
    const audio = document.getElementById("audio-player");
    const coverImage = musicPlayer.querySelector(".cover");
    const header = musicPlayer.querySelector(".music-header");

    // Overlay click: ẩn overlay, hiện player, play nhạc
    overlay.addEventListener("click", () => {
        overlay.classList.add("hidden");
        musicPlayer.classList.add("visible");
        audio.play().catch(() => console.log("Autoplay bị chặn"));
    });

    // Làm music player draggable (hỗ trợ mouse và touch)
    function makeDraggable(element, handle) {
        let isDragging = false, offsetX = 0, offsetY = 0;

        const startDrag = (e) => {
            isDragging = true;
            const rect = element.getBoundingClientRect();
            offsetX = (e.clientX || e.touches[0].clientX) - rect.left;
            offsetY = (e.clientY || e.touches[0].clientY) - rect.top;

            document.addEventListener("mousemove", onDrag);
            document.addEventListener("mouseup", stopDrag);
            document.addEventListener("touchmove", onDrag, { passive: false });
            document.addEventListener("touchend", stopDrag);
        };

        const onDrag = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const clientX = e.clientX || e.touches[0].clientX;
            const clientY = e.clientY || e.touches[0].clientY;

            element.style.left = `${clientX - offsetX}px`;
            element.style.top = `${clientY - offsetY}px`;
            element.style.right = "unset";
            element.style.bottom = "unset";
        };

        const stopDrag = () => {
            isDragging = false;
            document.removeEventListener("mousemove", onDrag);
            document.removeEventListener("mouseup", stopDrag);
            document.removeEventListener("touchmove", onDrag);
            document.removeEventListener("touchend", stopDrag);
        };

        handle.addEventListener("mousedown", startDrag);
        handle.addEventListener("touchstart", startDrag, { passive: false });
    }

    makeDraggable(musicPlayer, header);

    // Trạng thái thu gọn trên mobile
    if (window.innerWidth <= 600) {
        musicPlayer.classList.add("collapsed");
    }

    // Nhấn ảnh bìa để toggle collapsed trên mobile
    coverImage.addEventListener("click", () => {
        if (window.innerWidth <= 600) {
            musicPlayer.classList.toggle("collapsed");
        } else {
            // Ngoài mobile: play/pause khi click ảnh
            if (audio.paused) audio.play();
            else audio.pause();
        }
    });
});
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
                    let customActivity = data.data.activities.find(activity => activity.type === 4);
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
// Make the music player draggable
const musicPlayer = document.getElementById("music-player");
const header = musicPlayer.querySelector(".music-header");
let isDragging = false, offsetX, offsetY;

header.addEventListener("mousedown", (e) => {
    isDragging = true;
    const rect = musicPlayer.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    header.style.cursor = "grabbing";
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    header.style.cursor = "grab";
});

document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        musicPlayer.style.left = `${e.clientX - offsetX}px`;
        musicPlayer.style.top = `${e.clientY - offsetY}px`;
        musicPlayer.style.bottom = "unset";
        musicPlayer.style.right = "unset";
    }
});
    // Bật chế độ collapsed nếu đang ở màn hình nhỏ
    if (window.innerWidth <= 600) {
        musicPlayer.classList.add("collapsed");
    }

    coverImage.addEventListener("click", () => {
        if (window.innerWidth <= 600) {
            musicPlayer.classList.toggle("collapsed");
        }
    });
const audio = document.getElementById('audio-player');
  const cover = document.querySelector('#music-player .cover');

  cover.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    document.addEventListener('DOMContentLoaded', function () {
    const player = document.getElementById('music-player');

    function updateMusicPlayerLayout() {
      if (!player) return;
      if (window.innerWidth <= 600) {
        player.classList.add('collapsed');
      } else {
        player.classList.remove('collapsed');
      }
    }

    updateMusicPlayerLayout();
    window.addEventListener('resize', updateMusicPlayerLayout);
  });
  });
  overlay.addEventListener("click", () => {
    overlay.classList.add("hidden");
    musicPlayer.classList.add("visible");
    audio.play().catch(() => console.log("Autoplay blocked"));
    const CLIENT_ID = "918624154234-8jsktnm4ie4vm65celo96onbpeqhsvnk.apps.googleusercontent.com";
});
const CLIENT_ID = '770956171196-eurs2tdun72sumi477tqr7fifkhl5avl.apps.googleusercontent.com';  // Replace with your client ID
const SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';

let tokenClient;
let gapiInited = false;
let gisInited = false;

// Load Gmail client library
function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
}

// Init Gmail client
async function initializeGapiClient() {
    await gapi.client.init({
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"]
    });
    gapiInited = true;
}

// Load Google Identity Services
function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: handleTokenResponse,
    });
    gisInited = true;
}

// When user clicks the login button
document.getElementById('authorize-button').onclick = () => {
    if (!gisInited || !gapiInited) {
        alert("Google API not initialized yet!");
        return;
    }
    tokenClient.requestAccessToken();
};

// After user authorizes access
async function handleTokenResponse(response) {
    if (response.error) {
        console.error('Access token error:', response);
        return;
    }

    // Fetch recent messages
    const res = await gapi.client.gmail.users.messages.list({
        userId: 'me',
        maxResults: 5
    });

    const outputDiv = document.getElementById("gmail-output");
    outputDiv.innerHTML = "<h3>📬 Latest Emails:</h3>";

    for (const msg of res.result.messages) {
        const msgDetails = await gapi.client.gmail.users.messages.get({
            userId: 'me',
            id: msg.id,
            format: 'metadata',
            metadataHeaders: ['Subject', 'From']
        });

        const headers = msgDetails.result.payload.headers;
        const subject = headers.find(h => h.name === "Subject")?.value || "(No Subject)";
        const from = headers.find(h => h.name === "From")?.value || "(Unknown Sender)";

        outputDiv.innerHTML += `
            <div style="margin-bottom:10px; padding:10px; border:1px solid white; border-radius:8px; background:#fff1; color:white">
                <p><strong>From:</strong> ${from}</p>
                <p><strong>Subject:</strong> ${subject}</p>
            </div>`;
    }
}
