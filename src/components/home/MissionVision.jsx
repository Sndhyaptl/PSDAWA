import {
    Target,
    Eye,
    HeartHandshake
} from "lucide-react";

import { useLanguage } from "../../hooks/useLanguage";

function MissionVision() {

    const { language } = useLanguage();

    const isHindi = language === "hi";

    const items = [
        {
            icon: Target,
            title: isHindi ? "हमारा मिशन" : "Our Mission",
            description: isHindi
                ? "पंचायत सहायकों की मानदेय, सेवा सुरक्षा, कार्य संबंधी समस्याओं एवं अधिकारों से जुड़े मुद्दों को शासन-प्रशासन तक प्रभावी ढंग से पहुँचाना और उनके समाधान हेतु निरंतर प्रयास करना।"
                : "To effectively raise issues concerning honorarium, service security, workplace challenges, and rights of Panchayat Sahayaks before the government and administration, while continuously working towards practical solutions."
        },
        {
            icon: Eye,
            title: isHindi ? "हमारा विजन" : "Our Vision",
            description: isHindi
                ? "पंचायत सहायकों को ग्राम पंचायत व्यवस्था में उचित पहचान, सम्मान, आर्थिक स्थिरता एवं सुरक्षित भविष्य दिलाना तथा उनके हितों के लिए एक मजबूत और विश्वसनीय संगठन का निर्माण करना।"
                : "To ensure proper recognition, dignity, financial stability, and a secure future for Panchayat Sahayaks while building a strong and trusted organization dedicated to their welfare."
        },
        {
            icon: HeartHandshake,
            title: isHindi ? "हमारे मूल्य" : "Our Values",
            description: isHindi
                ? "एकता, पारदर्शिता, ईमानदारी, आपसी सहयोग, समानता और जवाबदेही के साथ पंचायत सहायकों के अधिकारों एवं हितों के प्रति प्रतिबद्धता।"
                : "Commitment to unity, transparency, integrity, mutual cooperation, equality, and accountability while safeguarding the rights and interests of Panchayat Sahayaks."
        }
    ];

    return (
        <section className="mission-section section-padding">

            <div className="container">

                <div className="section-title text-center">

                    <h2>
                        {isHindi
                            ? "हमारा उद्देश्य"
                            : "Our Purpose"}
                    </h2>

                    <div className="title-divider">
                        <span />
                    </div>

                    <p>
                        {isHindi
                            ? "संगठन की सोच, दिशा और मूलभूत सिद्धांत।"
                            : "The principles and direction that guide our association."}
                    </p>

                </div>

                <div className="row g-4">

                    {items.map((item, index) => {

                        const Icon = item.icon;

                        return (
                            <div
                                className="col-lg-4 col-md-6"
                                key={index}
                            >

                                <div className="mission-card">

                                    <div className="mission-icon">
                                        <Icon size={34} />
                                    </div>

                                    <h4>{item.title}</h4>

                                    <p>{item.description}</p>

                                </div>

                            </div>
                        );

                    })}

                </div>

            </div>

        </section>
    );
}

export default MissionVision;