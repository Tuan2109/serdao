import { StyleSheet } from "react-native";
import { Colors } from "../../core/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey_background,
    padding: 12,
  },
  wrap: {
    backgroundColor: Colors.white,
    borderRadius: 8,
  },
  blockSpacing: {
    marginTop: 12,
  },
  title: {
    color: Colors.text_title,
    fontWeight: 'bold',
    padding: 12,
    fontSize: 16
  },
});