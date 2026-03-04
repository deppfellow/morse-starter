# Arduino Morse Code Controller

Morse code translation via Arduino Uno, via simple Vite's `client` frontend to receive user input and Express' `server` backend to send input data into Arduino hardware.

## Project Structure

Three packages with each purpose:

1. **Frontend** (`client/`): Simple Vanilla JS + Vite bundler. Acts as interface input for sending morse messages
2. **Backend** (`server/`): Nodejs + Express server. Acts as bridge to send morse message from client to hardware.
3. **Hardware** (`arduino-morse/`): C++ code managed via PlatformIO. Logic to translate morse message to blinking LED and buzzer output.

## Components

**Hardware** used in the project:

- Arduino Uno
- Active Buzzer connected to PIN 8
- USB Cable

**Software** and tooling used in the project:

- Nodejs version 22.14+
- VSCode with PlatformIO extension.

## Setup

### 1. Backend Setup

Here, I'm using Express with WSL environment. `server` handle the serial communication at rate `9600` baud on port part `/dev/ttyACM0`. Take note on where is your server port and hardware port connect each other (Note: Windows port might be different, e.g. COM4. Check using `usbipd list` in Windows Powershell to find the corresponding port part).

```bash
cd server
npm install
node index.js
```

Code above will start server in `http://localhost:3001`.

### 2. Frontend Setup

Frontend client provide the simple interface to type message. Run via terminal:

```bash
cd client
npm install
npm run dev
```

Code above will start client in `http://localhost:5173`.

### 3. Hardware Setup

Hardware using Arduino Uno with single active buzzer connected at PIN 8.

1. Connect Arduino to machine via USB cable.
2. Open `arduino-morse/` with VSCode with PlatformIO installed.
3. Build the code via PlatformIO's build and flush into Arduino. Ensure the build time is succeed.
