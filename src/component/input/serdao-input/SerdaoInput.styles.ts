import {StyleSheet} from 'react-native';
import {Colors} from '../../../core/Colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    width: '100%',
    padding: 12,
    borderRadius: 8,
  },
  wrap: {
    borderRadius: 8,
    borderColor: Colors.border_grey,
    borderWidth: 1,
    paddingHorizontal: 8
  },
  wrapBorderError: {
    borderColor: Colors.border_error,
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
    color: Colors.text_floating_label
  },
  messageError: {
    color: Colors.text_error,
    fontSize: 12,
    marginTop: 2,
  },
});
