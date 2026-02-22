import { useEffect, useMemo, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface PropCard {
  id: string;
  titles: Mangalanguage;
  descriptions: Mangalanguage;
  fileName: string;
}

type Mangalanguage = {
  "pt-br"?: string;
  en?: string;
  [key: string]: string | undefined;
};

export default function MangaCard(props: PropCard) {
  const TITLE_MAX = 2;
  const DESC_BASE = 8;
  const [orientation, setOrientation] = useState(2 / 3);
  const [titleLineCount, setTitleLineCount] = useState(1);
  const { id, titles, fileName, descriptions } = props;
  const title =
    titles["pt-br"] || titles.en || titles["ja-ro"] || Object.values(titles)[0];
  const url = `https://uploads.mangadex.org/covers/${id}/${fileName}.256.jpg`;
  const description = descriptions["pt-br"] || descriptions.en || null;
  const descLines = useMemo(() => {
    const spare = Math.max(0, TITLE_MAX - titleLineCount); // 0 ou 1
    return DESC_BASE + spare; // 3 ou 4
  }, [titleLineCount]);

  console.log("props >>> :", props);

  useEffect(() => {
    Image.getSize(
      url,
      (width, height) => {
        setOrientation(height >= width ? 2 / 3 : 3 / 2);
      },
      (err) => console.log("getSize error:", err),
    );
  }, [url]);

  if (!title) return null;

  return (
    <View style={styles.container}>
      <View key={id} style={styles.card}>
        <View style={[styles.imageWrapper, { aspectRatio: orientation }]}>
          <Image
            source={{
              uri: url,
            }}
            style={styles.image}
          />
        </View>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          onTextLayout={(e) => {
            const n = Math.min(e.nativeEvent.lines.length, TITLE_MAX);

            if (n !== titleLineCount) setTitleLineCount(n);
          }}
          style={styles.h3}
        >
          {title}
        </Text>
        {description ? (
          <Text numberOfLines={descLines} ellipsizeMode="tail" style={styles.p}>
            {description}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  h3: { width: "100%", fontSize: 16, fontWeight: "600" },
  p: { marginTop: 6, color: "#666" },
  imageWrapper: {
    width: "100%",
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "transparent",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
