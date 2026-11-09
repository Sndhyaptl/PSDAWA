import { Outlet, Link } from "react-router-dom";

import {
    LayoutDashboard,
    Users,
    UserCheck,
    FileText,
    Image,
    MapPin,
    LogOut,
    Menu
} from "lucide-react";

import { useState } from "react";

import { useLanguage } from "../hooks/useLanguage";

function AdminLayout() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const { language } = useLanguage();

    const adminLinks = [
        {
            title: "Dashboard",
            titleHi: "डैशबोर्ड",
            path: "/admin/dashboard",
            icon: LayoutDashboard
        },
        {
            title: "Members",
            titleHi: "सदस्य",
            path: "/admin/members",
            icon: Users
        },
        {
            title: "Committees",
            titleHi: "कार्यकारिणी",
            path: "/admin/committees",
            icon: UserCheck
        },
        {
            title: "Notices",
            titleHi: "सूचनाएं",
            path: "/admin/notices",
            icon: FileText
        },
        {
            title: "Gallery",
            titleHi: "गैलरी",
            path: "/admin/gallery",
            icon: Image
        },
        {
            title: "Memberships",
            titleHi: "सदस्यता आवेदन",
            path: "/admin/memberships",
            icon: Users
        },
        {
            title: "Districts & Blocks",
            titleHi: "जिला एवं ब्लॉक",
            path: "/admin/districts",
            icon: MapPin
        }
    ];

    const handleLogout = () => {

        sessionStorage.removeItem("psdawa-demo-auth");

        window.location.href = "/admin/login";

    };

    return (
        <div className="admin-layout">

            <aside
                className={`admin-sidebar ${
                    sidebarOpen ? "sidebar-open" : ""
                }`}
            >

                <div className="admin-brand">

                    <div className="admin-brand-logo">
                        PS
                    </div>

                    <div>
                        <h5>PSDAWA</h5>
                        <small>Admin Panel</small>
                    </div>

                </div>

                <div className="admin-nav-title">
                    {language === "hi"
                        ? "मुख्य मेनू"
                        : "MAIN MENU"}
                </div>

                <nav className="admin-navigation">

                    {adminLinks.map(item => {
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <Icon size={18} />

                                <span>
                                    {language === "hi"
                                        ? item.titleHi
                                        : item.title}
                                </span>

                            </Link>
                        );
                    })}

                </nav>

                <button
                    className="admin-logout"
                    onClick={handleLogout}
                >
                    <LogOut size={18} />

                    {language === "hi"
                        ? "लॉगआउट"
                        : "Logout"}
                </button>

            </aside>

            {sidebarOpen && (
                <button
                    type="button"
                    className="sidebar-backdrop"
                    onClick={() => setSidebarOpen(false)}
                    aria-label="Close sidebar"
                />
            )}

            <div className="admin-main">

                <header className="admin-topbar">

                    <button
                        className="admin-menu-toggle"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        aria-label="Toggle admin menu"
                    >
                        <Menu size={23} />
                    </button>

                    <h6>PSDAWA Administration</h6>

                    <span className="admin-user">
                        {language === "hi"
                            ? "डेमो एडमिन"
                            : "Demo Admin"}
                    </span>

                </header>

                <main className="admin-content">

                    <Outlet />

                </main>

            </div>

        </div>
    );

}

export default AdminLayout;