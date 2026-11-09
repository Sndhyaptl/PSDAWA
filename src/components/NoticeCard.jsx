import { CalendarDays, FileDown } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

function NoticeCard({ notice }) {
    const { language } = useLanguage();

    if (!notice) return null;

    const title = language === "hi"
        ? notice.titleHi || notice.titleEn
        : notice.titleEn || notice.titleHi;

    const description = language === "hi"
        ? notice.descriptionHi || notice.descriptionEn
        : notice.descriptionEn || notice.descriptionHi;

    return (
        <article className="notice-card card-custom">

            <div className="notice-meta">

                <span>
                    <CalendarDays size={15} />
                    {notice.date}
                </span>

                {notice.isLatest && (
                    <span className="latest-badge">
                        {language === "hi"
                            ? "नई सूचना"
                            : "Latest"}
                    </span>
                )}

            </div>

            <h5>{title}</h5>

            <p>{description}</p>

            <div className="notice-footer">

                <span className="notice-category">
                    {notice.category}
                </span>

                {notice.attachment && (
                    <a
                        href={notice.attachment}
                        download
                        className="notice-download"
                    >
                        <FileDown size={17} />

                        {language === "hi"
                            ? "डाउनलोड"
                            : "Download"}
                    </a>
                )}

            </div>

        </article>
    );
}

export default NoticeCard;