import { Config } from "../schema";
import { UpdateFunc } from "../App";
import "./style/config.css";

interface Props {
  config: Config;
  update_func: UpdateFunc;
}
const ConfigComponent: React.FC<Props> = (props: Props) => {
  const checkbox = (formal_name: string, name: string) => (
    <label htmlFor={formal_name} className="checkbox_wrapper">
      <input
        type="checkbox"
        id={formal_name}
        onChange={(e) =>
          props.update_func!(["config", formal_name], e.target.checked)
        }
        checked={(props.config as any)[formal_name]}
        className={(props.config as any)[formal_name] ? "active" : "inactive"}
      ></input>&nbsp;&nbsp;
      {name}
    </label>
  );
  return (
    <div className="checkbox_holder">
      {checkbox("is_a4", "A4 Sizing")}
      {checkbox("is_locked", "Lock Editing")}
    </div>
  );
};
export default ConfigComponent;
