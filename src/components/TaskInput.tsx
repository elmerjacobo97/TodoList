import {StyledComponent} from 'nativewind';
import {TouchableOpacity, View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useState} from 'react';
import uuid from 'react-native-uuid';
import {Task} from '../interfaces';

interface Props {
  addTask: (newTask: Task) => void;
}

export const TaskInput = ({addTask}: Props) => {
  const [taskInput, setTaskInput] = useState<string>('');

  const handleAddTask = () => {
    if (taskInput.trim() !== '') {
      const newTask: Task = {
        id: uuid.v4().toString(),
        title: taskInput,
        completed: false,
      };
      addTask(newTask);
      setTaskInput('');
    }
  };

  return (
    <StyledComponent
      component={View}
      className="flex-row justify-between absolute w-full bottom-2">
      <StyledComponent
        component={TextInput}
        value={taskInput}
        onChangeText={text => setTaskInput(text)}
        style={{
          fontSize: 18,
          width: '80%',
        }}
        placeholderTextColor="gray"
        selectionColor="#06B6D4"
        keyboardType="default"
        placeholder="Add a new task"
        className="border p-4 rounded-2xl text-black dark:text-white border-gray-500 bg-gray-300 dark:bg-gray-800"
      />
      <StyledComponent
        component={TouchableOpacity}
        onPress={handleAddTask}
        activeOpacity={0.7}
        className="bg-indigo-600 dark:bg-cyan-500 flex-row justify-center items-center px-3.5 py-2 rounded-2xl">
        <Icon name="add-outline" size={30} color="#FFF" />
      </StyledComponent>
    </StyledComponent>
  );
};
