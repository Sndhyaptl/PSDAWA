
import { useRef, useState } from "react";
import {
  User,
  Phone,
  Mail,
  MapPin,
  BriefcaseBusiness,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

import { useLanguage } from "../../hooks/useLanguage";
import SectionTitle from "../../components/SectionTitle";
import upDistricts from "../../data/upDistricts";

import "../../styles/membership.css";

const MAX_FILE_SIZE = 2 * 1024 * 1024;

const initialForm = {
  fullName: "",
  fatherName: "",
  dateOfBirth: "",
  gender: "",
  mobile: "",
  alternateMobile: "",
  email: "",
  districtId: "",
  blockName: "",
  gramPanchayat: "",
  designation: "",
  joiningDate: "",
  address: "",
  declaration: false
};

export default function Membership() {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  const fileInputRef = useRef(null);

  const [form, setForm] = useState(initialForm);
  const [document, setDocument] = useState(null);
  const [documentError, setDocumentError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const text = {
    title: isHindi ? "सदस्यता आवेदन" : "Membership Application",
    subtitle: isHindi
      ? "पंचायत सहायक संगठन की सदस्यता के लिए आवेदन करें।"
      : "Apply for membership in the Panchayat Sahayak Association.",

    personal: isHindi ? "व्यक्तिगत जानकारी" : "Personal Information",
    contact: isHindi ? "संपर्क जानकारी" : "Contact Information",
    work: isHindi ? "कार्य संबंधी जानकारी" : "Work Information",
    document: isHindi ? "दस्तावेज अपलोड" : "Document Upload",

    fullName: isHindi ? "पूरा नाम" : "Full Name",
    fatherName: isHindi ? "पिता / पति का नाम" : "Father / Husband Name",
    dob: isHindi ? "जन्म तिथि" : "Date of Birth",
    gender: isHindi ? "लिंग" : "Gender",
    male: isHindi ? "पुरुष" : "Male",
    female: isHindi ? "महिला" : "Female",
    other: isHindi ? "अन्य" : "Other",

    mobile: isHindi ? "मोबाइल नंबर" : "Mobile Number",
    alternateMobile: isHindi
      ? "वैकल्पिक मोबाइल नंबर"
      : "Alternate Mobile Number",
    email: isHindi ? "ईमेल आईडी" : "Email Address",

    district: isHindi ? "जनपद" : "District",
    selectDistrict: isHindi ? "जनपद चुनें" : "Select District",
    block: isHindi ? "विकासखंड" : "Block",
    gramPanchayat: isHindi ? "ग्राम पंचायत" : "Gram Panchayat",
    designation: isHindi ? "पद / कार्य का नाम" : "Designation / Work Role",
    joiningDate: isHindi
      ? "कार्यभार ग्रहण करने की तिथि"
      : "Date of Joining",
    address: isHindi ? "पूरा पता" : "Full Address",

    uploadHelp: isHindi
      ? "PDF, JPG या PNG फाइल अपलोड करें। अधिकतम आकार 2 MB है।"
      : "Upload PDF, JPG or PNG. Maximum file size is 2 MB.",

    declaration: isHindi
      ? "मैं घोषणा करता/करती हूं कि मेरे द्वारा दी गई जानकारी मेरी जानकारी के अनुसार सही है।"
      : "I declare that the information provided by me is true to the best of my knowledge.",

    submit: isHindi ? "आवेदन जमा करें" : "Submit Application",
    required: isHindi ? "यह जानकारी आवश्यक है।" : "This field is required.",
    successTitle: isHindi
      ? "आवेदन तैयार हो गया है"
      : "Application Form Completed",
    successDescription: isHindi
      ? "यह केवल फ्रंटएंड डेमो है। आपका आवेदन अभी सर्वर पर जमा नहीं हुआ है।"
      : "This is a frontend demo. Your application has not been submitted to a server.",
    startAgain: isHindi ? "नया आवेदन करें" : "Start New Application"
  };

  const updateField = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleDocument = (event) => {
    const file = event.target.files?.[0];

    setDocumentError("");
    setDocument(null);

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png"
    ];

    if (!allowedTypes.includes(file.type)) {
      setDocumentError(
        isHindi
          ? "केवल PDF, JPG या PNG फाइल मान्य है।"
          : "Only PDF, JPG or PNG files are allowed."
      );
      event.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setDocumentError(
        isHindi
          ? "फाइल का आकार 2 MB से अधिक नहीं होना चाहिए।"
          : "File size must not exceed 2 MB."
      );
      event.target.value = "";
      return;
    }

    setDocument(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitError("");

    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity();
      return;
    }

    if (!form.declaration) {
      setSubmitError(
        isHindi
          ? "कृपया घोषणा स्वीकार करें।"
          : "Please accept the declaration."
      );
      return;
    }

    // Frontend demo only.
    // Connect this form to your API before production use.
    setSubmitted(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const resetApplication = () => {
    setForm(initialForm);
    setDocument(null);
    setDocumentError("");
    setSubmitError("");
    setSubmitted(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (submitted) {
    return (
      <div className="membership-page">
        <section className="membership-banner">
          <div className="container">
            <h1>{text.title}</h1>
            <p>{text.subtitle}</p>
          </div>
        </section>

        <div className="container">
          <div className="membership-success">
            <CheckCircle2 size={65} />

            <h2>{text.successTitle}</h2>

            <p>{text.successDescription}</p>

            <button
              type="button"
              className="membership-submit"
              onClick={resetApplication}
            >
              {text.startAgain}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="membership-page">
      <section className="membership-banner">
        <div className="container">
          <span className="membership-eyebrow">
            {isHindi ? "संगठन से जुड़ें" : "JOIN THE ASSOCIATION"}
          </span>

          <h1>{text.title}</h1>
          <p>{text.subtitle}</p>
        </div>
      </section>

      <section className="container membership-content">
        <SectionTitle
          title={isHindi ? "सदस्यता फॉर्म" : "Membership Form"}
          subtitle={
            isHindi
              ? "कृपया सभी आवश्यक जानकारी सावधानीपूर्वक भरें।"
              : "Please carefully complete all required information."
          }
        />

        <form
          className="membership-form"
          onSubmit={handleSubmit}
        >
          <div className="membership-notice">
            <AlertCircle size={19} />
            <span>
              {isHindi
                ? "कृपया सही मोबाइल नंबर और अन्य जानकारी भरें।"
                : "Please provide an accurate mobile number and other details."}
            </span>
          </div>

          {/* Personal Information */}
          <div className="membership-section-heading">
            <User size={21} />
            <h3>{text.personal}</h3>
          </div>

          <div className="membership-grid">
            <div className="membership-field">
              <label htmlFor="fullName">{text.fullName} *</label>
              <input
                id="fullName"
                name="fullName"
                value={form.fullName}
                onChange={updateField}
                placeholder={text.fullName}
                maxLength={100}
                required
              />
            </div>

            <div className="membership-field">
              <label htmlFor="fatherName">{text.fatherName} *</label>
              <input
                id="fatherName"
                name="fatherName"
                value={form.fatherName}
                onChange={updateField}
                placeholder={text.fatherName}
                maxLength={100}
                required
              />
            </div>

            <div className="membership-field">
              <label htmlFor="dateOfBirth">{text.dob} *</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={form.dateOfBirth}
                onChange={updateField}
                required
              />
            </div>

            <div className="membership-field">
              <label htmlFor="gender">{text.gender} *</label>
              <select
                id="gender"
                name="gender"
                value={form.gender}
                onChange={updateField}
                required
              >
                <option value="">
                  {isHindi ? "लिंग चुनें" : "Select Gender"}
                </option>
                <option value="male">{text.male}</option>
                <option value="female">{text.female}</option>
                <option value="other">{text.other}</option>
              </select>
            </div>
          </div>

          {/* Contact Information */}
          <div className="membership-section-heading">
            <Phone size={21} />
            <h3>{text.contact}</h3>
          </div>

          <div className="membership-grid">
            <div className="membership-field">
              <label htmlFor="mobile">{text.mobile} *</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={form.mobile}
                onChange={updateField}
                placeholder="10-digit mobile number"
                pattern="[6-9][0-9]{9}"
                title={
                  isHindi
                    ? "कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें।"
                    : "Enter a valid 10-digit Indian mobile number."
                }
                maxLength={10}
                required
              />
            </div>

            <div className="membership-field">
              <label htmlFor="alternateMobile">
                {text.alternateMobile}
              </label>
              <input
                type="tel"
                id="alternateMobile"
                name="alternateMobile"
                value={form.alternateMobile}
                onChange={updateField}
                placeholder="10-digit mobile number"
                pattern="[6-9][0-9]{9}"
                maxLength={10}
              />
            </div>

            <div className="membership-field membership-full">
              <label htmlFor="email">{text.email}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={updateField}
                placeholder="example@email.com"
                maxLength={150}
              />
            </div>
          </div>

          {/* Work Information */}
          <div className="membership-section-heading">
            <BriefcaseBusiness size={21} />
            <h3>{text.work}</h3>
          </div>

          <div className="membership-grid">
            <div className="membership-field">
              <label htmlFor="districtId">{text.district} *</label>
              <select
                id="districtId"
                name="districtId"
                value={form.districtId}
                onChange={updateField}
                required
              >
                <option value="">{text.selectDistrict}</option>

                {upDistricts.map((district) => (
                  <option key={district.id} value={district.id}>
                    {isHindi ? district.nameHi : district.nameEn}
                  </option>
                ))}
              </select>
            </div>

            <div className="membership-field">
              <label htmlFor="blockName">{text.block} *</label>
              <input
                id="blockName"
                name="blockName"
                value={form.blockName}
                onChange={updateField}
                placeholder={text.block}
                maxLength={100}
                required
              />
            </div>

            <div className="membership-field">
              <label htmlFor="gramPanchayat">
                {text.gramPanchayat}
              </label>
              <input
                id="gramPanchayat"
                name="gramPanchayat"
                value={form.gramPanchayat}
                onChange={updateField}
                placeholder={text.gramPanchayat}
                maxLength={150}
              />
            </div>

            <div className="membership-field">
              <label htmlFor="designation">{text.designation} *</label>
              <input
                id="designation"
                name="designation"
                value={form.designation}
                onChange={updateField}
                placeholder={text.designation}
                maxLength={150}
                required
              />
            </div>

            <div className="membership-field">
              <label htmlFor="joiningDate">{text.joiningDate}</label>
              <input
                type="date"
                id="joiningDate"
                name="joiningDate"
                value={form.joiningDate}
                onChange={updateField}
              />
            </div>

            <div className="membership-field membership-full">
              <label htmlFor="address">{text.address} *</label>
              <textarea
                id="address"
                name="address"
                value={form.address}
                onChange={updateField}
                placeholder={text.address}
                rows={3}
                maxLength={500}
                required
              />
            </div>
          </div>

          {/* Document Upload */}
          <div className="membership-section-heading">
            <FileText size={21} />
            <h3>{text.document}</h3>
          </div>

          <div className="membership-upload">
            <label htmlFor="membershipDocument">
              <Upload size={27} />

              <strong>
                {isHindi
                  ? "दस्तावेज चुनने के लिए क्लिक करें"
                  : "Click to choose a document"}
              </strong>

              <span>{text.uploadHelp}</span>
            </label>

            <input
              ref={fileInputRef}
              type="file"
              id="membershipDocument"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleDocument}
            />

            {document && (
              <div className="membership-file-name">
                <FileText size={17} />
                <span>{document.name}</span>
              </div>
            )}

            {documentError && (
              <p className="membership-error">{documentError}</p>
            )}
          </div>

          {/* Declaration */}
          <div className="membership-declaration">
            <label>
              <input
                type="checkbox"
                name="declaration"
                checked={form.declaration}
                onChange={updateField}
              />

              <span>{text.declaration} *</span>
            </label>
          </div>

          {submitError && (
            <div className="membership-submit-error">
              {submitError}
            </div>
          )}

          <button type="submit" className="membership-submit">
            {text.submit}
          </button>

          <p className="membership-privacy-note">
            <Mail size={15} />
            {isHindi
              ? "आपकी जानकारी का उपयोग सदस्यता प्रक्रिया के लिए किया जाना चाहिए।"
              : "Your information should only be used for the membership process."}
          </p>
        </form>
      </section>
    </div>
  );
}
