import { Select } from "antd";
import { useTaskStore } from "../store/useTaskStore";

function SortControl() {
  const sortOrder = useTaskStore((state) => state.sortOrder);
  const setSortOrder = useTaskStore((state) => state.setSortOrder);

  return (
    <Select
      value={sortOrder}
      onChange={setSortOrder}
      style={{ width: 200 }}
      options={[
        { value: "desc", label: "Descending" },
        { value: "asc", label: "Ascending" },
      ]}
    />
  );
}

export default SortControl;
