import {StyledComponent} from 'nativewind';
import {Text, TouchableOpacity, View} from 'react-native';
import {Task} from '../interfaces';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  item: Task;
  selectedCategory: string;
  handleTaskCompletion: (taskId: string) => void;
  handleDeleteTask: (taskId: string) => void;
}

export const TaskItem = ({
  item,
  selectedCategory,
  handleTaskCompletion,
  handleDeleteTask,
}: Props) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(item.completed);
  const circleStyle: string = isCompleted
    ? 'bg-indigo-600 dark:bg-cyan-500'
    : 'bg-white dark:bg-black';
  const textStyle: string = `text-gray-900 dark:text-white font-medium text-lg ${
    isCompleted && selectedCategory === 'todas' ? 'line-through' : ''
  }`;

  const handlePress = () => {
    setIsCompleted(!isCompleted);
    handleTaskCompletion(item.id);
  };

  const handleDelete = () => {
    handleDeleteTask(item.id);
  };

  return (
    <StyledComponent
      component={View}
      className="bg-gray-300 dark:bg-gray-800 my-1 p-4 rounded-2xl">
      <StyledComponent component={View} className="flex-row items-center">
        {selectedCategory === 'todas' && (
          <StyledComponent
            component={TouchableOpacity}
            activeOpacity={0.5}
            onPress={handlePress}
            className={`p-3 rounded-full mr-3 ${circleStyle} `}
          />
        )}
        <StyledComponent component={View} style={{flex: 1}}>
          <StyledComponent
            component={Text}
            numberOfLines={4}
            className={textStyle}>
            {item.title}
          </StyledComponent>
        </StyledComponent>

        <TouchableOpacity activeOpacity={0.7} onPress={handleDelete}>
          <Icon name="trash-outline" size={28} color="#DC2626" />
        </TouchableOpacity>
      </StyledComponent>
    </StyledComponent>
  );
};
