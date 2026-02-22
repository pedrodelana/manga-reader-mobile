import List from "@/features/List";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ScrollView>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <List />
          </View>
        </SafeAreaView>
      </ScrollView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
