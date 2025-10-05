import { createHomeStyles } from "@/assets/styles/home.styles";
import Header from "@/components/header";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const todos = useQuery(api.todos.getTodos);
  const addTodos = useMutation(api.todos.addTodo);
  const clearTodos = useMutation(api.todos.clearAllTodos);

  const { toggleDarkMode, colors } = useTheme();

  const homeStyles = createHomeStyles(colors);

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyles.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={homeStyles.safeArea}>
        {todos?.map(({ _id, text }) => (
          <Text key={_id}>{text}</Text>
        ))}

        <Header />
        <TouchableOpacity onPress={toggleDarkMode}>
          <Text>Toggle</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => addTodos({ text: "Hello" })}>
          <Text>Add Todo</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => clearTodos()}>
          <Text>Clear All Todo</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}
