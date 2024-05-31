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
      style={{ cursor: "pointer" }}
      onClick={(e) => props.activate([e.clientX, e.clientY])}
      className="section_header"
    >
      {props.section.header}
    </div>
  );
};

export default SectionHeader;
