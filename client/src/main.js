import './style.css'

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Morse Code Controller</h1>
    <div class="card">
      <input type="text" id="morse-input" placeholder="Type message here..." 
             style="padding: 10px; border-radius: 8px; border: 1px solid #ccc; width: 80%;">
      <br><br>
      <button id="send-button" type="button">Transmit to Arduino</button>
    </div>
    <p id="status" style="color: #888;">System Ready</p>
  </div>
`

const input = document.querySelector('#morse-input');
const button = document.querySelector('#send-button');
const status = document.querySelector('#status');

// Transmission logic
const transmitMorse = async () => {
    const message = input.value.trim();
    
    if (!message) {
        status.innerText = "Error: Input is empty.";
        status.style.color = "#ff4444";
        return;
    }

    status.innerText = "Sending...";
    status.style.color = "#ffcc00";
    button.disabled = true;

    try {
        const response = await fetch("http://localhost:3001/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        });

        const data = await response.json();

        if (response.ok) {
            status.innerText = `Transmitted: "${message}"`;
            status.style.color = "#00ff00";
            input.value = "";
        } else {
            status.innerText = `Backend Error: ${data.error}`;
            status.style.color = "#ff4444";
        }
    } catch (err) {
        status.innerText = "Connection Failed. Is the server running?";
        status.style.color = "#ff4444";
        console.error("Fetch Error:", err);
    } finally {
        button.disabled = false;
    }
};

button.addEventListener('click', transmitMorse);
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') transmitMorse();
});