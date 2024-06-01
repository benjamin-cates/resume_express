import deepcopy from "deepcopy";
import { Resume } from "../schema";

const export_to_json = (resume: Resume): string => {
  resume = deepcopy(resume);
  resume.content.forEach((item) => {
    delete (item as any).random_idx;
    delete (item as any).id;
  });
  return JSON.stringify(resume);
};

const validate_resume = (res: Resume) => {
  if (!res.contact) throw "No contact object specified";
  for (let name of ["phone", "email", "name", "pronouns", "location"]) {
    let its_type = typeof (res.contact as any)[name];
    if (its_type == "undefined") throw 'No "contact.' + name + '" specified';
    else if (its_type != "string") throw "contact." + name + " is not a string";
  }
  if (!res.content) throw "No content array specified";
  if (!Array.isArray(res.content)) throw "Content is not an array";
  res.content.forEach((item, idx) => {
    if (!("header" in item)) {
      if (typeof item.body === "undefined")
        throw (
          "content[" +
          idx +
          "].body not specified, either specify header or body"
        );
      ["title", "subtitle", "start", "end", "location"].forEach((type) => {
        let its_type = typeof (item as any)[type];
        if (its_type != "undefined" && its_type != "string")
          throw "content[" + idx + "]." + type + " is not a string";
      });
    } else {
      if (typeof item.header != "string")
        throw "content[" + idx + "].header not a string";
    }
  });
};

const import_json = (json: string): Resume | null => {
  try {
    let res = JSON.parse(json);
    if (!Array.isArray(res.content)) alert("Content field not specified");
    validate_resume(res);
    return res;
  } catch (e) {
    alert(e);
    return null;
  }
};

export default export_to_json;
export { import_json };
