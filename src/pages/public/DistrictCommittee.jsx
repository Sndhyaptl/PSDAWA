
import React, { useMemo, useState } from "react";
import {
  Search,
  MapPin,
  Users,
  UserRound,
  Phone,
  Mail,
  X,
  ArrowLeft,
} from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import upDistricts from "../../data/upDistricts";
import districtCommittee from "../../data/districtCommittee";
import "../../styles/district-committee.css";

function DistrictCommittee() {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDistrictId, setSelectedDistrictId] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("all");

  const t = {
    eyebrow: isHindi ? "जिला स्तर" : "DISTRICT LEVEL",
    title: isHindi ? "जिला कार्यकारिणी समितियां" : "District Executive Committees",
    description: isHindi
      ? "उत्तर प्रदेश के विभिन्न जिलों की संगठनात्मक समितियों का विवरण यहां देखें।"
      : "Explore organizational committee information across the districts of Uttar Pradesh.",
    search: isHindi ? "जिले का नाम खोजें..." : "Search district name...",
    districtCount: isHindi ? "कुल जिले" : "Total Districts",
    memberCount: isHindi ? "समिति सदस्य" : "Committee Members",
    selectDistrict: isHindi ? "जिला चुनें" : "Select a District",
    allDesignations: isHindi ? "सभी पद" : "All Designations",
    emptyMembers: isHindi
      ? "इस जिले की समिति का विवरण अभी उपलब्ध नहीं है।"
      : "Committee details for this district are not available yet.",
    emptySearch: isHindi
      ? "कोई जिला नहीं मिला।"
      : "No district found.",
    back: isHindi ? "सभी जिले देखें" : "View All Districts",
    districtLabel: isHindi ? "जिला" : "District",
    noPhoto: isHindi ? "फोटो उपलब्ध नहीं" : "Photo unavailable",
  };

  const activeMembers = useMemo(
    () => districtCommittee.filter((member) => member.isActive !== false),
    []
  );

  const filteredDistricts = useMemo(() => {
    const query = searchTerm.trim().toLocaleLowerCase();

    if (!query) return upDistricts;

    return upDistricts.filter((district) =>
      `${district.nameEn} ${district.nameHi}`
        .toLocaleLowerCase()
        .includes(query)
    );
  }, [searchTerm]);

  const selectedDistrict = upDistricts.find(
    (district) => district.id === selectedDistrictId
  );

  const selectedMembers = useMemo(
    () =>
      activeMembers.filter(
        (member) => member.districtId === selectedDistrictId
      ),
    [activeMembers, selectedDistrictId]
  );

  const designations = useMemo(() => {
    const values = selectedMembers
      .map((member) =>
        isHindi ? member.designationHi : member.designationEn
      )
      .filter(Boolean);

    return [...new Set(values)];
  }, [selectedMembers, isHindi]);

  const filteredMembers = selectedMembers.filter((member) => {
    if (selectedDesignation === "all") return true;

    const designation = isHindi
      ? member.designationHi
      : member.designationEn;

    return designation === selectedDesignation;
  });

  const selectDistrict = (id) => {
    setSelectedDistrictId(id);
    setSelectedDesignation("all");
    setSearchTerm("");
  };

  return (
    <main className="district-committee-page">
      <section className="district-hero">
        <div className="container">
          <span className="district-eyebrow">{t.eyebrow}</span>
          <h1>{t.title}</h1>
          <p>{t.description}</p>

          <div className="district-breadcrumb">
            <a href="/">{isHindi ? "होम" : "Home"}</a>
            <span>/</span>
            <span>{t.title}</span>
          </div>
        </div>
      </section>

      <section className="district-main section-padding">
        <div className="container">
          {!selectedDistrict ? (
            <>
              <div className="district-heading-row">
                <div>
                  <span className="section-kicker">
                    {isHindi ? "उत्तर प्रदेश" : "UTTAR PRADESH"}
                  </span>
                  <h2>
                    {isHindi ? "अपने जिले की समिति खोजें" : "Find Your District Committee"}
                  </h2>
                  <p>{t.description}</p>
                </div>

                <div className="district-total-card">
                  <div className="district-total-icon">
                    <MapPin size={25} />
                  </div>
                  <div>
                    <strong>{upDistricts.length}</strong>
                    <span>{t.districtCount}</span>
                  </div>
                </div>
              </div>

              <div className="district-search-box">
                <Search size={20} />
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder={t.search}
                  aria-label={t.search}
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    aria-label={isHindi ? "खोज हटाएं" : "Clear search"}
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              {filteredDistricts.length > 0 ? (
                <div className="row g-3 district-grid">
                  {filteredDistricts.map((district, index) => (
                    <div className="col-6 col-md-4 col-lg-3" key={district.id}>
                      <button
                        type="button"
                        className="district-card"
                        onClick={() => selectDistrict(district.id)}
                      >
                        <span className="district-card-number">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="district-card-icon">
                          <MapPin size={21} />
                        </span>
                        <strong>
                          {isHindi ? district.nameHi : district.nameEn}
                        </strong>
                        <span className="district-card-action">
                          {isHindi ? "समिति देखें" : "View Committee"}
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="district-empty">
                  <Search size={38} />
                  <h3>{t.emptySearch}</h3>
                  <p>{t.search}</p>
                </div>
              )}
            </>
          ) : (
            <>
              <button
                type="button"
                className="district-back-button"
                onClick={() => {
                  setSelectedDistrictId("");
                  setSelectedDesignation("all");
                  setSearchTerm("");
                }}
              >
                <ArrowLeft size={18} />
                {t.back}
              </button>

              <div className="selected-district-heading">
                <div className="selected-district-icon">
                  <MapPin size={30} />
                </div>
                <div>
                  <span className="section-kicker">{t.districtLabel}</span>
                  <h2>
                    {isHindi
                      ? selectedDistrict.nameHi
                      : selectedDistrict.nameEn}
                  </h2>
                  <p>
                    {isHindi
                      ? "जिला समिति के पदाधिकारी एवं सदस्य"
                      : "District committee office-bearers and members"}
                  </p>
                </div>
              </div>

              <div className="district-member-toolbar">
                <div className="district-member-count">
                  <Users size={20} />
                  <span>
                    {selectedMembers.length} {t.memberCount}
                  </span>
                </div>

                {designations.length > 0 && (
                  <select
                    value={selectedDesignation}
                    onChange={(event) =>
                      setSelectedDesignation(event.target.value)
                    }
                    aria-label={t.allDesignations}
                  >
                    <option value="all">{t.allDesignations}</option>
                    {designations.map((designation) => (
                      <option key={designation} value={designation}>
                        {designation}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {filteredMembers.length > 0 ? (
                <div className="row g-4">
                  {filteredMembers.map((member) => {
                    const name = isHindi ? member.nameHi : member.nameEn;
                    const designation = isHindi
                      ? member.designationHi
                      : member.designationEn;
                    const bio = isHindi ? member.bioHi : member.bioEn;

                    return (
                      <div className="col-md-6 col-lg-3" key={member.id}>
                        <article className="district-member-card">
                          <div className="district-member-photo">
                            {member.photo ? (
                              <img src={member.photo} alt={name} />
                            ) : (
                              <UserRound size={55} />
                            )}
                          </div>

                          <div className="district-member-info">
                            <span className="district-member-designation">
                              {designation}
                            </span>
                            <h3>{name}</h3>

                            {bio && <p>{bio}</p>}

                            {(member.phone || member.email) && (
                              <div className="district-member-contact">
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
                <div className="district-empty">
                  <Users size={40} />
                  <h3>{t.emptyMembers}</h3>
                  <p>{t.note}</p>
                </div>
              )}
            </>
          )}

        </div>
      </section>
    </main>
  );
}

export default DistrictCommittee;
