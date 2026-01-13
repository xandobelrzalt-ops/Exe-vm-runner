# EXE VM Runner

Uploads Windows EXE files and runs them inside an isolated QEMU VM.

## Requirements
- Linux host
- QEMU
- Node.js
- Windows VM image (not included)

## Setup
1. Create a Windows VM image locally
2. Place it as `windows.qcow2` in `/backend/vm`
3. Run:
   ```bash
   npm install
   node server.js
