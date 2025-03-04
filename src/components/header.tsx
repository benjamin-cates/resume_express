import { HeaderInfo } from "../schema";
import { UpdateFunc } from "../App";
import React from "react";
import "./style/header.css";
import { icons } from "./icons";

interface Props {
  header: HeaderInfo;
  update_func: UpdateFunc;
}

const HeaderComponent: React.FC<Props> = (props: Props): React.ReactNode => {
  let changer = (type: string[]) => {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      props.update_func!(["contact"].concat(type), e.target.value);
  };
  if (props.update_func as any) {
    return (
      <div id="header">
        <div id="basic_info">
          <input
            type="text"
            autoComplete="off"
            onChange={changer(["name"])}
            value={props.header.name}
            placeholder={"Name"}
            id="name"
          />
          <div id="pronouns_and_location">
            <input
              type="text"
              autoComplete="off"
              onChange={changer(["pronouns"])}
              value={props.header.pronouns}
              placeholder={"Pronouns"}
              className="info_input"
              id="pronouns"
            />
            <input
              type="text"
              autoComplete="off"
              onChange={changer(["location"])}
              value={props.header.location}
              placeholder={"Location"}
              className="info_input"
              id="location"
            />
          </div>
        </div>
        <div id="contacts">
          <div id="email">
            {icons.email}
            <input
              type="text"
              autoComplete="off"
              onChange={changer(["email"])}
              value={props.header.email}
              placeholder={"example@example.com"}
              id="email"
              className="info_input"
            />
          </div>
          <div id="phone">
            {icons.phone}
            <input
              type="text"
              autoComplete="off"
              onChange={changer(["phone"])}
              value={props.header.phone}
              placeholder={"(999) 999-9999"}
              id="phone"
              className="info_input"
            />
          </div>
          <div id="linkedin">
            {icons.linkedin}
            <input
              type="text"
              autoComplete="off"
              value={props.header.links.linkedIn || ""}
              onChange={changer(["links", "linkedIn"])}
              placeholder="LinkedIn username"
              className="info_input"
            />
          </div>
          <div id="github">
            {icons.github}
            <input
              type="text"
              autoComplete="off"
              value={props.header.links.github || ""}
              onChange={(e) =>
                props.update_func!(
                  ["contact", "links", "github"],
                  e.target.value,
                )
              }
              className="info_input"
              placeholder="Github username"
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div id="header locked">
        <div id="basic_info">
          <div id="name">{props.header.name}</div>
          <div id="pronouns_and_location">
            <div id="pronouns">{props.header.pronouns}</div>
            <div id="location">{props.header.location}</div>
          </div>
        </div>
        <div id="contacts">
          <div id="email">
            {icons.email}
            {props.header.email}
          </div>
          <div id="phone">
            {icons.phone}
            {props.header.phone}
          </div>

          {props.header.links.linkedIn && (
            <a
              id="linkedin"
              href={"https://linkedin.com/in/" + props.header.links.linkedIn}
            >
              {icons.linkedin}
              {props.header.links.linkedIn}
            </a>
          )}
          {props.header.links.github && (
            <a
              id="github"
              href={"https://github.com/" + props.header.links.github}
            >
              {icons.github}
              {props.header.links.github}
            </a>
          )}
        </div>
      </div>
    );
  }
};
export default HeaderComponent;
