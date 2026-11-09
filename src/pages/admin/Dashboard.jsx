
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

import {
  Users,
  UserCheck,
  MapPinned,
  Map,
  ClipboardList,
  FileText,
  UserPlus,
  Bell,
  ArrowRight,
  BarChart3,
  PieChart,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useLanguage } from "../../hooks/useLanguage";
import adminDashboard from "../../data/adminDashboard";

import "../../styles/admin-dashboard.css";

const DashboardChart = ({
  type,
  labels,
  values,
  label,
  emptyText,
  backgroundColor,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || !labels.length || !values.length) {
      return undefined;
    }

    const chart = new Chart(canvas, {
      type,
      data: {
        labels,
        datasets: [
          {
            label,
            data: values,
            backgroundColor,
            borderColor: "#13804c",
            borderWidth: 2,
            borderRadius: type === "bar" ? 6 : 0,
            fill: type === "line",
            tension: 0.35,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: type === "doughnut",
            position: "bottom",
          },
        },
        scales:
          type === "doughnut"
            ? {}
            : {
                y: {
                  beginAtZero: true,
                  ticks: {
                    precision: 0,
                  },
                },
              },
      },
    });

    return () => chart.destroy();
  }, [type, labels, values, label, backgroundColor]);

  if (!labels.length || !values.length) {
    return (
      <div className="admin-chart-empty">
        <BarChart3 size={34} />
        <p>{emptyText}</p>
      </div>
    );
  }

  return (
    <div className="admin-chart-canvas">
      <canvas ref={canvasRef} />
    </div>
  );
};

