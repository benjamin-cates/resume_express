import deepcopy from "deepcopy";
import { Experience, HeaderInfo, Resume, Section } from "../schema";

const latex_prologue = () => {
  return `
    %-------------------------
    % Resume in Latex
    % Author : Audric Serador
    % Inspired by: https://github.com/sb2nov/resume
    % License : MIT
    %------------------------

    \\documentclass[letterpaper,11pt]{article}

    \\usepackage{fontawesome5}
    \\usepackage{latexsym}
    \\usepackage[empty]{fullpage}
    \\usepackage{titlesec}
    \\usepackage{marvosym}
    \\usepackage[usenames,dvipsnames]{color}
    \\usepackage{verbatim}
    \\usepackage{enumitem}
    \\usepackage[hidelinks]{hyperref}
    \\usepackage{fancyhdr}
    \\usepackage[english]{babel}
    \\usepackage{tabularx}
    \\usepackage{graphicx}
    \\usepackage{mwe} % for blindtext and example-image-a in example
    \\usepackage{wrapfig}

    \\input{glyphtounicode}

    % Custom font
    \\usepackage[default]{lato}

    \\pagestyle{fancy}
    \\fancyhf{} % clear all header and footer fields
    \\fancyfoot{}
    \\renewcommand{\\headrulewidth}{0pt}
    \\renewcommand{\\footrulewidth}{0pt}

    % Adjust margins
    \\addtolength{\\oddsidemargin}{-0.6in}
    \\addtolength{\\evensidemargin}{-0.6in}
    \\addtolength{\\textwidth}{1in}
    \\addtolength{\\topmargin}{-.5in}
    \\addtolength{\\textheight}{1.0in}

    \\urlstyle{same}

    \\raggedbottom
    \\raggedright
    \\setlength{\\tabcolsep}{0in}

    % Sections formatting
    \\titleformat{\\section}{
      \\vspace{-4pt}\\scshape\\raggedright\\large
    }{}{0em}{}[\\color{black}\\titlerule\\vspace{-5pt}]

    % Ensure that generate pdf is machine readable/ATS parsable
    \\pdfgentounicode=1

    %-------------------------%
    % Custom commands
    \\begin{document}
    \\newcommand{\\resumeItem}[1]{
      \\item\\small{
        {#1 \\vspace{-2pt}}
      }
    }

    \\newcommand{\\resumeSubheading}[4]{
      \\vspace{-2pt}\\item
        \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
          \\textbf{#1} & #2 \\
          \\textit{\\small#3} & \\textit{\\small #4} \\\\
        \\end{tabular*}\\vspace{-7pt}
    }

    \\newcommand{\\resumeSubSubheading}[2]{
        \\item
        \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
          \\textit{\\small#1} & \\textit{\\small #2} \\\\
        \\end{tabular*}\\vspace{-7pt}
    }

    \\newcommand{\\resumeProjectHeading}[2]{
        \\item
        \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
          \\small#1 & #2 \\\\
        \\end{tabular*}\\vspace{-7pt}
    }

    \\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}

    \\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

    \\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
    \\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
    \\newcommand{\\resumeItemListStart}{\\begin{itemize}}
    \\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

    \\definecolor{Black}{RGB}{0, 0, 0}
    \\newcommand{\\seticon}[1]{\\textcolor{Black}{\\csname #1\\endcsname}}
    `.replace(/    /g, "");
};
function latex_header(header: HeaderInfo): string {
  let out: string = `
    \\begin{tabularx}{\\textwidth}{@{} X r @{}}
    \\begin{minipage}[t]{\\textwidth}
    \\textbf{\\Huge \\scshape ${clean(header.name)}} \\\\[0.5em]
    \\small\\seticon{faPhone} ${clean(header.phone)} \\
    \\href{mailto:${header.email}}{\\seticon{faEnvelope} \\underline{${clean(header.email)}}} \\quad`;
  if (header.links.linkedIn)
    out += `\\href{https://www.linkedin.com/in/${header.links.linkedIn}}{\\seticon{faLinkedin} \\underline{linkedin.com/in/${header.links.linkedIn}}} \\quad`;
  if (header.links.github)
    out += `\\href{https://github.com/${header.links.github}}{\\seticon{faGithub} \\underline{github.com/${header.links.github}}}`;
  out += `
    \\end{minipage} &
    \\end{tabularx}\n
    `;
  return out;
}

