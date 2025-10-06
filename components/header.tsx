import { createHomeStyles } from "@/assets/styles/home.styles";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View } from "react-native";

const Header = () => {
  const { colors } = useTheme();

  const homeStyles = createHomeStyles(colors);

  let percentage = 0;
  const todos = useQuery(api.todos.getTodos);
  const completedCount = todos?.filter((item) => item.isCompleted).length;

  if (completedCount && todos) {
    percentage = (completedCount / todos.length) * 100;
  }

  return (
    <View style={homeStyles.header}>
      <View style={homeStyles.titleContainer}>
        <LinearGradient
          colors={colors.gradients.primary}
          style={homeStyles.iconContainer}
        >
          <Ionicons name="flash-outline" size={28} color="#fff"></Ionicons>
        </LinearGradient>

        <View style={homeStyles.titleTextContainer}>
          <Text style={homeStyles.title}>Tanya's Tasks 👀</Text>
          <Text style={homeStyles.subtitle}>
            {completedCount} of {todos?.length} completed
          </Text>
        </View>
      </View>

      <View style={homeStyles.progressContainer}>
        <View style={homeStyles.progressBarContainer}>
          <View style={homeStyles.progressBar}>
            <LinearGradient
              colors={colors.gradients.success}
              style={[homeStyles.progressFill, { width: `${percentage}%` }]}
            ></LinearGradient>
          </View>
          <Text style={homeStyles.progressText}>{Math.round(percentage)}%</Text>
        </View>
      </View>
    </View>
  );
};

export default Header;
