import { createHomeStyles } from "@/assets/styles/home.styles";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const EditTodo = ({
  id,
  text,
  handleUpdatingButtons,
  handleCloseButton,
}: {
  id: Id<"todos">;
  text: string;
  handleUpdatingButtons: (id: Id<"todos">) => void;
  handleCloseButton: (id: Id<"todos">) => void;
}) => {
  const { colors } = useTheme();
  const [currentText, setCurrentText] = useState(text);
  const homeStyles = createHomeStyles(colors);
  const updateTodo = useMutation(api.todos.updateTodo);

  const handleUpdating = () => {
    updateTodo({ id: id, text: currentText });
    handleCloseButton(id);
  };
  return (
    <View style={homeStyles.editContainer}>
      <TextInput
        style={homeStyles.editInput}
        onChangeText={setCurrentText}
        placeholderTextColor={colors.textMuted}
        value={currentText}
      ></TextInput>
      <View style={homeStyles.editButtons}>
        <TouchableOpacity activeOpacity={0.8} onPress={handleUpdating}>
          <LinearGradient
            colors={
              currentText.trim()
                ? colors.gradients.success
                : colors.gradients.muted
            }
            style={[
              homeStyles.editButton,
              !currentText.trim() && homeStyles.addButtonDisabled,
            ]}
          >
            <Ionicons name="checkbox" size={24} color="#fff" />
            <Text style={homeStyles.editButtonText}> Save</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handleCloseButton(id)}
        >
          <LinearGradient
            colors={colors.gradients.muted}
            style={[
              homeStyles.editButton,
              !currentText.trim() && homeStyles.addButtonDisabled,
            ]}
          >
            <Ionicons name="close" size={24} color="#fff" />
            <Text style={homeStyles.editButtonText}> Close </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditTodo;