function clean(str: string): string {
  return str
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\<br\>/g, "\\\\ ")
    .replace(/\{/g, "\\{")
    .replace(/\}/g, "\\}")
    .replace(/\<\/.\>/g, "}")
    .replace(/\#/g, "\\#")
    .replace(/(?<!\\)\\(?!\\)/g, "\\textbackslash{}")
    .replace(/\<b\>/g, "\\textbf{")
    .replace(/\<i\>/g, "\\textit{")
    .replace(/\<u\>/g, "\\underline{")
    .replace(/\<a href=\"(.*?)\"\>/g, "\\href{$1}{")
    .replace(/\<a href=\'(.*?)\'\>/g, "\\href{$1}{")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&/g, "\\&")
    .replace(/%/g, "\\%")
    .replace(/#/g, "\\#")
    .replace(/_/g, "\\_")
    .replace(/~/g, "\\textasciitilde{}")
    .replace(/\$/g, "\\$")
    .replace(/\^/g, "\\^{}")
    .replace(/\n/g, "\\\\")
    .replace(/</g, "\\textless{}")
    .replace(/>/g, "\\textgreater{}");
}

function latex_experience(exp: Experience) {
  let time = "";
  if (exp.start) time += clean(exp.start.toUpperCase());
  if (exp.end && exp.start) time += " to ";
  if (exp.end) time += clean(exp.end.toUpperCase());
  let header = "";
  if (exp.title) header += `\\textbf{${clean(exp.title)}}`;
  if (exp.title && exp.subtitle) header += " $|$ ";
  if (exp.subtitle) header += `\\emph{${clean(exp.subtitle)}}`;
  let out = `\\resumeProjectHeading{${header}}{${clean(time)}}`;
  if (header == "") out = "";
  if (Array.isArray(exp.body)) {
    out += "\\resumeItemListStart\n";
    for (let element of exp.body) {
      out += `\\resumeItem{${clean(element)}}\n`;
    }
    out += "\\resumeItemListEnd\n";
  } else if (exp.body != "") {
    out += "\\begin{itemize}[leftmargin=0.15in, label={}]\n";
    out += "\\small{\\item{\n" + clean(exp.body) + "}}\n";
    out += "\\end{itemize}\n";
  }
  return out;
}

function latex_section(sec: Section) {
  return `\n\n\n\n\n%------${sec.header}-------%\n\n\\section{${sec.header}}\n\\resumeSubHeadingListStart\n`;
}

function latex_body(resume: Resume): string {
  let out = "";
  let in_header = false;
  for (let item of resume.content) {
    if ("header" in item) {
      if (in_header) out += "\\resumeSubHeadingListEnd";
      in_header = true;
      out += latex_section(item);
    } else {
      if (!in_header) {
        throw "Experience outside of a header scope";
      }
      out += latex_experience(item);
    }
  }
  if (in_header) out += "\\resumeSubHeadingListEnd";
  return out;
}

function latex_epilogue() {
  return "\\end{document}";
}

const export_to_latex = (resume: Resume): string => {
  resume = deepcopy(resume);
  resume.content.forEach((item) => {
    delete (item as any).random_idx;
    delete (item as any).id;
  });
  try {
    let out = latex_prologue();
    out += latex_header(resume.contact);
    out += latex_body(resume);
    out += latex_epilogue();
    return out;
  } catch (e) {
    alert(e);
    return "";
  }
};

export default export_to_latex;
