"use server"

export async function fetchVocabularies(id: string | number) {
    const data = await import(`@/app/practice/data/Vocabularies/${id}.json`);
    return data.default;
}
    
