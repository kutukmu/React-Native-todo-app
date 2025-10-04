import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const todos = useQuery(api.todos.getTodos);
  const addTodos = useMutation(api.todos.addTodo);
  const clearTodos = useMutation(api.todos.clearAllTodos);

  const { toggleDarkMode } = useTheme();
  return (
    <View style={styles.container}>
      {todos?.map(({ _id, text }) => (
        <Text key={_id}>{text}</Text>
      ))}
      <TouchableOpacity onPress={toggleDarkMode}>
        <Text>Toggle</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => addTodos({ text: "Hello" })}>
        <Text>Add Todo</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => clearTodos()}>
        <Text>Clear All Todo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    fontSize: 25,
  },
});
