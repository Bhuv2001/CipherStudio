import React from "react";
import { Sandpack } from "@codesandbox/sandpack-react";

/*
EditorPane will use Sandpack for editor + bundling.
We provide project.files as files in Sandpack format.
*/

export default function EditorPane({ project, setProject }){
  const files = Object.fromEntries(Object.entries(project.files).map(([name, {code}]) => [name.startsWith("/") ? name : `/${name}`, { code }]));

  function onCodeChange(file, newCode){
    // Sandpack passes file path like /App.jsx
    const key = file.startsWith("/") ? file.slice(1) : file;
    setProject(prev => ({ ...prev, files: { ...prev.files, [key]: { code: newCode } } }));
  }

  return (
    <div className="editor">
      <Sandpack
        template="react"
        files={files}
        options={{ autorun: true, layout: "split", showConsole: true }}
        theme={project.settings?.theme === "dark" ? "dark" : "light"}
        onFileChange={(path, code) => onCodeChange(path, code)}
      />
    </div>
  );
}
