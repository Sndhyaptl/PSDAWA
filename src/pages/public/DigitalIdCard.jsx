
import { useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  CreditCard,
  Upload,
  Printer,
  RotateCcw,
  ShieldCheck
} from "lucide-react";

import { useLanguage } from "../../hooks/useLanguage";
import upDistricts from "../../data/upDistricts";
import SectionTitle from "../../components/SectionTitle";

import "../../styles/digital-id-card.css";

const initialForm = {
  memberId: "",
  fullName: "",
  designation: "",
  districtId: "",
  blockName: "",
  mobile: "",
  validUntil: "",
  photo: ""
};

export default function DigitalIdCard() {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  const cardRef = useRef(null);
  const photoInputRef = useRef(null);

  const [form, setForm] = useState(initialForm);
  const [photoError, setPhotoError] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const labels = {
    title: isHindi ? "डिजिटल पहचान पत्र" : "Digital ID Card",
    subtitle: isHindi
      ? "सदस्य पहचान पत्र का प्रीव्यू तैयार करें।"
      : "Create a preview of your membership identity card.",

    formTitle: isHindi ? "सदस्य विवरण" : "Member Details",
    memberId: isHindi ? "सदस्यता संख्या" : "Membership Number",
    name: isHindi ? "सदस्य का नाम" : "Member Name",
    designation: isHindi ? "पद" : "Designation",
    district: isHindi ? "जनपद" : "District",
    selectDistrict: isHindi ? "जनपद चुनें" : "Select District",
    block: isHindi ? "विकासखंड" : "Block",
    mobile: isHindi ? "मोबाइल नंबर" : "Mobile Number",
    validity: isHindi ? "मान्य तिथि तक" : "Valid Until",
    photo: isHindi ? "सदस्य का फोटो" : "Member Photo",

    cardTitle: isHindi ? "सदस्य पहचान पत्र" : "MEMBERSHIP ID CARD",
    organization: isHindi
      ? "पंचायत सहायक कम डाटा एंट्री ऑपरेटर संगठन"
      : "PANCHAYAT SAHAYAK CUM DATA ENTRY OPERATOR SANGATHAN",
    state: isHindi ? "उत्तर प्रदेश" : "UTTAR PRADESH",

    idLabel: isHindi ? "सदस्यता संख्या" : "Member ID",
    nameLabel: isHindi ? "नाम" : "Name",
    designationLabel: isHindi ? "पद" : "Designation",
    districtLabel: isHindi ? "जनपद" : "District",
    blockLabel: isHindi ? "विकासखंड" : "Block",
    validLabel: isHindi ? "मान्य" : "Valid Until",

    preview: isHindi ? "आईडी कार्ड देखें" : "Generate ID Preview",
    print: isHindi ? "प्रिंट करें" : "Print Card",
    reset: isHindi ? "रीसेट करें" : "Reset Form",

    warning: isHindi
      ? "यह केवल डेमो प्रीव्यू है। यह आधिकारिक पहचान पत्र नहीं है।"
      : "This is a demo preview only. It is not an officially issued identity card."
  };

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handlePhoto = (event) => {
    const file = event.target.files?.[0];

    setPhotoError("");

    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setPhotoError(
        isHindi
          ? "केवल JPG या PNG फोटो अपलोड करें।"
          : "Only JPG or PNG images are allowed."
      );
      event.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setPhotoError(
        isHindi
          ? "फोटो का आकार 2 MB से कम होना चाहिए।"
          : "Photo size must be less than 2 MB."
      );
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setForm((previous) => ({
        ...previous,
        photo: reader.result
      }));
    };

    reader.readAsDataURL(file);
  };

  const selectedDistrict = upDistricts.find(
    (district) => String(district.id) === String(form.districtId)
  );

  const districtName = selectedDistrict
    ? isHindi
      ? selectedDistrict.nameHi
      : selectedDistrict.nameEn
    : "";

  const formatDate = (date) => {
    if (!date) return "—";

    return new Intl.DateTimeFormat(
      isHindi ? "hi-IN" : "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }
    ).format(new Date(`${date}T00:00:00`));
  };

  const generatePreview = (event) => {
    event.preventDefault();

    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity();
      return;
    }

    setShowPreview(true);
  };

  const printCard = () => {
    if (!showPreview) return;

    window.print();
  };

  const resetForm = () => {
    setForm(initialForm);
    setShowPreview(false);
    setPhotoError("");

    if (photoInputRef.current) {
      photoInputRef.current.value = "";
    }
  };

  return (
    <div className="digital-id-page">
      <section className="digital-id-banner">
        <div className="container">
          <span className="digital-id-eyebrow">
            {isHindi ? "सदस्य सुविधा" : "MEMBER FACILITY"}
          </span>

          <h1>{labels.title}</h1>
          <p>{labels.subtitle}</p>
        </div>
      </section>

      <section className="container digital-id-content">
        <SectionTitle
          title={labels.formTitle}
          subtitle={
            isHindi
              ? "कार्ड प्रीव्यू के लिए सदस्य की जानकारी भरें।"
              : "Enter member details to create an ID card preview."
          }
        />

        <div className="digital-id-demo-warning">
          <ShieldCheck size={20} />
          <span>{labels.warning}</span>
        </div>

        <div className="digital-id-layout">
          <form
            className="digital-id-form"
            onSubmit={generatePreview}
          >
            <div className="digital-id-field">
              <label htmlFor="memberId">{labels.memberId} *</label>
              <input
                id="memberId"
                name="memberId"
                value={form.memberId}
                onChange={updateField}
                maxLength={40}
                required
              />
            </div>

            <div className="digital-id-field">
              <label htmlFor="fullName">{labels.name} *</label>
              <input
                id="fullName"
                name="fullName"
                value={form.fullName}
                onChange={updateField}
                maxLength={100}
                required
              />
            </div>

            <div className="digital-id-field">
              <label htmlFor="designation">
                {labels.designation} *
              </label>
              <input
                id="designation"
                name="designation"
                value={form.designation}
                onChange={updateField}
                maxLength={100}
                required
              />
            </div>

            <div className="digital-id-field">
              <label htmlFor="districtId">{labels.district} *</label>
              <select
                id="districtId"
                name="districtId"
                value={form.districtId}
                onChange={updateField}
                required
              >
                <option value="">{labels.selectDistrict}</option>

                {upDistricts.map((district) => (
                  <option key={district.id} value={district.id}>
                    {isHindi ? district.nameHi : district.nameEn}
                  </option>
                ))}
              </select>
            </div>

            <div className="digital-id-field">
              <label htmlFor="blockName">{labels.block} *</label>
              <input
                id="blockName"
                name="blockName"
                value={form.blockName}
                onChange={updateField}
                maxLength={100}
                required
              />
            </div>

            <div className="digital-id-field">
              <label htmlFor="mobile">{labels.mobile} *</label>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                value={form.mobile}
                onChange={updateField}
                pattern="[6-9][0-9]{9}"
                maxLength={10}
                required
              />
            </div>

            <div className="digital-id-field">
              <label htmlFor="validUntil">{labels.validity}</label>
              <input
                id="validUntil"
                name="validUntil"
                type="date"
                value={form.validUntil}
                onChange={updateField}
              />
            </div>

            <div className="digital-id-field">
              <label htmlFor="memberPhoto">{labels.photo}</label>

              <input
                ref={photoInputRef}
                id="memberPhoto"
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handlePhoto}
              />

              {photoError && (
                <small className="digital-id-error">
                  {photoError}
                </small>
              )}
            </div>

            <div className="digital-id-form-actions">
              <button type="submit" className="digital-id-primary">
                <CreditCard size={18} />
                {labels.preview}
              </button>

              <button
                type="button"
                className="digital-id-secondary"
                onClick={resetForm}
              >
                <RotateCcw size={17} />
                {labels.reset}
              </button>
            </div>
          </form>

          <div className="digital-id-preview-area">
            <h3>
              {isHindi ? "कार्ड प्रीव्यू" : "ID Card Preview"}
            </h3>

            {showPreview ? (
              <>
                <div className="membership-id-card" ref={cardRef}>
                  <div className="id-card-header">
                    <div className="id-card-logo">
                      PS
                    </div>

                    <div className="id-card-heading">
                      <h4>{labels.organization}</h4>
                      <span>{labels.state}</span>
                    </div>
                  </div>

                  <div className="id-card-body">
                    <div className="id-card-photo">
                      {form.photo ? (
                        <img src={form.photo} alt="Member" />
                      ) : (
                        <span>
                          <Upload size={25} />
                        </span>
                      )}
                    </div>

                    <div className="id-card-details">
                      <strong className="id-card-member-name">
                        {form.fullName}
                      </strong>

                      <div>
                        <span>{labels.idLabel}:</span>
                        <b>{form.memberId}</b>
                      </div>

                      <div>
                        <span>{labels.designationLabel}:</span>
                        <b>{form.designation}</b>
                      </div>

                      <div>
                        <span>{labels.districtLabel}:</span>
                        <b>{districtName}</b>
                      </div>

                      <div>
                        <span>{labels.blockLabel}:</span>
                        <b>{form.blockName}</b>
                      </div>

                      <div>
                        <span>{labels.validLabel}:</span>
                        <b>{formatDate(form.validUntil)}</b>
                      </div>
                    </div>
                  </div>

                  <div className="id-card-footer">
                    <div className="id-card-contact">
                      {form.mobile}
                    </div>

                    <div className="id-card-qr">
                      <QRCodeSVG
                        value={`PSDAWA-MEMBER:${form.memberId}`}
                        size={66}
                        level="M"
                      />
                    </div>
                  </div>

                  <div className="id-card-demo-label">
                    DEMO PREVIEW — NOT AN OFFICIAL ID
                  </div>
                </div>

                <button
                  type="button"
                  className="digital-id-print"
                  onClick={printCard}
                >
                  <Printer size={18} />
                  {labels.print}
                </button>
              </>
            ) : (
              <div className="digital-id-placeholder">
                <CreditCard size={55} />
                <p>
                  {isHindi
                    ? "जानकारी भरने के बाद आपका आईडी कार्ड यहां दिखाई देगा।"
                    : "Your ID card preview will appear here after entering the details."}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
