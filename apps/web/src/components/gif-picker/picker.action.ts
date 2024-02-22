"use server";

export async function getTenorApiKey() {
    const key = process.env.TENOR_API_KEY;
    if (!key) {
        throw new Error("Tenor API key not found");
    }
    return {tenorApiKey: key};
}
