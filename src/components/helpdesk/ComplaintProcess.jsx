
import {
    ClipboardEdit,
    Search,
    Forward,
    Network,
    MessageSquareText
} from "lucide-react";

import { useLanguage } from "../../hooks/useLanguage";

function ComplaintProcess() {
    
    const { language } = useLanguage();

    const isHindi = language === "hi";

    const steps = [
        {
            icon: ClipboardEdit,
            title: "समस्या दर्ज करना",
            titleEn: "Register the Concern",
            description: "पंचायत सहायक अपनी समस्या एवं आवश्यक जानकारी हेल्प डेस्क को उपलब्ध कराए।",
            descriptionEn: "The Panchayat Sahayak submits the concern and necessary information to the Help Desk."
        },
        {
            icon: Search,
            title: "ब्लॉक स्तर पर प्रारंभिक जाँच",
            titleEn: "Initial Block-Level Review",
            description: "ब्लॉक हेल्प डेस्क प्राप्त शिकायत की प्रारंभिक जाँच एवं जानकारी एकत्र करे।",
            descriptionEn: "The block Help Desk conducts an initial review and collects relevant information."
        },
        {
            icon: Forward,
            title: "जिला स्तर पर अग्रसारित करना",
            titleEn: "Forward to District Level",
            description: "आवश्यकतानुसार शिकायत को जिला हेल्प डेस्क तक अग्रसारित किया जाए।",
            descriptionEn: "The complaint is forwarded to the district Help Desk as required."
        },
        {
            icon: Network,
            title: "मंडल एवं प्रदेश स्तर पर समीक्षा",
            titleEn: "Divisional & State-Level Review",
            description: "जटिल या अनसुलझे मामलों को मंडल एवं प्रदेश स्तर पर समन्वय हेतु भेजा जाए।",
            descriptionEn: "Complex or unresolved matters are referred for divisional and state-level coordination."
        },
        {
            icon: MessageSquareText,
            title: "फीडबैक एवं निस्तारण",
            titleEn: "Feedback & Follow-up",
            description: "शिकायतकर्ता को उपलब्ध प्रगति की जानकारी देकर आगे की कार्रवाई का समन्वय किया जाए।",
            descriptionEn: "The complainant is updated on available progress and further follow-up is coordinated."
        }
    ];

    return (
        <section className="org-helpdesk-section org-helpdesk-process-section">
            <div className="container">
                <div className="org-helpdesk-section-heading">
                    <span>{isHindi ? "शिकायत प्रक्रिया" : "COMPLAINT PROCESS"}</span>
                    <h2>{isHindi ? "शिकायत समाधान की प्रक्रिया" : "Complaint Coordination Process"}</h2>
                    <p>
                        {isHindi
                            ? "शिकायत प्राप्त होने से लेकर फीडबैक तक की पांच चरणों वाली प्रक्रिया।"
                            : "A five-step process from complaint submission to feedback."}
                    </p>
                </div>

                <div className="org-helpdesk-process">
                    {steps.map((step, index) => {
                        const Icon = step.icon;

                        return (
                            <article className="org-helpdesk-process-step" key={index}>
                                <div className="org-helpdesk-process-marker">
                                    <span>{index + 1}</span>
                                    <div className="org-helpdesk-process-icon">
                                        <Icon size={24} />
                                    </div>
                                </div>

                                <div className="org-helpdesk-process-content">
                                    <span className="org-helpdesk-step-label">
                                        {isHindi ? `चरण ${index + 1}` : `STEP ${index + 1}`}
                                    </span>

                                    <h3>{isHindi ? step.title : step.titleEn}</h3>

                                    <p>{isHindi ? step.description : step.descriptionEn}</p>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default ComplaintProcess;
