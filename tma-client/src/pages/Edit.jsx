import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import toast from 'react-hot-toast';

const Edit = () => {
    const { user } = useContext(AuthContext);
    const loginUser = user?.email;

    const handleEditEquipment = (e) => {
        e.preventDefault();

        const title = e.target.title.value;
        const description = e.target.description.value;
        const status = e.target.category.value;
        const Edittask = { loginUser, title, status, description };
        // console.log(Edittask);
        fetch(`${import.meta.env.VITE_API_URL}/add`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(Edittask)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.insertedId) {
                    // console.log('successfully Edited');
                    toast.success('Successfully Edited!')

                    e.target.reset();
                }
            })
    };

    return (
        <div className="lg:w-3/4 mx-auto flex flex-col items-center">
            <div className="text-center p-10">
                <h1 className="text-5xl font-bold">Edit Task!</h1>
                <p className="py-6">Please Edit your favorite task</p>
            </div>
            <div className="card bg-base-100 w-full max-w-lg shadow-2xl">
                <form onSubmit={handleEditEquipment} className="card-body">
                    {/* Form first row */}
                    <div className="flex justify-center">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Title</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                className="input input-bordered w-full text-center"
                                required
                            />
                        </div>
                    </div>

                    {/* Form second row */}
                    <div className="flex justify-center">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <input
                                type="text"
                                name="description"
                                placeholder="Description"
                                className="input input-bordered w-full text-center"
                                required
                            />
                        </div>
                    </div>


                    {/* Form third row */}
                    <div className="flex justify-center">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Category</span>
                            </label>
                            <select
                                name="category"
                                className="select select-bordered w-full text-center"
                                required
                            >
                                <option value="TODO">To-Do</option>
                                <option value="IN_PROGRESS">In Progress</option>
                                <option value="DONE">Done</option>
                            </select>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="form-control mt-6 flex justify-center">
                        <button className="btn bg-gray-900 text-white hover:bg-gray-700 w-full">
                            Edit Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Edit;
