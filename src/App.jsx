import React, { useState } from "react";

const App = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const submitHandler = (e) =>
     {
    e.preventDefault();

    if (isUpdating) 
      {
      const updatedTasks = mainTask.map((task, index) =>
        index === currentIndex ? { title, desc } : task
      );
      setMainTask(updatedTasks);
      setIsUpdating(false);
      setCurrentIndex(null);
    } 
    else 
    {
      setMainTask([...mainTask, { title, desc }]);
    }
    
    setTitle("");
    setDesc("");
  };

  const deleteHandler = (index) => {
    const copyTask = [...mainTask];
    copyTask.splice(index, 1);
    setMainTask(copyTask);
  };

  const updateHandler = (index) => {
    setTitle(mainTask[index].title);
    setDesc(mainTask[index].desc);
    setIsUpdating(true);
    setCurrentIndex(index);
  };

  const renderTask =
    mainTask.length > 0
      ? mainTask.map((task, index) => {
          return (
            <li
              key={index}
              className="flex items-center justify-between mb-5 bg-zinc-700 p-4 rounded-lg"
            >
              <div className="flex flex-col w-2/3">
                <h5 className="text-lg font-semibold text-white">
                  {task.title}
                </h5>
                <p className="text-sm text-gray-300">{task.desc}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => updateHandler(index)}
                  className="bg-yellow-400 text-sm text-zinc-800 px-4 py-2 rounded-lg"
                >
                  Update
                </button>
                <button
                  onClick={() => deleteHandler(index)}
                  className="bg-red-400 text-sm text-zinc-800 px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })
      : "No tasks available";

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-900">
      <div className="bg-zinc-800 p-10 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-2xl text-white font-semibold text-center py-3">
          What's Plan for Today?
        </h1>
        <form className="flex flex-col space-y-4" onSubmit={submitHandler}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Task"
            className="text-sm bg-black text-zinc-400 rounded-lg py-4 px-2"
            type="text"
          />
          <input
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Enter Description"
            className="text-sm bg-black text-zinc-400 rounded-lg py-4 px-2"
            type="text"
          />
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
            {isUpdating ? "Update Task" : "Add Task"}
          </button>
        </form>
        <div className="mt-5 p-5 bg-zinc-700 rounded-lg">
          <ul className="text-xs text-zinc-400 space-y-4">{renderTask}</ul>
        </div>
      </div>
    </div>
  );
};

export default App;
