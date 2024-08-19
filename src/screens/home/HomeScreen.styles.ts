import {StyleSheet} from 'react-native';
import {Colors} from '../../core/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  balanceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text_title,
  },
  item: {
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border_grey,
  },
  itemText: {
    fontSize: 16,
  },
  listContainer: {},
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    color: Colors.text_title,
  },
  subTitle: {
    color: Colors.text_title,
    marginVertical: 4,
  },
  itemSeparator: {
    marginLeft: 12,
    marginTop: 12,
  },
  blockTitle: {
    fontWeight: 'bold',
    color: Colors.text_title,
    fontSize: 16,
    marginBottom: 12,
    marginTop: 12,
  },
  image: {
    width: '30%',
    height: 'auto',
    aspectRatio: 1,
  },
  empty: {
    backgroundColor: Colors.white,
    width: '100%',
    alignItems: 'center',
    borderRadius: 12,
  },
  emptyText: {
    fontSize: 16,
    padding: 12,
  }
});
