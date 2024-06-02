import { useEffect, useState } from "react";
import "./App.css";
import "./components/style/config.css";
import { default_resume, Resume } from "./schema";
import ResumeComponent from "./components/resume";
import deepcopy from "deepcopy";
import DraggableList from "react-draggable-list";
import DraggableListItem from "./components/draggable_list_item";
import ExportButtons from "./export/buttons";
import { validate_resume } from "./export/json";

type idx = string | number;
type UpdateFunc = ((property_path: idx[], val: any) => void) | null;

interface Config {
  isTwoColumn: boolean;
  locked: boolean;
}

function App() {
  let [resume, setResume] = useState<Resume>(default_resume);
  useEffect(() => {
    console.log("resume set", resume.content.length);
  }, [resume]);
  let [locked, setLocked] = useState<boolean>(false);
  let [isTwoColumn, setIsTwoColumn] = useState<boolean>(true);
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
  // Set printing mechanics
  useEffect(() => {
    let locker = () => setLocked(true);
    window.addEventListener("beforeprint", locker);
    return () => {
      window.removeEventListener("beforeprint", locker);
    };
  });
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
  const config: Config = {
    isTwoColumn: isTwoColumn,
    locked,
  };
  resume.content.forEach((val, idx) => {
    (val as any).id = idx;
    if (!(val as any).random_idx)
      (val as any).random_idx = Math.random().toString();
  });
  return (
    <>
      <div id="controls">
        <div id="control_buttons">
          <div>Export</div>
          <ExportButtons resume={resume} setResume={setResume} />
          <div>Config</div>
          <div>
            &nbsp;&nbsp;
            <input
              type="checkbox"
              id="is_two_column"
              onChange={(e) => setIsTwoColumn(e.target.checked)}
              checked={isTwoColumn}
            ></input>
            <label htmlFor="is_two_column">Use Two Columns</label>
          </div>
          <div>
            &nbsp;&nbsp;
            <input
              type="checkbox"
              id="is_lock"
              onChange={(e) => setLocked(e.target.checked)}
              checked={locked}
            ></input>
            <label htmlFor="is_lock">Lock editing</label>
          </div>
        </div>
        <div id="reorder">
          <div>Reorder elements</div>
          <DraggableList
            list={resume.content}
            commonProps={{ update_func }}
            constrainDrag={true}
            itemKey={"random_idx"}
            onMoveEnd={(val: any) => update_func(["content"], val)}
            template={DraggableListItem}
          />
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
          <button
            id="add_experience"
            onClick={() => {
              let content = resume.content.slice();
              content.push({
                title: "New experience",
                subtitle: "Subtitle",
                body: "Lorem Ipsum",
              });
              update_func(["content"], content);
            }}
          >
            Add Element
          </button>
        </div>
      </div>
      <ResumeComponent
        update_func={locked ? null : update_func}
        resume={resume}
        config={config}
      ></ResumeComponent>
    </>
  );
}

export type { UpdateFunc, Config };
export default App;
