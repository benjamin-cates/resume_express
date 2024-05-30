import { HeaderInfo } from "../schema";
import { UpdateFunc } from "../App";
import React from "react";
import "./style/header.css";

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
            onChange={changer(["name"])}
            value={props.header.name}
            placeholder={"Name here"}
            id="name"
          />
          <div id="pronouns_and_location">
            <input
              type="text"
              onChange={changer(["pronouns"])}
              value={props.header.pronouns}
              placeholder={"any"}
              id="pronouns"
            />
            <input
              type="text"
              onChange={changer(["location"])}
              value={props.header.location}
              placeholder={"Earth"}
              id="location"
            />
          </div>
        </div>
        <div id="contacts">
          <input
            type="text"
            onChange={changer(["email"])}
            value={props.header.email}
            placeholder={"example@example.com"}
            id="email"
          />
          <input
            type="text"
            onChange={changer(["phone"])}
            value={props.header.phone}
            placeholder={"(999) 999-9999"}
            id="phone"
          />
          <input
            type="text"
            id="linkedin"
            value={props.header.links.linkedIn || ""}
            onChange={changer(["links", "linkedIn"])}
            placeholder="LinkedIn or empty"
          />
          <input
            type="text"
            id="github"
            value={props.header.links.github || ""}
            onChange={(e) =>
              props.update_func!(["contact", "links", "github"], e.target.value)
            }
            placeholder="Github or empty"
          />
        </div>
      </div>
    );
  } else {
    return (
      <div id="header">
        <div id="basic_info">
          <div id="name">{props.header.name}</div>
          <div id="pronouns_and_location">
            <div id="pronouns">{props.header.pronouns}</div>
            <div id="location">{props.header.location}</div>
          </div>
        </div>
        <div id="contacts">
          <div id="email">{props.header.email}</div>
          <div id="phone">{props.header.phone}</div>
          {props.header.links.linkedIn && (
            <>
              <a
                id="github"
                href={"https://linkedin.com/in/" + props.header.links.linkedIn}
              >
                {props.header.links.linkedIn}
              </a>
            </>
          )}
          {props.header.links.github && (
            <>
              <a
                id="linkedin"
                href={"https://github.com/" + props.header.links.github}
              >
                {props.header.links.github}
              </a>
            </>
          )}
        </div>
      </div>
    );
  }
};
export default HeaderComponent;
