
const STORAGE_KEY = "psdawa_contact_messages";

export const getContactMessages = () => {
    try {
        return JSON.parse(
            localStorage.getItem(STORAGE_KEY) || "[]"
        );
    } catch {
        return [];
    }
};

export const saveContactMessage = async (message) => {
    if (!("showDirectoryPicker" in window)) {
        throw new Error(
            "Your browser does not support direct folder access. Please use Chrome or Edge."
        );
    }

    // Select src/data/contactus folder
    const rootDirectory = await window.showDirectoryPicker({
        mode: "readwrite"
    });

    const now = new Date();

    const year = String(now.getFullYear());
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    const timestamp = [
        year,
        month,
        day
    ].join("") + "_" + [
        String(now.getHours()).padStart(2, "0"),
        String(now.getMinutes()).padStart(2, "0"),
        String(now.getSeconds()).padStart(2, "0"),
        String(now.getMilliseconds()).padStart(3, "0")
    ].join("");

    const newMessage = {
        id: crypto.randomUUID(),
        name: message.name,
        mobile: message.mobile,
        email: message.email,
        subject: message.subject,
        message: message.message,
        consent: message.consent,
        submittedAt: now.toISOString(),
        status: "New"
    };

    // Create year folder
    const yearFolder = await rootDirectory.getDirectoryHandle(
        year,
        { create: true }
    );

    // Create month folder
    const monthFolder = await yearFolder.getDirectoryHandle(
        month,
        { create: true }
    );

    // Create day folder
    const dayFolder = await monthFolder.getDirectoryHandle(
        day,
        { create: true }
    );

    // Create separate JSON file
    const fileName = `contact_${timestamp}.json`;

    const fileHandle = await dayFolder.getFileHandle(
        fileName,
        { create: true }
    );

    const writable = await fileHandle.createWritable();

    await writable.write(
        JSON.stringify(newMessage, null, 4)
    );

    await writable.close();

    // Also retain messages in localStorage
    const messages = getContactMessages();

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([...messages, newMessage])
    );

    return newMessage;
};
