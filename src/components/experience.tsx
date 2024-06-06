import { Experience } from "../schema";

import "./style/experience.css";

interface Props {
  item: Experience;
  common_props: { activate: (pos: [number, number], id: number) => void };
  dragHandleProps: object;
}

const ExperienceComponent: React.FC<Props> = (props): React.ReactNode => {
  const exp = props.item;
  let time_str = "";
  if (exp.start) time_str += exp.start.toUpperCase();
  if (exp.start && exp.end) time_str += " to ";
  if (exp.end) time_str += exp.end.toUpperCase();
  return (
    <div
      onClick={(e) => {
        if (!props.common_props as any) return;
        props.common_props.activate([e.pageX, e.pageY], (exp as any).id);
        e.stopPropagation();
      }}
      className="experience"
      id={"a" + (props.item as any).random_idx.toString().replace(".", "")}
    >
      <div className="experience_header">
        <div className="title_wrapper">
          {exp.title && props.dragHandleProps && (
            <div
              {...props.dragHandleProps}
              onClick={(e) => e.stopPropagation()}
            >
              ⠿&nbsp;
            </div>
          )}
          <div className="title">{exp.title}</div>
          {exp.title && exp.subtitle && <div>&nbsp;|&nbsp;</div>}
          <div className="subtitle">{exp.subtitle}</div>
        </div>
        <div className="experience_time">{time_str}</div>
      </div>
      {Array.isArray(exp.body) && (
        <ul className="body_list">
          {exp.body.map((val, idx) => (
            <li key={idx}>{val}</li>
          ))}
        </ul>
      )}
      {!Array.isArray(exp.body) && (
        <div className="body">
          {!exp.title && props.dragHandleProps && (
            <span
              {...props.dragHandleProps}
              onClick={(e) => e.stopPropagation()}
            >
              ⠿&nbsp;
            </span>
          )}
          {exp.body}
        </div>
      )}
    </div>
  );
};
export default ExperienceComponent;
