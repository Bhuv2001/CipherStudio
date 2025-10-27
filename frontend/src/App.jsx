import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Navbar from "./components/Navbar.jsx";
import FileManager from "./components/FileManager.jsx";
import Editor from "./components/Editor.jsx";
import { saveProject, loadProject, listProjects } from "./utils/storage.js";

export default function App(){
  // single project app
  const [projectId, setProjectId] = useState(null);
  const [files, setFiles] = useState({});
  const [activeFile, setActiveFile] = useState(null);
  const [theme, setTheme] = useState("dark");
  const [autosave, setAutosave] = useState(true);

  // init: load last project or create default
  useEffect(()=>{
    const last = localStorage.getItem("last_project_id");
    if(last){
      const data = loadProject(last);
      if(data && data.files){
        setProjectId(last);
        setFiles(data.files);
        const keys = Object.keys(data.files);
        setActiveFile(data.activeFile || keys[0]);
        setTheme(data.theme || "dark");
        setAutosave(typeof data.autosave === "boolean" ? data.autosave : true);
        return;
      }
    }
    // default new
    const id = uuidv4();
    setProjectId(id);
    const starter = {
      "/App.jsx": `export default function App(){\n  return (<div style={{padding:20}}><h1>Welcome to CipherStudio</h1><p>Edit code and see live preview.</p></div>);\n}`,
      "/index.js": `import React from "react"; import { createRoot } from "react-dom/client"; import App from "./App.jsx"; const root = createRoot(document.getElementById("root")); root.render(<App />);`
    };
    setFiles(starter);
    setActiveFile("/App.jsx");
  },[]);

  // autosave effect
  useEffect(()=>{
    if(!projectId) return;
    if(autosave){
      saveProject(projectId, { files, activeFile, theme, autosave });
      localStorage.setItem("last_project_id", projectId);
    }
  }, [files, activeFile, theme, autosave, projectId]);

  function newProject(){
    const id = uuidv4();
    const starter = {
      "/App.jsx": `export default function App(){\n  return (<div style={{padding:20}}><h1>New CipherStudio Project</h1></div>);\n}`,
      "/index.js": `import React from "react"; import { createRoot } from "react-dom/client"; import App from "./App.jsx"; const root = createRoot(document.getElementById("root")); root.render(<App />);`
    };
    setProjectId(id);
    setFiles(starter);
    setActiveFile("/App.jsx");
    localStorage.setItem("last_project_id", id);
  }

  function manualSave(){
    if(!projectId) { alert("No project id"); return; }
    saveProject(projectId, { files, activeFile, theme, autosave });
    localStorage.setItem("last_project_id", projectId);
    alert("Saved to localStorage");
  }

  function exportProject(){
    const blob = new Blob([JSON.stringify({ files, activeFile, theme }, null, 2)], {type: "application/json"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = (projectId || "cipherstudio") + ".json";
    a.click();
  }

  // load project list modal is not full UI here; quick load from existing
  function quickLoad(id){
    const data = loadProject(id);
    if(data){
      setProjectId(id);
      setFiles(data.files);
      setActiveFile(data.activeFile || Object.keys(data.files)[0]);
      setTheme(data.theme || "dark");
      setAutosave(typeof data.autosave === "boolean" ? data.autosave : true);
    } else alert("No project found");
  }

  // apply theme class to root
  useEffect(()=>{
    document.documentElement.classList.remove("theme-dark","theme-light","theme-ocean","theme-forest");
    document.documentElement.classList.add(`theme-${theme}`);
  },[theme]);

  return (
    <div className="app">
      <Navbar
        projectId={projectId}
        onNew={newProject}
        onSave={manualSave}
        onExport={exportProject}
        theme={theme}
        setTheme={setTheme}
      />
      <div className="main">
        <FileManager files={files} setFiles={setFiles} activeFile={activeFile} setActiveFile={setActiveFile} />
        <Editor files={files} setFiles={setFiles} activeFile={activeFile} theme={ (theme === "dark" ? "dark" : "light") } />
      </div>
      <div className="footer">Made with ❤️ • CipherStudio — local demo</div>
    </div>
  );
}
