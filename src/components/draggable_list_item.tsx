import React from "react";
import { UpdateFunc } from "../App";
import { Experience, Section } from "../schema";

import "./style/drag_item.css";

interface DraggableProps {
  item: Section | Experience;
  commonProps: { update_func: UpdateFunc };
  dragHandleProps: object;
}

function isHeader(object: any): object is Section {
  return "header" in object;
}

class DraggableListItem extends React.Component {
  props: DraggableProps;
  constructor(props: DraggableProps) {
    super(props);
    this.props = props;
  }
  render() {
    if (isHeader(this.props.item)) {
      return (
        <div className="draggable_header">
          <div>
            <div className="dragHandle" {...this.props.dragHandleProps}>
              ⠿&nbsp;
            </div>
            {this.props.item.header}
          </div>
        </div>
      );
    } else {
      return (
        <div
          className={
            this.props.item.hidden
              ? "draggable_item draggable_hidden"
              : "draggable_item"
          }
        >
          <div>
            <div className="dragHandle" {...this.props.dragHandleProps}>
              ⠿&nbsp;
            </div>
            <div className="draggable_experience">
              {this.props.item.title ||
                (Array.isArray(this.props.item.body)
                  ? this.props.item.body[0]
                  : this.props.item.body)}
            </div>
          </div>
          <input
            type="checkbox"
            checked={!this.props.item.hidden}
            onChange={(e) =>
              this.props.commonProps.update_func!(
                ["content", (this.props.item as any).id, "hidden"],
                !e.target.checked,
              )
            }
          ></input>
        </div>
      );
    }
  }
}

export default DraggableListItem;
