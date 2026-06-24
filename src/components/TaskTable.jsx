import { Table, Tag } from "antd";
import dayjs from "dayjs";
import { useTaskStore } from "../store/useTaskStore";

const priorityColors = {
  high: "red",
  medium: "gold",
  low: "green",
};

const statusColors = {
  pending: "orange",
  in_progress: "blue",
  completed: "green",
};

function TaskTable({ tasks }) {
  const setSelectedTask = useTaskStore(
    (state) => state.setSelectedTask
  );

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Process",
      dataIndex: "process",
    },
    {
      title: "Assignee",
      dataIndex: "assignee",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      render: (value) => (
        <Tag color={priorityColors[value]}>
          {value.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value) => (
        <Tag color={statusColors[value]}>
          {value.replace("_", " ").toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      render: (value) =>
        dayjs(value).format("MMM DD, YYYY"),
    },
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={tasks}
      pagination={{
        pageSize: 10,
      }}
      onRow={(record) => ({
        onClick: () => setSelectedTask(record),
      })}
    />
  );
}

export default TaskTable;