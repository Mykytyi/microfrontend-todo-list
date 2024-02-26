import './TaskList.css';

const TaskList = () => {

  return (
    <div className="TaskListContainer">
      <div className="TitleContainer">
        <h2>All</h2>

        <div className="AddTaskButtonContainer">
          <button>Add task</button>
        </div>
      </div>

      <div className="TaskList">
        <ul>
          <li>task 1</li>
          <li>task 2</li>
          <li>task 3</li>
        </ul>
      </div>
    </div>
  );
};

export default TaskList;
