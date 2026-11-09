
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

  // Add other districts after verifying their official block lists.
  // Example:
  // agra: [
  //   { id: "block-id", nameEn: "Block Name", nameHi: "ब्लॉक का नाम" }
  // ],
};

export default upBlocks;
