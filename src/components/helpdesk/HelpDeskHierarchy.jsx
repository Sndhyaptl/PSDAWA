import React, { useState } from "react";
import {
    Crown,
    Network,
    Building2,
    MapPin,
    ArrowDown,
    Users,
    Phone,
    Mail,
    MapPinned,
    ChevronDown,
    ChevronUp,
    ShieldCheck
} from "lucide-react";

import { useLanguage } from "../../hooks/useLanguage";

// --------------------------------------------------
// ORGANIZATION DATA
// Replace the sample details with your actual data.
// --------------------------------------------------

const levels = [
    {
        id: "state",
        title: "प्रदेश स्तर",
        titleEn: "State Level",
        subtitle: "प्रदेश कार्यकारिणी",
        subtitleEn: "State Executive Committee",
        icon: Crown,
        displayType: "profile",
        members: [
            {
                id: 1,
                name: "आदर्श सिंह",
                nameEn: "Adarsh Singh",
                phone: "7318346574",
                email: "",
                photo: ""
            },
            {
                id: 2,
                name: "रवि पटेल",
                nameEn: "Ravi Patel",
                phone: "7054929111",
                email: "",
                photo: ""
            },
            {
                id: 3,
                name: "चंदा देवी",
                nameEn: "Chanda Devi",
                phone: "8470935600",
                email: "",
                photo: ""
            },
            {
                id: 4,
                name: "पुष्पांजलि देवी",
                nameEn: "Puspanjali Devi",
                phone: "7307439290",
                email: "",
                photo: ""
            },
            {
                id: 5,
                name: "सिंगर सुभाष",
                nameEn: "Singer Subhash",
                phone: "8948524248",
                email: "",
                photo: ""
            },
            {
                id: 6,
                name: "कन्हैया जायसवाल",
                nameEn: "kanhaiya Jaiswal",
                phone: "9125341560",
                email: "",
                photo: ""
            }
        ]
    },
    {
        id: "division",
        title: "मंडल स्तर",
        titleEn: "Division Level",
        subtitle: "मंडल कार्यकारिणी",
        subtitleEn: "Divisional Executive Committee",
        icon: Network,
        displayType: "profile",
        members: [
    {
        id: 1,
        mandal: "लखनऊ मंडल",
        mandalEn: "Lucknow Division",
        name: "लखनऊ मंडल अध्यक्ष का नाम",
        nameEn: "Lucknow Division President",
        phone: "9000000003",
        email: "lucknow@example.com",
        photo: ""
    },
    {
        id: 2,
        mandal: "कानपुर मंडल",
        mandalEn: "Kanpur Division",
        name: "कानपुर मंडल अध्यक्ष का नाम",
        nameEn: "Kanpur Division President",
        phone: "9000000002",
        email: "kanpur@example.com",
        photo: ""
    },
    {
        id: 3,
        mandal: "आगरा मंडल",
        mandalEn: "Agra Division",
        name: "आगरा मंडल अध्यक्ष का नाम",
        nameEn: "Agra Division President",
        phone: "9000000003",
        email: "agra@example.com",
        photo: ""
    },
    {
        id: 4,
        mandal: "अलीगढ़ मंडल",
        mandalEn: "Aligarh Division",
        name: "अलीगढ़ मंडल अध्यक्ष का नाम",
        nameEn: "Aligarh Division President",
        phone: "9000000004",
        email: "aligarh@example.com",
        photo: ""
    },
    {
        id: 5,
        mandal: "प्रयागराज मंडल",
        mandalEn: "Prayagraj Division",
        name: "प्रयागराज मंडल अध्यक्ष का नाम",
        nameEn: "Prayagraj Division President",
        phone: "9000000005",
        email: "prayagraj@example.com",
        photo: ""
    },
    {
        id: 6,
        mandal: "वाराणसी मंडल",
        mandalEn: "Varanasi Division",
        name: "वाराणसी मंडल अध्यक्ष का नाम",
        nameEn: "Varanasi Division President",
        phone: "9000000006",
        email: "varanasi@example.com",
        photo: ""
    },
    {
        id: 7,
        mandal: "गोरखपुर मंडल",
        mandalEn: "Gorakhpur Division",
        name: "गोरखपुर मंडल अध्यक्ष का नाम",
        nameEn: "Gorakhpur Division President",
        phone: "9000000007",
        email: "gorakhpur@example.com",
        photo: ""
    },
    {
        id: 8,
        mandal: "बस्ती मंडल",
        mandalEn: "Basti Division",
        name: "बस्ती मंडल अध्यक्ष का नाम",
        nameEn: "Basti Division President",
        phone: "9000000008",
        email: "basti@example.com",
        photo: ""
    },
    {
        id: 9,
        mandal: "देवीपाटन मंडल",
        mandalEn: "Devipatan Division",
        name: "देवीपाटन मंडल अध्यक्ष का नाम",
        nameEn: "Devipatan Division President",
        phone: "9000000009",
        email: "devipatan@example.com",
        photo: ""
    },
    {
        id: 10,
        mandal: "अयोध्या मंडल",
        mandalEn: "Ayodhya Division",
        name: "अयोध्या मंडल अध्यक्ष का नाम",
        nameEn: "Ayodhya Division President",
        phone: "9000000010",
        email: "ayodhya@example.com",
        photo: ""
    },
    {
        id: 11,
        mandal: "बरेली मंडल",
        mandalEn: "Bareilly Division",
        name: "बरेली मंडल अध्यक्ष का नाम",
        nameEn: "Bareilly Division President",
        phone: "9000000011",
        email: "bareilly@example.com",
        photo: ""
    },
    {
        id: 12,
        mandal: "मुरादाबाद मंडल",
        mandalEn: "Moradabad Division",
        name: "मुरादाबाद मंडल अध्यक्ष का नाम",
        nameEn: "Moradabad Division President",
        phone: "9000000012",
        email: "moradabad@example.com",
        photo: ""
    },
    {
        id: 13,
        mandal: "मेरठ मंडल",
        mandalEn: "Meerut Division",
        name: "मेरठ मंडल अध्यक्ष का नाम",
        nameEn: "Meerut Division President",
        phone: "9000000013",
        email: "meerut@example.com",
        photo: ""
    },
    {
        id: 14,
        mandal: "सहारनपुर मंडल",
        mandalEn: "Saharanpur Division",
        name: "सहारनपुर मंडल अध्यक्ष का नाम",
        nameEn: "Saharanpur Division President",
        phone: "9000000014",
        email: "saharanpur@example.com",
        photo: ""
    },
    {
        id: 15,
        mandal: "झांसी मंडल",
        mandalEn: "Jhansi Division",
        name: "झांसी मंडल अध्यक्ष का नाम",
        nameEn: "Jhansi Division President",
        phone: "9000000015",
        email: "jhansi@example.com",
        photo: ""
    },
    {
        id: 16,
        mandal: "चित्रकूटधाम मंडल",
        mandalEn: "Chitrakoot Division",
        name: "चित्रकूटधाम मंडल अध्यक्ष का नाम",
        nameEn: "Chitrakoot Division President",
        phone: "9000000016",
        email: "chitrakoot@example.com",
        photo: ""
    },
    {
        id: 17,
        mandal: "आजमगढ़ मंडल",
        mandalEn: "Azamgarh Division",
        name: "आजमगढ़ मंडल अध्यक्ष का नाम",
        nameEn: "Azamgarh Division President",
        phone: "9000000017",
        email: "azamgarh@example.com",
        photo: ""
    },
    {
        id: 18,
        mandal: "मिर्जापुर मंडल",
        mandalEn: "Mirzapur Division",
        name: "मिर्जापुर मंडल अध्यक्ष का नाम",
        nameEn: "Mirzapur Division President",
        phone: "9000000018",
        email: "mirzapur@example.com",
        photo: ""
    }
]
    },
    {
        id: "district",
        title: "जनपद स्तर",
        titleEn: "District Level",
        subtitle: "जनपद कार्यकारिणी",
        subtitleEn: "District Executive Committee",
        icon: Building2,
        displayType: "none",
        members: []
    },
    {
        id: "block",
        title: "ब्लॉक स्तर",
        titleEn: "Block Level",
        subtitle: "ब्लॉक समन्वय व्यवस्था",
        subtitleEn: "Block Coordination Structure",
        icon: MapPin,
        displayType: "none",
        members: []
    }
];

