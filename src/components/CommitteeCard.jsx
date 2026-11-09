import { Link } from "react-router-dom";
import {
    Users,
    ArrowRight,
    MapPin
} from "lucide-react";

import { useLanguage } from "../hooks/useLanguage";

function CommitteeCard({
    title,
    titleEn,
    description,
    descriptionEn,
    link
}) {
    const { language } = useLanguage();

    return (
        <div className="committee-card card-custom">

            <div className="committee-icon">
                <Users size={30} />
            </div>

            <h4>
                {language === "hi" ? title : titleEn}
            </h4>

            <p>
                {language === "hi"
                    ? description
                    : descriptionEn}
            </p>

            <Link
                to={link}
                className="committee-link"
            >
                {language === "hi"
                    ? "अधिक जानकारी"
                    : "Explore More"}

                <ArrowRight size={17} />
            </Link>

        </div>
    );
}

export default CommitteeCard;