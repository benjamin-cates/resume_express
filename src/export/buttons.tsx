import copy from "copy-to-clipboard";
import { Resume } from "../schema";
import export_to_json, { import_json } from "./json";
import export_to_latex from "./latex";

interface Props {
  resume: Resume;
  setResume: (res: Resume) => void;
}
const ExportButtons: React.FC<Props> = (props: Props) => {
  return (
    <>
      <button
        id="export_latex"
        onClick={() => copy(export_to_latex(props.resume))}
      >
        Copy as LaTeX
      </button>
      <button
        id="export_json"
        onClick={() => copy(export_to_json(props.resume))}
      >
        Copy as JSON
      </button>
      <button
        id="import_json"
        onClick={async () => {
          let res = import_json(
            await (
              await (await navigator.clipboard.read())[0].getType("text/plain")
            ).text(),
          );
          if (res == null) {
            alert("Read failed");
            return;
          }
          props.setResume(res!);
        }}
      >
        Paste JSON
      </button>
      <input
        style={{ display: "none" }}
        type="file"
        onChange={(e) => {
          if (!e.target.files) return;
          const file = e.target.files[0];
          if (file) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
              const fileContent = fileReader.result as string;
              e.target.files = null;
              let res = import_json(fileContent);
              if (res != null) props.setResume(res);
            };
            fileReader.readAsText(file);
          }
        }}
        id="load_file"
      />
      <label id="label_for_input_file" htmlFor="load_file">
        Load from file
      </label>
      <button
        id="save_file"
        onClick={() => {
          // Create blob link to download
          const url = window.URL.createObjectURL(
            new Blob([export_to_json(props.resume)]),
          );
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `resume.json`);
          document.body.appendChild(link);
          link.click();
          setTimeout(function () {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
          }, 200);
        }}
      >
        Save to file
      </button>
    </>
  );
};

export default ExportButtons;
