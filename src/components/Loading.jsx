import { useLanguage } from "../hooks/useLanguage";

function Loading({ message }) {
    const { t } = useLanguage();

    return (
        <div
            className="loading-container"
            role="status"
            aria-live="polite"
        >
            <div className="text-center">

                <div
                    className="spinner-border text-success"
                    role="status"
                >
                    <span className="visually-hidden">
                        Loading...
                    </span>
                </div>

                <p className="mt-3">
                    {message || t("loading")}
                </p>

            </div>
        </div>
    );
}

export default Loading;