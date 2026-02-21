import List from "@/features/List";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ScrollView, StyleSheet, View } from "react-native";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ScrollView>
        <View style={styles.container}>
          <List />
        </View>
      </ScrollView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});
