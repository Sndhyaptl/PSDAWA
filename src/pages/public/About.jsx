
import React from "react";
import {
  Target,
  Eye,
  ShieldCheck,
  Users,
  Handshake,
  Scale,
  Building2,
  Wallet,
  MessageCircleMore,
  Network,
  Award,
  BriefcaseBusiness,
} from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import "../../styles/about.css";

const objectives = [
  {
    icon: ShieldCheck,
    hi: "अधिकारों की रक्षा",
    en: "Protection of Rights",
    descHi: "पंचायत सहायकों के अधिकारों एवं हितों की प्रभावी पैरवी करना।",
    descEn: "Advocate effectively for the rights and interests of Panchayat Sahayaks.",
  },
  {
    icon: Wallet,
    hi: "सम्मानजनक एवं नियमित मानदेय",
    en: "Fair & Regular Honorarium",
    descHi: "सम्मानजनक मानदेय एवं समयबद्ध भुगतान की स्थायी व्यवस्था सुनिश्चित कराना।",
    descEn: "Ensure dignified honorarium and a permanent system of timely payments.",
  },
  {
    icon: BriefcaseBusiness,
    hi: "सेवा सुरक्षा एवं नियमितीकरण",
    en: "Service Security & Regularization",
    descHi: "अनुचित सेवा समाप्ति रोकना एवं सेवा नियमितीकरण हेतु प्रभावी प्रयास करना।",
    descEn: "Prevent unjust termination and advocate for service regularization.",
  },
  {
    icon: MessageCircleMore,
    hi: "समस्याओं का समाधान",
    en: "Problem Resolution",
    descHi: "पंचायत सहायकों की समस्याएँ संबंधित अधिकारियों तक पहुँचाकर समाधान कराना।",
    descEn: "Raise Panchayat Sahayaks' concerns with authorities and seek practical solutions.",
  },
  {
    icon: Network,
    hi: "संगठनात्मक एकता",
    en: "Organizational Unity",
    descHi: "प्रदेश के सभी पंचायत सहायकों को एक मजबूत मंच पर जोड़ना।",
    descEn: "Unite all Panchayat Sahayaks across Uttar Pradesh on one strong platform.",
  },
  {
    icon: Award,
    hi: "सम्मान एवं पहचान",
    en: "Dignity & Recognition",
    descHi: "पंचायत सहायकों के कार्यों को उचित पहचान एवं सम्मान दिलाना।",
    descEn: "Secure due recognition and respect for Panchayat Sahayaks' contributions.",
  },
];

const values = [
  {
    icon: Handshake,
    hi: "एकता",
    en: "Unity",
    descHi: "सामूहिक सहयोग और एक-दूसरे का सम्मान।",
    descEn: "Collective support and mutual respect.",
  },
  {
    icon: ShieldCheck,
    hi: "पारदर्शिता",
    en: "Transparency",
    descHi: "संगठनात्मक गतिविधियों में स्पष्टता और जवाबदेही।",
    descEn: "Clarity and accountability in organizational activities.",
  },
  {
    icon: Scale,
    hi: "निष्पक्षता",
    en: "Fairness",
    descHi: "सभी सदस्यों के साथ समान और निष्पक्ष व्यवहार।",
    descEn: "Equal and fair treatment for all members.",
  },
  {
    icon: Building2,
    hi: "सेवा भावना",
    en: "Service",
    descHi: "सामूहिक हित और सकारात्मक योगदान की भावना।",
    descEn: "A commitment to collective welfare and positive contribution.",
  },
];

