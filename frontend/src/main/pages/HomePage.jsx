import { useState } from "react";

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useBackend } from "../utils/useBackend";
import DiningCommonsTable from "../components/DiningCommons/DiningCommonsTable";

export default function HomePage() {
  const { data } = useBackend(
    // Stryker disable next-line all : don't test internal caching of React Query
    [`/api/dining/all`],
    { method: "GET", url: "/api/dining/all" },
    [],
  );

  const date = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(date);

  const onChangeDate = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
  };

  return (
    <BasicLayout>
      <h1>Dining Commons</h1>
      <p>
        <label htmlFor="dateSelector">Select Date:</label>
        <br></br>
        <input
          type="date"
          id="dateSelector"
          name="dateSelector"
          value={selectedDate}
          onChange={onChangeDate}
        />
      </p>
      <DiningCommonsTable commons={data} date={selectedDate} />
    </BasicLayout>
  );
}
