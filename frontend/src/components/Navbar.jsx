import React from "react";

export default function Navbar({ projectId, onNew, onSave, onExport, theme, setTheme }) {
  const themes = ["dark","light","ocean","forest"];
  return (
    <div className="topbar">
      <div className="brand">
        <div className="logo">CS</div>
        <div>
          <div style={{fontSize:14}}>CipherStudio</div>
          <div style={{fontSize:11, color:"var(--muted)"}}>Browser React IDE</div>
        </div>
      </div>

      <div style={{display:"flex",gap:8, alignItems:"center"}}>
        <button className="btn-ghost small" onClick={onNew}>New</button>
        <button className="btn-ghost small" onClick={onSave}>Save</button>
        <button className="btn-ghost small" onClick={onExport}>Export</button>

        <select
          value={theme}
          onChange={(e)=>setTheme(e.target.value)}
          className="btn-ghost small"
          style={{padding:"6px 8px"}}
        >
          {themes.map(t=> <option key={t} value={t}>{t}</option>)}
        </select>

        <div style={{width:8}} />

        <div style={{fontSize:12, color:"var(--muted)"}}>ID: {projectId ? projectId.slice(0,8) : "local"}</div>
      </div>
    </div>
  );
}
