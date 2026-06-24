import { Drawer, Space } from "antd";
import { useTaskStore } from "../store/useTaskStore";

function TaskDetailDrawer() {
  const selectedTask = useTaskStore(
    (state) => state.selectedTask
  );

  const setSelectedTask = useTaskStore(
    (state) => state.setSelectedTask
  );

  return (
    <Drawer
      title={selectedTask?.title}
      open={!!selectedTask}
      onClose={() => setSelectedTask(null)}
      width={500}
    >
      {selectedTask && (
        <Space
          direction="vertical"
          size="middle"
          style={{ width: "100%" }}
        >
          <p>
            <strong>Process:</strong> {selectedTask.process}
          </p>

          <p>
            <strong>Assignee:</strong> {selectedTask.assignee}
          </p>

          <p>
            <strong>Status:</strong> {selectedTask.status}
          </p>

          <p>
            <strong>Priority:</strong> {selectedTask.priority}
          </p>

          <p>
            <strong>Due Date:</strong> {selectedTask.dueDate}
          </p>

          <p>{selectedTask.description}</p>

        </Space>
      )}
    </Drawer>
  );
}

export default TaskDetailDrawer;