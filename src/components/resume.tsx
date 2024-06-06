import React, { useEffect, useState } from "react";
import { Experience, Resume, Section } from "../schema";
import HeaderComponent from "./header";
import { Config, UpdateFunc } from "../App";
import SectionHeader from "./section";
import ExperienceComponent from "./experience";
import "./style/resume.css";
import ElementEditor from "./element_editor";
import DraggableList from "react-draggable-list";

interface Props {
  resume: Resume;
  update_func: UpdateFunc;
  config: Config;
}

interface ItemProps {
  item: Section | Experience;
  dragHandleProps: object;
  commonProps: CommonProps;
}

interface CommonProps {
  activate: (pos: [number, number], id: number) => void;
}
class ItemComponent extends React.Component<ItemProps> {
  props: ItemProps;
  constructor(props: ItemProps) {
    super(props);
    this.props = props;
  }
  render() {
    if ("header" in this.props.item) {
      return (
        <SectionHeader
          item={this.props.item}
          dragHandleProps={this.props.dragHandleProps}
          common_props={this.props.commonProps}
        />
      );
    }
    return (
      <ExperienceComponent
        item={this.props.item}
        dragHandleProps={this.props.dragHandleProps}
        common_props={this.props.commonProps}
      />
    );
  }
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
  let left: (Section | Experience)[] = [];
  let right: (Section | Experience)[] = [];
  let secret: (Section | Experience)[] = [];
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
  let activate = (pos: number[], id: number) => {
    if (props.config.locked) setActive(-1);
    else [setActive(id), setPos(pos)];
  };
  resume.content.forEach((element) => {
    if ("header" in element) {
      if (props.config.isTwoColumn) side = (element as Section).on_right;
      (side ? right : left).push(element);
      secret.push(element);
    } else {
      (element.hidden ? secret : side ? right : left).push(element);
    }
  });
  let empty_section_filterer = (val: object, idx: number, arr: object[]) => {
    if ("header" in val) {
      if (arr.length - 1 == idx || "header" in arr[idx + 1]) return false;
    }
    return true;
  };
  secret = secret.filter(empty_section_filterer);
  if (props.config.locked) {
    left = left.filter(empty_section_filterer);
    right = right.filter(empty_section_filterer);
  }
  let style = { page: "letter", width: "8.5in", minHeight: "11in" };
  if (resume.config.is_a4)
    style = { page: "a4", width: "210mm", minHeight: "297mm" };
  let reorderer = (
    arr: readonly (Experience | Section)[],
    item: Experience | Section,
    oldIdx: number,
    newIdx: number,
  ) => {
    setActive(-1);
    let content = resume.content.slice();
    content.splice((item as any).id, 1);
    if (newIdx == 0) {
      if ("header" in item) content.unshift(item);
      else content.splice((item as any).id, 0, item);
    } else {
      if (newIdx > oldIdx) content.splice((arr[newIdx - 1] as any).id, 0, item);
      else content.splice((arr[newIdx - 1] as any).id + 1, 0, item);
    }
    props.update_func!(["content"], content);
  };
  const drag_list_or_locked = (list: (Experience | Section)[]) => {
    if (props.config.locked) {
      return list.map((val) => (
        <ItemComponent
          item={val}
          key={(val as any).random_idx}
          commonProps={
            "header" in val ? { activate: () => null } : { activate }
          }
          dragHandleProps={null as any}
        />
      ));
    }
    return (
      <DraggableList<Section | Experience, CommonProps, ItemComponent>
        list={list}
        commonProps={{ activate }}
        constrainDrag={true}
        itemKey={"random_idx"}
        onMoveEnd={reorderer}
        template={ItemComponent}
      />
    );
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
              {drag_list_or_locked(left)}
            </div>
            <div
              id="right"
              className={props.config.locked ? "column locked" : "column"}
            >
              {drag_list_or_locked(right)}
            </div>
          </div>
        )}
        {!props.config.isTwoColumn && (
          <div className={props.config.locked ? "column locked" : "column"}>
            {drag_list_or_locked(left)}
          </div>
        )}
      </div>
      {!props.config.locked && secret.length != 0 && (
        <div id="secret_resume">
          <div style={{ fontSize: "0.3in", textAlign: "center" }}>
            Hidden items
          </div>
          <div className="column">
            {secret.map((val) => (
              <ItemComponent
                item={val}
                key={(val as any).random_idx}
                commonProps={
                  "header" in val ? { activate: () => null } : { activate }
                }
                dragHandleProps={null as any}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
export default ResumeComponent;
