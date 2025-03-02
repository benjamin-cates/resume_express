import React from "react";
import { Experience } from "../schema";

import "./style/experience.css";
import { icons } from "./icons";

interface Props {
  item: Experience;
  commonProps: {
    activate: ((pos: [number, number], id: number) => void) | null;
  };
  dragHandleProps: object;
}

class ExperienceComponent extends React.Component<Props> {
  props: Props;
  constructor(props: Props) {
    super(props);
    this.props = props;
  }
  render() {
    const { item: exp, commonProps, dragHandleProps } = this.props;
    let time_str = "";
    if (exp.start) time_str += exp.start.toUpperCase();
    if (exp.start && exp.end) time_str += " to ";
    if (exp.end) time_str += exp.end.toUpperCase();
    return (
      <div
        className={(dragHandleProps || exp.hidden) && "experience" || "experience locked"}
        id={"a" + (exp as any).random_idx.toString().replace(".", "")}
      >
        {(dragHandleProps || exp.hidden) && <button
          onClick={(e) => {
            if (!commonProps.activate) return;
            commonProps.activate([e.pageX, e.pageY], (exp as any).id);
            e.stopPropagation();
          }}
          className="edit_button">{icons.edit}</button>}
        <div className="experience_header">
          <div className="title_wrapper">
            {exp.title && dragHandleProps && (
              <div {...dragHandleProps} className="drag_handle" onClick={(e) => e.stopPropagation()}>
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
            {!exp.title && dragHandleProps && (
              <span {...dragHandleProps} className="drag_handle" onClick={(e) => e.stopPropagation()}>
                ⠿&nbsp;
              </span>
            )}
            {exp.body}
          </div>
        )}
      </div>
    );
  }
}

export default ExperienceComponent;
