import { Document, Link, Page, StyleSheet, Text, View } from "@react-pdf/renderer"
import ReactPDF from "@react-pdf/renderer"
import { Experience, Resume, SectionHeader } from "../schema";
import { Section } from "../components/section";
import { iconsReactPdf } from "../components/icons";


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
                    {iconsReactPdf.email}
                    <Text>{resume.contact.email}</Text>
                </View>
                <View style={styles.contact_holder}>
                    {iconsReactPdf.phone}
                    <Text>{resume.contact.phone}</Text>
                </View>

                {resume.contact.links.linkedIn && (
                    <View style={styles.contact_holder}>
                        {iconsReactPdf.linkedin}
                        <Link style={{ color: "black" }} src={"https://linkedin.com/in/" + resume.contact.links.linkedIn}>{resume.contact.links.linkedIn}</Link>
                    </View>
                )}
                {resume.contact.links.github && (
                    <View style={styles.contact_holder}>
                        {iconsReactPdf.github}
                        <Link style={{ color: "black" }} src={"https://github.com/" + resume.contact.links.github}>{resume.contact.links.github}</Link>
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