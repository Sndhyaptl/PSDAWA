
import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Eye,
  UserCheck,
  UserX,
  X,
  Users,
  RotateCcw,
} from "lucide-react";

import { useLanguage } from "../../hooks/useLanguage";
import adminMembers from "../../data/adminMembers";

import "../../styles/admin-members.css";

const emptyMember = {
  memberId: "",
  fullName: "",
  fatherName: "",
  mobile: "",
  email: "",
  district: "",
  block: "",
  gramPanchayat: "",
  designation: "",
  joiningDate: "",
  status: "Active",
};

const Members = () => {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  const [members, setMembers] = useState(adminMembers);
  const [search, setSearch] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showForm, setShowForm] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyMember);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState("");

  const text = {
    title: isHindi ? "सदस्य प्रबंधन" : "Members Management",
    subtitle: isHindi
      ? "संगठन के सदस्यों की जानकारी प्रबंधित करें।"
      : "Manage organization member information.",

    add: isHindi ? "नया सदस्य जोड़ें" : "Add New Member",
    search: isHindi
      ? "नाम, सदस्य ID, मोबाइल या जिला खोजें..."
      : "Search name, member ID, mobile or district...",

    allDistricts: isHindi ? "सभी जिले" : "All Districts",
    allStatuses: isHindi ? "सभी स्थितियां" : "All Statuses",
    active: isHindi ? "सक्रिय" : "Active",
    inactive: isHindi ? "निष्क्रिय" : "Inactive",

    memberId: isHindi ? "सदस्य ID" : "Member ID",
    name: isHindi ? "पूरा नाम" : "Full Name",
    mobile: isHindi ? "मोबाइल नंबर" : "Mobile Number",
    district: isHindi ? "जिला" : "District",
    block: isHindi ? "ब्लॉक" : "Block",
    designation: isHindi ? "पदनाम" : "Designation",
    joiningDate: isHindi ? "सदस्यता तिथि" : "Joining Date",
    status: isHindi ? "स्थिति" : "Status",
    actions: isHindi ? "कार्यवाही" : "Actions",

    noMembers: isHindi
      ? "अभी कोई सदस्य रिकॉर्ड उपलब्ध नहीं है।"
      : "No member records are available yet.",

    noResults: isHindi
      ? "आपकी खोज से कोई सदस्य नहीं मिला।"
      : "No members match your search.",

    formAdd: isHindi ? "नया सदस्य जोड़ें" : "Add New Member",
    formEdit: isHindi ? "सदस्य जानकारी संपादित करें" : "Edit Member Details",
    view: isHindi ? "सदस्य विवरण" : "Member Details",

    fatherName: isHindi ? "पिता का नाम" : "Father's Name",
    email: isHindi ? "ईमेल" : "Email",
    gramPanchayat: isHindi ? "ग्राम पंचायत" : "Gram Panchayat",

    save: isHindi ? "सहेजें" : "Save Member",
    update: isHindi ? "अपडेट करें" : "Update Member",
    cancel: isHindi ? "रद्द करें" : "Cancel",
    close: isHindi ? "बंद करें" : "Close",
    edit: isHindi ? "संपादित करें" : "Edit",
    activate: isHindi ? "सक्रिय करें" : "Activate",
    deactivate: isHindi ? "निष्क्रिय करें" : "Deactivate",

    required: isHindi
      ? "यह जानकारी आवश्यक है।"
      : "This field is required.",

    invalidMobile: isHindi
      ? "सही 10 अंकों का मोबाइल नंबर दर्ज करें।"
      : "Enter a valid 10-digit mobile number.",

    invalidEmail: isHindi
      ? "सही ईमेल पता दर्ज करें।"
      : "Enter a valid email address.",

    saved: isHindi
      ? "डेमो सदस्य रिकॉर्ड जोड़ा गया।"
      : "Demo member record added.",

    updated: isHindi
      ? "डेमो सदस्य रिकॉर्ड अपडेट किया गया।"
      : "Demo member record updated.",

    toggled: isHindi
      ? "सदस्य की डेमो स्थिति अपडेट की गई।"
      : "Demo member status updated.",

    demo: isHindi
      ? "यह डेमो मॉड्यूल है। रिकॉर्ड अभी सर्वर या डेटाबेस में सेव नहीं होते।"
      : "This is a demo module. Records are not saved to a server or database yet.",

    reset: isHindi ? "फ़िल्टर साफ करें" : "Clear Filters",
    total: isHindi ? "दिखाए गए सदस्य" : "Members Shown",
  };

  const districts = useMemo(() => {
    return [
      ...new Set(
        members
          .map((member) => member.district)
          .filter(Boolean)
      ),
    ].sort();
  }, [members]);

  const filteredMembers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return members.filter((member) => {
      const matchesSearch =
        !query ||
        [
          member.memberId,
          member.fullName,
          member.mobile,
          member.district,
          member.block,
        ].some((value) =>
          String(value || "").toLowerCase().includes(query)
        );

      const matchesDistrict =
        !districtFilter || member.district === districtFilter;

      const matchesStatus =
        statusFilter === "All" || member.status === statusFilter;

      return matchesSearch && matchesDistrict && matchesStatus;
    });
  }, [members, search, districtFilter, statusFilter]);

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const openAddForm = () => {
    setEditingId(null);
    setForm(emptyMember);
    setErrors({});
    setShowForm(true);
    setSelectedMember(null);
    setNotice("");
  };

  const openEditForm = (member) => {
    setEditingId(member.id);
    setForm({ ...emptyMember, ...member });
    setErrors({});
    setShowForm(true);
    setSelectedMember(null);
    setNotice("");
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.memberId.trim()) {
      nextErrors.memberId = text.required;
    }

    if (!form.fullName.trim()) {
      nextErrors.fullName = text.required;
    }

    if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) {
      nextErrors.mobile = text.invalidMobile;
    }

    if (form.email.trim() &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = text.invalidEmail;
    }

    if (!form.district.trim()) {
      nextErrors.district = text.required;
    }

    if (!form.designation.trim()) {
      nextErrors.designation = text.required;
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) return;

    const duplicateId = members.some(
      (member) =>
        member.memberId.toLowerCase() === form.memberId.trim().toLowerCase() &&
        member.id !== editingId
    );

    if (duplicateId) {
      setErrors((previous) => ({
        ...previous,
        memberId: isHindi
          ? "यह सदस्य ID पहले से मौजूद है।"
          : "This Member ID already exists.",
      }));
      return;
    }

    if (editingId !== null) {
      setMembers((previous) =>
        previous.map((member) =>
          member.id === editingId
            ? { ...member, ...form }
            : member
        )
      );

      setNotice(text.updated);
    } else {
      const newMember = {
        ...form,
        id: Date.now(),
      };

      setMembers((previous) => [newMember, ...previous]);
      setNotice(text.saved);
    }

    setShowForm(false);
    setEditingId(null);
    setForm(emptyMember);
  };

  const toggleStatus = (member) => {
    const nextStatus =
      member.status === "Active" ? "Inactive" : "Active";

    setMembers((previous) =>
      previous.map((item) =>
        item.id === member.id
          ? { ...item, status: nextStatus }
          : item
      )
    );

    setNotice(text.toggled);
  };

  const clearFilters = () => {
    setSearch("");
    setDistrictFilter("");
    setStatusFilter("All");
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "-";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) return "-";

    return date.toLocaleDateString(isHindi ? "hi-IN" : "en-IN");
  };

  const statusLabel = (status) => {
    if (status === "Active") return text.active;
    return text.inactive;
  };

  return (
    <div className="admin-members-page">
      <div className="admin-members-heading">
        <div>
          <h1>{text.title}</h1>
          <p>{text.subtitle}</p>
        </div>

        <button
          type="button"
          className="members-add-btn"
          onClick={openAddForm}
        >
          <Plus size={18} />
          {text.add}
        </button>
      </div>

      <div className="members-demo-note">
        <Users size={18} />
        <span>{text.demo}</span>
      </div>

      {notice && (
        <div className="members-notice" role="status">
          {notice}
          <button
            type="button"
            onClick={() => setNotice("")}
            aria-label={text.close}
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="members-toolbar">
        <div className="members-search">
          <Search size={18} />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={text.search}
            aria-label={text.search}
          />
        </div>

        <select
          value={districtFilter}
          onChange={(event) => setDistrictFilter(event.target.value)}
          aria-label={text.district}
        >
          <option value="">{text.allDistricts}</option>

          {districts.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          aria-label={text.status}
        >
          <option value="All">{text.allStatuses}</option>
          <option value="Active">{text.active}</option>
          <option value="Inactive">{text.inactive}</option>
        </select>

        <button
          type="button"
          className="members-reset-btn"
          onClick={clearFilters}
        >
          <RotateCcw size={16} />
          {text.reset}
        </button>
      </div>

      <div className="members-count">
        {text.total}: <strong>{filteredMembers.length}</strong>
      </div>

      {showForm && (
        <div className="members-form-panel">
          <div className="members-form-heading">
            <h2>{editingId !== null ? text.formEdit : text.formAdd}</h2>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              aria-label={text.close}
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="row g-3">
              {[
                {
                  name: "memberId",
                  label: text.memberId,
                  required: true,
                },
                {
                  name: "fullName",
                  label: text.name,
                  required: true,
                },
                {
                  name: "fatherName",
                  label: text.fatherName,
                },
                {
                  name: "mobile",
                  label: text.mobile,
                  required: true,
                  type: "tel",
                },
                {
                  name: "email",
                  label: text.email,
                  type: "email",
                },
                {
                  name: "district",
                  label: text.district,
                  required: true,
                },
                {
                  name: "block",
                  label: text.block,
                },
                {
                  name: "gramPanchayat",
                  label: text.gramPanchayat,
                },
                {
                  name: "designation",
                  label: text.designation,
                  required: true,
                },
                {
                  name: "joiningDate",
                  label: text.joiningDate,
                  type: "date",
                },
              ].map((field) => (
                <div className="col-md-6" key={field.name}>
                  <label htmlFor={`member-${field.name}`}>
                    {field.label}
                    {field.required && <span> *</span>}
                  </label>

                  <input
                    id={`member-${field.name}`}
                    type={field.type || "text"}
                    name={field.name}
                    value={form[field.name]}
                    onChange={updateField}
                    maxLength={field.name === "mobile" ? 10 : undefined}
                    className={errors[field.name] ? "is-invalid" : ""}
                  />

                  {errors[field.name] && (
                    <small className="members-field-error">
                      {errors[field.name]}
                    </small>
                  )}
                </div>
              ))}

              <div className="col-md-6">
                <label htmlFor="member-status">{text.status}</label>

                <select
                  id="member-status"
                  name="status"
                  value={form.status}
                  onChange={updateField}
                >
                  <option value="Active">{text.active}</option>
                  <option value="Inactive">{text.inactive}</option>
                </select>
              </div>

              <div className="col-12 members-form-actions">
                <button
                  type="button"
                  className="members-cancel-btn"
                  onClick={() => setShowForm(false)}
                >
                  {text.cancel}
                </button>

                <button type="submit" className="members-save-btn">
                  {editingId !== null ? text.update : text.save}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="members-table-panel">
        <div className="table-responsive">
          <table className="table members-table align-middle">
            <thead>
              <tr>
                <th>{text.memberId}</th>
                <th>{text.name}</th>
                <th>{text.mobile}</th>
                <th>{text.district}</th>
                <th>{text.designation}</th>
                <th>{text.joiningDate}</th>
                <th>{text.status}</th>
                <th>{text.actions}</th>
              </tr>
            </thead>

            <tbody>
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member) => (
                  <tr key={member.id}>
                    <td>{member.memberId}</td>
                    <td className="members-name-cell">
                      {member.fullName}
                    </td>
                    <td>{member.mobile}</td>
                    <td>{member.district}</td>
                    <td>{member.designation}</td>
                    <td>{formatDate(member.joiningDate)}</td>
                    <td>
                      <span
                        className={`members-status ${
                          member.status === "Active"
                            ? "active"
                            : "inactive"
                        }`}
                      >
                        {statusLabel(member.status)}
                      </span>
                    </td>
                    <td>
                      <div className="members-row-actions">
                        <button
                          type="button"
                          title={text.view}
                          onClick={() => setSelectedMember(member)}
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          type="button"
                          title={text.edit}
                          onClick={() => openEditForm(member)}
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          type="button"
                          title={
                            member.status === "Active"
                              ? text.deactivate
                              : text.activate
                          }
                          onClick={() => toggleStatus(member)}
                        >
                          {member.status === "Active" ? (
                            <UserX size={17} />
                          ) : (
                            <UserCheck size={17} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="members-empty">
                    <Users size={38} />
                    <p>
                      {members.length === 0
                        ? text.noMembers
                        : text.noResults}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedMember && (
        <div
          className="members-modal-backdrop"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="members-detail-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="member-detail-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="members-form-heading">
              <h2 id="member-detail-title">{text.view}</h2>

              <button
                type="button"
                onClick={() => setSelectedMember(null)}
                aria-label={text.close}
              >
                <X size={20} />
              </button>
            </div>

            <div className="members-detail-grid">
              {[
                [text.memberId, selectedMember.memberId],
                [text.name, selectedMember.fullName],
                [text.fatherName, selectedMember.fatherName],
                [text.mobile, selectedMember.mobile],
                [text.email, selectedMember.email],
                [text.district, selectedMember.district],
                [text.block, selectedMember.block],
                [text.gramPanchayat, selectedMember.gramPanchayat],
                [text.designation, selectedMember.designation],
                [text.joiningDate, formatDate(selectedMember.joiningDate)],
                [text.status, statusLabel(selectedMember.status)],
              ].map(([label, value]) => (
                <div className="members-detail-item" key={label}>
                  <span>{label}</span>
                  <strong>{value || "-"}</strong>
                </div>
              ))}
            </div>

            <div className="members-form-actions">
              <button
                type="button"
                className="members-cancel-btn"
                onClick={() => setSelectedMember(null)}
              >
                {text.close}
              </button>

              <button
                type="button"
                className="members-save-btn"
                onClick={() => openEditForm(selectedMember)}
              >
                <Pencil size={15} />
                {text.edit}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Members;
