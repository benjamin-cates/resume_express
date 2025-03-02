import { Document, Link, Page, Path, StyleSheet, Svg, Text, View } from "@react-pdf/renderer"
import ReactPDF from "@react-pdf/renderer"
import { Experience, Resume, SectionHeader } from "../schema";
import { Section } from "../components/section";


const styles = StyleSheet.create({
    page: {
        padding: "0.4in",
        fontFamily: "Helvetica",
        fontSize: 10,
    },
    header: {

    },
    basic_info: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    name: {
        fontSize: 24,
        border: "0",
        width: "auto",
    },
    pronouns_and_location: {
        flexDirection: "column",
        gap: "0.1in",
        alignItems: "flex-end",
    },
    pronouns: {
        fontSize: 9,
        textAlign: "right",
        color: "#222222",
    },
    location: {
        fontSize: 9,
        textAlign: "right",
        color: "#222222",
    },
    contacts: {
        paddingTop: "0.1in",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    contact_holder: {
        flexDirection: "row",
        alignItems: "center",
        gap: "0.06in",
    },
    columns_wrapper: {
        gap: "0.2in",
        flexDirection: "row",
        height: "100%",
    },
    experience: {
        padding: "0.03in",
        width: "100%",
    },
    experience_header: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    experience_title_wrapper: {
        flexDirection: "row",
        gap: "0.1in",
        alignItems: "center",
    },
    experience_title: {
        fontFamily: "Helvetica-Bold",
    },
    experience_subtitle: {
        fontFamily: "Helvetica-Oblique",
    },
    experience_body: {
        paddingLeft: "0.3in",
    },
    experience_time: {

    },
    section_header: {
        borderStyle: "solid",
        borderColor: "black",
        borderBottomWidth: "0.015in",
        fontSize: 16,
        fontFamily: "Helvetica-Bold",
        marginTop: "0.1in",
        paddingLeft: "0.05in",
        flexDirection: "row",
        alignItems: "center"
    },
    left_column: {
        width: "62%",
    },
    right_column: {
        width: "38%",
    },
    one_column: {
        width: "100%",
    },
});
const LinkedInLogo: React.FC<{}> = (_props: {}) => {
    return (
        <Svg height="14" width="14" viewBox="0 0 72 72">
            <Path
                d="M8,72 L64,72 C68.418278,72 72,68.418278 72,64 L72,8 C72,3.581722 68.418278,-8.11624501e-16 64,0 L8,0 C3.581722,8.11624501e-16 -5.41083001e-16,3.581722 0,8 L0,64 C5.41083001e-16,68.418278 3.581722,72 8,72 Z"
                fill="#000"
            />
            <Path
                d="M62,62 L51.315625,62 L51.315625,43.8021149 C51.315625,38.8127542 49.4197917,36.0245323 45.4707031,36.0245323 C41.1746094,36.0245323 38.9300781,38.9261103 38.9300781,43.8021149 L38.9300781,62 L28.6333333,62 L28.6333333,27.3333333 L38.9300781,27.3333333 L38.9300781,32.0029283 C38.9300781,32.0029283 42.0260417,26.2742151 49.3825521,26.2742151 C56.7356771,26.2742151 62,30.7644705 62,40.051212 L62,62 Z M16.349349,22.7940133 C12.8420573,22.7940133 10,19.9296567 10,16.3970067 C10,12.8643566 12.8420573,10 16.349349,10 C19.8566406,10 22.6970052,12.8643566 22.6970052,16.3970067 C22.6970052,19.9296567 19.8566406,22.7940133 16.349349,22.7940133 Z M11.0325521,62 L21.769401,62 L21.769401,27.3333333 L11.0325521,27.3333333 L11.0325521,62 Z"
                fill="#FFF"
            />
        </Svg>
    );
};

const GitHubLogo: React.FC<{}> = (_props: {}) => {
    return (
        <Svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <Path
                fillRule="evenodd"
                clipPath="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
                fill="#000"
            />
        </Svg>
    );
};

const PhoneLogo: React.FC<{}> = (_props: {}) => {
    return (
        <Svg width="14" height="14" viewBox="0 0 122.88 122.27">
            <Path d="M33.84,50.25c4.13,7.45,8.89,14.6,15.07,21.12c6.2,6.56,13.91,12.53,23.89,17.63c0.74,0.36,1.44,0.36,2.07,0.11 c0.95-0.36,1.92-1.15,2.87-2.1c0.74-0.74,1.66-1.92,2.62-3.21c3.84-5.05,8.59-11.32,15.3-8.18c0.15,0.07,0.26,0.15,0.41,0.21 l22.38,12.87c0.07,0.04,0.15,0.11,0.21,0.15c2.95,2.03,4.17,5.16,4.2,8.71c0,3.61-1.33,7.67-3.28,11.1 c-2.58,4.53-6.38,7.53-10.76,9.51c-4.17,1.92-8.81,2.95-13.27,3.61c-7,1.03-13.56,0.37-20.27-1.69 c-6.56-2.03-13.17-5.38-20.39-9.84l-0.53-0.34c-3.31-2.07-6.89-4.28-10.4-6.89C31.12,93.32,18.03,79.31,9.5,63.89 C2.35,50.95-1.55,36.98,0.58,23.67c1.18-7.3,4.31-13.94,9.77-18.32c4.76-3.84,11.17-5.94,19.47-5.2c0.95,0.07,1.8,0.62,2.25,1.44 l14.35,24.26c2.1,2.72,2.36,5.42,1.21,8.12c-0.95,2.21-2.87,4.25-5.49,6.15c-0.77,0.66-1.69,1.33-2.66,2.03 c-3.21,2.33-6.86,5.02-5.61,8.18L33.84,50.25L33.84,50.25L33.84,50.25z"
                fill="#000" />
        </Svg>
    );
};

const EmailLogo: React.FC<{}> = (_props: {}) => {
    return (
        <Svg height="14" width="14" viewBox="0 0 493.497 493.497">
            <Path d="M444.556,85.218H48.942C21.954,85.218,0,107.171,0,134.16v225.177c0,26.988,21.954,48.942,48.942,48.942h395.613  c26.988,0,48.941-21.954,48.941-48.942V134.16C493.497,107.171,471.544,85.218,444.556,85.218z M460.87,134.16v225.177  c0,2.574-0.725,4.924-1.793,7.09L343.74,251.081l117.097-117.097C460.837,134.049,460.87,134.096,460.87,134.16z M32.628,359.336  V134.16c0-0.064,0.033-0.11,0.033-0.175l117.097,117.097L34.413,366.426C33.353,364.26,32.628,361.911,32.628,359.336z   M251.784,296.902c-2.692,2.691-7.378,2.691-10.07,0L62.667,117.846h368.172L251.784,296.902z M172.827,274.152l45.818,45.819  c7.512,7.511,17.493,11.645,28.104,11.645c10.61,0,20.592-4.134,28.104-11.645l45.82-45.819l101.49,101.499H71.327L172.827,274.152z  "
                fill="#000" />
        </Svg>
    );
};

const ExperiencePdf: React.FC<Experience> = (exp: Experience) => {
    let time_str = "";
    if (exp.start) time_str += exp.start.toUpperCase();
    if (exp.start && exp.end) time_str += " to ";
    if (exp.end) time_str += exp.end.toUpperCase();
    return <View wrap={false} style={styles.experience}>
        <View style={styles.experience_header}>
            <View style={styles.experience_title_wrapper}>
                <Text style={styles.experience_title}>{exp.title}</Text>
                {exp.title && exp.subtitle && <Text>{" | "}</Text>}
                <Text style={styles.experience_subtitle}>{exp.subtitle}</Text>
            </View>
            <Text style={styles.experience_time}>{time_str}</Text>
        </View>
        {
            Array.isArray(exp.body) && (
                exp.body.map((val, idx) => (
                    <Text style={styles.experience_body} key={idx}>• {val}</Text>
                ))
            )
        }
        {
            !Array.isArray(exp.body) && (
                <Text style={styles.experience_body}>
                    {exp.body}
                </Text>
            )
        }
    </View>;
};
const SectionPdf: React.FC<Section> = (item: Section) => {
    return <View>
        <Text style={styles.section_header}>
            {item.header.header}
        </Text>
        {item.exps.map(val => (
            <ExperiencePdf key={(val as any).random_idx} {...val}></ExperiencePdf>
        ))}
    </View>;
};
const download_pdf = async (resume: Resume) => {
    //Font.register({ family: 'Lato', fontWeight: "400", fontStyle: "normal", src: "https://fonts.gstatic.com/s/lato/v24/S6uyw4BMUTPHjx4wXg.woff2" });
    //Font.register({ family: 'Lato', fontWeight: "400", fontStyle: "italic", src: "https://fonts.gstatic.com/s/lato/v24/S6u8w4BMUTPHjxsAXC-q.woff2" });
    //Font.register({ family: 'Lato', fontWeight: "700", fontStyle: "normal", src: "https://fonts.gstatic.com/s/lato/v24/S6u9w4BMUTPHh6UVSwiPGQ.woff2" });
    let left: Section[] = [];
    let right: Section[] = [];
    let side: boolean | undefined = undefined;
    resume.content.forEach((element) => {
        if ("header" in element) {
            if (resume.config.is_two_column)
                side = (element as SectionHeader).on_right;
            (side ? right : left).push({
                header: element,
                id: (element as any).id,
                exps: [],
            });
        } else {
            if ((side ? right : left).length == 0) return;
            if (element.hidden == true) return;
            (side ? right : left).slice(-1)[0].exps.push(element);
        }
    });
    let empty_section_filterer = (val: Section) => {
        return val.exps.length != 0;
    };
    left = left.filter(empty_section_filterer);
    right = right.filter(empty_section_filterer);
    const section_list = (list: Section[]) => {
        return list.map((val: Section) => (
            <SectionPdf
                key={(val.header as any).random_idx}
                {...val}
            />
        ));
    };
    let page = <Page
        size={resume.config.is_a4 ? "A4" : "LETTER"}
        style={styles.page}
    >
        <View style={styles.header}>
            <View style={styles.basic_info}>
                <Text style={styles.name}>{resume.contact.name}</Text>
                <View style={styles.pronouns_and_location}>
                    <Text style={styles.pronouns}>{resume.contact.pronouns}</Text>
                    <Text style={styles.location}>{resume.contact.location}</Text>
                </View>
            </View>
            <View style={styles.contacts}>
                <View style={styles.contact_holder}>
                    <EmailLogo />
                    <Text>{resume.contact.email}</Text>
                </View>
                <View style={styles.contact_holder}>
                    <PhoneLogo />
                    <Text>{resume.contact.phone}</Text>
                </View>

                {resume.contact.links.linkedIn && (
                    <View style={styles.contact_holder}>
                        <LinkedInLogo />
                        <Link style={{ color: "black" }} src={"https://linkedin.com/in/" + resume.contact.links.linkedIn}>
                            {resume.contact.links.linkedIn}
                        </Link>
                    </View>
                )}
                {resume.contact.links.github && (
                    <View style={styles.contact_holder}>
                        <GitHubLogo />
                        <Link style={{ color: "black" }} src={"https://github.com/" + resume.contact.links.github}>
                            {resume.contact.links.github}
                        </Link>
                    </View>
                )}
            </View>
        </View>
        {resume.config.is_two_column && (
            <View style={styles.columns_wrapper}>
                <View
                    id="left"
                    style={styles.left_column}
                >
                    {section_list(left)}
                </View>
                <View
                    style={styles.right_column}
                >
                    {section_list(right)}
                </View>
            </View>
        )}
        {!resume.config.is_two_column && (
            <View style={styles.one_column}>
                {section_list(left)}
            </View>
        )}
    </Page>;
    let doc = <Document
        author={resume.contact.name}
        creator={resume.contact.name}
        creationDate={new Date()}
        title={resume.contact.name + " Resume"}
        subject={resume.contact.name + " Resume"}
    >
        {page}
    </Document>
    let blob = await ReactPDF.pdf(doc).toBlob();
    let link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    let fileName = resume.contact.name.toLowerCase().replace(/ /g, "_") + "_resume.pdf";
    link.download = fileName;
    link.click();
}

export { download_pdf };