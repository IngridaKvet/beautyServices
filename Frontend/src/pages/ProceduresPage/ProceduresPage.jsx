import Navigation from "../../components/Navigation/Navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import "./proceduresPage.css";
import Filters from "../../components/Filter/Filter";
import ProcedureCard from "../../components/ProcedureCard/ProcedureCard";
const DEFAULT_FILTERS = { category: "" };

const API_URL = import.meta.env.VITE_API_URL;

const ProceduresPage = () => {
  const [procedures, setProcedures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  async function fetchItems() {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${API_URL}/procedures`, {
        withCredentials: true,
      });
      const data = res.data.data;

      console.log(data);
      setProcedures(data);
    } catch (error) {
      setError(error.message);
      setProcedures([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  //sorts
  const visibleProcedures = (() => {
    let filtered = procedures;

    if (filters.category)
      filtered = filtered.filter((t) => t.category === filters.category);

    return filtered;
  })();

  return (
    <div className="itemsPage">
      <Navigation />
      <section className="items">
        <Filters filters={filters} setFilters={setFilters} />
        {loading && <p>Loading…</p>}
        {!loading && error && <p className="error">{error}</p>}
        {visibleProcedures.length === 0 ? (
          <p className="no-items">
            We couldn’t find any procedures right now. Please check back later.
          </p>
        ) : (
          visibleProcedures.map((procedure) => (
            <ProcedureCard
              key={procedure.id}
              procedure={procedure}
              fetchItems={fetchItems}
            />
          ))
        )}
      </section>
    </div>
  );
};

export default ProceduresPage;
