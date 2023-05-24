import {Button} from '../interfaces';

export const formatterDate = (date: Date) => {
  return new Date(date).toLocaleDateString();
};

export const buttons: Button[] = [
  {label: 'Todas', value: 'todas', color: 'bg-gray-500 dark:bg-gray-700'},
  {
    label: 'Pendientes',
    value: 'pendientes',
    color: 'bg-yellow-400 dark:bg-yellow-600',
  },
  {
    label: 'Completadas',
    value: 'completadas',
    color: 'bg-green-400 dark:bg-green-500',
  },
];
