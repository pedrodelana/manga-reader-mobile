import axios from "axios";

const baseURL = "https://api.mangadex.org/";
const coverUrl = "https://uploads.mangadex.org/";

const api = {
  client: axios.create({
    baseURL: baseURL,
    timeout: 10000,
  }),
  clientCover: axios.create({
    baseURL: coverUrl,
    timeout: 10000,
  }),

  manga: {
    list: async () => {
      const response = await api.client.get("manga", {
        params: {
          limit: 30,
          "includes[]": "cover_art",
          "availableTranslatedLanguage[]": ["pt-br"],
        },
      });
      console.log("response list >>> : ", response.data.data);

      return response.data;
    },
  },
  cover: {
    image: async (id: string, coverId: string) => {
      const response = await api.clientCover.get(
        `covers/${id}/${coverId}.256.jpg`,
        {},
      );
      console.log("resonse cover >>> :", response);

      return response;
    },
  },
};

export default api;
