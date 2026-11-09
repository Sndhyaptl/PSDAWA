
import { useState } from "react";
import { Link } from "react-router-dom";
import {
    Headset,
    X,
    Phone,
    MessageCircle,
    Mail,
    ArrowRight
} from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

function HelpDesk() {
    const [isOpen, setIsOpen] = useState(false);
    const { language } = useLanguage();

    const isHindi = language === "hi";

    return (
        <div className="helpdesk-container">

            {/* Help Desk Toggle */}
            <button
                type="button"
                className={`helpdesk-toggle ${isOpen ? "active" : ""}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isHindi ? "हेल्प डेस्क खोलें" : "Open Help Desk"}
                aria-expanded={isOpen}
            >
                {isOpen ? <X size={21} /> : <Headset size={21} />}
                <span>
                    {isHindi ? "हेल्प डेस्क" : "Help Desk"}
                </span>
            </button>

            {/* Help Desk Panel */}
            {isOpen && (
                <div className="helpdesk-panel">

                    <div className="helpdesk-header">
                        <div>
                            <Headset size={23} />
                            <div>
                                <h5>
                                    {isHindi ? "सहायता केंद्र" : "Help & Support"}
                                </h5>
                                <small>
                                    {isHindi
                                        ? "हम आपकी सहायता के लिए उपलब्ध हैं"
                                        : "How can we help you?"}
                                </small>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close Help Desk"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <div className="helpdesk-body">

                        <a
                            href="tel:+918009748222"
                            className="helpdesk-option"
                        >
                            <span className="helpdesk-icon phone">
                                <Phone size={19} />
                            </span>
                            <span>
                                <strong>
                                    {isHindi ? "कॉल करें" : "Call Us"}
                                </strong>
                                <small>+91 800 9748 222</small>
                            </span>
                            <ArrowRight size={16} />
                        </a>

                        <a
                            href="https://wa.me/918009748222"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="helpdesk-option"
                        >
                            <span className="helpdesk-icon whatsapp">
                                <MessageCircle size={19} />
                            </span>
                            <span>
                                <strong>
                                    {isHindi
                                        ? "व्हाट्सएप सहायता"
                                        : "WhatsApp Support"}
                                </strong>
                                <small>
                                    {isHindi
                                        ? "हमें संदेश भेजें"
                                        : "Chat with our team"}
                                </small>
                            </span>
                            <ArrowRight size={16} />
                        </a>

                        <a
                            href="mailto:pscdeowaup@gmail.com"
                            className="helpdesk-option"
                        >
                            <span className="helpdesk-icon email">
                                <Mail size={19} />
                            </span>
                            <span>
                                <strong>
                                    {isHindi ? "ईमेल करें" : "Email Us"}
                                </strong>
                                <small>pscdeowaup@gmail.com</small>
                            </span>
                            <ArrowRight size={16} />
                        </a>

                        <Link
                            to="/help-desk"
                            className="helpdesk-contact-link"
                            onClick={() => setIsOpen(false)}
                        >
                            {isHindi
                                ? "पेज पर जाएं"
                                : "Visit Page"}
                            <ArrowRight size={16} />
                        </Link>

                    </div>
                </div>
            )}
        </div>
    );
}

export default HelpDesk;
