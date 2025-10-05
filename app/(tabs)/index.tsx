import { createHomeStyles } from "@/assets/styles/home.styles";
import EmptyState from "@/components/emptyState";
import Header from "@/components/header";
import LoadingSpinner from "@/components/loadingSpinner";
import TodoInput from "@/components/todoInput";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Todo = Doc<"todos">;

export default function Index() {
  const [isLoading, setIsLoading] = useState(false);
  const todos = useQuery(api.todos.getTodos);
  const addTodos = useMutation(api.todos.addTodo);
  const updateTodo = useMutation(api.todos.updateTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const clearTodos = useMutation(api.todos.clearAllTodos);

  useEffect(() => {
    if (todos === undefined) {
      setIsLoading(true);
    }
  }, []);

  const { toggleDarkMode, colors } = useTheme();

  const handleCheckbox = async (id: Id<"todos">) => {
    try {
      await toggleTodo({ id });
    } catch (err) {
      console.log("error");
    }
  };

  const handleUpdate = async (id: Id<"todos">, text: string) => {
    try {
      await updateTodo({ id, text });
    } catch (err) {
      console.log("error");
    }
  };

  const handleDelete = async (id: Id<"todos">) => {
    try {
      await deleteTodo({ id });
    } catch (err) {
      console.log("error");
    }
  };

  const deleteTodoItem = async (id: Id<"todos">) => {
    try {
      await deleteTodo({ id });
    } catch (err) {
      console.log("error");
    }
  };

  const homeStyles = createHomeStyles(colors);

  const renderTodoItem = ({ item }: { item: Todo }) => {
    return (
      <View style={homeStyles.todoItemWrapper}>
        <LinearGradient
          colors={colors.gradients.surface}
          style={homeStyles.todoItem}
        >
          <TouchableOpacity
            style={homeStyles.checkbox}
            activeOpacity={0.7}
            onPress={() => handleCheckbox(item._id)}
          >
            <LinearGradient
              colors={
                item.isCompleted
                  ? colors.gradients.success
                  : colors.gradients.muted
              }
              style={[
                homeStyles.checkboxInner,
                {
                  borderColor: item.isCompleted ? "transparent" : colors.border,
                },
              ]}
            >
              {item.isCompleted && (
                <Ionicons name="checkmark" size={18} color="#fff"></Ionicons>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <View style={homeStyles.todoTextContainer}>
            <Text
              style={[
                homeStyles.todoText,
                item.isCompleted && {
                  textDecorationLine: "line-through",
                  color: colors.textMuted,
                  opacity: 0.6,
                },
              ]}
            >
              {item.text}
            </Text>

            <View style={homeStyles.todoActions}>
              <TouchableOpacity>
                <LinearGradient
                  colors={colors.gradients.warning}
                  style={homeStyles.actionButton}
                >
                  <Ionicons name="pencil" size={15} color={"#fff"} />
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => deleteTodoItem(item._id)}>
                <LinearGradient
                  colors={colors.gradients.danger}
                  style={homeStyles.actionButton}
                >
                  <Ionicons name="trash-bin" size={15} color={"#fff"} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  };

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyles.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={homeStyles.safeArea}>
        <Header />
        <TodoInput />

        <FlatList
          data={todos}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item._id}
          style={homeStyles.todoList}
          contentContainerStyle={homeStyles.todoListContent}
          ListEmptyComponent={<EmptyState />}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
