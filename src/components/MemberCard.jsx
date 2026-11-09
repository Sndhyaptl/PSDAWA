import { UserRound, MapPin, Phone, Mail } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

function MemberCard({ member }) {
    const { language } = useLanguage();

    if (!member) return null;

    const name = language === "hi"
        ? member.nameHi || member.nameEn
        : member.nameEn || member.nameHi;

    const designation = language === "hi"
        ? member.designationHi || member.designationEn
        : member.designationEn || member.designationHi;

    return (
        <div className="member-card card-custom">

            <div className="member-image">

                <img
                    src={member.photo || "/images/members/default-user.png"}
                    alt={name}
                    onError={e => {
                        e.currentTarget.src =
                            "/images/members/default-user.png";
                    }}
                />

            </div>

            <h5>{name}</h5>

            <span className="member-designation">
                {designation}
            </span>

            {member.district && (
                <p>
                    <MapPin size={15} />
                    {member.district}
                </p>
            )}

            {member.showPhone && member.phone && (
                <p>
                    <Phone size={15} />
                    {member.phone}
                </p>
            )}

            {member.showEmail && member.email && (
                <p>
                    <Mail size={15} />
                    {member.email}
                </p>
            )}

            {member.isDemo && (
                <small className="demo-label">
                    DEMO DATA
                </small>
            )}

        </div>
    );
}

export default MemberCard;