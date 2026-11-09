
/*
  Block directory.

  Add verified blocks for each district using the same structure.
  The initial Lucknow list is seed data, not a complete statewide directory.
*/

const upBlocks = {
  lucknow: [
    { id: "bakshi-ka-talab", nameEn: "Bakshi Ka Talab", nameHi: "बख्शी का तालाब" },
    { id: "chinhat", nameEn: "Chinhat", nameHi: "चिनहट" },
    { id: "gosainganj", nameEn: "Gosainganj", nameHi: "गोसाईंगंज" },
    { id: "kakori", nameEn: "Kakori", nameHi: "काकोरी" },
    { id: "mal", nameEn: "Mal", nameHi: "माल" },
    { id: "malihabad", nameEn: "Malihabad", nameHi: "मलिहाबाद" },
    { id: "mohanlalganj", nameEn: "Mohanlalganj", nameHi: "मोहनलालगंज" },
    { id: "sarojini-nagar", nameEn: "Sarojini Nagar", nameHi: "सरोजनी नगर" },
  ],
 sitapur: [
    { id: "ailiya", nameEn: "Ailiya", nameHi: "ऐलिया" },
    { id: "behta", nameEn: "Behta", nameHi: "बेहटा" },
    { id: "biswan", nameEn: "Biswan", nameHi: "बिसवां" },
    { id: "gondlamau", nameEn: "Gondlamau", nameHi: "गोंदलामऊ" },
    { id: "hargaon", nameEn: "Hargaon", nameHi: "हरगांव" },
    { id: "kasmanda", nameEn: "Kasmanda", nameHi: "कसमंडा" },
    { id: "khairabad", nameEn: "Khairabad", nameHi: "खैराबाद" },
    { id: "laharpur", nameEn: "Laharpur", nameHi: "लहरपुर" },
    { id: "machhrehta", nameEn: "Machhrehta", nameHi: "मछरेहटा" },
    { id: "mahmudabad", nameEn: "Mahmudabad", nameHi: "महमूदाबाद" },
    { id: "maholi", nameEn: "Maholi", nameHi: "महोली" },
    { id: "misrikh", nameEn: "Misrikh", nameHi: "मिश्रिख" },
    { id: "pahala", nameEn: "Pahala", nameHi: "पहला" },
    { id: "parsendi", nameEn: "Parsendi", nameHi: "परसेंडी" },
    { id: "pisawan", nameEn: "Pisawan", nameHi: "पिसावां" },
    { id: "rampur-mathura", nameEn: "Rampur Mathura", nameHi: "रामपुर मथुरा" },
    { id: "reusa", nameEn: "Reusa", nameHi: "रेउसा" },
    { id: "sakran", nameEn: "Sakran", nameHi: "सकरन" },
    { id: "sidhauli", nameEn: "Sidhauli", nameHi: "सिधौली" }
],
hardoi: [
    { id: "ahiroi", nameEn: "Ahirori", nameHi: "अहिरोरी" },
    { id: "bawan", nameEn: "Bawan", nameHi: "बावन" },
    { id: "b bharawan", nameEn: "Bharawan", nameHi: "भरावन" },
    { id: "bharkhani", nameEn: "Bharkhani", nameHi: "भरखनी" },
    { id: "bilgram", nameEn: "Bilgram", nameHi: "बिलग्राम" },
    { id: "hariyawan", nameEn: "Hariyawan", nameHi: "हरियावां" },
    { id: "hargoan", nameEn: "Hargoan", nameHi: "हरगांव" },
    { id: "kachauna", nameEn: "Kachauna", nameHi: "कछौना" },
    { id: "kothawan", nameEn: "Kothawan", nameHi: "कोथावां" },
    { id: "madhoganj", nameEn: "Madhoganj", nameHi: "माधोगंज" },
    { id: "mallawan", nameEn: "Mallawan", nameHi: "मल्लावां" },
    { id: "pihani", nameEn: "Pihani", nameHi: "पिहानी" },
    { id: "sandi", nameEn: "Sandi", nameHi: "सांडी" },
    { id: "sandila", nameEn: "Sandila", nameHi: "संडीला" },
    { id: "shahabad", nameEn: "Shahabad", nameHi: "शाहाबाद" },
    { id: "sursa", nameEn: "Sursa", nameHi: "सुरसा" },
    { id: "tadiyawan", nameEn: "Tadiyawan", nameHi: "टड़ियावां" },
    { id: "tandiyawan", nameEn: "Tandiyawan", nameHi: "टड़ियावां" },
    { id: "bharawan", nameEn: "Bharawan", nameHi: "भरावन" }
],
lakhimpurkheri: [
    { id: "bankeyganj", nameEn: "Bankeyganj", nameHi: "बांकेगंज" },
    { id: "behjam", nameEn: "Behjam", nameHi: "बेहजम" },
    { id: "bijuwa", nameEn: "Bijuwa", nameHi: "बिजुआ" },
    { id: "dhaurahara", nameEn: "Dhaurahara", nameHi: "धौरहरा" },
    { id: "isanagar", nameEn: "Isanagar", nameHi: "ईसानगर" },
    { id: "kumbhigola", nameEn: "Kumbhigola", nameHi: "कुम्भीगोला" },
    { id: "lakhimpur", nameEn: "Lakhimpur", nameHi: "लखीमपुर" },
    { id: "mitauli", nameEn: "Mitauli", nameHi: "मितौली" },
    { id: "mohammadi", nameEn: "Mohammadi", nameHi: "मोहम्मदी" },
    { id: "nakaha", nameEn: "Nakaha", nameHi: "नकहा" },
    { id: "nighasan", nameEn: "Nighasan", nameHi: "निघासन" },
    { id: "palia", nameEn: "Palia", nameHi: "पलिया" },
    { id: "pasgawan", nameEn: "Pasgawan", nameHi: "पसगवां" },
    { id: "phoolbehar", nameEn: "Phoolbehar", nameHi: "फूलबेहड़" },
    { id: "ramiabehar", nameEn: "Ramia Behar", nameHi: "रमियाबेहड़" }
],

  // Add other districts after verifying their official block lists.
  // Example:
  // agra: [
  //   { id: "block-id", nameEn: "Block Name", nameHi: "ब्लॉक का नाम" }
  // ],
};

export default upBlocks;
