interface HeaderInfo {
  name: string;
  pronouns: string;
  location: string;
  phone: string;
  email: string;
  links: {
    github?: string;
    linkedIn?: string;
  };
}

interface Experience {
  title?: string;
  subtitle?: string;
  body: string | string[];
  start?: string;
  end?: string;
  location?: string;
  hidden?: boolean;
  veryhidden?: boolean;
}

interface Section {
  header: string;
  on_right?: boolean;
}

interface Resume {
  contact: HeaderInfo;
  spiels?: string[];
  content: (Experience | Section)[];
  formatting: {
    [key: string]: string;
  };
}

const default_resume = (): Resume => {
  return {
    contact: {
      name: "Person's Name",
      pronouns: "they/them",
      location: "Earth",
      phone: "+1(999) 999-9999",
      email: "email@gmail.com",
      links: {
        github: "torvalds",
        linkedIn: "bill-gates",
      },
    },
    spiels: ["Motivated student looking for their first job"],
    content: [
      {
        header: "Experience",
        on_right: false,
      },
      {
        title: "Microsoft",
        subtitle: "Engineering Intern",
        start: "Jan 2024",
        end: "present",
        body: "Developed cool stuff!",
        location: "Redmond, WA",
      },
      {
        header: "Awards",
        on_right: true,
      },
      {
        title: "TIME",
        subtitle: "Person of the Year",
        start: "2022",
        body: "Self explanatory :3",
      },
    ],
    formatting: {},
  };
};

export type { Resume, HeaderInfo, Experience, Section };
export { default_resume };
