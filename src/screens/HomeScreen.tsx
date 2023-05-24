import {
  Alert,
  Animated,
  ColorSchemeName,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {StyledComponent} from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Header, Navigation, TaskInput, Tasks} from '../components';
import {Task} from '../interfaces';

interface Props {
  colorScheme: ColorSchemeName;
  toggleColorScheme: () => void;
}

export const HomeScreen = ({colorScheme, toggleColorScheme}: Props) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('todas');

  const saveTasks = async (updatedTasks: Task[]) => {
    try {
      const jsonTasks = JSON.stringify(updatedTasks);
      await AsyncStorage.setItem('tasks', jsonTasks);
      console.log('Tareas guardadas exitosamente en AsyncStorage.');
    } catch (error) {
      console.error('Error al guardar las tareas en AsyncStorage:', error);
    }
  };

  const loadTasks = async () => {
    try {
      const jsonTasks = await AsyncStorage.getItem('tasks');
      const savedTasks = jsonTasks ? JSON.parse(jsonTasks) : [];
      setTasks(savedTasks);
      console.log('Tareas cargadas exitosamente desde AsyncStorage.');
    } catch (error) {
      console.error('Error al cargar las tareas desde AsyncStorage:', error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const filteredTasks = useMemo(() => {
    switch (selectedCategory) {
      case 'todas':
        return tasks;
      case 'completadas':
        return tasks.filter(task => task.completed);
      case 'pendientes':
        return tasks.filter(task => !task.completed);
      default:
        return tasks;
    }
  }, [tasks, selectedCategory]);

  const addTask = async (newTask: Task) => {
    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
  };

  const handleTaskCompletion = async (taskId: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? {...task, completed: !task.completed} : task,
    );
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
  };

  const handleDeleteTask = async (taskId: string) => {
    Alert.alert(
      '¿Estás seguro de eliminar esta tarea?',
      'Esta acción no se puede deshacer',
      [
        {
          text: 'Aceptar',
          style: 'destructive',
          onPress: async () => {
            const updatedTasks = tasks.filter(task => task.id !== taskId);
            setTasks(updatedTasks);
            await saveTasks(updatedTasks);
          },
        },
        {text: 'Cancelar', style: 'cancel'},
      ],
    );
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, marginHorizontal: 6}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header colorScheme={colorScheme} toggleColorScheme={toggleColorScheme} />
      <StyledComponent component={View} className="flex-1">
        <Navigation setSelectedCategory={setSelectedCategory} />
        <Tasks
          tasks={filteredTasks}
          selectedCategory={selectedCategory}
          handleTaskCompletion={handleTaskCompletion}
          handleDeleteTask={handleDeleteTask}
        />
        <TaskInput addTask={addTask} />
      </StyledComponent>
    </KeyboardAvoidingView>
  );
};
