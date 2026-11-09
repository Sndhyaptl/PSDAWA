
import { Link } from "react-router-dom";
import { Headset, ArrowRight, MessageCircle } from "lucide-react";

import { useLanguage } from "../../hooks/useLanguage";

function HelpDeskCTA() {
    
    const { language } = useLanguage();

    const isHindi = language === "hi";

    return (
        <section className="org-helpdesk-cta-section">
            <div className="container">
                <div className="org-helpdesk-cta">
                    <div className="org-helpdesk-cta-icon">
                        <Headset size={34} />
                    </div>

                    <div className="org-helpdesk-cta-content">
                        <span>
                            {isHindi ? "हम आपकी सहायता के लिए हैं" : "WE ARE HERE TO HELP"}
                        </span>

                        <h2>
                            {isHindi
                                ? "क्या आप पंचायत सहायक हैं?"
                                : "Are You a Panchayat Sahayak?"}
                        </h2>

                        <p>
                            {isHindi
                                ? "अपनी विभागीय समस्या के लिए संगठन के हेल्प डेस्क से संपर्क करें। आपकी समस्या को संबंधित संगठनात्मक स्तर तक पहुंचाने में सहायता की जाएगी।"
                                : "Contact the organization's Help Desk regarding your departmental concern. We will help route your concern to the appropriate organizational level."}
                        </p>
                    </div>

                    <div className="org-helpdesk-cta-actions">
                        {/* <Link to="/complaint-form" className="org-helpdesk-cta-button">
                            {isHindi ? "समस्या दर्ज करें" : "Submit a Complaint"}
                            <ArrowRight size={18} />
                        </Link> */}

                        <Link to="/contact" className="org-helpdesk-cta-secondary">
                            <MessageCircle size={17} />
                            {isHindi ? "अन्य संपर्क विकल्प" : "Other Contact Options"}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HelpDeskCTA;