const Dashboard = () => {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  const text = {
    title: isHindi ? "एडमिन डैशबोर्ड" : "Admin Dashboard",
    subtitle: isHindi
      ? "संगठन की गतिविधियों और आंकड़ों का अवलोकन"
      : "Overview of organization activities and statistics",

    totalMembers: isHindi ? "कुल सदस्य" : "Total Members",
    activeMembers: isHindi ? "सक्रिय सदस्य" : "Active Members",
    districts: isHindi ? "जिले" : "Districts",
    blocks: isHindi ? "ब्लॉक" : "Blocks",
    pending: isHindi ? "लंबित आवेदन" : "Pending Applications",
    notices: isHindi ? "प्रकाशित सूचनाएं" : "Published Notices",

    membershipChart: isHindi
      ? "मासिक सदस्यता विवरण"
      : "Monthly Membership Overview",

    districtChart: isHindi
      ? "जिलेवार सदस्य विवरण"
      : "District-wise Members",

    recent: isHindi
      ? "हाल के सदस्यता आवेदन"
      : "Recent Membership Applications",

    viewAll: isHindi ? "सभी देखें" : "View All",

    applicant: isHindi ? "आवेदक का नाम" : "Applicant Name",
    applicationNo: isHindi ? "आवेदन संख्या" : "Application Number",
    district: isHindi ? "जिला" : "District",
    date: isHindi ? "तिथि" : "Date",
    status: isHindi ? "स्थिति" : "Status",

    noApplications: isHindi
      ? "अभी कोई सदस्यता आवेदन उपलब्ध नहीं है।"
      : "No membership applications are available yet.",

    noChartData: isHindi
      ? "चार्ट दिखाने के लिए अभी डेटा उपलब्ध नहीं है।"
      : "No data is available to display this chart yet.",

    quickActions: isHindi ? "त्वरित कार्य" : "Quick Actions",

    addMember: isHindi ? "नया सदस्य जोड़ें" : "Add New Member",
    manageMembers: isHindi ? "सदस्य प्रबंधन" : "Manage Members",
    manageCommittees: isHindi ? "समिति प्रबंधन" : "Manage Committees",
    manageNotices: isHindi ? "सूचना प्रबंधन" : "Manage Notices",
    applications: isHindi ? "सदस्यता आवेदन" : "Membership Applications",

    demoNote: isHindi
      ? "डैशबोर्ड अभी डेटा-रहित प्रारंभिक स्थिति में है। वास्तविक आंकड़े API कनेक्शन के बाद दिखाई देंगे।"
      : "The dashboard is currently in its initial empty state. Actual statistics will appear after API integration.",
  };

  const summary = adminDashboard.summary;

  const cards = [
    {
      title: text.totalMembers,
      value: summary.totalMembers,
      icon: Users,
      color: "green",
    },
    {
      title: text.activeMembers,
      value: summary.activeMembers,
      icon: UserCheck,
      color: "blue",
    },
    {
      title: text.districts,
      value: summary.totalDistricts,
      icon: MapPinned,
      color: "gold",
    },
    {
      title: text.blocks,
      value: summary.totalBlocks,
      icon: Map,
      color: "purple",
    },
    {
      title: text.pending,
      value: summary.pendingApplications,
      icon: ClipboardList,
      color: "orange",
    },
    {
      title: text.notices,
      value: summary.publishedNotices,
      icon: FileText,
      color: "teal",
    },
  ];

  const actions = [
    {
      title: text.addMember,
      icon: UserPlus,
      path: "/admin/members",
    },
    {
      title: text.manageMembers,
      icon: Users,
      path: "/admin/members",
    },
    {
      title: text.manageCommittees,
      icon: MapPinned,
      path: "/admin/committees",
    },
    {
      title: text.manageNotices,
      icon: Bell,
      path: "/admin/notices",
    },
    {
      title: text.applications,
      icon: ClipboardList,
      path: "/admin/memberships",
    },
  ];

  const formatDate = (dateValue) => {
    if (!dateValue) return "-";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) return "-";

    return date.toLocaleDateString(isHindi ? "hi-IN" : "en-IN");
  };

  const getStatusLabel = (status) => {
    const statusMap = {
      Pending: isHindi ? "लंबित" : "Pending",
      Approved: isHindi ? "स्वीकृत" : "Approved",
      Rejected: isHindi ? "अस्वीकृत" : "Rejected",
    };

    return statusMap[status] || status || "-";
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-heading">
        <div>
          <h1>{text.title}</h1>
          <p>{text.subtitle}</p>
        </div>
      </div>

      <div className="admin-dashboard-note">
        <BarChart3 size={19} />
        <span>{text.demoNote}</span>
      </div>

      <div className="row g-3 admin-summary-grid">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div className="col-6 col-md-4 col-xl-2" key={card.title}>
              <div className="admin-summary-card">
                <div className={`admin-summary-icon ${card.color}`}>
                  <Icon size={22} />
                </div>

                <div className="admin-summary-value">
                  {card.value.toLocaleString(isHindi ? "hi-IN" : "en-IN")}
                </div>

                <div className="admin-summary-title">
                  {card.title}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="row g-4 admin-chart-section">
        <div className="col-lg-7">
          <div className="admin-dashboard-panel">
            <div className="admin-panel-heading">
              <div>
                <h2>
                  <BarChart3 size={19} />
                  {text.membershipChart}
                </h2>
              </div>
            </div>

            <DashboardChart
              type="line"
              labels={adminDashboard.membershipByMonth.map(
                (item) => isHindi
                  ? item.monthHi || item.month
                  : item.monthEn || item.month
              )}
              values={adminDashboard.membershipByMonth.map(
                (item) => item.count
              )}
              label={text.totalMembers}
              emptyText={text.noChartData}
              backgroundColor="rgba(19, 128, 76, 0.15)"
            />
          </div>
        </div>

        <div className="col-lg-5">
          <div className="admin-dashboard-panel">
            <div className="admin-panel-heading">
              <h2>
                <PieChart size={19} />
                {text.districtChart}
              </h2>
            </div>

            <DashboardChart
              type="doughnut"
              labels={adminDashboard.districtWiseMembers.map(
                (item) => isHindi
                  ? item.districtNameHi || item.districtName
                  : item.districtNameEn || item.districtName
              )}
              values={adminDashboard.districtWiseMembers.map(
                (item) => item.count
              )}
              label={text.totalMembers}
              emptyText={text.noChartData}
              backgroundColor={[
                "#13804c",
                "#d4a72c",
                "#377bb5",
                "#8d65b5",
                "#d17a35",
                "#3b9a9a",
              ]}
            />
          </div>
        </div>
      </div>

      <div className="row g-4 admin-bottom-section">
        <div className="col-xl-8">
          <div className="admin-dashboard-panel">
            <div className="admin-panel-heading">
              <h2>
                <ClipboardList size={19} />
                {text.recent}
              </h2>

              <Link to="/admin/memberships" className="admin-view-all">
                {text.viewAll}
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="table-responsive">
              <table className="table admin-recent-table align-middle">
                <thead>
                  <tr>
                    <th>{text.applicationNo}</th>
                    <th>{text.applicant}</th>
                    <th>{text.district}</th>
                    <th>{text.date}</th>
                    <th>{text.status}</th>
                  </tr>
                </thead>

                <tbody>
                  {adminDashboard.recentApplications.length > 0 ? (
                    adminDashboard.recentApplications.map((item) => (
                      <tr key={item.id}>
                        <td>{item.applicationNumber || "-"}</td>
                        <td>{item.applicantName || "-"}</td>
                        <td>{item.districtName || "-"}</td>
                        <td>{formatDate(item.submittedAt)}</td>
                        <td>
                          <span
                            className={`admin-status ${
                              (item.status || "Pending").toLowerCase()
                            }`}
                          >
                            {getStatusLabel(item.status)}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="admin-table-empty">
                        {text.noApplications}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-xl-4">
          <div className="admin-dashboard-panel admin-quick-actions">
            <div className="admin-panel-heading">
              <h2>{text.quickActions}</h2>
            </div>

            {actions.map((action) => {
              const Icon = action.icon;

              return (
                <Link
                  to={action.path}
                  className="admin-quick-action"
                  key={action.title}
                >
                  <span className="admin-quick-action-icon">
                    <Icon size={19} />
                  </span>

                  <span>{action.title}</span>

                  <ArrowRight size={16} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
