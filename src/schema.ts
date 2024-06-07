interface Config {
  is_a4?: boolean;
  is_two_column?: boolean;
  is_locked?: boolean;
}

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
}

interface SectionHeader {
  header: string;
  on_right?: boolean;
}

interface Resume {
  contact: HeaderInfo;
  spiels?: string[];
  content: (Experience | SectionHeader)[];
  config: Config;
  formatting: {
    [key: string]: string;
  };
}

const default_config = (): Config => {
  return {
    is_a4: false,
    is_two_column: false,
  };
};

const default_resume = (): Resume => {
  return {
    contact: {
      name: "Person's Name",
      pronouns: "they/them",
      location: "Earth",
      phone: "+1(999) 999-9999",
      email: "email@gmail.com",
      links: {
        github: "benjamin-cates",
        linkedIn: "the-benji-cat",
      },
    },
    formatting: {},
    config: { is_two_column: true },
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
        title: "Sooubway",
        subtitle: "Sandwich Artist",
        start: "jan 2019",
        end: "present",
        body: "Efficiently delivered 24000+ sooubway sandwich orders",
        location: "Seattle, WA",
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
      {
        header: "Education",
      },
      {
        title: "UC Davis",
        subtitle: "GPA 4.0",
        body: "Bachelors of Graphic Design",
        start: "sep 2020",
        end: "may 2024",
      },
      {
        header: "Skills",
        on_right: true,
      },
      {
        body: "Teamwork, Leadership",
      },
      {
        body: "Food handling permit",
        hidden: true,
      },
    ],
  };
};

export type { Resume, HeaderInfo, Experience, SectionHeader, Config };
export { default_resume, default_config };
