const KEY_PREFIX = "cipherstudio_proj_";

export function saveProject(id, data){
  if(!id) return;
  try {
    localStorage.setItem(KEY_PREFIX + id, JSON.stringify(data));
  } catch(e){ console.error("save error", e); }
}

export function loadProject(id){
  if(!id) return null;
  try {
    const raw = localStorage.getItem(KEY_PREFIX + id);
    return raw ? JSON.parse(raw) : null;
  } catch(e){ console.error("load error", e); return null; }
}

export function listProjects(){
  const out = [];
  for(let i=0;i<localStorage.length;i++){
    const key = localStorage.key(i);
    if(key && key.startsWith(KEY_PREFIX)){
      out.push(key.replace(KEY_PREFIX,""));
    }
  }
  return out;
}
