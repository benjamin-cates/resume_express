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
          <input
            type="checkbox"
            checked={this.props.item.on_right}
            onChange={(e) =>
              this.props.commonProps.update_func!(
                ["content", (this.props.item as any).id, "on_right"],
                e.target.checked,
              )
            }
          ></input>
        </div>
      );
    } else {
      return (
        <div className="draggable_item">
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
      );
    }
  }
}

export default DraggableListItem;
