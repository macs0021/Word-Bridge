import axios from "axios";

export const similarity = async (word1, word2) => {
    try {
        console.log(`comparing ${word1} and ${word2}`)
        const response = await axios.get(`https://api.conceptnet.io/related/c/en/${word1}?filter=/c/en/${word2}/.&limit=1`);
        console.log(response.data.related[0].weight)
        return response.data.related[0].weight;
    } catch (error) {
        console.error(error);
        throw error;
    }
};