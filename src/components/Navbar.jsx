import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import LanguageSwitcher from "./LanguageSwitcher";

const navigationItems = [
    { key: "home", path: "/" },
    { key: "about", path: "/about" },
    { key: "stateCommittee", path: "/state-committee" },
    { key: "districtCommittee", path: "/district-committee" },
    { key: "blockCommittee", path: "/block-committee" },
    { key: "notices", path: "/notices" },
    { key: "gallery", path: "/gallery" },
    { key: "contact", path: "/contact" }
];

function Navbar() {
    const { t } = useLanguage();
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    return (
        <nav className="navbar navbar-expand-lg psdawa-navbar">
            <div className="container">

                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle navigation"
                    aria-expanded={menuOpen}
                >
                    {menuOpen
                        ? <X size={25} />
                        : <Menu size={25} />}
                </button>

                <div
                    className={`navbar-collapse ${
                        menuOpen ? "show" : ""
                    }`}
                >
                    <ul className="navbar-nav mx-auto">

                        {navigationItems.map(item => (
                            <li className="nav-item" key={item.path}>
                                <NavLink
                                    to={item.path}
                                    end={item.path === "/"}
                                    onClick={closeMenu}
                                    className={({ isActive }) =>
                                        `nav-link ${
                                            isActive ? "active" : ""
                                        }`
                                    }
                                >
                                    {t(item.key)}
                                </NavLink>
                            </li>
                        ))}

                    </ul>

                    <div className="navbar-actions">
                        <LanguageSwitcher />

                        <NavLink
                            to="/membership"
                            onClick={closeMenu}
                            className="btn btn-gold join-button"
                        >
                            {t("joinUs")}
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;