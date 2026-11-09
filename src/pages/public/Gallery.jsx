
import { useEffect, useMemo, useState } from "react";
import {
  Image as ImageIcon,
  X,
  ChevronLeft,
  ChevronRight,
  CalendarDays
} from "lucide-react";

import { useLanguage } from "../../hooks/useLanguage";
import SectionTitle from "../../components/SectionTitle";
import EmptyState from "../../components/EmptyState";

import galleryImages from "../../data/gallery";
import "../../styles/gallery.css";

const categories = [
  { value: "all", hi: "सभी तस्वीरें", en: "All Photos" },
  { value: "meeting", hi: "बैठक", en: "Meetings" },
  { value: "event", hi: "कार्यक्रम", en: "Events" },
  { value: "activity", hi: "गतिविधियां", en: "Activities" },
  { value: "other", hi: "अन्य", en: "Other" }
];

function formatDate(date, language) {
  if (!date) return "";

  return new Intl.DateTimeFormat(
    language === "hi" ? "hi-IN" : "en-IN",
    {
      day: "numeric",
      month: "long",
      year: "numeric"
    }
  ).format(new Date(`${date}T00:00:00`));
}

export default function Gallery() {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);

  const images = useMemo(() => {
    return galleryImages
      .filter((image) => image.isActive !== false)
      .filter((image) => {
        return (
          activeCategory === "all" ||
          image.category === activeCategory
        );
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [activeCategory]);

  const selectedIndex = images.findIndex(
    (image) => image.id === selectedImage?.id
  );

  const closeLightbox = () => setSelectedImage(null);

  const showPrevious = () => {
    if (!images.length) return;

    const previousIndex =
      (selectedIndex - 1 + images.length) % images.length;

    setSelectedImage(images[previousIndex]);
  };

  const showNext = () => {
    if (!images.length) return;

    const nextIndex = (selectedIndex + 1) % images.length;

    setSelectedImage(images[nextIndex]);
  };

  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage, selectedIndex, images]);

  const categoryLabel = (value) => {
    const category = categories.find(
      (item) => item.value === value
    );

    return category
      ? isHindi
        ? category.hi
        : category.en
      : value;
  };

  return (
    <div className="gallery-page">
      {/* Banner */}
      <section className="gallery-banner">
        <div className="container">
          <span className="gallery-eyebrow">
            {isHindi ? "हमारी गतिविधियां" : "OUR ACTIVITIES"}
          </span>

          <h1>
            {isHindi ? "फोटो गैलरी" : "Photo Gallery"}
          </h1>

          <p>
            {isHindi
              ? "संगठन की बैठकों, कार्यक्रमों और गतिविधियों की तस्वीरें देखें।"
              : "Explore photographs from association meetings, events and activities."}
          </p>
        </div>
      </section>

      {/* Gallery content */}
      <section className="container gallery-content">
        <SectionTitle
          title={isHindi ? "हमारी तस्वीरें" : "Our Photos"}
          subtitle={
            isHindi
              ? "संगठन की गतिविधियों से जुड़े यादगार पल।"
              : "Moments and memories from association activities."
          }
        />

        {/* Category filters */}
        <div className="gallery-filters">
          {categories.map((category) => (
            <button
              key={category.value}
              type="button"
              className={
                activeCategory === category.value
                  ? "gallery-filter active"
                  : "gallery-filter"
              }
              onClick={() => {
                setActiveCategory(category.value);
                setSelectedImage(null);
              }}
            >
              {isHindi ? category.hi : category.en}
            </button>
          ))}
        </div>

        <div className="gallery-count">
          {isHindi
            ? `कुल ${images.length} तस्वीरें`
            : `${images.length} photos`}
        </div>

        {/* Image grid */}
        {images.length > 0 ? (
          <div className="gallery-grid">
            {images.map((image) => (
              <button
                key={image.id}
                type="button"
                className="gallery-card"
                onClick={() => setSelectedImage(image)}
                aria-label={
                  isHindi
                    ? image.titleHi
                    : image.titleEn
                }
              >
                <div className="gallery-card-image">
                  <img
                    src={image.image}
                    alt={
                      isHindi
                        ? image.titleHi
                        : image.titleEn
                    }
                    loading="lazy"
                  />

                  <div className="gallery-card-overlay">
                    <ImageIcon size={27} />
                  </div>
                </div>

                <div className="gallery-card-info">
                  <span className="gallery-card-category">
                    {categoryLabel(image.category)}
                  </span>

                  <h3>
                    {isHindi
                      ? image.titleHi
                      : image.titleEn}
                  </h3>

                  <lable>
                    {isHindi
                      ? image.descriptionHi
                      : image.descriptionEn}
                  </lable>
                  <span className="gallery-card-date">
                    <CalendarDays size={14} />
                    {formatDate(image.date, language)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="gallery-empty">
            <EmptyState
              title={
                isHindi
                  ? "अभी कोई तस्वीर उपलब्ध नहीं है"
                  : "No photographs available yet"
              }
              description={
                isHindi
                  ? "संगठन की सत्यापित तस्वीरें उपलब्ध होने पर यहां प्रकाशित की जाएंगी।"
                  : "Verified association photographs will be published here when available."
              }
            />
          </div>
        )}
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={isHindi ? "फोटो प्रीव्यू" : "Photo preview"}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeLightbox();
            }
          }}
        >
          <button
            type="button"
            className="gallery-lightbox-close"
            onClick={closeLightbox}
            aria-label={isHindi ? "बंद करें" : "Close"}
          >
            <X size={25} />
          </button>

          {images.length > 1 && (
            <button
              type="button"
              className="gallery-lightbox-prev"
              onClick={showPrevious}
              aria-label="Previous image"
            >
              <ChevronLeft size={30} />
            </button>
          )}

          <div className="gallery-lightbox-content">
            <img
              src={selectedImage.image}
              alt={
                isHindi
                  ? selectedImage.titleHi
                  : selectedImage.titleEn
              }
            />

            <div className="gallery-lightbox-caption">
              <h3>
                {isHindi
                  ? selectedImage.titleHi
                  : selectedImage.titleEn}
              </h3>

              <p>
                {isHindi
                  ? selectedImage.descriptionHi
                  : selectedImage.descriptionEn}
              </p>

              <span>
                <CalendarDays size={15} />
                {formatDate(selectedImage.date, language)}
              </span>

              <small>
                {selectedIndex + 1} / {images.length}
              </small>
            </div>
          </div>

          {images.length > 1 && (
            <button
              type="button"
              className="gallery-lightbox-next"
              onClick={showNext}
              aria-label="Next image"
            >
              <ChevronRight size={30} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
