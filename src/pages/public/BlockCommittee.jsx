
import React, { useMemo, useState } from "react";
import {
  Search,
  MapPin,
  Users,
  UserRound,
  Phone,
  Mail,
  ArrowLeft,
  X,
  Building2,
} from "lucide-react";

import { useLanguage } from "../../hooks/useLanguage";
import upDistricts from "../../data/upDistricts";
import upBlocks from "../../data/upBlocks";
import blockCommittee from "../../data/blockCommittee";
import "../../styles/block-committee.css";

function BlockCommittee() {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  const [selectedDistrictId, setSelectedDistrictId] = useState("");
  const [selectedBlockId, setSelectedBlockId] = useState("");
  const [districtSearch, setDistrictSearch] = useState("");
  const [blockSearch, setBlockSearch] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("all");

  const t = {
    eyebrow: isHindi ? "विकासखंड स्तर" : "BLOCK LEVEL",
    title: isHindi ? "ब्लॉक कार्यकारिणी समिति" : "Block Executive Committee",
    description: isHindi
      ? "जिला और विकासखंड का चयन करके संबंधित ब्लॉक समिति का विवरण देखें।"
      : "Select a district and block to explore the corresponding block committee.",
    district: isHindi ? "जिला चुनें" : "Select District",
    block: isHindi ? "ब्लॉक चुनें" : "Select Block",
    searchDistrict: isHindi ? "जिले का नाम खोजें..." : "Search district...",
    searchBlock: isHindi ? "ब्लॉक का नाम खोजें..." : "Search block...",
    allDesignations: isHindi ? "सभी पद" : "All Designations",
    memberCount: isHindi ? "समिति सदस्य" : "Committee Members",
    emptyDistrict: isHindi
      ? "इस जिले की ब्लॉक सूची अभी उपलब्ध नहीं है।"
      : "The block directory for this district is not available yet.",
    emptyBlock: isHindi
      ? "कोई ब्लॉक नहीं मिला।"
      : "No block found.",
    emptyMembers: isHindi
      ? "इस ब्लॉक की समिति का विवरण अभी उपलब्ध नहीं है।"
      : "Committee details for this block are not available yet.",
    noDistricts: isHindi
      ? "कोई जिला नहीं मिला।"
      : "No district found.",
    backDistricts: isHindi ? "जिले बदलें" : "Change District",
    backBlocks: isHindi ? "ब्लॉक सूची पर वापस जाएं" : "Back to Block List",
  };

  const activeMembers = useMemo(
    () => blockCommittee.filter((member) => member.isActive !== false),
    []
  );

  const filteredDistricts = useMemo(() => {
    const query = districtSearch.trim().toLocaleLowerCase();

    if (!query) return upDistricts;

    return upDistricts.filter((district) =>
      `${district.nameEn} ${district.nameHi}`
        .toLocaleLowerCase()
        .includes(query)
    );
  }, [districtSearch]);

  const selectedDistrict = upDistricts.find(
    (district) => district.id === selectedDistrictId
  );

  const availableBlocks = selectedDistrictId
    ? upBlocks[selectedDistrictId] || []
    : [];

  const filteredBlocks = useMemo(() => {
    const query = blockSearch.trim().toLocaleLowerCase();

    if (!query) return availableBlocks;

    return availableBlocks.filter((block) =>
      `${block.nameEn} ${block.nameHi}`
        .toLocaleLowerCase()
        .includes(query)
    );
  }, [availableBlocks, blockSearch]);

  const selectedBlock = availableBlocks.find(
    (block) => block.id === selectedBlockId
  );

  const selectedMembers = useMemo(
    () =>
      activeMembers.filter(
        (member) =>
          member.districtId === selectedDistrictId &&
          member.blockId === selectedBlockId
      ),
    [activeMembers, selectedDistrictId, selectedBlockId]
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

  const getDistrictName = (district) =>
    isHindi ? district.nameHi : district.nameEn;

  const getBlockName = (block) =>
    isHindi ? block.nameHi : block.nameEn;

  const handleDistrictSelect = (districtId) => {
    setSelectedDistrictId(districtId);
    setSelectedBlockId("");
    setDistrictSearch("");
    setBlockSearch("");
    setSelectedDesignation("all");
  };

  const handleDistrictReset = () => {
    setSelectedDistrictId("");
    setSelectedBlockId("");
    setDistrictSearch("");
    setBlockSearch("");
    setSelectedDesignation("all");
  };

  const handleBlockReset = () => {
    setSelectedBlockId("");
    setBlockSearch("");
    setSelectedDesignation("all");
  };

  return (
    <main className="block-committee-page">
      <section className="block-hero">
        <div className="container">
          <span className="block-eyebrow">{t.eyebrow}</span>
          <h1>{t.title}</h1>
          <p>{t.description}</p>

          <div className="block-breadcrumb">
            <a href="/">{isHindi ? "होम" : "Home"}</a>
            <span>/</span>
            <span>{t.title}</span>
          </div>
        </div>
      </section>

      <section className="block-main section-padding">
        <div className="container">
          {/* District selection */}
          {!selectedDistrict && (
            <>
              <div className="block-page-heading">
                <span className="section-kicker">
                  {isHindi ? "चरण 1" : "STEP 1"}
                </span>
                <h2>{t.district}</h2>
                <p>
                  {isHindi
                    ? "सबसे पहले अपना जिला चुनें।"
                    : "First, choose your district."}
                </p>
              </div>

              <div className="block-search">
                <Search size={19} />
                <input
                  type="search"
                  value={districtSearch}
                  onChange={(event) => setDistrictSearch(event.target.value)}
                  placeholder={t.searchDistrict}
                  aria-label={t.searchDistrict}
                />
                {districtSearch && (
                  <button
                    type="button"
                    onClick={() => setDistrictSearch("")}
                    aria-label={isHindi ? "खोज हटाएं" : "Clear search"}
                  >
                    <X size={17} />
                  </button>
                )}
              </div>

              {filteredDistricts.length > 0 ? (
                <div className="row g-3">
                  {filteredDistricts.map((district) => (
                    <div className="col-6 col-md-4 col-lg-3" key={district.id}>
                      <button
                        type="button"
                        className="block-district-card"
                        onClick={() => handleDistrictSelect(district.id)}
                      >
                        <MapPin size={23} />
                        <strong>{getDistrictName(district)}</strong>
                        <span>
                          {isHindi ? "ब्लॉक देखें" : "View Blocks"}
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="block-empty-state">
                  <Search size={38} />
                  <h3>{t.noDistricts}</h3>
                </div>
              )}
            </>
          )}

          {/* Block selection */}
          {selectedDistrict && !selectedBlock && (
            <>
              <button
                type="button"
                className="block-back-button"
                onClick={handleDistrictReset}
              >
                <ArrowLeft size={18} />
                {t.backDistricts}
              </button>

              <div className="block-selected-heading">
                <div className="block-selected-icon">
                  <MapPin size={28} />
                </div>
                <div>
                  <span className="section-kicker">
                    {isHindi ? "चयनित जिला" : "SELECTED DISTRICT"}
                  </span>
                  <h2>{getDistrictName(selectedDistrict)}</h2>
                </div>
              </div>

              <div className="block-page-heading">
                <span className="section-kicker">
                  {isHindi ? "चरण 2" : "STEP 2"}
                </span>
                <h2>{t.block}</h2>
                <p>
                  {isHindi
                    ? "अब इस जिले का विकासखंड चुनें।"
                    : "Now choose a block within this district."}
                </p>
              </div>

              {availableBlocks.length > 0 ? (
                <>
                  <div className="block-search">
                    <Search size={19} />
                    <input
                      type="search"
                      value={blockSearch}
                      onChange={(event) => setBlockSearch(event.target.value)}
                      placeholder={t.searchBlock}
                      aria-label={t.searchBlock}
                    />
                    {blockSearch && (
                      <button
                        type="button"
                        onClick={() => setBlockSearch("")}
                        aria-label={isHindi ? "खोज हटाएं" : "Clear search"}
                      >
                        <X size={17} />
                      </button>
                    )}
                  </div>

                  {filteredBlocks.length > 0 ? (
                    <div className="row g-3">
                      {filteredBlocks.map((block) => (
                        <div className="col-6 col-md-4 col-lg-3" key={block.id}>
                          <button
                            type="button"
                            className="block-item-card"
                            onClick={() => {
                              setSelectedBlockId(block.id);
                              setSelectedDesignation("all");
                              setBlockSearch("");
                            }}
                          >
                            <Building2 size={24} />
                            <strong>{getBlockName(block)}</strong>
                            <span>
                              {isHindi ? "समिति देखें" : "View Committee"}
                            </span>
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="block-empty-state">
                      <Search size={38} />
                      <h3>{t.emptyBlock}</h3>
                    </div>
                  )}
                </>
              ) : (
                <div className="block-empty-state">
                  <Building2 size={40} />
                  <h3>{t.emptyDistrict}</h3>
                  <p>
                    {isHindi
                      ? "इस जिले की आधिकारिक ब्लॉक सूची डेटा फाइल में जोड़े जाने के बाद यहां दिखाई देगी।"
                      : "The official block list will appear here after it is added to the data file."}
                  </p>
                </div>
              )}
            </>
          )}

          {/* Committee members */}
          {selectedDistrict && selectedBlock && (
            <>
              <button
                type="button"
                className="block-back-button"
                onClick={handleBlockReset}
              >
                <ArrowLeft size={18} />
                {t.backBlocks}
              </button>

              <div className="block-selected-heading">
                <div className="block-selected-icon">
                  <Building2 size={28} />
                </div>
                <div>
                  <span className="section-kicker">
                    {getDistrictName(selectedDistrict)}
                  </span>
                  <h2>{getBlockName(selectedBlock)}</h2>
                  <p>
                    {isHindi
                      ? "ब्लॉक समिति के पदाधिकारी एवं सदस्य"
                      : "Block committee office-bearers and members"}
                  </p>
                </div>
              </div>

              <div className="block-member-toolbar">
                <div className="block-member-count">
                  <Users size={20} />
                  <strong>
                    {selectedMembers.length} {t.memberCount}
                  </strong>
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
                      
                    const gram = isHindi
                      ? member.gramHi
                      : member.gramEn;
                    const bio = isHindi ? member.bioHi : member.bioEn;

                    return (
                      <div className="col-md-6 col-lg-3" key={member.id}>
                        <article className="block-member-card">
                          <div className="block-member-photo">
                            {member.photo ? (
                              <img src={member.photo} alt={name} />
                            ) : (
                              <UserRound size={55} />
                            )}
                          </div>

                          <div className="block-member-info">
                            <span className="block-member-designation">
                              {designation}
                            </span>
                            <h3>{name}</h3>
                            <p>{gram}</p>
                            {bio && <p>{bio}</p>}

                            {(member.phone || member.email) && (
                              <div className="block-member-contact">
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
                <div className="block-empty-state">
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

export default BlockCommittee;
