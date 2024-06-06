import { Section } from "../schema";
import "./style/section.css";

interface SectionProps {
  item: Section;
  common_props: { activate: (pos: [number, number], id: number) => void };
  dragHandleProps: object;
}
const SectionHeader: React.FC<SectionProps> = (props) => {
  return (
    <div
      onClick={(e) => {
        if (!props.common_props as any) return;
        props.common_props.activate([e.pageX, e.pageY], (props.item as any).id);
        e.stopPropagation();
      }}
      className="section_header"
      id={(props.item as any).random_idx}
    >
      {(props.dragHandleProps as any) && (
        <span {...props.dragHandleProps} onClick={(e) => e.stopPropagation()}>
          ⠿&nbsp;
        </span>
      )}
      {props.item.header}
    </div>
  );
};

export default SectionHeader;
