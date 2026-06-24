import { Layout, Space, Typography } from "antd";

import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import TaskTable from "../components/TaskTable";
import TaskDetailDrawer from "../components/TaskDetail";

import { useFilteredTasks } from "../hooks/useFilteredTasks";
import { useTaskStore } from "../store/useTaskStore";
import { useEffect } from "react";
import SortControl from "../components/SortControl";

const { Content } = Layout;
const { Title } = Typography;

function TaskInbox() {
  const loadTasks = useTaskStore((state) => state.loadTasks);

  const loading = useTaskStore((state) => state.loading);

  const tasks = useFilteredTasks();

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return (
    <Layout>
      <Content
        style={{
          padding: 24,
          maxWidth: 1400,
          margin: "0 auto",
          width: "100%",
        }}
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Title level={2}>Task Inbox</Title>

          <SearchBar />
          <Space wrap>
            <FilterPanel />
            <SortControl />
          </Space>

          <TaskTable tasks={tasks} loading={loading} />

          <TaskDetailDrawer />
        </Space>
      </Content>
    </Layout>
  );
}

export default TaskInbox;
