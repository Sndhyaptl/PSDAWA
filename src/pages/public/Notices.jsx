
import { useMemo, useState } from "react";
import {
    Search,
    FileText,
    Download,
    CalendarDays,
    Filter,
    X,
    Image as ImageIcon,
    ExternalLink
} from "lucide-react";

import { useLanguage } from "../../hooks/useLanguage";
import SectionTitle from "../../components/SectionTitle";
import EmptyState from "../../components/EmptyState";

import notices from "../../data/notices";
import "../../styles/notices.css";

const categories = [
    { value: "all", hi: "सभी सूचनाएं", en: "All Notice Types" },
    { value: "important", hi: "महत्वपूर्ण सूचनाएँ", en: "Important Notices" },
    { value: "organizational", hi: "संगठनात्मक सूचनाएँ", en: "Organizational Notices" },
    { value: "government-orders", hi: "शासनादेश एवं विभागीय आदेश", en: "Government Orders" },
    { value: "meetings-events", hi: "बैठक एवं कार्यक्रम", en: "Meetings & Events" },
    { value: "employee-welfare", hi: "पंचायत सहायक हित संबंधी सूचनाएँ", en: "Employee Welfare Updates" },
    { value: "memorandums", hi: "ज्ञापन एवं मांग पत्र", en: "Memorandums & Demands" },
    { value: "appointments", hi: "नियुक्ति एवं पदाधिकारी सूचना", en: "Appointments & Designations" },
    { value: "helpdesk", hi: "हेल्प डेस्क एवं शिकायतें", en: "Help Desk & Grievances" },
    { value: "achievements", hi: "उपलब्धियाँ एवं संगठनात्मक अपडेट", en: "Achievements & Updates" },
    { value: "other", hi: "अन्य सूचनाएँ", en: "Other Notices" }
];

