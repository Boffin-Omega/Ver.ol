# Ver.ol

Ver.ol is a MERN stack based Version Control System with a lightweight, in browser codespace like environment, inspired by GitHub Codespaces.  

Users can create, view, update, and delete repositories, and manage files and folders entirely within the browser.

---

## Overview

Ver.ol explores how core version-control concepts can be modeled using a **snapshot-based** commit model, where each commit stores a snapshot of the entire repository at the time of committing.

> **Note**  
> The “codespace” focuses on filesystem manipulation, commit snapshots, and terminal-driven workflows.  
> It does **not** provide real code execution or true terminal behavior since our terminal is a React-based command interface.

Implementation details are documented in the `/docs` directory.

---

## Tech Stack

### Frontend
- React
- React Router
- Zustand
- Tailwind CSS

### Backend
- Node.js
- Express.js
- Mongoose (MongoDB ODM)

### Database
- MongoDB

### Build & Tooling
- TypeScript
- Vite
- pnpm

---

## Demo
[Check out the Ver.ol Demo Here!](https://github.com/user-attachments/assets/836ee725-1f8a-4357-83ab-85369d24114b)

---

## Features

- JWT-based authentication
- Repository CRUD operations
- Lazy-loaded virtual filesystem for efficient navigation
- Terminal-driven interaction model

### Terminal Modes

- **Viewing Mode**
  - Read-only access to repositories

- **Staging Mode**
  - Modify files
  - Stage changes
  - Commit snapshots

### Supported Commands
- Standard: `cd`, `ls`, `mv`,`pwd`,`echo`,`whoami`,`help`
- Custom: `mode`,`rename`,`del`,`create`,`commit`

### Version Control
- Commit history per repository
- Ability to view repository structure at the time of any commit

---

## Setup & Run

### Prerequisites
- Node.js
- pnpm

    ```
    npm install -g pnpm
    ```
- MongoDB (local or remote)

### Installation
```bash
git clone https://github.com/SysRet8-BMS/Ver.ol.git
cd ver.ol
pnpm install
```

## Environment Setup

Create `.env` files in both `frontend/` and `backend/` directories. Reference the respective `.env.example` files as needed

To generate JWT secret key, use a trusted online key generator, or run
```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"

```
### Run locally
```
pnpm -r run dev
```
 Visit http://localhost:5173/ 
