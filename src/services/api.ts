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
    list: async (params = {}) => {
      const response = await api.client.get("manga", {
        params: {
          limit: 30,
          "includes[]": "cover_art",
          "availableTranslatedLanguage[]": ["pt-br"],
          order: { followedCount: "desc" },
          ...params,
        },
      });
      console.log("response list >>> : ", response.data.data);

      return response.data;
    },
    search: {
      title: async (query: string) => {
        const response = await api.client.get("manga", {
          params: {
            title: query,
            limit: 30,
            "includes[]": "cover_art",
            "availableTranslatedLanguage[]": ["pt-br", "en"],
            order: { followedCount: "desc" },
          },
        });
        console.log("response search >>> : ", response.data);
        return response.data;
      },
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