function formatDate(date, language) {
    if (!date) return "";

    return new Intl.DateTimeFormat(
        language === "hi" ? "hi-IN" : "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    ).format(new Date(`${date}T00:00:00`));
}

function getAttachmentType(notice) {
    if (notice.attachmentType) {
        return notice.attachmentType.toLowerCase();
    }

    const path = notice.attachment?.split("?")[0].toLowerCase() || "";

    if (/\.(jpg|jpeg|png|webp|gif|avif)$/.test(path)) {
        return "image";
    }

    if (path.endsWith(".pdf")) {
        return "pdf";
    }

    return "other";
}

export default function Notices() {
    const { language } = useLanguage();
    const isHindi = language === "hi";

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");

    const categoryLabel = (value) => {
        const item = categories.find((x) => x.value === value);
        return item ? (isHindi ? item.hi : item.en) : value;
    };

    const filteredNotices = useMemo(() => {
        const keyword = search.trim().toLowerCase();

        return [...notices]
            .filter((notice) => {
                const matchesCategory =
                    category === "all" || notice.category === category;

                const searchableText = [
                    notice.titleHi,
                    notice.titleEn,
                    notice.descriptionHi,
                    notice.descriptionEn,
                    notice.attachmentNameHi,
                    notice.attachmentNameEn
                ]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();

                const matchesSearch =
                    !keyword || searchableText.includes(keyword);

                return (
                    notice.isActive !== false &&
                    matchesCategory &&
                    matchesSearch
                );
            })
            .sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [search, category]);

    const clearFilters = () => {
        setSearch("");
        setCategory("all");
    };

    const getTitle = (notice) =>
        isHindi
            ? notice.titleHi || notice.titleEn
            : notice.titleEn || notice.titleHi;

    const getDescription = (notice) =>
        isHindi
            ? notice.descriptionHi || notice.descriptionEn
            : notice.descriptionEn || notice.descriptionHi;

    const getAttachmentName = (notice) =>
        isHindi
            ? notice.attachmentNameHi || "सूचना देखें"
            : notice.attachmentNameEn || "View Notice";

    return (
        <div className="notices-page">

            {/* Hero Banner */}
            <section className="notices-banner">
                <div className="container">
                    <span className="notices-eyebrow">
                        {isHindi ? "सूचना एवं अपडेट" : "INFORMATION & UPDATES"}
                    </span>

                    <h1>
                        {isHindi ? "सूचना एवं समाचार" : "Notices & News"}
                    </h1>

                    <p>
                        {isHindi
                            ? "संगठन द्वारा जारी आधिकारिक सूचनाएं, घोषणाएं एवं अपडेट यहां देखें।"
                            : "Find official notices, announcements and updates issued by the association."}
                    </p>
                </div>
            </section>

            <section className="container notices-content">

                <SectionTitle
                    title={isHindi ? "सूचना केंद्र" : "Notice Center"}
                    subtitle={
                        isHindi
                            ? "सभी आधिकारिक सूचनाएं एक ही स्थान पर देखें।"
                            : "Browse all official notices in one place."
                    }
                />

                {/* Search and Filter */}
                <div className="notice-toolbar">

                    <div className="notice-search">
                        <Search size={19} />

                        <input
                            type="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder={
                                isHindi ? "सूचना खोजें..." : "Search notices..."
                            }
                        />

                        {search && (
                            <button
                                type="button"
                                className="notice-clear-search"
                                onClick={() => setSearch("")}
                            >
                                <X size={17} />
                            </button>
                        )}
                    </div>

                    <div className="notice-filter">
                        <Filter size={18} />

                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            {categories.map((item) => (
                                <option key={item.value} value={item.value}>
                                    {isHindi ? item.hi : item.en}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Results */}
                <div className="notice-results-info">
                    <span>
                        {isHindi
                            ? `कुल ${filteredNotices.length} सूचनाएं`
                            : `${filteredNotices.length} notices found`}
                    </span>

                    <span className="notice-active-filter">
                        {categoryLabel(category)}
                    </span>

                    {(search || category !== "all") && (
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="notice-reset"
                        >
                            <X size={15} />
                            {isHindi ? "फिल्टर हटाएं" : "Clear filters"}
                        </button>
                    )}
                </div>

                {/* Compact Notice Table */}
                {filteredNotices.length > 0 ? (
                    <div className="notice-table-wrapper">
                        <table className="notice-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>{isHindi ? "सूचना का विवरण" : "Notice Details"}</th>
                                    <th>{isHindi ? "श्रेणी" : "Category"}</th>
                                    <th>{isHindi ? "दिनांक" : "Date"}</th>
                                    <th>{isHindi ? "दस्तावेज़" : "Attachment"}</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredNotices.map((notice, index) => {
                                    const attachmentType = getAttachmentType(notice);

                                    return (
                                        <tr key={notice.id}>
                                            <td className="notice-table-number">
                                                {index + 1}
                                            </td>

                                            <td className="notice-table-details">
                                                <div className="notice-table-title">
                                                    {getTitle(notice)}

                                                    {notice.isImportant && (
                                                        <span className="notice-important">
                                                            {isHindi ? "महत्वपूर्ण" : "Important"}
                                                        </span>
                                                    )}
                                                </div>

                                                {getDescription(notice) && (
                                                    <p>{getDescription(notice)}</p>
                                                )}
                                            </td>

                                            <td>
                                                <span className="notice-category">
                                                    {categoryLabel(notice.category)}
                                                </span>
                                            </td>

                                            <td className="notice-table-date">
                                                <CalendarDays size={14} />
                                                {formatDate(notice.date, language)}
                                            </td>

                                            <td>
                                                {notice.attachment ? (
                                                    
<div className="notice-table-actions">

    {/* View Attachment */}
    <a
        href={notice.attachment}
        target="_blank"
        rel="noopener noreferrer"
        className="notice-table-action"
        title={
            isHindi
                ? "दस्तावेज़ देखें"
                : "View Attachment"
        }
    >
        {attachmentType === "image" ? (
            <ImageIcon size={16} />
        ) : (
            <FileText size={16} />
        )}

        <span>
            {isHindi ? "देखें" : "View"}
        </span>
    </a>

    {/* Download Attachment - Image and PDF */}
    <a
    href={notice.attachment}
    download={notice.attachmentFileName || true}
    className="notice-table-action notice-table-download"
    title={isHindi ? "डाउनलोड करें" : "Download Attachment"}
>
    <Download size={16} />
    <span>{isHindi ? "डाउनलोड" : "Download"}</span>
</a>

</div>

                                                ) : (
                                                    <span className="notice-no-attachment">
                                                        {isHindi ? "उपलब्ध नहीं" : "N/A"}
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="notice-empty">
                        <EmptyState
                            title={
                                isHindi ? "कोई सूचना नहीं मिली" : "No notices found"
                            }
                            description={
                                isHindi
                                    ? "अपनी खोज या सूचना प्रकार बदलकर पुनः प्रयास करें।"
                                    : "Try changing your search or notice type."
                            }
                        />

                        <button
                            type="button"
                            className="notice-reset notice-reset-empty"
                            onClick={clearFilters}
                        >
                            {isHindi ? "सभी सूचनाएं देखें" : "View all notices"}
                        </button>
                    </div>
                )}

            </section>
        </div>
    );
}
