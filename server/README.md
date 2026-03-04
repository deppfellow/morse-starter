# Backend Logic

`index.js` is the code providing the bridge between client and hardware. The main logic to be paid attention is at:

```javascript
app.post("/send", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Empty message ignored." });
  }

  if (!arduino.isOpen) {
    return res
      .status(503)
      .json({ error: "Serial port is closed. Check usbipd." });
  }

  arduino.write(`${message}\n`, (err) => {
    if (err) {
      console.error("[WRITE ERROR]", err.message);
      return res.status(500).json({ error: "Failed to write to device." });
    }
    console.log(`[TRANSMITTED] ${message}`);
    res.json({ status: "ok", sent: message });
  });
});
```

Code above define the route `/send` to transmit message from client to hardware.
