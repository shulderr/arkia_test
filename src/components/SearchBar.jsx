import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useTaskStore } from "../store/useTaskStore";

function SearchBar() {
  const searchTerm = useTaskStore((state) => state.searchTerm);
  const setSearchTerm = useTaskStore((state) => state.setSearchTerm);

  return (
    <Input
      size="large"
      placeholder="Search tasks"
      prefix={<SearchOutlined />}
      value={searchTerm}
      onChange={(event) => setSearchTerm(event.target.value)}
    />
  );
}

export default SearchBar;