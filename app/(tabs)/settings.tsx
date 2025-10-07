import { createSettingsStyles } from "@/assets/styles/settings.styles";
import Preferences from "@/components/preferences";
import ProgressStats from "@/components/progressStats";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const settings = () => {
  const { colors } = useTheme();
  const settingsStyles = createSettingsStyles(colors);
  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={settingsStyles.container}
    >
      <SafeAreaView style={settingsStyles.safeArea}>
        <View style={settingsStyles.header}>
          <View style={settingsStyles.titleContainer}>
            <LinearGradient
              colors={colors.gradients.primary}
              style={settingsStyles.iconContainer}
            >
              <Ionicons
                name="settings-outline"
                size={28}
                color="#fff"
              ></Ionicons>
            </LinearGradient>

            <View style={settingsStyles.titleTextContainer}>
              <Text style={settingsStyles.title}>Settings</Text>
            </View>
          </View>
        </View>

        <ScrollView
          style={settingsStyles.scrollView}
          contentContainerStyle={settingsStyles.container}
          showsHorizontalScrollIndicator={false}
        >
          <ProgressStats />

          <Preferences />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default settings;
