import { Dimensions, StyleSheet } from 'react-native';
import nbVariables from 'lib/native-base-theme/variables/platform';

export const screenWidth = Dimensions.get('window').width;
export const disjunctionWidth = Dimensions.get('window').width - 24;

export default StyleSheet.create({
  borderBottom: {
    borderBottomWidth: nbVariables.borderWidth,
    borderColor: nbVariables.cardBorderColor,
  },
  header: {
    color: '#666666',
    paddingHorizontal: 4,
    paddingVertical: 15,
    fontSize: 20,
  },
});
