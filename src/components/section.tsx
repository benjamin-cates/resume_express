import { UpdateFunc } from "../App";
import { Section } from "../schema";
import "./style/section.css";

interface SectionProps {
  section: Section;
  update_func: UpdateFunc;
  id: number;
}
const SectionHeader: React.FC<SectionProps> = (props) => {
  return <div className="section_header">{props.section.header}</div>;
};

export default SectionHeader;
