import {Animated, FlatList, Text, View} from 'react-native';
import {StyledComponent} from 'nativewind';
import {TaskItem} from './TaskItem';
import {Task} from '../interfaces';

interface Props {
  tasks: Task[];
  selectedCategory: string;
  handleTaskCompletion: (taskId: string) => void;
  handleDeleteTask: (taskId: string) => void;
}

export const Tasks = ({
  tasks,
  selectedCategory,
  handleTaskCompletion,
  handleDeleteTask,
}: Props) => {
  return (
    <StyledComponent component={View} className="mb-36">
      {tasks.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={tasks}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TaskItem
              item={item}
              selectedCategory={selectedCategory}
              handleTaskCompletion={handleTaskCompletion}
              handleDeleteTask={handleDeleteTask}
            />
          )}
        />
      ) : (
        <StyledComponent
          component={Text}
          className="text-center text-white text-lg">
          No hay tareas añadidas
        </StyledComponent>
      )}
    </StyledComponent>
  );
};
