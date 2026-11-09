import {
    BrowserRouter,
    Routes,
    Route,
    Outlet,
    Navigate
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import StateCommittee from "./pages/public/StateCommittee";
import DistrictCommittee from "./pages/public/DistrictCommittee";
import BlockCommittee from "./pages/public/BlockCommittee";
import Notices from "./pages/public/Notices";
import Membership from "./pages/public/Membership";
import DigitalIdCard from "./pages/public/DigitalIdCard";
import Gallery from "./pages/public/Gallery";
import Contact from "./pages/public/Contact";
import Dashboard from "./pages/admin/Dashboard";
import Members from "./pages/admin/Members";



import ProtectedRoute from "./components/ProtectedRoute";
import PageBanner from "./components/PageBanner";

import { useLanguage } from "./hooks/useLanguage";


function PlaceholderPage({ title, titleEn }) {
    const { language } = useLanguage();

    return (
        <>
            <PageBanner
                title={title}
                titleEn={titleEn}
            />

            <section className="section-padding">
                <div className="container text-center">

                    <h2 className="section-heading">
                        {language === "hi" ? title : titleEn}
                    </h2>

                    <p className="text-muted">
                        {language === "hi"
                            ? "इस पेज का विकास आगामी चरण में किया जाएगा।"
                            : "This page will be developed in the upcoming phase."}
                    </p>

                </div>
            </section>
        </>
    );
}

function DemoLogin() {
    const login = () => {
        sessionStorage.setItem("psdawa-demo-auth", "true");
        window.location.href = "/admin/dashboard";
    };

    return (
        <div className="container py-5 text-center">

            <h2>PSDAWA Admin Demo Login</h2>

            <p className="text-muted">
                Demonstration only. Not production authentication.
            </p>

            <button
                className="btn-primary-custom"
                onClick={login}
            >
                Enter Demo Admin
            </button>

        </div>
    );
}

function AdminDashboardPlaceholder() {
    return (
        <div>
            <h2>Admin Dashboard</h2>
            <p>PSDAWA administration panel foundation.</p>
            <p className="text-muted">
                Dashboard functionality will be developed in Phase 4.
            </p>
        </div>
    );
}

function AppRoutes() {

    return (
        <Routes>

            {/* PUBLIC WEBSITE */}

            <Route element={<MainLayout />}>

                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/state-committee" element={<StateCommittee />} />
                <Route path="/district-committee" element={<DistrictCommittee />} />
                <Route path="/block-committee" element={<BlockCommittee />} />
                <Route path="/notices" element={<Notices />} />               
                <Route path="/membership" element={<Membership />} />
                <Route path="/id-card" element={<DigitalIdCard />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />

            </Route>

            {/* ADMIN LOGIN */}

            <Route
                path="/admin/login"
                element={<DemoLogin />}
            />

            {/* PROTECTED DEMO ADMIN */}

            <Route
                path="/admin"
                element={
                    <ProtectedRoute>
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >

                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/members" element={<Members />} />

                <Route
                    path="dashboard"
                    element={<AdminDashboardPlaceholder />}
                />

                <Route
                    path="members"
                    element={<AdminDashboardPlaceholder />}
                />

                <Route
                    path="committees"
                    element={<AdminDashboardPlaceholder />}
                />

                <Route
                    path="notices"
                    element={<AdminDashboardPlaceholder />}
                />

                <Route
                    path="gallery"
                    element={<AdminDashboardPlaceholder />}
                />

                <Route
                    path="memberships"
                    element={<AdminDashboardPlaceholder />}
                />

                <Route
                    path="districts"
                    element={<AdminDashboardPlaceholder />}
                />

                <Route
                    path="blocks"
                    element={<AdminDashboardPlaceholder />}
                />

            </Route>

            {/* FALLBACK */}

            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />

        </Routes>
    );
}

function App() {

    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );

}

export default App;