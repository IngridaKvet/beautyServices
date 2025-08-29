import "./filter.css";

const Filters = ({ filters, setFilters }) => {
  return (
    <div className="task-filters">
      <select
        value={filters.category}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, category: e.target.value }))
        }
      >
        <option value="">Category</option>
        <option value="Hair Care">Hair Care</option>
        <option value="Hair Style">Hair Style</option>
        <option value="Nails">Nails</option>
      </select>
    </div>
  );
};

export default Filters;
