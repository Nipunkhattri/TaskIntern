import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Task.css'; // Ensure this path matches your actual CSS file location

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
  const [taskInput, setTaskInput] = useState({ title: '', description: '', completionStatus: '' });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/GetAllTask');
      console.log(response);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskInput({ ...taskInput, [name]: value });
  };

  const handleAddTask = () => {
    setShowModal(true);
    setIsEditing(false);
    setTaskInput({ title: '', description: '', completionStatus: '' });
  };

  const handleEditTask = (index) => {
    setShowModal(true);
    setIsEditing(true);
    setCurrentTaskIndex(index);
    setTaskInput(tasks[index]);
  };

  const saveTask = async () => {
    if (isEditing) {
      try {
        const updatedTask = { ...taskInput };
        await axios.put(`http://localhost:5000/api/UpdateTask/${tasks[currentTaskIndex]._id}`, updatedTask);
        fetchTasks();
      } catch (error) {
        console.error('Error updating task:', error);
      }
    } else {
      try {
        const newTask = { ...taskInput };
        const response = await axios.post('http://localhost:5000/api/CreateTask', newTask);
        // setTasks([...tasks, response.data]);
        fetchTasks();
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
    setShowModal(false);
    setTaskInput({ title: '', description: '', completionStatus: '' });
  };

  return (
    <div>
      <button onClick={handleAddTask}>Add Task</button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>{isEditing ? 'Edit Task' : 'Add New Task'}</h2>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={taskInput.title}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={taskInput.description}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Status:
              <input
                type="text"
                name="completionStatus"
                value={taskInput.completionStatus}
                onChange={handleInputChange}
              />
            </label>
            <button onClick={saveTask}>{isEditing ? 'Save Changes' : 'Add Task'}</button>
          </div>
        </div>
      )}

      <div className="task-grid">
        {tasks.map((task, index) => (
          <div className="task-row" key={index}>
            <div>{task.title}</div>
            <div>{task.description}</div>
            <div>{task.completionStatus}</div>
            <button onClick={() => handleEditTask(index)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Task;
