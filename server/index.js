import express from "express";
import cors from "cors";
import { SerialPort } from "serialport";

const app = express();
app.use(cors());
app.use(express.json());

const portPath = "/dev/ttyACM0"; 
const baudRate = 9600;

const arduino = new SerialPort({
  path: portPath,
  baudRate: baudRate,
  autoOpen: true 
});

arduino.on("open", () => {
  console.log(`[CONNECTED] Arduino is live on ${portPath}`);
});

arduino.on("error", (err) => {
  console.error(`[SERIAL ERROR] ${err.message}`);
});

app.post("/send", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Empty message ignored." });
  }

  if (!arduino.isOpen) {
    return res.status(503).json({ error: "Serial port is closed. Check usbipd." });
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`[SERVER] Running at http://localhost:${PORT}`);
});