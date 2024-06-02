import React, { useEffect, useState } from "react";
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
  // Hide editor on click outside
  useEffect(() => {
    let deactivator = () => setActive(-1);
    window.addEventListener("click", deactivator);
    return () => window.removeEventListener("click", deactivator);
  });
  let left: React.ReactElement[] = [];
  let right: React.ReactElement[] = [];
  let secret: React.ReactElement[] = [];
  let side: boolean | undefined = undefined;
  let editor = <></>;
  if (active != -1 && "header" in resume.content[active]) {
    let items = [["header", "Header", "string"]];
    if (props.config.isTwoColumn) items.push(["on_right", "On right", "bool"]);
    editor = (
      <ElementEditor<Section>
        update_func={props.update_func}
        element={resume.content[active] as Section}
        pieces={items as any}
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
          ["hidden", "Hidden", "bool"],
          ["title", "Title", "string"],
          ["subtitle", "Subtitle", "string"],
          ["start", "Start", "string"],
          ["end", "End", "string"],
          ["body", "Body", "list"],
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
            if (props.config.locked) setActive(-1);
            else [setActive(idx), setPos(pos)];
          }}
          key={idx}
          id={idx}
          section={element as Section}
        />,
      );
      secret.push(
        <SectionHeader
          activate={(_) => {
            return;
          }}
          key={idx}
          id={idx}
          section={element as Section}
        />,
      );
    } else {
      (element.hidden ? secret : side ? right : left).push(
        <ExperienceComponent
          activate={(pos: number[]) => {
            if (props.config.locked) setActive(-1);
            else [setActive(idx), setPos(pos)];
          }}
          key={idx}
          id={idx}
          exp={element as Experience}
        />,
      );
    }
  });
  let empty_section_filterer = (
    val: React.ReactElement,
    idx: number,
    arr: React.ReactElement[],
  ) => {
    if (arr.length - 1 != idx) {
      if ("section" in val.props && "section" in arr[idx + 1].props)
        return false;
    } else if ("section" in val.props) return false;
    return true;
  };
  secret = secret.filter(empty_section_filterer);
  left = left.filter(empty_section_filterer);
  right = right.filter(empty_section_filterer);
  return (
    <>
      <div id="resume">
        {(props.update_func as any) && editor}
        <HeaderComponent
          header={props.resume.contact}
          update_func={props.update_func}
        ></HeaderComponent>
        {props.config.isTwoColumn && (
          <div className="columns_wrapper">
            <div
              id="left"
              className={props.config.locked ? "column locked" : "column"}
            >
              {left}
            </div>
            <div
              id="right"
              className={props.config.locked ? "column locked" : "column"}
            >
              {right}
            </div>
          </div>
        )}
        {!props.config.isTwoColumn && (
          <div className={props.config.locked ? "column locked" : "column"}>
            {left}
          </div>
        )}
      </div>
      {!props.config.locked && secret.length != 0 && (
        <div id="secret_resume">
          <div style={{ fontSize: "0.3in", textAlign: "center" }}>
            Hidden items
          </div>
          <div className="column">{secret}</div>
        </div>
      )}
    </>
  );
};
export default ResumeComponent;
