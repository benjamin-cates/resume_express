import DraggableList from "react-draggable-list";
import { Experience, SectionHeader } from "../schema";
import "./style/section.css";
import React from "react";
import ExperienceComponent from "./experience";

interface Section {
  id: number;
  header: SectionHeader;
  exps: Experience[];
}

interface SectionProps {
  item: Section;
  reorder_exp:
    | ((
        list: readonly Experience[],
        item: Experience,
        old_idx: number,
        new_idx: number,
      ) => void)
    | null;
  activate: null | ((pos: [number, number], id: number) => void);
  reorder_sections: ((id: number, up: boolean) => void) | null;
  add_exp: ((id: number) => void) | null;
}
class SectionComponent extends React.Component<SectionProps> {
  props: SectionProps;
  constructor(props: SectionProps) {
    super(props);
    this.props = props;
  }
  render() {
    const { reorder_exp, add_exp, reorder_sections, activate, item } =
      this.props;
    return (
      <div>
        <div
          onClick={(e) => {
            if (!activate) return;
            activate([e.pageX, e.pageY], (item as any).id);
            e.stopPropagation();
          }}
          className={reorder_exp && "section_header" || "section_header locked"}
          id={(item as any).random_idx}
        >
          {item.header.header}
          <div className="section_buttons">
            {reorder_sections && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    reorder_sections(item.id, true);
                  }}
                  title="Move section up"
                >
                  ▲
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    reorder_sections(item.id, false);
                  }}
                  title="Move section down"
                >
                  ▼
                </button>
              </>
            )}
            {add_exp && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  add_exp(item.id);
                }}
                title="Add experience to section"
              >
                +
              </button>
            )}
          </div>
        </div>
        {reorder_exp && (
          <DraggableList<Experience, unknown, any>
            list={item.exps}
            itemKey={"random_idx"}
            constrainDrag={true}
            commonProps={{ activate }}
            padding={0}
            onMoveEnd={reorder_exp}
            template={ExperienceComponent}
          />
        )}
        {!reorder_exp &&
          item.exps.map((val) => (
            <ExperienceComponent
              key={(val as any).random_idx}
              item={val}
              commonProps={{ activate }}
              dragHandleProps={null as any}
            />
          ))}
      </div>
    );
  }
}

export default SectionComponent;
export type { Section };
