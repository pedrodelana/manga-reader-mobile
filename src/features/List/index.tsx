import MangaCard from "@/components/MangaCard";
import api from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function List() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["mangas-lista"],
    queryFn: api.manga.list,
  });

  console.log("data >>> ", data);
  console.log("api >>>", api);

  if (isLoading) return <ActivityIndicator size="large" />;

  if (error) return <Text> `Error: ${error.message}`</Text>;

  return (
    <View style={styles.container}>
      {data.data.map((manga: any) => {
        const cover = manga.relationships.find(
          (attr: any) => attr.type === "cover_art",
        );
        const fileName = cover?.attributes?.fileName;
        return (
          <MangaCard
            key={manga.id}
            id={manga.id}
            titles={manga.attributes.title}
            fileName={fileName}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    margin: 10,
    padding: 10,
    borderRadius: 8,
  },
  h3: { fontSize: 16, fontWeight: "600" },
  p: { marginTop: 6, color: "#666" },
});
