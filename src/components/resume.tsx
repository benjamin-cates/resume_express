import React from "react";
import { Experience, Resume, Section } from "../schema";
import HeaderComponent from "./header";
import { Config, UpdateFunc } from "../App";
import SectionHeader from "./section";
import ExperienceComponent from "./experience";
import "./style/resume.css";

interface Props {
  resume: Resume;
  update_func: UpdateFunc;
  config: Config;
}

const ResumeComponent: React.FC<Props> = (props: Props): React.ReactNode => {
  const resume = props.resume;
  let left: React.ReactElement[] = [];
  let right: React.ReactElement[] = [];
  let side: boolean | undefined = undefined;
  resume.content.forEach((element, idx) => {
    if ("header" in element) {
      if (props.config.isTwoColumn) side = (element as Section).on_right;
      (side ? right : left).push(
        <SectionHeader
          key={idx}
          update_func={props.update_func}
          id={idx}
          section={element as Section}
        />,
      );
    } else {
      (side ? right : left).push(
        <ExperienceComponent
          key={idx}
          update_func={props.update_func}
          id={idx}
          exp={element as Experience}
        />,
      );
    }
  });
  return (
    <div id="resume">
      <HeaderComponent
        header={props.resume.contact}
        update_func={props.update_func}
      ></HeaderComponent>
      {props.config.isTwoColumn && (
        <div className="columns_wrapper">
          <div id="left" className="column">
            {left}
          </div>
          <div id="right" className="column">
            {right}
          </div>
        </div>
      )}
      {!props.config.isTwoColumn && (
        <div className="column" id="content">
          {left}
        </div>
      )}
    </div>
  );
};
export default ResumeComponent;
