import {
    createContext,
    useState,
    useEffect
} from "react";

const LanguageContext = createContext(null);

const translations = {

    hi: {

        home: "होम",

        about: "हमारे बारे में",

        stateCommittee: "प्रदेश कार्यकारिणी",

        districtCommittee: "जिला कार्यकारिणी",

        blockCommittee: "ब्लॉक कार्यकारिणी",

        notices: "सूचनाएं",

        membership: "सदस्यता",

        idCard: "पहचान पत्र",

        gallery: "गैलरी",

        contact: "संपर्क करें",

        joinUs: "सदस्य बनें",

        welcome:
            "पंचायत सहायक सह डाटा एंट्री ऑपरेटर संगठन में आपका स्वागत है",

        tagline:
            "एकता, अधिकार, सम्मान और कर्मचारी कल्याण के लिए समर्पित संगठन।",

        learnMore: "और जानें",

        latestNotices: "नवीनतम सूचनाएं",

        viewAll: "सभी देखें",

        ourCommittees: "हमारी कार्यकारिणी",

        organizationActivities: "संगठन की गतिविधियां",

        becomeMember: "संगठन से जुड़ें",

        footerDescription:
            "एकता, अधिकार, सम्मान और कर्मचारी कल्याण के लिए समर्पित संगठन।",

        quickLinks: "महत्वपूर्ण लिंक",

        usefulLinks: "उपयोगी लिंक",

        contactUs: "संपर्क करें",

        allRightsReserved: "सर्वाधिकार सुरक्षित।",

        loading: "लोड हो रहा है...",

        noData: "कोई जानकारी उपलब्ध नहीं है।"

    },

    en: {

        home: "Home",

        about: "About Us",

        stateCommittee: "State Committee",

        districtCommittee: "District Committee",

        blockCommittee: "Block Committee",

        notices: "Notices",

        membership: "Membership",

        idCard: "ID Card",

        gallery: "Gallery",

        contact: "Contact",

        joinUs: "Join Us",

        welcome:
            "Welcome to Panchayat Sahayak Cum Data Entry Operator Sangathan",

        tagline:
            "An organization dedicated to unity, rights, dignity, and employee welfare.",

        learnMore: "Learn More",

        latestNotices: "Latest Notices",

        viewAll: "View All",

        ourCommittees: "Our Committees",

        organizationActivities: "Organization Activities",

        becomeMember: "Join Our Organization",

        footerDescription:
            "An organization dedicated to unity, rights, dignity, and employee welfare.",

        quickLinks: "Quick Links",

        usefulLinks: "Useful Links",

        contactUs: "Contact Us",

        allRightsReserved: "All Rights Reserved.",

        loading: "Loading...",

        noData: "No information available."

    }

};

export function LanguageProvider({ children }) {

    const [language, setLanguage] = useState(() => {

        return localStorage.getItem("psdawa-language") || "hi";

    });

    useEffect(() => {

        localStorage.setItem(
            "psdawa-language",
            language
        );

        document.documentElement.lang = language;

    }, [language]);

    const toggleLanguage = () => {

        setLanguage(previous =>
            previous === "hi" ? "en" : "hi"
        );

    };

    const t = (key) => {

        return translations[language]?.[key] || key;

    };

    return (

        <LanguageContext.Provider
            value={{
                language,
                setLanguage,
                toggleLanguage,
                t
            }}
        >

            {children}

        </LanguageContext.Provider>

    );

}

export default LanguageContext;