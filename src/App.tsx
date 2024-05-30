import { useState } from "react";
import "./App.css";
import "./components/style/config.css";
import { default_resume, Resume } from "./schema";
import ResumeComponent from "./components/resume";
import deepcopy from "deepcopy";
import DraggableList from "react-draggable-list";
import DraggableListItem from "./components/draggable_list_item";

type idx = string | number;
type UpdateFunc = ((property_path: idx[], val: any) => void) | null;

interface Config {
  isTwoColumn: boolean;
}

function App() {
  let [resume, setResume] = useState<Resume>(default_resume());
  let [locked, setLocked] = useState<boolean>(false);
  let [isTwoColumn, setIsTwoColumn] = useState<boolean>(true);
  const update_func: UpdateFunc = (
    property_path: (string | number)[],
    val: string,
  ): void => {
    let new_resume = deepcopy(resume);
    let item: any = new_resume;
    while (property_path.length > 1) {
      item = item[property_path.shift()!];
    }
    item[property_path[0]] = val;
    setResume(new_resume);
  };
  const config: Config = {
    isTwoColumn: isTwoColumn,
  };
  return (
    <>
      <div id="controls">
        <div id="control_buttons">
          <div>Export</div>
          <button id="export_latex">Export to LaTeX</button>
          <button id="export_json">Export as JSON</button>
          <button id="import_json">Import JSON</button>
          <button id="load_file">Load from file</button>
          <button id="save_file">Save to file</button>
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
            list={resume.content.map((item, idx) => {
              (item as any).id = idx;
              return item;
            })}
            commonProps={{ update_func }}
            constrainDrag={true}
            itemKey={(item: any) =>
              item.header ||
              (Array.isArray(item.body) ? item.body[0] : item.body)
            }
            onMoveEnd={(val: any) => update_func(["content"], val)}
            template={DraggableListItem}
          />
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
