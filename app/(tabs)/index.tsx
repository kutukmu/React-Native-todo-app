import { createHomeStyles } from "@/assets/styles/home.styles";
import EditTodo from "@/components/editTodo";
import EmptyState from "@/components/emptyState";
import Header from "@/components/header";
import TodoInput from "@/components/todoInput";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Todo = Doc<"todos">;

export default function Index() {
  const [isLoading, setIsLoading] = useState(false);
  const [idClickedItem, setIdClickedItem] = useState<Id<"todos">>();
  const [isUpdating, setIsUpdating] = useState(false);
  const todos = useQuery(api.todos.getTodos);
  const addTodos = useMutation(api.todos.addTodo);
  const updateTodo = useMutation(api.todos.updateTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const clearTodos = useMutation(api.todos.clearAllTodos);

  const { toggleDarkMode, colors } = useTheme();

  const handleCheckbox = async (id: Id<"todos">) => {
    try {
      await toggleTodo({ id });
    } catch (err) {
      console.log("error");
    }
  };

  const deleteTodoItem = async (id: Id<"todos">) => {
    Alert.alert("Delete Todo", "Are you sure you want to delete?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteTodo({ id }),
      },
    ]);
  };

  const handleUpdatingButtons = (id: Id<"todos">) => {
    setIdClickedItem(id);
  };

  const handleCloseButton = (id: Id<"todos">) => {
    setIdClickedItem(undefined);
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
            {item._id !== idClickedItem && (
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
            )}

            {item._id === idClickedItem && (
              <EditTodo
                id={item._id}
                text={item.text}
                handleUpdatingButtons={handleUpdatingButtons}
                handleCloseButton={handleCloseButton}
              />
            )}

            {item._id !== idClickedItem && (
              <View style={homeStyles.todoActions}>
                <TouchableOpacity
                  onPress={() => handleUpdatingButtons(item._id)}
                >
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
            )}
          </View>
        </LinearGradient>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyles.container}
    >
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
