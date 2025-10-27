import React from "react";

export default function Topbar({ onNew, onSave, projectId, onExport }){
  return (
    <div className="topbar">
      <div className="left">
        <button onClick={onNew}>New</button>
        <button onClick={onSave}>Save</button>
        <button onClick={onExport}>Export</button>
      </div>
      <div className="center">
        <strong>CipherStudio</strong>
      </div>
      <div className="right">
        {projectId ? <span className="pill">ID: {projectId.slice(0,8)}</span> : <span className="pill">Local</span>}
      </div>
    </div>
  );
}
