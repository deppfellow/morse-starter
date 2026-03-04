# Frontend Logic

Interface for accepting user input is defined on `src/main.js` file. The logic that send the message from input field is:

```javascript
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
      body: JSON.stringify({ message }),
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
```

`transmitMorse` variable store asynchronous function that trim the message from whitespace and trying to send the message into path `http://localhost:3001/send`.
