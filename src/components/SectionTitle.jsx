import { useLanguage } from "../hooks/useLanguage";

function SectionTitle({
    title,
    subtitle,
    titleEn,
    subtitleEn,
    centered = true
}) {
    const { language } = useLanguage();

    const heading = typeof title === "object"
        ? title?.[language]
        : language === "en" && titleEn
            ? titleEn
            : title;

    const description = typeof subtitle === "object"
        ? subtitle?.[language]
        : language === "en" && subtitleEn
            ? subtitleEn
            : subtitle;

    return (
        <div
            className={`section-title ${
                centered ? "text-center" : ""
            }`}
        >
            <h2>{heading}</h2>

            <div className="title-divider">
                <span />
            </div>

            {description && (
                <p>{description}</p>
            )}
        </div>
    );
}

export default SectionTitle;