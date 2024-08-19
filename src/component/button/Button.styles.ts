import {StyleSheet} from 'react-native';
import {Colors} from '../../core/Colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    margin: 12,
    borderRadius: 8,
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
    color: Colors.text_title,
  },
  loading: {
    marginHorizontal: 4,
  },
});
