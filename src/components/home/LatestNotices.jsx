import { Link } from "react-router-dom";

import {
    Bell,
    ArrowRight
} from "lucide-react";

import SectionTitle from "../SectionTitle";
import EmptyState from "../EmptyState";

import { useLanguage } from "../../hooks/useLanguage";

function LatestNotices({ notices = [] }) {

    const { language } = useLanguage();

    const isHindi = language === "hi";

    return (
        <section className="latest-notices section-padding">

            <div className="container">

                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

                    <SectionTitle
                        title="नवीनतम सूचनाएं"
                        titleEn="Latest Notices"
                        subtitle="संगठन से जुड़ी महत्वपूर्ण सूचनाएं और घोषणाएं।"
                        subtitleEn="Important information and announcements from the association."
                        centered={false}
                    />

                    <Link
                        to="/notices"
                        className="read-more-link notice-all-link"
                    >
                        {isHindi
                            ? "सभी सूचनाएं"
                            : "View All Notices"}

                        <ArrowRight size={17} />
                    </Link>

                </div>

                {notices.length === 0 ? (

                    <EmptyState
                        title={
                            isHindi
                                ? "अभी कोई सूचना उपलब्ध नहीं है"
                                : "No notices available yet"
                        }
                        description={
                            isHindi
                                ? "नई सूचनाएं प्रकाशित होने पर यहां दिखाई देंगी।"
                                : "New notices will appear here when published."
                        }
                    />

                ) : (

                    <div className="row g-4">

                        {notices.slice(0, 3).map(notice => (

                            <div
                                className="col-lg-4"
                                key={notice.id}
                            >

                                <article className="home-notice-card">

                                    <div className="home-notice-icon">
                                        <Bell size={22} />
                                    </div>

                                    <small>
                                        {notice.date}
                                    </small>

                                    <h5>
                                        {isHindi
                                            ? notice.titleHi
                                            : notice.titleEn}
                                    </h5>

                                    <p>
                                        {isHindi
                                            ? notice.descriptionHi
                                            : notice.descriptionEn}
                                    </p>

                                    {notice.attachment && (
                                        <a
                                            href={notice.attachment}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {isHindi
                                                ? "सूचना देखें"
                                                : "View Notice"}
                                        </a>
                                    )}

                                </article>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </section>
    );
}

export default LatestNotices;