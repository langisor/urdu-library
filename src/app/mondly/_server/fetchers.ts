"use server"

export async function fetchVocabularies(id: string | number) {
    const data = await import(`@/app/mondly/_data/Vocabularies/${id}01.json`);
    return data.default;
}
    
