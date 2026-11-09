import { useLanguage } from "../hooks/useLanguage";
import { Image as ImageIcon } from "lucide-react";

function GalleryCard({ image, onClick }) {
    const { language } = useLanguage();

    if (!image) return null;

    const title = language === "hi"
        ? image.titleHi || image.titleEn
        : image.titleEn || image.titleHi;

    return (
        <button
            type="button"
            className="gallery-card"
            onClick={() => onClick?.(image)}
            aria-label={`View ${title}`}
        >

            <div className="gallery-image">

                <img
                    src={image.image}
                    alt={title}
                    loading="lazy"
                />

                <div className="gallery-overlay">
                    <ImageIcon size={30} />
                </div>

            </div>

            <div className="gallery-caption">
                <h5>{title}</h5>
                <small>{image.date}</small>
            </div>

        </button>
    );
}

export default GalleryCard;