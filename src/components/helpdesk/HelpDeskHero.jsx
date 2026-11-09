import { Headset, MessageCircle, ShieldCheck } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";

function HelpDeskHero() {
    const { language } = useLanguage();

    const isHindi = language === "hi";

    return (
        <section className="org-helpdesk-hero">
            <div className="container">
                <div className="org-helpdesk-hero-content">

                    {/* Eyebrow */}
                    <span className="org-helpdesk-eyebrow">
                        {isHindi
                            ? "संगठन की सहायता पहल"
                            : "ORGANIZATIONAL SUPPORT INITIATIVE"}
                    </span>

                    {/* Icon */}
                    <div className="org-helpdesk-hero-icon">
                        <Headset size={36} />
                    </div>

                    {/* Main Heading */}
                    <h1>
                        {isHindi
                            ? "संगठन हेल्प डेस्क"
                            : "Organization Help Desk"}
                    </h1>

                    {/* Tagline */}
                    <h2>
                        {isHindi
                            ? "आपकी समस्या, हमारा प्रयास – समाधान की ओर एक कदम"
                            : "Your Concern, Our Effort – One Step Towards a Solution"}
                    </h2>

                    {/* Organization Name */}
                    <p className="org-helpdesk-organization">
                        {isHindi
                            ? "पंचायत सहायक कम डाटा एंट्री ऑपरेटर वेलफेयर एसोसिएशन उत्तर प्रदेश"
                            : "Panchayat Sahayak cum Data Entry Operator Welfare Association Uttar Pradesh"}
                    </p>

                    {/* Description */}
                    <p className="org-helpdesk-hero-description">
                        {isHindi
                            ? "हेल्प डेस्क की स्थापना उत्तर प्रदेश के पंचायत सहायकों एवं डाटा एंट्री ऑपरेटरों की विभागीय समस्याओं, शिकायतों, मार्गदर्शन और संगठनात्मक सहायता के लिए की गई है। हमारा उद्देश्य समस्याओं को सुनना, संबंधित स्तर तक पहुंचाना और उनके समाधान के प्रयासों में समन्वय करना है।"
                            : "The Help Desk has been established to support Panchayat Sahayaks and Data Entry Operators across Uttar Pradesh with departmental issues, complaints, guidance and organizational assistance. Our objective is to listen to concerns, forward them to the appropriate organizational level and coordinate efforts towards their resolution."}
                    </p>

                    {/* Support Points */}
                    <div className="org-helpdesk-hero-points">

                        <span>
                            <ShieldCheck size={17} />
                            {isHindi
                                ? "संगठनात्मक सहयोग"
                                : "Organizational Support"}
                        </span>

                        <span>
                            <MessageCircle size={17} />
                            {isHindi
                                ? "शिकायत समन्वय"
                                : "Complaint Coordination"}
                        </span>

                        <span>
                            <Headset size={17} />
                            {isHindi
                                ? "मार्गदर्शन एवं सहायता"
                                : "Guidance & Assistance"}
                        </span>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default HelpDeskHero;