// --------------------------------------------------
// PROFILE CARD - STATE AND DIVISION
// --------------------------------------------------

function MemberCard({ member, isHindi }) {
    return (
        <article className="org-helpdesk-member-card">

            <div className="org-helpdesk-member-image">
                <img
                    src={member.photo || "/images/team/default-user.png"}
                    alt={isHindi ? member.name : member.nameEn}
                    onError={(e) => {
                        e.currentTarget.src = "/images/team/default-user.jpg";
                    }}
                />
            </div>

            <div className="org-helpdesk-member-info">

                <h3>
                    {isHindi ? member.name : member.nameEn}
                </h3>
{member.mandal && (
                <span className="org-helpdesk-member-designation">
                    {isHindi
                        ? member.mandal
                        : member.mandalEn}
                </span>
)}
                {member.phone && (
                    <a
                        href={`tel:${member.phone}`}
                        className="org-helpdesk-contact-link"
                    >
                        <Phone size={15} />
                        <span>{member.phone}</span>
                    </a>
                )}

                {member.email && (
                    <a
                        href={`mailto:${member.email}`}
                        className="org-helpdesk-contact-link"
                    >
                        <Mail size={15} />
                        <span>{member.email}</span>
                    </a>
                )}

            </div>
        </article>
    );
}

