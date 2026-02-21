import { Image, StyleSheet, Text, View } from "react-native";

interface PropCard {
  id: string;
  titles: MangaTitleMap;
  fileName: string;
}

type MangaTitleMap = {
  "pt-br"?: string;
  en?: string;
  [key: string]: string | undefined;
};

export default function MangaCard(props: PropCard) {
  const { id, titles, fileName } = props;
  const title =
    titles["pt-br"] || titles.en || titles["ja-ro"] || Object.values(titles)[0];
  const url = `https://uploads.mangadex.org/covers/${id}/${fileName}.256.jpg`;
  console.log("props >>> :", props);
  console.log("ite >>> :", titles);
  console.log("file >>> :", fileName);
  console.log(
    "url >>> :",
    `https://uploads.mangadex.org/covers/${id}/${fileName}.256.jpg`,
  );

  if (!title) return null;

  return (
    <View style={styles.container}>
      <View key={id} style={styles.card}>
        <Image
          source={{
            uri: url,
          }}
          style={styles.image}
        />
        <Text style={styles.h3}>{title}</Text>
        <Text style={styles.p}>ID: {id}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    margin: 10,
    padding: 10,
    borderRadius: 8,
    width: "100%",
  },
  h3: { fontSize: 16, fontWeight: "600" },
  p: { marginTop: 6, color: "#666" },
  image: {
    width: "100%",
    height: 330,
    resizeMode: "contain",
  },
});
