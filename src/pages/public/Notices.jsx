
import { useMemo, useState } from "react";
import {
  Search,
  FileText,
  Download,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Filter,
  X
} from "lucide-react";

import { useLanguage } from "../../hooks/useLanguage";
import SectionTitle from "../../components/SectionTitle";
import EmptyState from "../../components/EmptyState";

import notices from "../../data/notices";
import "../../styles/notices.css";

const PAGE_SIZE = 6;

const categories = [
  { value: "all", hi: "सभी श्रेणियां", en: "All Categories" },
  { value: "meeting", hi: "बैठक", en: "Meetings" },
  { value: "announcement", hi: "घोषणा", en: "Announcements" },
  { value: "membership", hi: "सदस्यता", en: "Membership" },
  { value: "event", hi: "कार्यक्रम", en: "Events" },
  { value: "other", hi: "अन्य", en: "Other" }
];

function formatDate(date, language) {
  if (!date) return "";

  const locale = language === "hi" ? "hi-IN" : "en-IN";

  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(`${date}T00:00:00`));
}

export default function Notices() {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);

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
          notice.descriptionEn
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        const matchesSearch =
          !keyword || searchableText.includes(keyword);

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [search, category]);

  const totalPages = Math.ceil(filteredNotices.length / PAGE_SIZE);

  const currentPage = Math.min(page, Math.max(totalPages, 1));

  const paginatedNotices = filteredNotices.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleCategory = (value) => {
    setCategory(value);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setPage(1);
  };

  const categoryLabel = (value) => {
    const item = categories.find((x) => x.value === value);
    return item ? (isHindi ? item.hi : item.en) : value;
  };

  return (
    <div className="notices-page">
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
          title={isHindi ? "सभी सूचनाएं" : "All Notices"}
          subtitle={
            isHindi
              ? "महत्वपूर्ण सूचनाओं को खोजें और डाउनलोड करें।"
              : "Search and download important association notices."
          }
        />

        <div className="notice-toolbar">
          <div className="notice-search">
            <Search size={19} />

            <input
              type="search"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder={
                isHindi
                  ? "सूचना खोजें..."
                  : "Search notices..."
              }
              aria-label={isHindi ? "सूचना खोजें" : "Search notices"}
            />

            {search && (
              <button
                type="button"
                className="notice-clear-search"
                onClick={() => handleSearch("")}
                aria-label="Clear search"
              >
                <X size={17} />
              </button>
            )}
          </div>

          <div className="notice-filter">
            <Filter size={18} />

            <select
              value={category}
              onChange={(e) => handleCategory(e.target.value)}
              aria-label={isHindi ? "श्रेणी चुनें" : "Select category"}
            >
              {categories.map((item) => (
                <option key={item.value} value={item.value}>
                  {isHindi ? item.hi : item.en}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="notice-results-info">
          <span>
            {isHindi
              ? `कुल ${filteredNotices.length} सूचनाएं`
              : `${filteredNotices.length} notices found`}
          </span>

          {(search || category !== "all") && (
            <button
              type="button"
              onClick={clearFilters}
              className="notice-reset"
            >
              {isHindi ? "फिल्टर हटाएं" : "Clear filters"}
            </button>
          )}
        </div>

        {paginatedNotices.length > 0 ? (
          <>
            <div className="notice-list">
              {paginatedNotices.map((notice) => {
                const title = isHindi
                  ? notice.titleHi || notice.titleEn
                  : notice.titleEn || notice.titleHi;

                const description = isHindi
                  ? notice.descriptionHi || notice.descriptionEn
                  : notice.descriptionEn || notice.descriptionHi;

                return (
                  <article className="notice-card" key={notice.id}>
                    <div className="notice-card-icon">
                      <FileText size={25} />
                    </div>

                    <div className="notice-card-body">
                      <div className="notice-card-meta">
                        <span className="notice-category">
                          {categoryLabel(notice.category)}
                        </span>

                        {notice.isImportant && (
                          <span className="notice-important">
                            {isHindi ? "महत्वपूर्ण" : "Important"}
                          </span>
                        )}

                        <span className="notice-date">
                          <CalendarDays size={14} />
                          {formatDate(notice.date, language)}
                        </span>
                      </div>

                      <h3>{title}</h3>

                      {description && <p>{description}</p>}

                      {notice.attachment && (
                        <a
                          className="notice-download"
                          href={notice.attachment}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                        >
                          <Download size={17} />
                          {isHindi
                            ? notice.attachmentNameHi ||
                              "सूचना डाउनलोड करें"
                            : notice.attachmentNameEn ||
                              "Download Notice"}
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>

            {totalPages > 1 && (
              <nav
                className="notice-pagination"
                aria-label="Notices pagination"
              >
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft size={18} />
                  {isHindi ? "पिछला" : "Previous"}
                </button>

                <span>
                  {isHindi ? "पृष्ठ" : "Page"} {currentPage} / {totalPages}
                </span>

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setPage((p) => Math.min(totalPages, p + 1))
                  }
                >
                  {isHindi ? "अगला" : "Next"}
                  <ChevronRight size={18} />
                </button>
              </nav>
            )}
          </>
        ) : (
          <div className="notice-empty">
            <EmptyState
              title={
                search || category !== "all"
                  ? isHindi
                    ? "कोई सूचना नहीं मिली"
                    : "No notices found"
                  : isHindi
                    ? "अभी कोई सूचना उपलब्ध नहीं है"
                    : "No notices available yet"
              }
              description={
                search || category !== "all"
                  ? isHindi
                    ? "अपनी खोज या फिल्टर बदलकर पुनः प्रयास करें।"
                    : "Try changing your search or category filter."
                  : isHindi
                    ? "सत्यापित सूचनाएं जारी होने पर यहां प्रकाशित की जाएंगी।"
                    : "Verified association notices will be published here when available."
              }
            />

            {(search || category !== "all") && (
              <button
                type="button"
                className="notice-reset notice-reset-empty"
                onClick={clearFilters}
              >
                {isHindi ? "सभी सूचनाएं देखें" : "View all notices"}
              </button>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
