
import {
    Wallet,
    UserX,
    IdCard,
    CalendarCheck,
    FileText,
    BriefcaseBusiness
} from "lucide-react";

import { useLanguage } from "../../hooks/useLanguage";

function HelpDeskServices() {
    
    const { language } = useLanguage();

    const isHindi = language === "hi";

    const services = [
        {
            icon: Wallet,
            title: "मानदेय संबंधी समस्या",
            titleEn: "Honorarium Issues",
            description: "मानदेय भुगतान में देरी, लंबित भुगतान एवं अन्य संबंधित समस्याओं में सहायता।",
            descriptionEn: "Assistance with delayed honorarium payments, pending dues and related concerns."
        },
        {
            icon: UserX,
            title: "सेवा समाप्ति एवं बहाली",
            titleEn: "Service Termination & Reinstatement",
            description: "सेवा समाप्ति, कार्य से हटाए जाने एवं बहाली से संबंधित मामलों में संगठनात्मक सहयोग।",
            descriptionEn: "Organizational support regarding service termination, removal from duty and reinstatement matters."
        },
        {
            icon: IdCard,
            title: "आईडी कार्ड संबंधी समस्या",
            titleEn: "ID Card Issues",
            description: "पहचान पत्र बनवाने, संशोधन एवं पहचान पत्र से जुड़ी समस्याओं में सहायता।",
            descriptionEn: "Help with ID card applications, corrections and other ID card concerns."
        },
        {
            icon: CalendarCheck,
            title: "उपस्थिति एवं अवकाश",
            titleEn: "Attendance & Leave",
            description: "उपस्थिति दर्ज करने, अवकाश और संबंधित विभागीय प्रक्रिया के संबंध में मार्गदर्शन।",
            descriptionEn: "Guidance on attendance records, leave and related departmental procedures."
        },
        {
            icon: FileText,
            title: "शासनादेश एवं विभागीय पत्र",
            titleEn: "Government Orders & Departmental Letters",
            description: "शासनादेश, विभागीय निर्देशों एवं संबंधित पत्रों की जानकारी और मार्गदर्शन।",
            descriptionEn: "Information and guidance regarding government orders, departmental instructions and official letters."
        },
        {
            icon: BriefcaseBusiness,
            title: "अन्य विभागीय समस्याएँ",
            titleEn: "Other Departmental Issues",
            description: "पंचायत सहायक एवं डाटा एंट्री ऑपरेटर से जुड़ी अन्य विभागीय समस्याओं पर सहायता।",
            descriptionEn: "Support for other departmental concerns affecting Panchayat Sahayaks and Data Entry Operators."
        }
    ];

    return (
        <section className="org-helpdesk-section">
            <div className="container">
                <div className="org-helpdesk-section-heading">
                    <span>{isHindi ? "हमारी सहायता सेवाएं" : "OUR SUPPORT SERVICES"}</span>
                    <h2>{isHindi ? "हेल्प डेस्क के प्रमुख कार्य" : "Help Desk Services"}</h2>
                    <p>
                        {isHindi
                            ? "पंचायत सहायकों की विभिन्न विभागीय समस्याओं के लिए एक संगठित सहायता व्यवस्था।"
                            : "An organized support system for various departmental concerns of Panchayat Sahayaks."}
                    </p>
                </div>

                <div className="org-helpdesk-service-grid">
                    {services.map((service, index) => {
                        const Icon = service.icon;

                        return (
                            <article className="org-helpdesk-service-card" key={index}>
                                <div className="org-helpdesk-service-icon">
                                    <Icon size={27} />
                                </div>

                                <span className="org-helpdesk-service-number">
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                <h3>{isHindi ? service.title : service.titleEn}</h3>

                                <p>
                                    {isHindi ? service.description : service.descriptionEn}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default HelpDeskServices;
