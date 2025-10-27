import React, { useMemo } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview
} from "@codesandbox/sandpack-react";

/*
 Props:
  - files: object { "/App.jsx": {code/string} or string }
  - setFiles: setter
  - activeFile: string
  - theme: 'light'|'dark'|'ocean'|'forest'
*/

export default function Editor({ files, setFiles, activeFile, theme }) {
  // normalize files: ensure sandpack expects string contents per path
  const sandFiles = useMemo(() => {
    const out = {};
    for(const k of Object.keys(files)){
      const val = files[k];
      out[k.startsWith("/") ? k : `/${k}`] = typeof val === "string" ? val : val.code ?? "";
    }
    // ensure entry is index.jsx if not present
    if(!Object.keys(out).some(k=>/index\.jsx?$/.test(k))) {
      if(out["/App.jsx"]) {
        out["/index.js"] = `import React from "react"; import { createRoot } from "react-dom/client"; import App from "./App.jsx"; const root = createRoot(document.getElementById("root")); root.render(<App />);`;
      }
    }
    return out;
  }, [files]);

  // update single file change
  const onChange = (path, code) => {
    const key = path.startsWith("/") ? path : `/${path}`;
    setFiles(prev => ({ ...prev, [key]: code }));
  };

  // choose sandpack theme (builtin)
  const sandpackTheme = theme === "dark" ? "dark" : "light";

  return (
    <div className="editor-area">
      <div className="editor-toolbar">
        <div style={{fontSize:13, color:"var(--muted)"}}>Editing: <strong>{activeFile||"—"}</strong></div>
      </div>

      <div className="editor-body">
        <div className="sp-wrapper" style={{width:"100%", height:"100%"}}>
          <SandpackProvider
            template="react"
            options={{ autorun: true, activeFile: activeFile || Object.keys(sandFiles)[0] }}
            files={sandFiles}
            customSetup={{
              dependencies: { react: "latest", "react-dom": "latest" },
            }}
            theme={sandpackTheme}
          >
            <SandpackLayout style={{height:"100%"}}>
              <SandpackCodeEditor
                showLineNumbers
                showTabs
                style={{ height: "100%" }}
                onChange={(code, path) => onChange(path, code)}
              />
              <SandpackPreview style={{ height: "100%" }} />
            </SandpackLayout>
          </SandpackProvider>
        </div>
      </div>
    </div>
  );
}
