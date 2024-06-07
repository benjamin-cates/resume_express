import { useEffect, useState } from "react";
import "./App.css";
import "./components/style/config.css";
import { default_resume, Resume } from "./schema";
import ResumeComponent from "./components/resume";
import deepcopy from "deepcopy";
import ExportButtons from "./export/buttons";
import { validate_resume } from "./export/json";
import ConfigComponent from "./components/config";

type idx = string | number;
type UpdateFunc = ((property_path: idx[], val: any) => void) | null;

function App() {
  let [resume, setResume] = useState<Resume>(default_resume);
  // Setup to save on page exit
  useEffect(() => {
    const save = () => {
      if (resume == default_resume()) return;
      localStorage.setItem("resume", JSON.stringify(resume));
    };
    window.addEventListener("beforeunload", save);
    return () => {
      window.removeEventListener("beforeunload", save);
    };
  });
  // Load from localstorage
  useEffect(() => {
    let str = localStorage.getItem("resume");
    if (str) {
      if (str == JSON.stringify(default_resume())) return;
      let res = JSON.parse(str);
      try {
        validate_resume(res);
        setResume(res);
      } catch (e) {}
    }
  }, []);
  const update_func: UpdateFunc = (
    property_path: (string | number)[],
    val: any,
  ): void => {
    let new_resume = deepcopy(resume);
    let item: any = new_resume;
    while (property_path.length > 1) {
      item = item[property_path.shift()!];
    }
    if (val == null) {
      item.splice(property_path[0], 1);
      resume.content = resume.content.map((val, idx) => {
        (val as any).id = idx;
        return val;
      });
    } else {
      item[property_path[0]] = val;
    }
    setResume(new_resume);
  };
  // Set printing mechanics
  useEffect(() => {
    let locker = () => update_func!(["config", "is_locked"], true);
    window.addEventListener("beforeprint", locker);
    return () => {
      window.removeEventListener("beforeprint", locker);
    };
  });
  resume.content.forEach((val, idx) => {
    (val as any).id = idx;
    if (!(val as any).random_idx)
      (val as any).random_idx = Math.random().toString();
  });

  return (
    <>
      <div id="controls">
        <div id="reorder">
          <h1>Resume Express</h1>
          <div>
            See our{" "}
            <a href="https://github.com/benjamin-cates/resume_express">
              GitHub page
            </a>
          </div>
        </div>
        <div id="config_buttons">
          <button
            id="add_section"
            onClick={() => {
              let content = resume.content.slice();
              content.push({ header: "New section" });
              update_func(["content"], content);
            }}
          >
            Add section
          </button>
          <div>Config</div>
          <ConfigComponent config={resume.config} update_func={update_func} />
        </div>
      </div>
      <ResumeComponent
        update_func={resume.config.is_locked ? null : update_func}
        resume={resume}
      ></ResumeComponent>
      <ExportButtons resume={resume} setResume={setResume} />
    </>
  );
}

export type { UpdateFunc };
export default App;
