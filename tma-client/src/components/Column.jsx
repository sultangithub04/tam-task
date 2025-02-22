import { useDroppable } from '@dnd-kit/core';
import { TaskCard } from './TaskCard';


export function Column({ column, tasks }) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div className="flex flex-col  rounded-lg bg-neutral-800 p-4 w-full">
      <h2 className="mb-4 font-semibold text-neutral-100">{column.title}</h2>
      <div ref={setNodeRef} className="flex flex-1 flex-col gap-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
