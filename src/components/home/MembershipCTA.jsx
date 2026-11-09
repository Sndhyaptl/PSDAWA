import { Link } from "react-router-dom";

import {
    Users,
    ArrowRight,
    ShieldCheck
} from "lucide-react";

import { useLanguage } from "../../hooks/useLanguage";

function MembershipCTA() {

    const { language } = useLanguage();

    const isHindi = language === "hi";

    return (
        <section className="membership-cta">

            <div className="container">

                <div className="membership-cta-content">

                    <div className="membership-cta-icon">
                        <Users size={42} />
                    </div>

                    <div className="membership-cta-text">

                        <span>
                            <ShieldCheck size={16} />

                            {isHindi
                                ? "संगठन से जुड़ें"
                                : "Join Our Association"}
                        </span>

                        <h2>
                            {isHindi
                                ? "एक मजबूत संगठन के निर्माण में सहभागी बनें"
                                : "Be a Part of Building a Strong Association"}
                        </h2>

                        <p>
                            {isHindi
                                ? "संगठनात्मक एकता, सहयोग और कर्मचारी कल्याण के उद्देश्य से हमारे साथ जुड़ें।"
                                : "Join us in our efforts towards organizational unity, cooperation and employee welfare."}
                        </p>

                    </div>

                    <Link
                        to="/membership"
                        className="membership-cta-button"
                    >
                        {isHindi
                            ? "सदस्यता आवेदन करें"
                            : "Apply for Membership"}

                        <ArrowRight size={18} />

                    </Link>

                </div>

            </div>

        </section>
    );
}

export default MembershipCTA;