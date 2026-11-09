
import React, { useMemo, useState } from "react";
import {
  Search,
  Users,
  UserRound,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  X,
} from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import stateCommitteeMembers from "../../data/stateCommittee";
import "../../styles/state-committee.css";

function StateCommittee() {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("all");

  const text = {
    eyebrow: isHindi ? "प्रदेश स्तर" : "STATE LEVEL",
    title: isHindi ? "प्रदेश कार्यकारिणी समिति" : "State Executive Committee",
    description: isHindi
      ? "प्रदेश कार्यकारिणी संगठन का नेतृत्व, नीतिगत निर्णय, समन्वय एवं प्रदेशव्यापी गतिविधियों का संचालन करती है।"
      : "The State Committee leads the organization, makes policy decisions, ensures coordination, and oversees statewide activities.",
    search: isHindi ? "नाम या जिले से खोजें..." : "Search by name or district...",
    all: isHindi ? "सभी पद" : "All Designations",
    emptyTitle: isHindi
      ? "प्रदेश समिति का विवरण उपलब्ध नहीं है"
      : "State committee details are not available",
    emptyDescription: isHindi
      ? "आधिकारिक रूप से सत्यापित सदस्यों की जानकारी उपलब्ध होने पर यहां प्रदर्शित की जाएगी।"
      : "Verified committee member information will be displayed here once it is available.",
    memberCount: isHindi ? "कुल सदस्य" : "Total Members",
    noResults: isHindi
      ? "आपकी खोज से कोई सदस्य नहीं मिला।"
      : "No members matched your search.",
    contact: isHindi ? "संपर्क विवरण" : "Contact Details",
    district: isHindi ? "जिला" : "District",
    responsibility: isHindi ? "परिचय" : "Profile",
    back: isHindi ? "होम पेज" : "Home Page",
  };

  const designations = useMemo(() => {
    const values = stateCommitteeMembers
      .filter((member) => member.isActive !== false)
      .map((member) =>
        isHindi ? member.designationHi : member.designationEn
      )
      .filter(Boolean);

    return [...new Set(values)];
  }, [isHindi]);

  const filteredMembers = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return stateCommitteeMembers.filter((member) => {
      if (member.isActive === false) return false;

      const name = isHindi ? member.nameHi : member.nameEn;
      const district = isHindi ? member.districtHi : member.districtEn;
      const designation = isHindi
        ? member.designationHi
        : member.designationEn;

      const matchesSearch =
        !search ||
        [name, district, designation].some((value) =>
          value?.toLowerCase().includes(search)
        );

      const matchesDesignation =
        selectedDesignation === "all" ||
        designation === selectedDesignation;

      return matchesSearch && matchesDesignation;
    });
  }, [searchTerm, selectedDesignation, isHindi]);

  const hasMembers = stateCommitteeMembers.some(
    (member) => member.isActive !== false
  );

  return (
    <main className="state-committee-page">
      <section className="state-committee-hero">
        <div className="container">
          <span className="state-committee-eyebrow">{text.eyebrow}</span>
          <h1>{text.title}</h1>
          <p>{text.description}</p>

          <div className="state-committee-breadcrumb">
            <a href="/">{text.back}</a>
            <span>/</span>
            <span>{text.title}</span>
          </div>
        </div>
      </section>

      <section className="state-committee-content section-padding">
        <div className="container">
          <div className="committee-intro-row">
            <div>
              <span className="section-kicker">
                {isHindi ? "हमारी नेतृत्व व्यवस्था" : "OUR LEADERSHIP"}
              </span>
              <h2>
                {isHindi ? "प्रदेश समिति के सदस्य" : "State Committee Members"}
              </h2>
              <p>{text.description}</p>
            </div>

            <div className="committee-count-card">
              <div className="committee-count-icon">
                <Users size={25} />
              </div>
              <div>
                <strong>{stateCommitteeMembers.filter(
                  (member) => member.isActive !== false
                ).length}</strong>
                <span>{text.memberCount}</span>
              </div>
            </div>
          </div>

          <div className="committee-filter-bar">
            <div className="committee-search">
              <Search size={19} />
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder={text.search}
                aria-label={text.search}
              />
              {searchTerm && (
                <button
                  type="button"
                  className="clear-search"
                  onClick={() => setSearchTerm("")}
                  aria-label={isHindi ? "खोज हटाएं" : "Clear search"}
                >
                  <X size={17} />
                </button>
              )}
            </div>

            <select
              value={selectedDesignation}
              onChange={(event) => setSelectedDesignation(event.target.value)}
              aria-label={text.all}
            >
              <option value="all">{text.all}</option>
              {designations.map((designation) => (
                <option key={designation} value={designation}>
                  {designation}
                </option>
              ))}
            </select>
          </div>

          {filteredMembers.length > 0 ? (
            <div className="row g-4">
              {filteredMembers.map((member) => {
                const name = isHindi ? member.nameHi : member.nameEn;
                const designation = isHindi
                  ? member.designationHi
                  : member.designationEn;
                const district = isHindi
                  ? member.districtHi
                  : member.districtEn;
                const bio = isHindi ? member.bioHi : member.bioEn;

                return (
                  <div className="col-md-6 col-lg-3" key={member.id}>
                    <article className="state-member-card">
                      <div className="state-member-photo">
                        {member.photo ? (
                          <img src={member.photo} alt={name} />
                        ) : (
                          <UserRound size={58} />
                        )}
                      </div>

                      <div className="state-member-info">
                        <span className="state-member-designation">
                          {designation}
                        </span>
                        <h3>{name}</h3>

                        {district && (
                          <p className="state-member-detail">
                            <MapPin size={16} />
                            {district}
                          </p>
                        )}

                        {bio && <p className="state-member-bio">{bio}</p>}

                        {(member.phone || member.email) && (
                          <div className="state-member-contact">
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
                        )}
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="committee-empty-state">
              <div className="committee-empty-icon">
                {hasMembers ? <Search size={38} /> : <Users size={42} />}
              </div>
              <h3>{hasMembers ? text.noResults : text.emptyTitle}</h3>
              <p>
                {hasMembers
                  ? text.noResults
                  : text.emptyDescription}
              </p>
              {(searchTerm || selectedDesignation !== "all") && (
                <button
                  type="button"
                  className="committee-reset-button"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedDesignation("all");
                  }}
                >
                  {isHindi ? "फिल्टर हटाएं" : "Clear Filters"}
                </button>
              )}
            </div>
          )}

        </div>
      </section>
    </main>
  );
}

export default StateCommittee;
