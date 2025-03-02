import copy from "copy-to-clipboard";
import { Resume } from "../schema";
import export_to_json, { import_json } from "./json";
import export_to_latex from "./latex";
import { download_pdf } from "./pdf";
import { icons } from "../components/icons";

interface Props {
  resume: Resume;
  setResume: (res: Resume) => void;
}
const ExportButtons: React.FC<Props> = (props: Props) => {
    let paste = async () => {
            let res = import_json(
              await (
                await (
                  await navigator.clipboard.read()
                )[0].getType("text/plain")
              ).text(),
            );
            if (res == null) {
              return;
            }
            props.setResume(res!);
    };
    let save = () => {
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
    };
    let load: React.ChangeEventHandler<HTMLInputElement> = (e) => {
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
    };
    return (
        <div id="import_export">
            <div className="button_group">
                <button
                    className="export"
                    onClick={paste}
                >
                    {icons.paste}Paste Data
                </button>
                <button
                    className="export"
                    onClick={() => copy(export_to_json(props.resume))}
                >
                    {icons.copy}Copy Data
                </button>
            </div>
            <div className="button_group">
                <button
                    className="export"
                    onClick={save}
                >
                    {icons.download}Save to file
                </button>
                <input
                    style={{ display: "none" }}
                    type="file"
                    onChange={load}
                    id="load_file"
                />
                <label className="export" id="label_for_input_file" htmlFor="load_file">
                    {icons.upload}Load from file
                </label>
            </div>
            <div className="button_group">
                <button
                    className="export"
                    onClick={() => download_pdf(props.resume)}
                >
                    {icons.document}Save as PDF
                </button>
                <button
                    className="export"
                    onClick={() => copy(export_to_latex(props.resume))}
                >
                    {icons.latex}Copy LaTeX
                </button>
            </div>
        </div>
  );
};

export default ExportButtons;
