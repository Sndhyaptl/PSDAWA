
import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

import { useLanguage } from "../../hooks/useLanguage";
import contactInfo from "../../data/contactInfo";
import { saveContactMessage } from "../../utils/contactStorage";

import "../../styles/contact.css";

const initialForm = {
  name: "",
  mobile: "",
  email: "",
  subject: "",
  message: "",
  consent: false,
};

const Contact = () => {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const content = {
    title: isHindi ? "संपर्क करें" : "Contact Us",
    subtitle: isHindi
      ? "पंचायत सहायक संगठन, उत्तर प्रदेश से संपर्क करने के लिए नीचे दिया गया फॉर्म भरें।"
      : "Get in touch with Panchayat Sahayak Cum Data Entry Operator Sangathan, Uttar Pradesh.",

    address: isHindi ? "कार्यालय का अस्थाई पता" : "Office Temporary Address",
    permanentaddress: isHindi ? "कार्यालय का स्थाई पता" : "Office Permanent Address",
    phone: isHindi ? "फोन नंबर" : "Phone Number",
    email: isHindi ? "ईमेल पता" : "Email Address",
    hours: isHindi ? "कार्यालय समय" : "Office Hours",

    unavailable: isHindi
      ? "आधिकारिक जानकारी अभी उपलब्ध नहीं है।"
      : "Official contact information is not available yet.",

    formTitle: isHindi ? "हमें संदेश भेजें" : "Send Us a Message",
    formSubtitle: isHindi
      ? "अपना प्रश्न या सुझाव हमें भेजें।"
      : "Send us your question, feedback, or suggestion.",

    name: isHindi ? "पूरा नाम" : "Full Name",
    mobile: isHindi ? "मोबाइल नंबर" : "Mobile Number",
    emailLabel: isHindi ? "ईमेल (वैकल्पिक)" : "Email (Optional)",
    subject: isHindi ? "संदेश का विषय" : "Subject",
    message: isHindi ? "आपका संदेश" : "Your Message",

    namePlaceholder: isHindi ? "अपना नाम लिखें" : "Enter your name",
    mobilePlaceholder: isHindi ? "10 अंकों का मोबाइल नंबर" : "10-digit mobile number",
    emailPlaceholder: isHindi ? "example@email.com" : "example@email.com",
    subjectPlaceholder: isHindi ? "विषय चुनें" : "Select a subject",
    messagePlaceholder: isHindi
      ? "अपना संदेश यहां लिखें..."
      : "Write your message here...",

    subjects: isHindi
      ? [
          "सदस्यता संबंधी जानकारी",
          "संगठन संबंधी जानकारी",
          "शिकायत",
          "सुझाव",
          "अन्य",
        ]
      : [
          "Membership Information",
          "Organization Information",
          "Complaint",
          "Suggestion",
          "Other",
        ],

    consent: isHindi
      ? "मैं पुष्टि करता/करती हूं कि दी गई जानकारी सही है।"
      : "I confirm that the information provided is correct.",

    send: isHindi ? "संदेश भेजें" : "Send Message",

    successTitle: isHindi
      ? "डेमो फॉर्म सफलतापूर्वक पूरा हुआ"
      : "Demo Form Completed",

    successMessage: isHindi
      ? "यह केवल एक डेमो है। आपका संदेश सर्वर पर नहीं भेजा गया है।"
      : "This is only a demo. Your message has not been sent to a server.",

    reset: isHindi ? "नया संदेश लिखें" : "Write Another Message",

    required: isHindi ? "यह जानकारी आवश्यक है।" : "This field is required.",
    invalidMobile: isHindi
      ? "कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें।"
      : "Please enter a valid 10-digit mobile number.",
    invalidEmail: isHindi
      ? "कृपया सही ईमेल पता दर्ज करें।"
      : "Please enter a valid email address.",
    consentError: isHindi
      ? "कृपया घोषणा स्वीकार करें।"
      : "Please accept the declaration.",

    mapTitle: isHindi ? "हमारा कार्यालय" : "Our Office",
    mapMessage: isHindi
      ? "सत्यापित कार्यालय का पता उपलब्ध होने पर यहां मानचित्र जोड़ा जाएगा।"
      : "A map will be displayed here once the official office address is verified.",
  };

  const updateField = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = content.required;
    }

    if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) {
      newErrors.mobile = content.invalidMobile;
    }

    if (
      form.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ) {
      newErrors.email = content.invalidEmail;
    }

    if (!form.subject) {
      newErrors.subject = content.required;
    }

    if (!form.message.trim()) {
      newErrors.message = content.required;
    }

    if (!form.consent) {
      newErrors.consent = content.consentError;
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    try {
        await saveContactMessage({
            name: form.name.trim(),
            mobile: form.mobile.trim(),
            email: form.email.trim(),
            subject: form.subject,
            message: form.message.trim(),
            consent: form.consent
        });

        setSubmitted(true);
    } catch (error) {
        if (error.name === "AbortError") {
            return;
        }

        console.error("Contact message save failed:", error);

        alert(error.message || "Unable to save your message.");
    }
};


  const resetForm = () => {
    setForm(initialForm);
    setErrors({});
    setSubmitted(false);
  };

  const hasAddress = isHindi
    ? contactInfo.officeAddressHi
    : contactInfo.officeAddressEn;
    
  const haspermanentAddress = isHindi
    ? contactInfo.officepermanentAddressHi
    : contactInfo.officepermanentAddressEn;

  const hasHours = isHindi
    ? contactInfo.officeHoursHi
    : contactInfo.officeHoursEn;

  return (
    <div className="contact-page">
      <section className="contact-banner">
        <div className="container">
          <span className="contact-banner-label">
            {isHindi ? "हमसे जुड़ें" : "GET IN TOUCH"}
          </span>

          <h1>{content.title}</h1>
          <p>{content.subtitle}</p>
        </div>
      </section>

      <section className="container contact-content">
        <div className="row g-4">
          <div className="col-lg-5">
            <div className="contact-info-panel">
              <h2>
                {isHindi ? "संपर्क जानकारी" : "Contact Information"}
              </h2>

              <p className="contact-info-intro">
                {isHindi
                  ? "संगठन से संबंधित जानकारी और सहायता के लिए संपर्क करें।"
                  : "Contact the organization for information and assistance."}
              </p>

              <div className="contact-info-list">
                <div className="contact-info-item">
                  <div className="contact-icon">
                    <MapPin size={21} />
                  </div>

                  <div>
                    <h3>{content.address}</h3>
                    <p>{hasAddress || content.unavailable}</p>
                  </div>
                </div>

                
                <div className="contact-info-item">
                  <div className="contact-icon">
                    <MapPin size={21} />
                  </div>

                  <div>
                    <h3>{content.permanentaddress}</h3>
                    <p>{haspermanentAddress || content.unavailable}</p>
                  </div>
                </div>
                

                <div className="contact-info-item">
                  <div className="contact-icon">
                    <Phone size={21} />
                  </div>

                  <div>
                    <h3>{content.phone}</h3>

                    {contactInfo.phone ? (
                      <a href={`tel:${contactInfo.phone}`}>
                        {contactInfo.phone}
                      </a>
                    ) : (
                      <p>{content.unavailable}</p>
                    )}
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-icon">
                    <Mail size={21} />
                  </div>

                  <div>
                    <h3>{content.email}</h3>

                    {contactInfo.email ? (
                      <a href={`mailto:${contactInfo.email}`}>
                        {contactInfo.email}
                      </a>
                    ) : (
                      <p>{content.unavailable}</p>
                    )}
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-icon">
                    <Clock size={21} />
                  </div>

                  <div>
                    <h3>{content.hours}</h3>
                    <p>{hasHours || content.unavailable}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* {contactInfo.mapUrl ? (
              <a
                className="contact-map-link"
                href={contactInfo.mapUrl}
                target="_blank"
                rel="noreferrer"
              >
                <MapPin size={17} />
                {isHindi ? "मानचित्र पर देखें" : "View on Map"}
                <ExternalLink size={15} />
              </a>
            ) : (
              <div className="contact-map-placeholder">
                <MapPin size={30} />
                <h3>{content.mapTitle}</h3>
                <p>{content.mapMessage}</p>
              </div>
            )} */}
          </div>

          <div className="col-lg-7">
            <div className="contact-form-panel">
              {!submitted ? (
                <>
                  <div className="contact-form-heading">
                    <div className="contact-form-heading-icon">
                      <MessageSquare size={23} />
                    </div>

                    <div>
                      <h2>{content.formTitle}</h2>
                      <p>{content.formSubtitle}</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} noValidate>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="contact-name">
                          {content.name} <span>*</span>
                        </label>

                        <input
                          id="contact-name"
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={updateField}
                          placeholder={content.namePlaceholder}
                          className={errors.name ? "is-invalid" : ""}
                        />

                        {errors.name && (
                          <small className="contact-error">
                            {errors.name}
                          </small>
                        )}
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="contact-mobile">
                          {content.mobile} <span>*</span>
                        </label>

                        <input
                          id="contact-mobile"
                          type="tel"
                          name="mobile"
                          value={form.mobile}
                          onChange={updateField}
                          maxLength={10}
                          placeholder={content.mobilePlaceholder}
                          className={errors.mobile ? "is-invalid" : ""}
                        />

                        {errors.mobile && (
                          <small className="contact-error">
                            {errors.mobile}
                          </small>
                        )}
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="contact-email">
                          {content.emailLabel}
                        </label>

                        <input
                          id="contact-email"
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={updateField}
                          placeholder={content.emailPlaceholder}
                          className={errors.email ? "is-invalid" : ""}
                        />

                        {errors.email && (
                          <small className="contact-error">
                            {errors.email}
                          </small>
                        )}
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="contact-subject">
                          {content.subject} <span>*</span>
                        </label>

                        <select
                          id="contact-subject"
                          name="subject"
                          value={form.subject}
                          onChange={updateField}
                          className={errors.subject ? "is-invalid" : ""}
                        >
                          <option value="">
                            {content.subjectPlaceholder}
                          </option>

                          {content.subjects.map((subject) => (
                            <option key={subject} value={subject}>
                              {subject}
                            </option>
                          ))}
                        </select>

                        {errors.subject && (
                          <small className="contact-error">
                            {errors.subject}
                          </small>
                        )}
                      </div>

                      <div className="col-12">
                        <label htmlFor="contact-message">
                          {content.message} <span>*</span>
                        </label>

                        <textarea
                          id="contact-message"
                          name="message"
                          rows="5"
                          value={form.message}
                          onChange={updateField}
                          placeholder={content.messagePlaceholder}
                          className={errors.message ? "is-invalid" : ""}
                        />

                        {errors.message && (
                          <small className="contact-error">
                            {errors.message}
                          </small>
                        )}
                      </div>

                      <div className="col-12">
                        <label className="contact-consent">
                          <input
                            type="checkbox"
                            name="consent"
                            checked={form.consent}
                            onChange={updateField}
                          />

                          <span>{content.consent}</span>
                        </label>

                        {errors.consent && (
                          <small className="contact-error">
                            {errors.consent}
                          </small>
                        )}
                      </div>

                      <div className="col-12">
                        <button type="submit" className="contact-submit-btn">
                          <Send size={17} />
                          {content.send}
                        </button>
                      </div>
                    </div>
                  </form>
                </>
              ) : (
                <div className="contact-success">
                  <CheckCircle2 size={55} />

                  <h2>{content.successTitle}</h2>
                  <p>{content.successMessage}</p>

                  <button
                    type="button"
                    onClick={resetForm}
                    className="contact-submit-btn"
                  >
                    {content.reset}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

      </section>
    </div>
  );
};

export default Contact;
