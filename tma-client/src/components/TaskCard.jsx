import { useDraggable } from '@dnd-kit/core';
import toast from 'react-hot-toast';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteForever } from 'react-icons/md';
import { Link } from 'react-router-dom';

export function TaskCard({ task }) {
  // const { attributes, listeners, setNodeRef, transform,  } = useDraggable({
  //   id: task._id  // Ensure id exists
  // });

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task?.id || task?._id
  });


  // console.log(setNodeRef);
  const style = transform
    ? {
      transform: `translate(${transform.x}px, ${transform.y}px)`,
    }
    : undefined;

  const handleDelete = async (id) => {
    // console.log("Deleting Task ID:", id);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/delete/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (data.deletedCount > 0) {
        toast.success("Your task has been deleted.");
        window.location.reload(); // Reload to update UI
      } else {
        toast.error("Failed to delete task.");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("An error occurred while deleting the task.");
    }
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="cursor-grab rounded-lg bg-neutral-700 p-4 shadow-sm hover:shadow-md"
      style={style}
    >
      <h3 className="font-medium text-neutral-100">{task.title}</h3>
      <p className="mt-2 text-sm text-neutral-400">{task.description}</p>
      <p className="mt-2 text-sm text-neutral-400">
        {new Date(task.timestamp).toLocaleString('en-US', { timeZone: 'Asia/Dhaka' })}
      </p>
      <p className="mt-2 text-sm text-neutral-400">{task.status}</p>
      <div className="flex justify-end gap-4 text-white">
        <Link to={`/task/${task?._id}`} className="text-white">
          <CiEdit />
        </Link>
        <button
          className="bg-red-500 hover:bg-red-700 text-white" aria-label="Delete Task"
          onClick={() => handleDelete(task._id)} // Moved onClick here
        >
          <MdDeleteForever />
        </button>
      </div>
    </div>
  );
}
