import React, { useState } from "react";
import { Experience, Resume, Section } from "../schema";
import HeaderComponent from "./header";
import { Config, UpdateFunc } from "../App";
import SectionHeader from "./section";
import ExperienceComponent from "./experience";
import "./style/resume.css";
import ElementEditor from "./element_editor";

interface Props {
  resume: Resume;
  update_func: UpdateFunc;
  config: Config;
}

const ResumeComponent: React.FC<Props> = (props: Props): React.ReactNode => {
  let [active, setActive] = useState(-1);
  let [pos, setPos] = useState([0, 0]);
  const resume = props.resume;
  let left: React.ReactElement[] = [];
  let right: React.ReactElement[] = [];
  let side: boolean | undefined = undefined;
  let editor = <></>;
  if (active != -1 && "header" in resume.content[active]) {
    editor = (
      <ElementEditor<Section>
        update_func={props.update_func}
        element={resume.content[active] as Section}
        pieces={[["header", "Header"]]}
        index={active}
        clear={() => setActive(-1)}
        position={[pos[0], pos[1]]}
      />
    );
  } else if (active != -1) {
    editor = (
      <ElementEditor<Experience>
        update_func={props.update_func}
        element={resume.content[active] as Experience}
        pieces={[
          ["title", "Title"],
          ["subtitle", "Subtitle"],
          ["start", "Start"],
          ["end", "End"],
          ["body", "Body"],
        ]}
        index={active}
        clear={() => setActive(-1)}
        position={[pos[0], pos[1]]}
      />
    );
  }
  resume.content.forEach((element, idx) => {
    if ("header" in element) {
      if (props.config.isTwoColumn) side = (element as Section).on_right;
      (side ? right : left).push(
        <SectionHeader
          activate={(pos: number[]) => {
            setActive(idx);
            setPos(pos);
          }}
          key={idx}
          id={idx}
          section={element as Section}
        />,
      );
    } else {
      (side ? right : left).push(
        <ExperienceComponent
          activate={(pos: number[]) => {
            setActive(idx);
            setPos(pos);
          }}
          key={idx}
          id={idx}
          exp={element as Experience}
        />,
      );
    }
  });
  return (
    <div id="resume">
      {(props.update_func as any) && editor}
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
