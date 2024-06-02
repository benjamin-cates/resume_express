import { Experience } from "../schema";

import "./style/experience.css";

interface Props {
  exp: Experience;
  id: number;
  activate: (pos: [number, number]) => void;
}

const ExperienceComponent: React.FC<Props> = (props): React.ReactNode => {
  const exp = props.exp;
  let time_str = "";
  if (exp.start) time_str += exp.start.toUpperCase();
  if (exp.start && exp.end) time_str += " to ";
  if (exp.end) time_str += exp.end.toUpperCase();
  return (
    <div
      onClick={(e) => {
        props.activate([e.pageX, e.pageY]);
        e.stopPropagation();
      }}
      className="experience"
    >
      <div className="experience_header">
        <div className="title_wrapper">
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
      {!Array.isArray(exp.body) && <div className="body">{exp.body}</div>}
    </div>
  );
};
export default ExperienceComponent;
