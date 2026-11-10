
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

// --------------------------------------------------
// GALLERY CATEGORIES
// --------------------------------------------------

const categories = [
  { value: "all", hi: "सभी तस्वीरें", en: "All Photos" },
  { value: "meeting", hi: "बैठक", en: "Meetings" },
  { value: "event", hi: "कार्यक्रम", en: "Events" },
  { value: "activity", hi: "गतिविधियां", en: "Activities" },
  { value: "other", hi: "अन्य", en: "Other" }
];

// --------------------------------------------------
// FORMAT DATE
// --------------------------------------------------

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

// --------------------------------------------------
// GET ALBUM IMAGES
// Supports old image and new images array
// --------------------------------------------------

function getGalleryItemImages(item) {
  if (Array.isArray(item?.images) && item.images.length > 0) {
    return item.images;
  }

  return item?.image ? [item.image] : [];
}

// --------------------------------------------------
// GALLERY COMPONENT
// --------------------------------------------------

export default function Gallery() {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  const [activeCategory, setActiveCategory] = useState("all");

  // Full-screen album
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Main grid carousel
  const [gridPhotoIndexes, setGridPhotoIndexes] = useState({});

  // --------------------------------------------------
  // FILTER GALLERY
  // --------------------------------------------------

  const images = useMemo(() => {
    return galleryImages
      .filter((item) => item.isActive !== false)
      .filter((item) => {
        return (
          activeCategory === "all" ||
          item.category === activeCategory
        );
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [activeCategory]);

  // --------------------------------------------------
  // SELECTED ALBUM PHOTOS
  // --------------------------------------------------

  const selectedPhotos = useMemo(() => {
    return selectedImage
      ? getGalleryItemImages(selectedImage)
      : [];
  }, [selectedImage]);

  const currentPhoto = selectedPhotos[currentPhotoIndex];

  // --------------------------------------------------
  // CLOSE LIGHTBOX
  // --------------------------------------------------

  const closeLightbox = () => {
    setSelectedImage(null);
    setCurrentPhotoIndex(0);
  };

  // --------------------------------------------------
  // OPEN LIGHTBOX
  // Opens from the currently visible grid image
  // --------------------------------------------------

  const openLightbox = (item, photoIndex = 0) => {
    const photos = getGalleryItemImages(item);

    if (!photos.length) return;

    setCurrentPhotoIndex(
      Math.min(photoIndex, photos.length - 1)
    );

    setSelectedImage(item);
  };

  // --------------------------------------------------
  // PREVIOUS PHOTO
  // --------------------------------------------------

  const showPrevious = () => {
    if (selectedPhotos.length <= 1) return;

    setCurrentPhotoIndex((current) =>
      (current - 1 + selectedPhotos.length) %
      selectedPhotos.length
    );
  };

  // --------------------------------------------------
  // NEXT PHOTO
  // --------------------------------------------------

  const showNext = () => {
    if (selectedPhotos.length <= 1) return;

    setCurrentPhotoIndex((current) =>
      (current + 1) % selectedPhotos.length
    );
  };

  // --------------------------------------------------
  // MAIN GRID AUTO SLIDESHOW
  // Each album slides independently every 2 seconds
  // --------------------------------------------------

  useEffect(() => {
    if (!images.length) return;

    const interval = setInterval(() => {
      setGridPhotoIndexes((previous) => {
        const updated = { ...previous };

        images.forEach((item) => {
          const photos = getGalleryItemImages(item);

          if (photos.length > 1) {
            const currentIndex = previous[item.id] ?? 0;

            updated[item.id] =
              (currentIndex + 1) % photos.length;
          }
        });

        return updated;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [images]);

 
  // --------------------------------------------------
  // KEYBOARD CONTROLS
  // Escape = Close
  // Left Arrow = Previous
  // Right Arrow = Next
  // --------------------------------------------------

  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage, selectedPhotos.length]);

  // --------------------------------------------------
  // CATEGORY LABEL
  // --------------------------------------------------

  const categoryLabel = (value) => {
    const category = categories.find(
      (item) => item.value === value
    );

    if (!category) return value;

    return isHindi ? category.hi : category.en;
  };

  // --------------------------------------------------
  // JSX
  // --------------------------------------------------

  return (
    <div className="gallery-page">

      {/* HERO BANNER */}

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

      {/* GALLERY CONTENT */}

      <section className="container gallery-content">

        <SectionTitle
          title={isHindi ? "हमारी तस्वीरें" : "Our Photos"}
          subtitle={
            isHindi
              ? "संगठन की गतिविधियों से जुड़े यादगार पल।"
              : "Moments and memories from association activities."
          }
        />

        {/* CATEGORY FILTERS */}

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
                closeLightbox();
              }}
            >
              {isHindi ? category.hi : category.en}
            </button>
          ))}

        </div>

        {/* ALBUM COUNT */}

        <div className="gallery-count">
          {isHindi
            ? `कुल ${images.length} एल्बम`
            : `${images.length} albums`}
        </div>

        {/* MAIN GALLERY GRID */}

        {images.length > 0 ? (

          <div className="gallery-grid">

            {images.map((item) => {
              const itemPhotos = getGalleryItemImages(item);

              const currentGridIndex =
                (gridPhotoIndexes[item.id] ?? 0) %
                Math.max(itemPhotos.length, 1);

              const coverImage = itemPhotos[currentGridIndex];

              return (

                <button
                  key={item.id}
                  type="button"
                  className="gallery-card"
                  onClick={() =>
                    openLightbox(item, currentGridIndex)
                  }
                  aria-label={
                    isHindi ? item.titleHi : item.titleEn
                  }
                >

                  {/* CARD IMAGE */}

                  <div className="gallery-card-image">

                    {coverImage && (
                      <img
                        key={coverImage}
                        src={coverImage}
                        alt={
                          isHindi
                            ? item.titleHi
                            : item.titleEn
                        }
                        loading="lazy"
                        className="gallery-grid-slide"
                      />
                    )}

                    {/* OVERLAY */}

                    <div className="gallery-card-overlay">

                      <ImageIcon size={27} />

                      <span>
                        {isHindi
                          ? "तस्वीरें देखें"
                          : "View Photos"}
                      </span>

                    </div>

                    {/* IMAGE COUNT */}

                    <span className="gallery-image-count">
                      <ImageIcon size={14} />
                      {itemPhotos.length}
                    </span>

                    {/* SLIDE COUNTER */}

                    {itemPhotos.length > 1 && (
                      <span className="gallery-grid-counter">
                        {currentGridIndex + 1} / {itemPhotos.length}
                      </span>
                    )}

                  </div>

                  {/* CARD DETAILS */}

                  <div className="gallery-card-info">

                    <span className="gallery-card-category">
                      {categoryLabel(item.category)}
                    </span>

                    <h3>
                      {isHindi
                        ? item.titleHi
                        : item.titleEn}
                    </h3>

                    <p>
                      {isHindi
                        ? item.descriptionHi
                        : item.descriptionEn}
                    </p>

                    <span className="gallery-card-date">
                      <CalendarDays size={14} />
                      {formatDate(item.date, language)}
                    </span>

                  </div>

                </button>
              );
            })}

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

      {/* FULL-SCREEN SLIDESHOW */}

      {selectedImage && currentPhoto && (

        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={
            isHindi ? "फोटो प्रीव्यू" : "Photo preview"
          }
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeLightbox();
            }
          }}
        >

          {/* CLOSE BUTTON */}

          <button
            type="button"
            className="gallery-lightbox-close"
            onClick={closeLightbox}
            aria-label={isHindi ? "बंद करें" : "Close"}
          >
            <X size={25} />
          </button>

          {/* PREVIOUS BUTTON */}

          {selectedPhotos.length > 1 && (

            <button
              type="button"
              className="gallery-lightbox-prev"
              onClick={showPrevious}
              aria-label={
                isHindi ? "पिछली तस्वीर" : "Previous photo"
              }
            >
              <ChevronLeft size={30} />
            </button>

          )}

          <div className="gallery-lightbox-content">

            {/* CURRENT IMAGE */}

            <div className="gallery-lightbox-image">

              <img
                key={currentPhoto}
                src={currentPhoto}
                alt={
                  isHindi
                    ? selectedImage.titleHi
                    : selectedImage.titleEn
                }
              />

            </div>

            {/* IMAGE CAPTION */}

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

              {/* IMAGE COUNTER */}

              <small>
                {currentPhotoIndex + 1} / {selectedPhotos.length}
              </small>

            </div>

            {/* SLIDE DOTS */}

            {selectedPhotos.length > 1 && (

              <div className="gallery-slide-dots">

                {selectedPhotos.map((_, index) => (

                  <button
                    key={index}
                    type="button"
                    className={
                      currentPhotoIndex === index
                        ? "active"
                        : ""
                    }
                    onClick={() => setCurrentPhotoIndex(index)}
                    aria-label={`Go to photo ${index + 1}`}
                  />

                ))}

              </div>

            )}

          </div>

          {/* NEXT BUTTON */}

          {selectedPhotos.length > 1 && (

            <button
              type="button"
              className="gallery-lightbox-next"
              onClick={showNext}
              aria-label={
                isHindi ? "अगली तस्वीर" : "Next photo"
              }
            >
              <ChevronRight size={30} />
            </button>

          )}

        </div>

      )}

    </div>
  );
}
