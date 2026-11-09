
import { Link } from "react-router-dom";
import {
    MapPin,
    Mail,
    Phone,
    ArrowRight,
} from "lucide-react";

import { ORGANIZATION } from "../utils/constants";
import { useLanguage } from "../hooks/useLanguage";

// Social Media SVG Icons
function SocialIcon({ name }) {
    const icons = {
        Facebook: (
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.6V3.6c-.8-.1-1.6-.2-2.4-.2-2.4 0-4 1.5-4 4.1v2.4H7.6V13h2.7v8z" />
            </svg>
        ),

        Instagram: (
            <svg viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
            </svg>
        ),

        WhatsApp: (
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.6 4.1 1.6 5.9L0 24l6.4-1.7a11.9 11.9 0 0 0 5.6 1.4h.1c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.1-3.5-8.3ZM12 21.7c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.8 1 1-3.7-.3-.5a9.7 9.7 0 1 1 8.5 4.8Zm5.3-7.3c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.7-.8-2.8-1.5-3.9-3.4-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5l-.9-2.1c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.9 4.4 1.8.8 2.5.9 3.4.8.5-.1 1.7-.7 2-1.4.2-.7.2-1.3.1-1.4-.1-.1-.3-.2-.6-.3Z" />
            </svg>
        ),

        YouTube: (
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6z" />
            </svg>
        ),

        Telegram: (
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.9 3.2 18.7 20c-.2 1.2-.9 1.5-1.8.9l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5.1 9.3-8.4c.4-.4-.1-.6-.6-.2L6.1 13.5l-5-1.6c-1.1-.3-1.1-1.1.2-1.6L20.8 2.6c.9-.3 1.6.2 1.1.6Z" />
            </svg>
        ),

        X: (
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l7.3-8.4L1.8 2h6.5l4.5 6.8L18.9 2Zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20Z" />
            </svg>
        )
    };

    return icons[name] || null;
}

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
        // { key: "membership", path: "/membership" },
        // { key: "idCard", path: "/id-card" },
        { key: "gallery", path: "/gallery" },
        { key: "contact", path: "/contact" }
    ];

    const socialLinks = [
        {
            name: "Facebook",
            className: "facebook",
            url: "https://www.facebook.com/share/1HR4pjGUXU/"
        },
        {
            name: "Instagram",
            className: "instagram",
            url: "https://www.instagram.com/pscdeowaup"
        },
        {
            name: "YouTube",
            className: "youtube",
            url: "#"
        },
        {
            name: "WhatsApp",
            className: "whatsapp",
            url: "https://wa.me/918009748222"
        },
        {
            name: "Telegram",
            className: "telegram",
            url: "https://t.me/PSCDEOWAUP"
        },
        {
            name: "X",
            className: "x",
            url: "https://x.com/PSCDEOWAUP"
        }
    ];

    return (
        <footer className="site-footer">
            <div className="footer-main">
                <div className="container">
                    <div className="row g-4">

                        {/* Organization Information */}
                        <div className="col-lg-4 col-md-6">
                            <div className="footer-brand">

                                <div className="footer-logo">
                                    <div className="brand-logo">
                            <img src="/images/logo.jpg" alt="PSDAWA Organization Logo"
                                onError={e => {
                                    e.currentTarget.style.display = "none";
                                    e.currentTarget.parentElement.classList.add(
                                        "logo-fallback"
                                    );
                                }}/>
                            <span className="logo-fallback-text">PS</span>
                        </div>
                                </div>

                                <h4>
                                    {language === "hi"
                                        ? ORGANIZATION.hindiName
                                        : ORGANIZATION.name}
                                </h4>

                                <p>{t("footerDescription")}</p>

                                <span className="footer-location">
                                    <MapPin size={16} />
                                    Uttar Pradesh, India
                                </span>

                                {/* Social Media */}
                                <div className="footer-social">
    <h5>
        {language === "hi"
            ? "सोशल मीडिया पर जुड़ें"
            : "Connect With Us"}
    </h5>

    <div className="footer-social-links">
        {socialLinks.map((social) => (
            <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`social-link ${social.className}`}
                aria-label={social.name}
                title={social.name}
            >
                <SocialIcon name={social.name} />
            </a>
        ))}
    </div>
</div>

                            </div>
                        </div>

                        {/* Quick Links */}
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

                        {/* Useful Links */}
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

                        {/* Contact Information */}
                        <div className="col-lg-4 col-md-6">
                            <h5>{t("contactUs")}</h5>

                            <div className="footer-contact">
                                <p>
                                    <MapPin size={17} />
                                    {language === "hi"
                                        ? "499/22 कुतुबपुर, हसनगंज, डालीगंज ( लखनऊ )"
                                        : "499/22, Kutubpur, Hasanganj, Lucknow, Uttar Pradesh 226020"}
                                </p>

                                <p>
                                    <Mail size={17} />
                                    <a href="mailto:pscdeowaup@gmail.com">
                                        pscdeowaup@gmail.com
                                    </a>
                                </p>

                                <p>
                                    <Phone size={17} />
                                    <a href="tel:+918009748222">
                                        +91 800 9748 222
                                    </a>
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

            {/* Footer Bottom */}
            <div className="footer-bottom">
                <div className="container">
                    <p>
                        © {new Date().getFullYear()} PSDAWA.{" "}
                        {t("allRightsReserved")}
                    </p>

                    <span>
                        {language === "hi"
                            ? "एकता • अधिकार • सम्मान"
                            : "Unity • Rights • Dignity"}
                    </span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
