📘 CipherStudio — Cloud-Powered Code Editor

CipherStudio is a React-based online code editor that lets you create, edit, and save projects locally or to the cloud.
It features a live preview, multiple themes, file management, and integration with a Render backend for project storage.

🚀 Live Demo

Frontend (Vercel):
👉 https://cipher-studio-woad.vercel.app/

Backend (Render):
👉 https://cipherstudio-1-zudz.onrender.com

⚙️ Tech Stack
Layer	Technology
Frontend	React (Vite)
Styling	TailwindCSS
Routing	React Router
Backend	Node.js + Express
Database	MongoDB (via Mongoose)
Hosting	Frontend → Vercel, Backend → Render

📂 Folder Structure
cipherstudio/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── FileManager.jsx
│   │   ├── Editor.jsx
│   ├── utils/
│   │   └── storage.js
│   ├── App.jsx
│   └── index.js
├── public/
├── package.json
├── README.md
└── vite.config.js

🧩 Features

🗂️ Multi-file project management
🧠 Local storage autosave
☁️ Cloud sync with backend (Render)
🎨 Light & dark themes
⚡ Live preview in real-time
💾 Export & import project as JSON

🪜 Setup Instructions

1️⃣ Clone the repository
git clone https://github.com/bhuv2001/cipherstudio.git
cd cipherstudio

2️⃣ Install dependencies
npm install

3️⃣ Add your backend link
Create a .env file in the root:
VITE_API_BASE=https://cipherstudio-1-zudz.onrender.com

In App.jsx, replace:

const API_BASE = import.meta.env.VITE_API_BASE;

4️⃣ Run locally
npm run dev

5️⃣ Deploy

Frontend (Vercel)
Push your code to GitHub
Go to vercel.com
 → “New Project” → Import GitHub repo
Add environment variable:
VITE_API_BASE=https://cipherstudio-1-zudz.onrender.com
Click Deploy

Backend (Render)
Push backend code to GitHub
Go to render.com
 → “New Web Service”
Connect repo → Set root directory → Deploy
Copy your Render app URL and update it in .env

🧠 How It Works
On startup, CipherStudio loads your last saved project from localStorage.
If not found, it fetches from your Render backend.
You can create, edit, or delete files, switch themes, and see live previews.
When you click “Save”, the project is stored both locally and on the backend.

🧰 Scripts
Command	Description
npm run dev	     -     Start development server
npm run build	   -     Create production build
npm run preview	 -     Preview production build locally

👨‍💻 Author
Bhuvanesh Singh
✨ Built with React + Node.js
💡 Passionate about web development & creative UI design

📜 License
MIT License © 2025 Bhuvanesh Singh
