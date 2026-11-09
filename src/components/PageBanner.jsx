import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

function PageBanner({
    title,
    titleEn,
    subtitle,
    subtitleEn,
    backgroundImage
}) {
    const { language, t } = useLanguage();

    const heading = language === "en" && titleEn
        ? titleEn
        : title;

    const description = language === "en" && subtitleEn
        ? subtitleEn
        : subtitle;

    return (
        <section
            className="page-banner"
            style={
                backgroundImage
                    ? { backgroundImage: `linear-gradient(rgba(11,56,32,.85),rgba(11,56,32,.85)),url(${backgroundImage})` }
                    : {}
            }
        >
            <div className="container">

                <h1>{heading}</h1>

                {description && <p>{description}</p>}

                <div className="breadcrumb-area">

                    <Link to="/">
                        <Home size={15} />
                        {t("home")}
                    </Link>

                    <ChevronRight size={15} />

                    <span>{heading}</span>

                </div>

            </div>
        </section>
    );
}

export default PageBanner;