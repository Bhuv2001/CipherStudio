import React, { useState } from "react";

export default function FileManager({ files, setFiles, activeFile, setActiveFile }) {
  const [newName,setNewName] = useState("");
  const [renameMode, setRenameMode] = useState(null);
  const [renameVal, setRenameVal] = useState("");

  function createFile(){
    const name = newName.trim();
    if(!name) return alert("Enter filename (e.g. MyComp.jsx)");
    const key = name.startsWith("/") ? name : `/${name}`;
    if(files[key]) return alert("File exists");
    setFiles(prev => ({ ...prev, [key]: `// ${name}\nexport default function Component(){\n  return <div>${name}</div>\n}` }));
    setNewName("");
    setActiveFile(key);
  }

  function deleteFile(key){
    if(!confirm(`Delete ${key}?`)) return;
    const upd = {...files};
    delete upd[key];
    setFiles(upd);
    const rem = Object.keys(upd);
    setActiveFile(rem.length ? rem[0] : null);
  }

  function startRename(key){
    setRenameMode(key);
    setRenameVal(key.replace(/^\//,""));
  }

  function doRename(){
    const newKey = renameVal.startsWith("/") ? renameVal : `/${renameVal}`;
    if(files[newKey] && newKey !== renameMode) return alert("Name exists");
    const upd = {...files};
    upd[newKey] = upd[renameMode];
    delete upd[renameMode];
    setFiles(upd);
    setActiveFile(newKey);
    setRenameMode(null);
    setRenameVal("");
  }

  return (
    <div className="files">
      <h5>Files</h5>
      <ul className="file-list">
        {Object.keys(files).map(key => (
          <li key={key} className={`file-item ${activeFile===key ? "active":""}`}>
            <div style={{flex:1}} onClick={()=>setActiveFile(key)}>
              {key}
            </div>
            <div style={{display:"flex", gap:6}}>
              <button className="btn-ghost small" onClick={(e)=>{ e.stopPropagation(); startRename(key); }}>Rename</button>
              <button className="btn-ghost small" onClick={(e)=>{ e.stopPropagation(); deleteFile(key); }}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <div style={{marginTop:12}}>
        <input value={newName} onChange={e=>setNewName(e.target.value)} placeholder="newFile.jsx" className="form-control" />
        <div style={{display:"flex", gap:8, marginTop:8}}>
          <button className="btn btn-sm btn-success w-100" onClick={createFile}>Create</button>
        </div>
      </div>

      {renameMode && (
        <div style={{marginTop:12}}>
          <div style={{marginBottom:6}}>Rename {renameMode}</div>
          <input value={renameVal} onChange={e=>setRenameVal(e.target.value)} className="form-control" />
          <div style={{display:"flex", gap:8, marginTop:8}}>
            <button className="btn btn-sm btn-primary w-100" onClick={doRename}>Rename</button>
            <button className="btn btn-sm btn-secondary w-100" onClick={()=>setRenameMode(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
