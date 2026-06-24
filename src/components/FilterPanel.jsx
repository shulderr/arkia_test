import { Select, Space } from "antd";
import { filtersConfig } from "../mocks/filtersConfig";
import { useTaskStore } from "../store/useTaskStore";

function FilterPanel() {
  const filters = useTaskStore((state) => state.filters);
  const setFilters = useTaskStore((state) => state.setFilters);

  const handleFilterChange = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  return (
    <Space wrap>
      {filtersConfig.map((filter) => (
        <Select
          key={filter.key}
          mode="multiple"
          allowClear
          placeholder={filter.label}
          style={{ minWidth: 220 }}
          value={filters[filter.key]}
          options={filter.options}
          onChange={(value) => handleFilterChange(filter.key, value)}
        />
      ))}
    </Space>
  );
}

export default FilterPanel;
