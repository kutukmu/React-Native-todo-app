import { createSettingsStyles } from "@/assets/styles/settings.styles";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text } from "react-native";

const ProgressStats = () => {
  const { colors } = useTheme();
  const settingsStyles = createSettingsStyles(colors);
  const todos = useQuery(api.todos.getTodos);

  const totalTodos = todos ? todos.length : 0;
  const completedTodos = todos
    ? todos.filter((item) => item.isCompleted).length
    : 0;
  const activeTodos = totalTodos - completedTodos;
  return (
    <LinearGradient
      colors={colors.gradients.surface}
      style={settingsStyles.section}
    >
      <Text style={settingsStyles.sectionTitle}>Progress Stats</Text>
    </LinearGradient>
  );
};

export default ProgressStats;
