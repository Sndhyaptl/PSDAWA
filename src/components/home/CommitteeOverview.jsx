import { Link } from "react-router-dom";

import {
    MapPinned,
    MapPin,
    Building2,
    ArrowRight
} from "lucide-react";

import { useLanguage } from "../../hooks/useLanguage";

function CommitteeOverview() {

    const { language } = useLanguage();

    const isHindi = language === "hi";

    const committees = [
        {
            icon: MapPinned,
            title: "प्रदेश कार्यकारिणी",
            titleEn: "State Committee",
            description: "प्रदेश स्तर पर संगठनात्मक समन्वय।",
            descriptionEn: "Organizational coordination at state level.",
            link: "/state-committee"
        },
        {
            icon: MapPin,
            title: "जिला कार्यकारिणी",
            titleEn: "District Committee",
            description: "जिला स्तर पर संगठनात्मक गतिविधियां।",
            descriptionEn: "Organizational activities at district level.",
            link: "/district-committee"
        },
        {
            icon: Building2,
            title: "ब्लॉक कार्यकारिणी",
            titleEn: "Block Committee",
            description: "ब्लॉक स्तर पर सदस्यों का समन्वय।",
            descriptionEn: "Member coordination at block level.",
            link: "/block-committee"
        }
    ];

    return (
        <section className="committee-overview section-padding">

            <div className="container">

                <div className="section-title text-center">

                    <h2>
                        {isHindi
                            ? "हमारी संगठनात्मक संरचना"
                            : "Our Organizational Structure"}
                    </h2>

                    <div className="title-divider">
                        <span />
                    </div>

                    <p>
                        {isHindi
                            ? "प्रदेश, जिला और ब्लॉक स्तर पर संगठनात्मक व्यवस्था।"
                            : "Organizational structure at state, district and block levels."}
                    </p>

                </div>

                <div className="row g-4">

                    {committees.map((committee, index) => {

                        const Icon = committee.icon;

                        return (
                            <div
                                className="col-lg-4 col-md-6"
                                key={index}
                            >

                                <div className="committee-overview-card">

                                    <div className="committee-overview-icon">
                                        <Icon size={34} />
                                    </div>

                                    <h4>
                                        {isHindi
                                            ? committee.title
                                            : committee.titleEn}
                                    </h4>

                                    <p>
                                        {isHindi
                                            ? committee.description
                                            : committee.descriptionEn}
                                    </p>

                                    <Link to={committee.link}>
                                        {isHindi
                                            ? "समिति देखें"
                                            : "Explore Committee"}

                                        <ArrowRight size={17} />
                                    </Link>

                                </div>

                            </div>
                        );

                    })}

                </div>

            </div>

        </section>
    );
}

export default CommitteeOverview;