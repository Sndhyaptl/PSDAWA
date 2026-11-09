
/*
 * Dashboard data configuration.
 *
 * These values are empty until the admin dashboard is connected
 * to the ASP.NET Core API.
 *
 * Do not insert estimated or fabricated association statistics.
 */

const adminDashboard = {
  summary: {
    totalMembers: 0,
    activeMembers: 0,
    totalDistricts: 0,
    totalBlocks: 0,
    pendingApplications: 0,
    publishedNotices: 0,
  },

  membershipByMonth: [
    {
    id: 1,
    applicationNumber: "PSDAWA-2026-0001",
    applicantName: "Verified applicant name",
    districtName: "Verified district",
    submittedAt: "2026-11-01",
    status: "Pending"
  }
  ],

  districtWiseMembers: [
    {
    id: 1,
    applicationNumber: "PSDAWA-2026-0001",
    applicantName: "Verified applicant name",
    districtName: "Verified district",
    submittedAt: "2026-11-01",
    status: "Pending"
  }
  ],

  recentApplications: [
    {
    id: 1,
    applicationNumber: "PSDAWA-2026-0001",
    applicantName: "Verified applicant name",
    districtName: "Verified district",
    submittedAt: "2026-11-01",
    status: "Pending"
  }
  ],

  
};

export default adminDashboard;
