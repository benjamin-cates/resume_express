import { UpdateFunc } from "../App";
import "./style/element_editor.css";

interface Props<Type> {
  update_func: UpdateFunc;
  index: number;
  pieces: [string, string][];
  element: Type;
  clear: () => void;
  position: [number, number];
}

const ElementEditor = <Type,>(props: Props<Type>) => {
  let style = { top: props.position[1], left: props.position[0] };
  const editors = props.pieces.map(([name, display_name]) => {
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
