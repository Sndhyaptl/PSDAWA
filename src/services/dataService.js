export async function getJSON(file) {

    try {

        const url = `/data/${file}`;

        console.log("Loading JSON:", url);

        const response = await fetch(url);

        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}: ${response.statusText}`
            );

        }

        return await response.json();

    } catch (error) {

        console.error(
            `Error loading ${file}:`,
            error
        );

        throw error;

    }

}