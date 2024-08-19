import {StyleSheet} from 'react-native';
import {Colors} from '../../core/Colors';

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
    fontSize: 16,
  },
  dropdown: {
    padding: 12,
    borderColor: Colors.border_grey,
    borderWidth: 1,
    margin: 12,
    borderRadius: 8,
  },
  floatingLabel: {
    position: 'absolute',
    top: -12,
    backgroundColor: Colors.white,
    left: 12,
    paddingHorizontal: 4,
    zIndex: 1,
  },
  floatingLabelText: {
    color: Colors.text_floating_label,
  },
  icon: {
    width: 12,
    height: 12,
    tintColor: Colors.text_floating_label
  },
  empty: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
});
