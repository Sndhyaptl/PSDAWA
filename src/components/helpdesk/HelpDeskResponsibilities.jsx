
import {
    Landmark,
    Network,
    Building2,
    MapPin,
    CheckCircle2
} from "lucide-react";

import { useLanguage } from "../../hooks/useLanguage";

function HelpDeskResponsibilities() {
    
    const { language } = useLanguage();

    const isHindi = language === "hi";

    const responsibilities = [
        {
            icon: Landmark,
            title: "प्रदेश स्तर",
            titleEn: "State Level",
            points: [
                "सम्पूर्ण उत्तर प्रदेश में हेल्प डेस्क का समन्वय करना।",
                "प्रदेश स्तर की विभागीय समस्याओं पर कार्य करना।",
                "वरिष्ठ संगठनात्मक प्रतिनिधियों के साथ समन्वय करना।",
                "सभी मंडलीय हेल्प डेस्क टीमों की निगरानी करना।"
            ],
            pointsEn: [
                "Coordinate Help Desk activities across Uttar Pradesh.",
                "Address departmental issues at the state level.",
                "Coordinate with senior organizational representatives.",
                "Monitor all divisional Help Desk teams."
            ],
            color: "state"
        },
        {
            icon: Network,
            title: "मंडल स्तर",
            titleEn: "Divisional Level",
            points: [
                "मंडल के अंतर्गत आने वाले जनपदों के बीच समन्वय करना।",
                "जिला स्तर की शिकायतों की निगरानी करना।",
                "अनसुलझे मामलों को प्रदेश स्तर तक अग्रसारित करना।"
            ],
            pointsEn: [
                "Coordinate between districts within the division.",
                "Monitor district-level complaints.",
                "Escalate unresolved issues to the state level."
            ],
            color: "division"
        },
        {
            icon: Building2,
            title: "जनपद स्तर",
            titleEn: "District Level",
            points: [
                "ब्लॉक स्तर से प्राप्त शिकायतों को एकत्र करना।",
                "जिला स्तरीय अधिकारियों से समन्वय करना।",
                "शिकायतों के समाधान की प्रगति की निगरानी करना।",
                "महत्वपूर्ण मामलों की जानकारी मंडल टीम को देना।"
            ],
            pointsEn: [
                "Collect complaints received from block-level teams.",
                "Coordinate with district-level officials.",
                "Monitor complaint resolution progress.",
                "Report important matters to the divisional team."
            ],
            color: "district"
        },
        {
            icon: MapPin,
            title: "ब्लॉक स्तर",
            titleEn: "Block Level",
            points: [
                "पंचायत सहायकों से सीधे संपर्क बनाए रखना।",
                "शिकायतों एवं समस्याओं को प्राप्त करना।",
                "आवश्यक जानकारी एवं दस्तावेज एकत्र करना।",
                "शिकायतों को जिला स्तरीय प्रतिनिधियों तक पहुंचाना।"
            ],
            pointsEn: [
                "Maintain direct communication with Panchayat Sahayaks.",
                "Receive complaints and concerns.",
                "Collect required information and documents.",
                "Forward complaints to district-level representatives."
            ],
            color: "block"
        }
    ];

    return (
        <section className="org-helpdesk-section org-helpdesk-responsibility-section">
            <div className="container">
                <div className="org-helpdesk-section-heading">
                    <span>{isHindi ? "भूमिका एवं दायित्व" : "ROLES & RESPONSIBILITIES"}</span>
                    <h2>{isHindi ? "प्रत्येक स्तर की जिम्मेदारियाँ" : "Responsibilities at Each Level"}</h2>
                    <p>
                        {isHindi
                            ? "हेल्प डेस्क के प्रत्येक स्तर की निर्धारित भूमिका और कार्य।"
                            : "Defined roles and duties of every level of the Help Desk."}
                    </p>
                </div>

                <div className="org-helpdesk-responsibility-grid">
                    {responsibilities.map((item, index) => {
                        const Icon = item.icon;
                        const points = isHindi ? item.points : item.pointsEn;

                        return (
                            <article
                                className={`org-helpdesk-responsibility-card ${item.color}`}
                                key={index}
                            >
                                <div className="org-helpdesk-responsibility-heading">
                                    <div>
                                        <Icon size={24} />
                                    </div>
                                    <span>0{index + 1}</span>
                                </div>

                                <h3>{isHindi ? item.title : item.titleEn}</h3>

                                <ul>
                                    {points.map((point, pointIndex) => (
                                        <li key={pointIndex}>
                                            <CheckCircle2 size={17} />
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default HelpDeskResponsibilities;
