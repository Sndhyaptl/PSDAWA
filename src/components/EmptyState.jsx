import { Inbox } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

function EmptyState({
    title,
    description
}) {
    const { language, t } = useLanguage();

    return (
        <div className="empty-state text-center">

            <Inbox size={45} />

            <h4>
                {title || (
                    language === "hi"
                        ? "कोई जानकारी उपलब्ध नहीं है"
                        : t("noData")
                )}
            </h4>

            {description && (
                <p>{description}</p>
            )}

        </div>
    );
}

export default EmptyState;