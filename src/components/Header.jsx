import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import Navbar from "./Navbar";

import { ORGANIZATION } from "../utils/constants";
import { useLanguage } from "../hooks/useLanguage";

function Header() {
    const { language } = useLanguage();
    return (
        <header className="site-header">
            <div className="top-bar">
                <div className="container d-flex justify-content-between align-items-center">
                    <span>
                        <MapPin size={14} className="me-1" />
                        Uttar Pradesh, India
                    </span>
                    <span>
                        {language === "hi"
                            ? "एकता • अधिकार • सम्मान"
                            : "Unity • Rights • Dignity"}
                    </span>
                </div>
            </div>
            <div className="brand-header">
                <div className="container">
                    <Link to="/" className="brand-content" aria-label="PSDAWA Home">
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
                        <div className="brand-text">
                            <h1>
                                {language === "hi" ? ORGANIZATION.hindiName : ORGANIZATION.name}
                            </h1>
                            <p>
                                {language === "hi" ? "उत्तर प्रदेश" : "Uttar Pradesh, India"}
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
            <Navbar />
        </header>
    );
}

export default Header;