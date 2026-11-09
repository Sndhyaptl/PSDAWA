
// src/data/notices.js

// Add only verified notices issued by the association.
// Keep attachment as an actual public URL or file path.
// Example: "/documents/meeting-notice-2026.pdf"

const notices = [
  {
    id: 1,
    titleHi: "संगठन की बैठक के संबंध में सूचना",
    titleEn: "Notice Regarding Organization Meeting",

    descriptionHi: "बैठक की सत्यापित सूचना यहां लिखें।",
    descriptionEn: "Write the verified meeting notice here.",

    category: "meeting",
    date: "2026-11-01",

    attachment: "/documents/meeting-notice.pdf",
    attachmentNameHi: "बैठक सूचना डाउनलोड करें",
    attachmentNameEn: "Download Meeting Notice",

    isImportant: true
  }
];

export default notices;
