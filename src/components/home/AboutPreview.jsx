import { Link } from "react-router-dom";

import {
    ArrowRight,
    Users,
    Handshake,
    Building2
} from "lucide-react";

import SectionTitle from "../SectionTitle";
import { useLanguage } from "../../hooks/useLanguage";

function AboutPreview() {

    const { language } = useLanguage();

    const isHindi = language === "hi";

    const highlights = [
        {
            icon: Users,
            title: isHindi ? "संगठन" : "Organization",
            description: isHindi ? "सामूहिक एकता और संगठनात्मक मजबूती।" : "Collective unity and organizational strength."
        },
        {
            icon: Handshake,
            title: isHindi ? "सहयोग" : "Cooperation",
            description: isHindi
                ? "सदस्यों के बीच सहयोग और समन्वय।"
                : "Cooperation and coordination among members."
        },
        {
            icon: Building2,
            title: isHindi ? "प्रतिनिधित्व" : "Representation",
            description: isHindi
                ? "सदस्यों के हितों का संगठित प्रतिनिधित्व।"
                : "Organized representation of members' interests."
        }
    ];

    return (
        <section className="section-padding about-preview">

            <div className="container">

                <div className="row align-items-center g-5">

                    <div className="col-lg-6">

                        <SectionTitle
                            title="हमारे संगठन के बारे में"
                            titleEn="About Our Organization"
                            centered={false}
                        />

                        <p className="about-description">

                            {isHindi
                                ? "पंचायत सहायक कम डाटा एंट्री ऑपरेटर वेलफेयर एसोसिएशन, उत्तर प्रदेश प्रदेश के समस्त पंचायत सहायकों के अधिकारों, सम्मान एवं हितों की रक्षा के लिए समर्पित एक सशक्त संगठन है। हमारा उद्देश्य पंचायत सहायकों को एकजुट करना, उनकी आवाज शासन-प्रशासन तक पहुँचाना तथा मानदेय, सेवा सुरक्षा और उज्ज्वल भविष्य के लिए निरंतर संघर्ष एवं प्रयास करना है|"
                                : "The Panchayat Sahayak Cum Data Entry Operator Welfare Association, Uttar Pradesh is a dedicated organization committed to protecting the rights, dignity, and interests of Panchayat Sahayaks across Uttar Pradesh. We strive to unite every Panchayat Sahayak, raise their voices before the government, ensure justice, and advocate for fair honorarium, service security, and a better future. Our strength lies in unity, transparency, and collective determination."}

                        </p>

                        <Link to="/about" className="read-more-link">
                            {isHindi ? "और जानें" : "Read More"}

                            <ArrowRight size={18} />

                        </Link>

                    </div>

                    <div className="col-lg-6">

                        <div className="about-highlight-grid">

                            {highlights.map((item, index) => {

                                const Icon = item.icon;

                                return (
                                    <div
                                        className="about-highlight-card"
                                        key={index}>

                                        <div className="highlight-icon">
                                            <Icon size={27} />
                                        </div>

                                        <h5>{item.title}</h5>

                                        <p>{item.description}</p>

                                    </div>
                                );

                            })}

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default AboutPreview;