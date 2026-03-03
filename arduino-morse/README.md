# Arduino Morse Code Blinker

This repository documents a learning project focused on Arduino programming and electronics. The project progresses from a simple blinking LED to an interactive Morse code machine, all developed using VS Code with the PlatformIO extension in a WSL (Windows Subsystem for Linux) environment.

## Table of Contents

1.  [Environment Setup](https://www.google.com/search?q=%23environment-setup)
2.  [Project Progression](https://www.google.com/search?q=%23project-progression)
    - [Phase 1: Basic LED Control](https://www.google.com/search?q=%23-phase-1-basic-led-control)
    - [Phase 2: Morse Code Implementation](https://www.google.com/search?q=%23-phase-2-morse-code-implementation)
3.  [Current Status](https://www.google.com/search?q=%23current-status)

## Environment Setup

The development environment utilizes Visual Studio Code running on WSL. A key challenge was enabling communication between the WSL instance and the physical Arduino board.

### Challenge: USB Passthrough to WSL

By default, WSL lacks access to the host machine's physical USB ports. This prevents tools like PlatformIO from detecting and communicating with the Arduino, identified by the absence of a `/dev/ttyACM*` or `/dev/ttyUSB*` device in the Linux environment.

### Solution: `usbipd-win`

The `usbipd-win` utility was used to forward the USB connection from the Windows host to the WSL guest.

**Configuration Steps:**

1.  **Install `usbipd-win` on Windows:** The tool was installed using `winget` in an administrative PowerShell.
    ```powershell
    winget install usbipd
    ```
2.  **Identify Arduino's BUSID:** The `usbipd list` command was run in PowerShell to identify the `BUSID` of the connected Arduino.
3.  **Attach Device to WSL:** The Arduino was attached to the WSL instance using the following PowerShell commands:

    ```powershell
    # 1. Bind the device to make it shareable
    usbipd bind --busid <BUSID>

    # 2. Attach the device to the WSL instance
    usbipd attach --wsl --busid <BUSID>
    ```

4.  **Configure WSL Permissions:** Inside the WSL terminal, `udev` rules for PlatformIO were installed to ensure the user had the necessary permissions to access the serial port.

This workflow successfully creates a communication bridge, enabling direct code uploads from VS Code within WSL to the Arduino.

## Project Progression

### ✅ Phase 1: Basic LED Control

This initial phase served to verify the circuit and development environment. It began with a simple sketch to blink a single LED connected to pin 13. The complexity was then increased by adding a second LED on pin 12, with the program updated to make them blink alternately. This phase solidified the best practice of using a dedicated current-limiting resistor for each LED.

### ✅ Phase 2: Morse Code Implementation

In this phase, a pre-programmed Morse code message—the universal distress signal "SOS" (`... --- ...`)—was implemented.

The implementation was designed for clarity:

- **Pin 13** was assigned to blink for **dots**.
- **Pin 12** was assigned to blink for **dashes**.

The code was refactored into modular helper functions (e.g., `dot()`, `dash()`) and timing constants to ensure the logic was readable, maintainable, and followed standardized Morse code timing.

## Current Status

Phases 1 and 2 are complete. The project is ready to proceed to Phase 3: integrating an LCD screen.