// --------------------------------------------------
// DISTRICT MEMBER - WITHOUT PHOTO
// --------------------------------------------------

function DistrictMemberCard({ member, isHindi }) {
    return (
        <article className="org-helpdesk-district-member">

            <div className="org-helpdesk-district-member-main">

                <h4>
                    {isHindi ? member.name : member.nameEn}
                </h4>

                <span>
                    {isHindi
                        ? member.designation
                        : member.designationEn}
                </span>

                {(member.district || member.districtEn) && (
                    <small>
                        <MapPinned size={14} />
                        {isHindi
                            ? member.district
                            : member.districtEn}
                    </small>
                )}

            </div>

            <div className="org-helpdesk-district-contact">

                {member.phone && (
                    <a href={`tel:${member.phone}`}>
                        <Phone size={15} />
                        {member.phone}
                    </a>
                )}

                {member.email && (
                    <a href={`mailto:${member.email}`}>
                        <Mail size={15} />
                        {member.email}
                    </a>
                )}

            </div>

        </article>
    );
}

// --------------------------------------------------
// MAIN COMPONENT
// --------------------------------------------------

function HelpDeskHierarchy() {

    
    const { language } = useLanguage();

    const isHindi = language === "hi";

    const [expandedLevels, setExpandedLevels] = useState([]);

    const toggleLevel = (levelId) => {
        setExpandedLevels((previous) =>
            previous.includes(levelId)
                ? previous.filter((id) => id !== levelId)
                : [...previous, levelId]
        );
    };

    const expandAll = () => {
        setExpandedLevels(levels.map((level) => level.id));
    };

    const collapseAll = () => {
        setExpandedLevels([]);
    };

    const totalMembers = levels.reduce(
        (total, level) => total + level.members.length,
        0
    );

    return (
        <section className="org-helpdesk-hierarchy">

            <div className="container">

                {/* HEADER */}

                <div className="org-helpdesk-heading">

                    <span className="org-helpdesk-eyebrow">
                        <ShieldCheck size={16} />
                        {isHindi
                            ? "संगठनात्मक संरचना"
                            : "ORGANIZATIONAL STRUCTURE"}
                    </span>

                    <h2>
                        {isHindi
                            ? "हेल्प डेस्क पदाधिकारी"
                            : "Help Desk Office Bearers"}
                    </h2>

                    <p>
                        {isHindi
                            ? "प्रदेश से ब्लॉक स्तर तक संगठन की कार्यप्रणाली एवं पदाधिकारियों की जानकारी प्राप्त करें।"
                            : "Explore the organizational structure and office bearers from state to block level."}
                    </p>

                </div>

                {/* SUMMARY */}

                <div className="org-helpdesk-summary">

                    <div className="org-helpdesk-summary-item">
                        <Network size={22} />
                        <div>
                            <strong>{levels.length}</strong>
                            <span>
                                {isHindi
                                    ? "संगठनात्मक स्तर"
                                    : "Organizational Levels"}
                            </span>
                        </div>
                    </div>

                    <div className="org-helpdesk-summary-item">
                        <Users size={22} />
                        <div>
                            <strong>{totalMembers}</strong>
                            <span>
                                {isHindi
                                    ? "सूचीबद्ध पदाधिकारी"
                                    : "Listed Office Bearers"}
                            </span>
                        </div>
                    </div>

                </div>

                {/* CONTROLS */}

                <div className="org-helpdesk-controls">

                    <span>
                        {isHindi
                            ? "स्तर के अनुसार जानकारी देखें"
                            : "View information by organizational level"}
                    </span>

                    <div className="org-helpdesk-control-buttons">

                        <button
                            type="button"
                            onClick={expandAll}
                        >
                            <ChevronDown size={16} />
                            {isHindi ? "सभी खोलें" : "Expand All"}
                        </button>

                        <button
                            type="button"
                            onClick={collapseAll}
                        >
                            <ChevronUp size={16} />
                            {isHindi ? "सभी बंद करें" : "Collapse All"}
                        </button>

                    </div>

                </div>

                {/* HIERARCHY */}

                <div className="org-helpdesk-levels">

                    {levels.map((level, index) => {

                        const isExpanded =
                            expandedLevels.includes(level.id);

                        const LevelIcon = level.icon;

                        return (
                            <React.Fragment key={level.id}>

                                <article
                                    className={`org-helpdesk-level ${isExpanded ? "active" : ""}`}
                                >

                                    {/* LEVEL HEADER */}

                                    <button
                                        type="button"
                                        className="org-helpdesk-level-header"
                                        onClick={() => toggleLevel(level.id)}
                                        aria-expanded={isExpanded}
                                        aria-controls={`members-${level.id}`}
                                    >

                                        <div className="org-helpdesk-level-left">

                                            <div className="org-helpdesk-level-icon">
                                                <LevelIcon size={24} />
                                            </div>

                                            <div className="org-helpdesk-level-title">

                                                <span className="org-helpdesk-level-subtitle">
                                                    {isHindi
                                                        ? level.subtitle
                                                        : level.subtitleEn}
                                                </span>

                                                <h3>
                                                    {isHindi
                                                        ? level.title
                                                        : level.titleEn}
                                                </h3>

                                            </div>

                                        </div>

                                        <div className="org-helpdesk-level-right">

                                            <div className="org-helpdesk-level-member-count">
                                                <Users size={16} />

                                                <span>
                                                    {level.displayType === "none"
                                                        ? (isHindi
                                                            ? "संचालन व्यवस्था"
                                                            : "Operational Structure")
                                                        : `${level.members.length} ${isHindi
                                                            ? "सदस्य"
                                                            : "Members"}`}
                                                </span>
                                            </div>

                                            <span className="org-helpdesk-toggle-icon">
                                                {isExpanded
                                                    ? <ChevronUp size={21} />
                                                    : <ChevronDown size={21} />}
                                            </span>

                                        </div>

                                    </button>

                                    {/* COLLAPSIBLE CONTENT */}

                                    <div
                                        id={`members-${level.id}`}
                                        className={`org-helpdesk-collapsible ${isExpanded ? "open" : ""}`}
                                        aria-hidden={!isExpanded}
                                    >

                                        <div className="org-helpdesk-collapsible-inner">

                                            {/* STATE AND DIVISION PROFILE CARDS */}

                                            {level.displayType === "profile" && (
                                                <div className="org-helpdesk-members-grid">

                                                    {level.members.map((member) => (
                                                        <MemberCard
                                                            key={member.id}
                                                            member={member}
                                                            isHindi={isHindi}
                                                        />
                                                    ))}

                                                </div>
                                            )}

                                            {/* DISTRICT SIMPLE LIST */}

                                            {/* DISTRICT AND BLOCK NOTICE */}

{level.displayType === "none" && (
    <div className="org-helpdesk-block-notice">

        {level.id === "district" ? (
            <>
                <Building2 size={24} />

                <label>
                    {isHindi
                        ? "किसी भी समस्या के लिए पहले जिला अध्यक्ष से संपर्क करें। समाधान न होने पर जिला अध्यक्ष मंडल प्रभारी को सूचित करेंगे।"
                        : "For any issue, first contact the District President. If unresolved, the District President will inform the Divisional In-charge."}
                </label>
            </>
        ) : level.id === "block" ? (
            <>
                <MapPin size={24} />

                <label>
                    {isHindi
                        ? "किसी भी समस्या के लिए पहले ब्लॉक अध्यक्ष से संपर्क करें। समाधान न होने पर ब्लॉक अध्यक्ष जिला अध्यक्ष को सूचित करेंगे।"
                        : "For any issue, first contact your Block President. If unresolved, the Block President will inform the District President."}
                </label>
            </>
        ) : null}

    </div>
)}

                                        </div>

                                    </div>

                                </article>

                                {/* CONNECTOR */}

                                {index !== levels.length - 1 && (
                                    <div className="org-helpdesk-connector">
                                        <ArrowDown size={20} />
                                    </div>
                                )}

                            </React.Fragment>
                        );
                    })}

                </div>

            </div>

        </section>
    );
}

export default HelpDeskHierarchy;