function About() {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  const content = {
  eyebrow: isHindi ? "हमारे बारे में" : "WHO WE ARE",

  title: isHindi
    ? "पंचायत सहायकों के अधिकार, सम्मान और सुरक्षित भविष्य का सशक्त मंच"
    : "A Strong Platform for the Rights, Dignity and Secure Future of Panchayat Sahayaks",

  introshort: isHindi
    ? "पंचायत सहायक कम डाटा एंट्री ऑपरेटर वेलफेयर एसोसिएशन, उत्तर प्रदेश, प्रदेश के पंचायत सहायकों के अधिकारों, हितों एवं सम्मान की रक्षा के लिए समर्पित एक संगठन है। हमारा उद्देश्य सभी पंचायत सहायकों को एकजुट कर उनकी समस्याओं को शासन-प्रशासन तक पहुँचाना और उनके समाधान के लिए प्रभावी प्रयास करना है।"
    : "The Panchayat Sahayak Cum Data Entry Operator Welfare Association, Uttar Pradesh, is an organization dedicated to protecting the rights, interests and dignity of Panchayat Sahayaks across the state. Our objective is to unite all Panchayat Sahayaks, raise their concerns before the government and administration, and work towards effective solutions.",
  intro: isHindi
    ? "पंचायत सहायक कम डाटा एंट्री ऑपरेटर वेलफेयर एसोसिएशन, उत्तर प्रदेश प्रदेश के पंचायत सहायकों के अधिकारों, सम्मान एवं हितों की रक्षा के लिए समर्पित एक संगठन है। इस संगठन की नींव पंचायत सहायकों के संघर्ष, धरना-प्रदर्शन और अपने अधिकारों की आवाज बुलंद करने के संकल्प से निकली है। हमारा उद्देश्य पंचायत सहायकों को एकजुट कर उनकी समस्याओं एवं मांगों को शासन-प्रशासन तक पहुँचाना है। हम सम्मानजनक एवं नियमित मानदेय, सेवा सुरक्षा, सेवा नियमितीकरण और उचित कार्य परिस्थितियों के लिए निरंतर प्रयासरत हैं। संगठन पारदर्शिता, सहयोग और सामूहिक शक्ति के माध्यम से प्रत्येक पंचायत सहायक को मजबूत मंच एवं उचित प्रतिनिधित्व प्रदान करने के लिए प्रतिबद्ध है।"
    : "The Panchayat Sahayak Cum Data Entry Operator Welfare Association, Uttar Pradesh is dedicated to protecting the rights, dignity and interests of Panchayat Sahayaks across the state. The organization emerged from the collective struggle, protests and determination of Panchayat Sahayaks to raise their voices for their rights. Our objective is to unite Panchayat Sahayaks and present their concerns before the government and administration. We continuously advocate for dignified and regular honorarium, service security, service regularization and fair working conditions. Through transparency, mutual cooperation and collective strength, we strive to provide every Panchayat Sahayak with a strong platform and effective representation.",

  mission: isHindi
    ? "पंचायत सहायकों के लिए सम्मानजनक एवं नियमित मानदेय, सेवा सुरक्षा और सेवा नियमितीकरण की मांग को प्रभावी ढंग से उठाना तथा उनकी विभागीय एवं कार्यस्थल संबंधी समस्याओं के समाधान हेतु निरंतर प्रयास करना।"
    : "To advocate for dignified and regular honorarium, service security and service regularization for Panchayat Sahayaks, while continuously working to resolve their departmental and workplace-related concerns.",

  vision: isHindi
    ? "एक ऐसा सशक्त और एकजुट पंचायत सहायक समुदाय बनाना, जहाँ प्रत्येक सदस्य को उचित सम्मान, अधिकार, आर्थिक स्थिरता, समान अवसर और सुरक्षित भविष्य प्राप्त हो।"
    : "To build a strong and united Panchayat Sahayak community where every member receives due respect, rights, financial stability, equal opportunities and a secure future.",
};

  return (
    <main className="about-page">
      {/* Page Hero */}
      <section className="about-hero">
        <div className="about-hero-overlay" />
        <div className="container about-hero-content">
          <span className="about-eyebrow">{content.eyebrow}</span>
          <h1>{content.title}</h1>
          <p>{content.introshort}</p>
          <div className="about-breadcrumb">
            <a href="/">{isHindi ? "होम" : "Home"}</a>
            <span>/</span>
            <span>{isHindi ? "हमारे बारे में" : "About Us"}</span>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="about-intro section-padding">
  <div className="container">
    <div className="row align-items-center g-5">
      <div className="col-lg-6">
        <div className="about-image-panel">
          <img
            src="/images/home/hero2.jpeg"
            alt="Panchayat Sahayak Welfare Association"
            className="about-intro-image"
          />

          <span>
            {isHindi
              ? "एकता • सहयोग • प्रतिनिधित्व"
              : "UNITY • COOPERATION • REPRESENTATION"}
          </span>
        </div>
      </div>

      <div className="col-lg-6">
        <span className="section-kicker">
          {isHindi ? "संगठन का परिचय" : "ORGANIZATION INTRODUCTION"}
        </span>

        <h2 className="about-section-title">
          {isHindi ? "हमारा संगठन" : "About Our Organization"}
        </h2>

        <p className="about-body-text">{content.intro}</p>
      </div>
    </div>
  </div>
</section>

      {/* Mission and Vision */}
      <section className="about-purpose section-padding">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-6">
              <article className="purpose-card">
                <div className="purpose-icon"><Target size={32} /></div>
                <h3>{isHindi ? "हमारा मिशन" : "Our Mission"}</h3>
                <p>{content.mission}</p>
              </article>
            </div>
            <div className="col-md-6">
              <article className="purpose-card purpose-card-gold">
                <div className="purpose-icon"><Eye size={32} /></div>
                <h3>{isHindi ? "हमारा विजन" : "Our Vision"}</h3>
                <p>{content.vision}</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="about-objectives section-padding">
        <div className="container">
          <div className="about-heading text-center">
            <span className="section-kicker">
              {isHindi ? "हमारी प्राथमिकताएं" : "OUR PRIORITIES"}
            </span>
            <h2 className="about-section-title">
              {isHindi ? "संगठन के प्रमुख उद्देश्य" : "Our Key Objectives"}
            </h2>
            <p>
              {isHindi
                ? "संगठन के कार्यों को दिशा देने वाले प्रमुख उद्देश्य।"
                : "The key objectives that guide the organization's activities."}
            </p>
          </div>

          <div className="row g-4 mt-2">
            {objectives.map((item, index) => {
              const Icon = item.icon;
              return (
                <div className="col-md-6 col-lg-4" key={item.en}>
                  <article className="objective-card">
                    <div className="objective-top">
                      <span className="objective-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="objective-icon"><Icon size={27} /></div>
                    </div>
                    <h3>{isHindi ? item.hi : item.en}</h3>
                    <p>{isHindi ? item.descHi : item.descEn}</p>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="about-values section-padding">
        <div className="container">
          <div className="about-heading text-center">
            <span className="section-kicker">
              {isHindi ? "हमारी पहचान" : "WHAT GUIDES US"}
            </span>
            <h2 className="about-section-title">
              {isHindi ? "हमारे मूल मूल्य" : "Our Core Values"}
            </h2>
          </div>

          <div className="row g-4 mt-2">
            {values.map((item) => {
              const Icon = item.icon;
              return (
                <div className="col-6 col-lg-3" key={item.en}>
                  <div className="value-card">
                    <Icon size={34} />
                    <h3>{isHindi ? item.hi : item.en}</h3>
                    <p>{isHindi ? item.descHi : item.descEn}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Organizational Structure */}
      <section className="about-structure section-padding">
        <div className="container">
          <div className="about-heading text-center">
            <span className="section-kicker">
              {isHindi ? "संगठनात्मक व्यवस्था" : "ORGANIZATIONAL FRAMEWORK"}
            </span>
            <h2 className="about-section-title">
              {isHindi ? "संगठन की संरचना" : "Organizational Structure"}
            </h2>
            <p>
              {isHindi
                ? "संगठनात्मक समन्वय के लिए प्रस्तावित स्तर।"
                : "Proposed levels for organizational coordination."}
            </p>
          </div>

          <div className="structure-list">
            <div className="structure-item structure-state">
              <Building2 size={25} />
              <div>
                <h3>{isHindi ? "प्रदेश समिति" : "State Committee"}</h3>
                <p>{isHindi ? "प्रदेश स्तर पर समन्वय" : "State-level coordination"}</p>
              </div>
            </div>
            <div className="structure-connector" />
            <div className="structure-item">
              <Users size={25} />
              <div>
                <h3>{isHindi ? "जिला समिति" : "District Committee"}</h3>
                <p>{isHindi ? "जिला स्तर पर समन्वय" : "District-level coordination"}</p>
              </div>
            </div>
            <div className="structure-connector" />
            <div className="structure-item">
              <Handshake size={25} />
              <div>
                <h3>{isHindi ? "ब्लॉक समिति" : "Block Committee"}</h3>
                <p>{isHindi ? "विकासखंड स्तर पर समन्वय" : "Block-level coordination"}</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}

export default About;
