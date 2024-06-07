import React, { useEffect, useState } from "react";
import { Experience, Resume, SectionHeader } from "../schema";
import HeaderComponent from "./header";
import { Config, UpdateFunc } from "../App";
import SectionComponent, { Section } from "./section";
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
  let left: Section[] = [];
  let right: Section[] = [];
  let secret: Section[] = [];
  let side: boolean | undefined = undefined;
  let editor = <></>;
  if (active != -1 && "header" in resume.content[active]) {
    let items = [["header", "Header", "string"]];
    if (props.config.isTwoColumn) items.push(["on_right", "On right", "bool"]);
    editor = (
      <ElementEditor<SectionHeader>
        update_func={props.update_func}
        element={resume.content[active] as SectionHeader}
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
  let activate = (pos: number[], id: number) => {
    if (props.config.locked) setActive(-1);
    else [setActive(id), setPos(pos)];
  };
  resume.content.forEach((element) => {
    if ("header" in element) {
      if (props.config.isTwoColumn) side = (element as SectionHeader).on_right;
      (side ? right : left).push({
        header: element,
        id: (element as any).id,
        exps: [],
      });
      secret.push({ header: element, id: (element as any).id, exps: [] });
    } else {
      if (secret.length == 0) return;
      if ((side ? right : left).length == 0) return;
      if (element.hidden) secret.slice(-1)[0].exps.push(element);
      else (side ? right : left).slice(-1)[0].exps.push(element);
    }
  });
  let empty_section_filterer = (val: Section) => {
    return val.exps.length != 0;
  };
  secret = secret.filter(empty_section_filterer);
  if (props.config.locked) {
    left = left.filter(empty_section_filterer);
    right = right.filter(empty_section_filterer);
  }
  let style = { page: "letter", width: "8.5in", minHeight: "11in" };
  if (resume.config.is_a4)
    style = { page: "a4", width: "210mm", minHeight: "297mm" };
  let reorder_exp = (
    arr: readonly Experience[],
    item: Experience,
    _old_idx: number,
    new_idx: number,
  ) => {
    setActive(-1);
    let content = resume.content.slice();
    let cur_idx = content.findIndex(
      (val) => (val as any).id == (item as any).id,
    );
    // Remove current item
    content.splice(cur_idx, 1);
    // If new index is at start of section
    if (new_idx == 0) {
      // Find previous header
      let i = cur_idx - 1;
      for (i = cur_idx - 1; i >= 0; i--) {
        if ("header" in content[i]) break;
      }
      content.splice(i + 1, 0, item);
    } else {
      let b4 = (arr[new_idx - 1] as any).id;
      let b4_idx = content.findIndex((val) => (val as any).id == b4);
      content.splice(b4_idx + 1, 0, item);
    }
    props.update_func!(["content"], content);
  };
  let reorder_sections = (id: number, up: boolean) => {
    setActive(-1);
    let content = resume.content.slice();
    let side = left.findIndex((val) => val.id == id) == -1 ? right : left;
    let side_idx = side.findIndex((val) => val.id == id);
    let section_slice = content.slice(id);
    let len = 1;
    for (len = 1; len < section_slice.length; len++) {
      if ("header" in section_slice[len]) break;
    }
    let sect = content.splice(id, len);
    let new_pos = 0;
    if (up && side_idx != 0) {
      new_pos = side[side_idx - 1].id;
    } else if (!up) {
      if (side_idx >= side.length - 2) {
        new_pos = content.length;
      } else {
        new_pos = side[side_idx + 2].id - len;
      }
    }
    content.splice(new_pos, 0, ...sect);
    props.update_func!(["content"], content);
  };
  let add_exp = (id: number) => {
    let content = resume.content.slice();
    content.splice(id + 1, 0, {
      title: "New experience",
      subtitle: "Subtitle",
      body: "Lorem Ipsum",
    });
    props.update_func!(["content"], content);
  };
  const section_list = (list: Section[], lock_order: boolean = false) => {
    return list.map((val: Section) => (
      <SectionComponent
        item={val}
        key={(val.header as any).random_idx}
        activate={props.config.locked ? null : activate}
        reorder_exp={lock_order ? null : reorder_exp}
        reorder_sections={lock_order ? null : reorder_sections}
        add_exp={lock_order ? null : add_exp}
      />
    ));
  };
  return (
    <>
      <div id="resume" style={style}>
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
              {section_list(left, props.config.locked)}
            </div>
            <div
              id="right"
              className={props.config.locked ? "column locked" : "column"}
            >
              {section_list(right, props.config.locked)}
            </div>
          </div>
        )}
        {!props.config.isTwoColumn && (
          <div className={props.config.locked ? "column locked" : "column"}>
            {section_list(left, props.config.locked)}
          </div>
        )}
      </div>
      {!props.config.locked && secret.length != 0 && (
        <div id="secret_resume">
          <div style={{ fontSize: "0.3in", textAlign: "center" }}>
            Hidden items
          </div>
          <div className="column">{section_list(secret, true)}</div>
        </div>
      )}
    </>
  );
};
export default ResumeComponent;
