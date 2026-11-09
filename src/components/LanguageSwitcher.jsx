import { Languages } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

function LanguageSwitcher() {
    const { language, toggleLanguage } = useLanguage();

    return (
        <button
            type="button"
            className="language-switcher"
            onClick={toggleLanguage}
            aria-label="Change website language"
        >
            <Languages size={17} />
            <span>
                {language === "hi" ? "English" : "हिंदी"}
            </span>
        </button>
    );
}

export default LanguageSwitcher;