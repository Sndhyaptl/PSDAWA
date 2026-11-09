import { Link } from "react-router-dom";
import {
    ArrowRight,
    Users,
    ShieldCheck
} from "lucide-react";

import { useLanguage } from "../../hooks/useLanguage";

function HomeHero() {
    const { language } = useLanguage();

    const isHindi = language === "hi";

    return (
        <section className="home-hero">
            <div className="hero-overlay"></div>
            <div className="container hero-container">
                <div className="hero-content">
                    <span className="hero-tag">
                        <ShieldCheck size={16} />
                        {isHindi ? "एक संगठित, सशक्त और सम्मानित संगठन" : "An Organized, Empowered Association"}
                    </span>
                    <h1>
                        {isHindi ? "पंचायत सहायकों की एकता, अधिकार और सम्मान" : "Unity, Rights & Dignity of Panchayat Sahayaks"}
                    </h1>
                    <p>
                        {isHindi ? "पंचायत सहायक एवं डाटा एंट्री ऑपरेटरों के हितों, अधिकारों, सम्मान और कल्याण के लिए एकजुट होकर कार्य करने का संकल्प।" : "A collective platform working towards the interests, rights, dignity and welfare of Panchayat Sahayaks and Data Entry Operators."}
                    </p>
                    <div className="hero-buttons">
                        <Link to="/membership" className="btn btn-gold hero-primary-btn">
                            <Users size={18} />
                            {isHindi ? "सदस्यता प्राप्त करें" : "Become a Member"}
                            <ArrowRight size={17} />
                        </Link>
                        <Link to="/about" className="hero-secondary-btn">
                            {isHindi ? "हमारे बारे में" : "About Us"}
                        </Link>
                    </div>
                    <div className="hero-bottom-text">
                        <span>
                            {isHindi ? "एकता • अधिकार • सम्मान" : "Unity • Rights • Dignity"}
                        </span>
                    </div>
                </div>
            </div>
            <div className="hero-decoration"></div>
        </section>
    );
}

export default HomeHero;