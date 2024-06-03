import { Section } from "../schema";
import "./style/section.css";

interface SectionProps {
  section: Section;
  id: number;
  activate: (pos: [number, number]) => void;
}
const SectionHeader: React.FC<SectionProps> = (props) => {
  return (
    <div
      onClick={(e) => {
        props.activate([e.pageX, e.pageY]);
        e.stopPropagation();
      }}
      className="section_header"
      id={"a" + (props.section as any).random_idx.toString().replace(".", "")}
    >
      {props.section.header}
    </div>
  );
};

export default SectionHeader;
