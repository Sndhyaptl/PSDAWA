import { Link } from "react-router-dom";
import {
    MapPin,
    Mail,
    Phone,
    ArrowRight
} from "lucide-react";

import { ORGANIZATION } from "../utils/constants";
import { useLanguage } from "../hooks/useLanguage";

function Footer() {
    const { language, t } = useLanguage();

    const quickLinks = [
        { key: "home", path: "/" },
        { key: "about", path: "/about" },
        { key: "stateCommittee", path: "/state-committee" },
        { key: "districtCommittee", path: "/district-committee" },
        { key: "blockCommittee", path: "/block-committee" }
    ];

    const usefulLinks = [
        { key: "notices", path: "/notices" },
        { key: "membership", path: "/membership" },
        { key: "idCard", path: "/id-card" },
        { key: "gallery", path: "/gallery" },
        { key: "contact", path: "/contact" }
    ];

    return (
        <footer className="site-footer">
            <div className="footer-main">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-4 col-md-6">
                            <div className="footer-brand">
                                <div className="footer-logo">PS</div>
                                <h4>
                                    {language === "hi" ? ORGANIZATION.hindiName : ORGANIZATION.name}
                                </h4>
                                <p>{t("footerDescription")}</p>
                                <span className="footer-location">
                                    <MapPin size={16} />
                                    Uttar Pradesh, India
                                </span>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <h5>{t("quickLinks")}</h5>
                            <ul className="footer-links">
                                {quickLinks.map(item => (
                                    <li key={item.path}>
                                        <Link to={item.path}>
                                            <ArrowRight size={14} />
                                            {t(item.key)}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <h5>{t("usefulLinks")}</h5>
                            <ul className="footer-links">
                                {usefulLinks.map(item => (
                                    <li key={item.path}>
                                        <Link to={item.path}>
                                            <ArrowRight size={14} />
                                            {t(item.key)}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <h5>{t("contactUs")}</h5>
                            <div className="footer-contact">
                                <p>
                                    <MapPin size={17} />
                                    {language === "hi" ? "उत्तर प्रदेश, भारत" : "Uttar Pradesh, India"}
                                </p>
                                <p>
                                    <Mail size={17} />
                                    {language === "hi" ? "आधिकारिक ईमेल शीघ्र उपलब्ध होगा" : "Official email to be announced"}
                                </p>
                                <p>
                                    <Phone size={17} />
                                    {language === "hi" ? "आधिकारिक संपर्क नंबर शीघ्र उपलब्ध होगा" : "Official contact number to be announced"}
                                </p>
                            </div>
                            <Link to="/contact" className="footer-contact-button">
                                {t("contactUs")}
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <p>
                        © {new Date().getFullYear()} PSDAWA.{" "}{t("allRightsReserved")}
                    </p>
                    <span>
                        {language === "hi" ? "एकता • अधिकार • सम्मान" : "Unity • Rights • Dignity"}
                    </span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;