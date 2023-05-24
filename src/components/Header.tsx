import {Text, View, TouchableOpacity, ColorSchemeName} from 'react-native';
import {styled} from 'nativewind';
import Icon from 'react-native-vector-icons/Ionicons';
import {formatterDate} from '../helpers';

const StyledView = styled(View);
const StyledText = styled(Text);

interface Props {
  colorScheme: ColorSchemeName;
  toggleColorScheme: () => void;
}

export const Header = ({colorScheme, toggleColorScheme}: Props) => {
  return (
    <StyledView className="flex-row items-center justify-between">
      <StyledText className="text-gray-900 dark:text-white font-black text-4xl">
        To-DO.
      </StyledText>
      <StyledText className="text-gray-900 dark:text-white font-black text-lg">
        {formatterDate(new Date())}
      </StyledText>

      <TouchableOpacity activeOpacity={0.5} onPress={toggleColorScheme}>
        <Icon
          name={colorScheme === 'dark' ? 'moon-outline' : 'sunny-outline'}
          size={30}
          color={colorScheme === 'dark' ? '#fff' : '#000'}
        />
      </TouchableOpacity>
    </StyledView>
  );
};
