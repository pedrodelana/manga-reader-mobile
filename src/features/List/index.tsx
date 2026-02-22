import MangaCard from "@/components/MangaCard";
import SearchBar from "@/components/SearchBar";
import api from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function List() {
  const [mangas, setMangas] = useState([]);
  const [queryText, setQueryText] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const searchQuery = useQuery({
    queryKey: ["mangas-search-title", queryText],
    queryFn: () => api.manga.search.title(queryText),
  });
  console.log("searchQuery >>> : ", searchQuery);

  const listQuery = useQuery({
    queryKey: ["mangas-lista"],
    queryFn: () => api.manga.list(),
  });

  function handleQueryChange(text: string) {
    if (text.length < 3) return;

    setQueryText(text);
    console.log("to aqui >>>", text.length);
    console.log("Query >>>", searchQuery);
  }

  useEffect(() => {
    if (queryText.length <= 3) {
      setMangas(listQuery.data?.data ?? []);

      return;
    }
    console.log("searchQuery.data?.data >>> : ", searchQuery.data?.data);

    setMangas(searchQuery.data?.data ?? []);
    setIsLoading(searchQuery.isLoading);
    setError(searchQuery.error);
  }, [queryText, searchQuery.data]);

  console.log("data >>> ", listQuery);
  console.log("api >>>", api);

  if (isLoading)
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );

  if (error)
    return <Text style={styles.loading}> `Error: ${error.message}`</Text>;

  return (
    <View style={styles.container}>
      <View style={{ width: "100%", marginBottom: 16 }}>
        <SearchBar onQueryChange={(text) => handleQueryChange(text)} />
      </View>
      <View style={styles.cardsContainer}>
        {mangas?.map((manga: any) => {
          const cover = manga.relationships.find(
            (attr: any) => attr.type === "cover_art",
          );
          const fileName = cover?.attributes?.fileName;
          return (
            <View key={manga.id} style={styles.cardItem}>
              <MangaCard
                id={manga.id}
                titles={manga.attributes.title}
                fileName={fileName}
                descriptions={manga.attributes.description}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  cardsContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  cardItem: {
    width: "50%",
    paddingHorizontal: 6,
    marginBottom: 12,
  },
  loading: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: "100%",
    height: "100%",
    ...StyleSheet.absoluteFillObject,
  },
});
