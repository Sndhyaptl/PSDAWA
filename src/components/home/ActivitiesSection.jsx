import {
    ShieldCheck,
    Wallet,
    BriefcaseBusiness,
    MessageCircleMore,
    Network,
    Award
} from "lucide-react";

import { useLanguage } from "../../hooks/useLanguage";

function ActivitiesSection() {

    const { language } = useLanguage();

    const isHindi = language === "hi";

    const activities = [
    {
        icon: ShieldCheck,
        title: isHindi ? "अधिकारों की रक्षा" : "Protection of Rights",
        description: isHindi
            ? "पंचायत सहायकों के अधिकारों एवं हितों की प्रभावी पैरवी करना।"
            : "Advocating effectively for the rights and interests of Panchayat Sahayaks."
    },
    {
        icon: Wallet,
        title: isHindi ? "सम्मानजनक एवं नियमित मानदेय" : "Fair & Regular Honorarium",
        description: isHindi
            ? "सम्मानजनक मानदेय एवं समयबद्ध भुगतान की स्थायी व्यवस्था सुनिश्चित कराना।"
            : "Ensuring dignified honorarium and a permanent system of timely payments."
    },
    {
        icon: BriefcaseBusiness,
        title: isHindi ? "सेवा सुरक्षा एवं नियमितीकरण" : "Service Security & Regularization",
        description: isHindi
            ? "अनुचित सेवा समाप्ति रोकना एवं पंचायत सहायकों के सेवा नियमितीकरण हेतु प्रभावी प्रयास करना।"
            : "Preventing unjust termination and advocating for the regularization of Panchayat Sahayaks' services."
    },
    {
        icon: MessageCircleMore,
        title: isHindi ? "समस्याओं का समाधान" : "Problem Resolution",
        description: isHindi
            ? "पंचायत सहायकों की समस्याएँ संबंधित अधिकारियों तक पहुँचाकर समाधान कराना।"
            : "Raising Panchayat Sahayaks' concerns with authorities and seeking practical solutions."
    },
    {
        icon: Network,
        title: isHindi ? "संगठनात्मक एकता" : "Organizational Unity",
        description: isHindi
            ? "प्रदेश के सभी पंचायत सहायकों को एक मजबूत मंच पर जोड़ना।"
            : "Bringing all Panchayat Sahayaks together on one strong platform."
    },
    {
        icon: Award,
        title: isHindi ? "सम्मान एवं पहचान" : "Dignity & Recognition",
        description: isHindi
            ? "पंचायत सहायकों के कार्यों को उचित पहचान एवं सम्मान दिलाना।"
            : "Securing due recognition and respect for the contributions of Panchayat Sahayaks."
    }
];

    return (
        <section className="activities-section section-padding">

            <div className="container">

                <div className="section-title text-center">

                    <h2>
                        {isHindi
                            ? "हमारे प्रमुख उद्देश्य"
                            : "Our Key Objectives"}
                    </h2>

                    <div className="title-divider">
                        <span />
                    </div>

                    <p>
                        {isHindi
                            ? "संगठन के माध्यम से किए जाने वाले प्रमुख कार्य।"
                            : "Key areas of work pursued through the association."}
                    </p>

                </div>

                <div className="row g-4">

                    {activities.map((activity, index) => {

                        const Icon = activity.icon;

                        return (
                            <div
                                className="col-lg-4 col-md-6"
                                key={index}
                            >

                                <div className="activity-card">

                                    <div className="activity-icon">
                                        <Icon size={28} />
                                    </div>

                                    <h5>{activity.title}</h5>

                                    <p>{activity.description}</p>

                                </div>

                            </div>
                        );

                    })}

                </div>

            </div>

        </section>
    );
}

export default ActivitiesSection;