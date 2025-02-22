import { useState } from 'react';

import { DndContext } from '@dnd-kit/core';
import { Column } from './components/Column';
import { useLoaderData } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';


// const { data: INITIAL_TASKS, isLoading } = useQuery({
//   queryKey: ["task"],
//   queryFn: async () => {
//       const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/add`)
//       return data
//   }
// })
// // 
// console.log(tasks);
// if (isLoading) return (<p>Loading ...............</p>)

const COLUMNS = [
  { id: 'TODO', title: 'To Do' },
  { id: 'IN_PROGRESS', title: 'In Progress' },
  { id: 'DONE', title: 'Done' },
];




// const INITIAL_TASKS = [
//   {
//     id: '1',
//     title: 'Research Project',
//     description: 'Gather requirements and create initial documentation',
//     status: 'TODO',
//   },
//   {
//     id: '2',
//     title: 'Design System',
//     description: 'Create component library and design tokens',
//     status: 'TODO',
//   },
//   {
//     id: '3',
//     title: 'API Integration',
//     description: 'Implement REST API endpoints',
//     status: 'IN_PROGRESS',
//   },
//   {
//     id: '4',
//     title: 'Testing',
//     description: 'Write unit tests for core functionality',
//     status: 'DONE',
//   },
// ];
// console.log(object);
export default function App() {
  const INITIAL_TASKS = useLoaderData();
  // console.log(INITIAL_TASKS);

    const [tasks, setTasks] = useState(INITIAL_TASKS);
    // console.log(tasks);
  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task
      )
    );
  }
 

  return (
    <div className="max-w-9/10 mx-auto px-4 min-h-screen">

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
        <DndContext onDragEnd={handleDragEnd}>
          {COLUMNS.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)}
            />
          ))}
        </DndContext>
      </div>
    </div>
  );
}
