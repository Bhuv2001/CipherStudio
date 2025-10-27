import React from "react";

export default function FileExplorer({ project, setProject }){
  function addFile(){
    const name = prompt("File name (e.g., NewComponent.jsx)");
    if (!name) return;
    setProject(prev => ({
      ...prev,
      files: { ...prev.files, [name]: { code: "// new file" } },
      activeFile: name
    }));
  }
  function deleteFile(name){
    if (!confirm(`Delete ${name}?`)) return;
    setProject(prev => {
      const files = {...prev.files};
      delete files[name];
      const activeFile = prev.activeFile === name ? Object.keys(files)[0] : prev.activeFile;
      return {...prev, files, activeFile};
    });
  }
  function setActive(name){
    setProject(prev=>({...prev, activeFile: name}));
  }
  return (
    <div className="explorer">
      <div className="explorer-header">
        <h3>Files</h3>
        <button onClick={addFile}>＋</button>
      </div>
      <ul>
        {Object.keys(project.files).map(name => (
          <li key={name} className={project.activeFile === name ? "active" : ""}>
            <button onClick={() => setActive(name)}>{name}</button>
            <button onClick={() => deleteFile(name)} title="Delete">✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
