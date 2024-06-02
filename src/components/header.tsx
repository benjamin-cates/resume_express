import { HeaderInfo } from "../schema";
import { UpdateFunc } from "../App";
import React from "react";
import "./style/header.css";
import { EmailLogo, GitHubLogo, LinkedInLogo, PhoneLogo } from "../logos";

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
            placeholder={"Name"}
            id="name"
          />
          <div id="pronouns_and_location">
            <input
              type="text"
              onChange={changer(["pronouns"])}
              value={props.header.pronouns}
              placeholder={"Pronouns"}
              id="pronouns"
            />
            <input
              type="text"
              onChange={changer(["location"])}
              value={props.header.location}
              placeholder={"Location"}
              id="location"
            />
          </div>
        </div>
        <div id="contacts">
          <div id="email">
            <EmailLogo />
            <input
              type="text"
              onChange={changer(["email"])}
              value={props.header.email}
              placeholder={"example@example.com"}
              id="email"
            />
          </div>
          <div id="phone">
            <PhoneLogo />
            <input
              type="text"
              onChange={changer(["phone"])}
              value={props.header.phone}
              placeholder={"(999) 999-9999"}
              id="phone"
            />
          </div>
          <div id="linkedin">
            <LinkedInLogo />
            <input
              type="text"
              value={props.header.links.linkedIn || ""}
              onChange={changer(["links", "linkedIn"])}
              placeholder="LinkedIn username"
            />
          </div>
          <div id="github">
            <GitHubLogo />
            <input
              type="text"
              value={props.header.links.github || ""}
              onChange={(e) =>
                props.update_func!(
                  ["contact", "links", "github"],
                  e.target.value,
                )
              }
              placeholder="Github username"
            />
          </div>
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
          <div id="email">
            <EmailLogo />
            {props.header.email}
          </div>
          <div id="phone">
            <PhoneLogo />
            {props.header.phone}
          </div>

          {props.header.links.linkedIn && (
            <a
              id="github"
              href={"https://linkedin.com/in/" + props.header.links.linkedIn}
            >
              <LinkedInLogo />
              {props.header.links.linkedIn}
            </a>
          )}
          {props.header.links.github && (
            <a
              id="linkedin"
              href={"https://github.com/" + props.header.links.github}
            >
              <GitHubLogo />
              {props.header.links.github}
            </a>
          )}
        </div>
      </div>
    );
  }
};
export default HeaderComponent;
