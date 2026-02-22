import { StyleSheet, TextInput } from "react-native";

type SearchProps = {
  value?: string;
  onQueryChange: (text: string) => void;
};

export default function SearchBar({ onQueryChange }: SearchProps) {
  return (
    <TextInput
      placeholder="buscar pelo nome do manga"
      placeholderTextColor="#dbd9d9"
      style={styles.input}
      onChangeText={onQueryChange}
    />
  );
}
const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 40,
    borderColor: "#cac8c8",
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    paddingHorizontal: 12,
    color: "#585757",
  },
});
