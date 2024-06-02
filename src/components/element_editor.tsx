import { UpdateFunc } from "../App";
import "./style/element_editor.css";

type Ty = "bool" | "string" | "list";

interface Props<Type> {
  update_func: UpdateFunc;
  index: number;
  pieces: [string, string, Ty][];
  element: Type;
  clear: () => void;
  position: [number, number];
}

const ElementEditor = <Type,>(props: Props<Type>) => {
  let style = { top: props.position[1], left: props.position[0] };
  const editors = props.pieces.map(([name, display_name, t]) => {
    if (t == "string")
      return (
        <div key={name} className="editable_element">
          <span>{display_name}</span>
          <input
            type="text"
            value={(props.element as any)[name]}
            placeholder={"- Empty -"}
            onChange={(e) =>
              props.update_func!(["content", props.index, name], e.target.value)
            }
          />
        </div>
      );
    else if (t == "bool") {
      return (
        <div key={name} className="editable_element">
          <span>{display_name}</span>
          <input
            type="checkbox"
            checked={(props.element as any)[name]}
            onChange={(e) =>
              props.update_func!(
                ["content", props.index, name],
                e.target.checked,
              )
            }
          />
        </div>
      );
    } else if (t == "list") {
      let isList = Array.isArray((props.element as any)[name]);
      let list = isList
        ? (props.element as any)[name]
        : [(props.element as any)[name]];
      return (
        <div key={name} className="editable_element">
          <span>{display_name}</span>
          <div className="string_list">
            {list.concat([""]).map(
              (el: string, idx: number): React.ReactElement => (
                <input
                  type="text"
                  value={el}
                  placeholder={"- Item " + (idx + 1) + " -"}
                  onChange={(e) => {
                    list[idx] = e.target.value;
                    while (list[list.length - 1] == "") list.pop();
                    if (list.length == 1) {
                      props.update_func!(
                        ["content", props.index, name],
                        list[0],
                      );
                    } else {
                      props.update_func!(["content", props.index, name], list);
                    }
                  }}
                />
              ),
            )}
          </div>
        </div>
      );
    }
  });
  return (
    <div style={style} onClick={(e) => e.stopPropagation()} id="editable_popup">
      <div id="element_editor_buttons">
        <button id="close_button" onClick={props.clear}>
          Close
        </button>
        <button
          id="delete_button"
          onClick={() => {
            props.update_func!(["content", props.index], null);
            props.clear();
          }}
        >
          Delete
        </button>
      </div>
      {editors}
    </div>
  );
};

export default ElementEditor;
