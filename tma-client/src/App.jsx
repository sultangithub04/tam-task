import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CiBoxList, CiTimer } from "react-icons/ci";
import { FaTasks } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { TbProgress } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "./Provider/AuthProvider";


const categories = [
  { id: "TODO", title: "TODO", bgClass: "bg-gray-100", icon: <CiBoxList className="text-2xl" /> },
  { id: "IN_PROGRESS", title: "IN_PROGRESS", bgClass: "bg-blue-100", icon: <TbProgress className="text-2xl" /> },
  { id: "DONE", title: "DONE", bgClass: "bg-green-100", icon: <IoCheckmarkDoneCircleOutline className="text-2xl" /> },
];

const App = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const { data: tasks = [], refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/tasks/${user?.email}`);
      return res.data;
    },
  });

  const [localTasks, setLocalTasks] = useState([]);

  useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);


  const handleUpdate = (taskId) => navigate(`/task/${taskId}`);
 
  const handleDelete = async (taskId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.delete(`${import.meta.env.VITE_API_URL}/delete/${taskId}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Your task has been removed.", "success");
          refetch();
        }
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const updatedTasks = localTasks.map((task) =>
      task._id === draggableId ? { ...task, status: destination.droppableId } : task
    );

    setLocalTasks(updatedTasks);
    await axios.put(`${import.meta.env.VITE_API_URL}/edit/${draggableId}`, { status: destination.droppableId });
    refetch();
  };

  return (
    <div className="min-h-screen p-10 bg-gray-50">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-10 flex items-center justify-center gap-2">
        <FaTasks /> Task Board
      </h2>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((column) => (
            <Droppable key={column.id} droppableId={column.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`${column.bgClass} p-6 rounded-lg shadow-lg min-h-[400px]`}
                >
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-900">
                    {column.icon} {column.title}
                  </h3>

                  {localTasks
                    .filter((task) => task.status === column.id)
                    .map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white cursor-grab p-4 rounded-lg shadow-md mb-3 transition-all hover:shadow-lg border-l-4 border-blue-500"
                          >
                            <h4 className="font-semibold text-gray-800">{task?.title}</h4>
                            <p className="text-gray-600 text-sm mb-2">{task?.description}</p>
                            <p className="text-gray-500 text-xs flex items-center gap-1">
                              <CiTimer className="text-lg" /> {new Date(task?.timestamp).toLocaleString()}
                            </p>
                            <div className="flex gap-2 mt-3">
                              <button
                                onClick={() => handleUpdate(task._id)}
                                className="px-3 py-1.5 bg-blue-500 text-white text-sm rounded-lg flex items-center gap-1 hover:bg-blue-600 transition"
                                aria-label="Edit Task"
                              >
                                <FiEdit className="text-lg" />
                              </button>
                              <button
                                onClick={() => handleDelete(task._id)}
                                className="px-3 py-1.5 bg-red-500 text-white text-sm rounded-lg flex items-center gap-1 hover:bg-red-600 transition"
                                aria-label="Delete Task"
                              >
                                <MdDelete className="text-lg" />
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;
