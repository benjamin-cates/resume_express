import { Config } from "../schema";
import { UpdateFunc } from "../App";
import "./style/config.css";

interface Props {
  config: Config;
  update_func: UpdateFunc;
}
const ConfigComponent: React.FC<Props> = (props: Props) => {
  const checkbox = (formal_name: string, name: string) => (
    <div>
      &nbsp;&nbsp;
      <input
        type="checkbox"
        id={formal_name}
        onChange={(e) =>
          props.update_func!(["config", formal_name], e.target.checked)
        }
        checked={(props.config as any)[formal_name]}
      ></input>
      <label htmlFor={formal_name}>{name}</label>
    </div>
  );
  return (
    <>
      {checkbox("is_two_column", "Use Two Columns")}
      {checkbox("is_a4", "A4 Sizing")}
      {checkbox("is_locked", "Lock Editing")}
    </>
  );
};
export default ConfigComponent;
