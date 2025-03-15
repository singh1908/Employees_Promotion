import { useState, useEffect } from "react";
import "./EmployeeTable.css"; // Import CSS file

const EmployeeTable = () => {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [sortKey, setSortKey] = useState("employeeID"); // Default sorting key
  const [sortOrder, setSortOrder] = useState("asc"); // Default sort order

  useEffect(() => {
    fetch("/developers.json")
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
        setSortedData(jsonData); // Initialize sorted data
      })
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  // Function to handle sorting when the "Confirm" button is clicked
  const handleSort = () => {
    const sorted = [...data].sort((a, b) => {
      if (typeof a[sortKey] === "string") {
        return sortOrder === "asc"
          ? a[sortKey].localeCompare(b[sortKey])
          : b[sortKey].localeCompare(a[sortKey]);
      } else {
        return sortOrder === "asc" ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey];
      }
    });
    setSortedData(sorted);
  };

  return (
    <div className="table-container">
        <h2 className="table-title">Employee Performance Metrics</h2>
      {/* Dropdowns for sorting options */}
      <div className="dropdown-container">
        <label htmlFor="sort">Sort By:</label>
        <select
          id="sort"
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
        >
          <option value="developmentFrequency">Development Frequency</option>
          <option value="leadTime">Lead Time</option>
          <option value="cycleTime">Cycle Time</option>
          <option value="leadTimeChanges">Lead Time Changes</option>
          <option value="velocity">Velocity</option>
          <option value="workInProgress">Work In Progress</option>
          <option value="failureRate">Failure Rate</option>
          <option value="restoreTime">Restore Time</option>
          <option value="csat">CSAT</option>
          <option value="peerRating">Peer Rating</option>
        </select>

        {/* Dropdown for sorting order (ascending or descending) */}
        <label htmlFor="order">Order:</label>
        <select
          id="order"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        <button onClick={handleSort} className="btn">Confirm</button>
      </div>

      <table className="employee-table">
        <thead>
          <tr className="table-row">
            <th>Employee ID</th>
            <th>Name</th>
            <th>Development Frequency</th>
            <th>Lead Time</th>
            <th>Cycle Time</th>
            <th>Lead Time Changes</th>
            <th>Velocity</th>
            <th>Work In Progress</th>
            <th>Failure Rate</th>
            <th>Restore Time</th>
            <th>CSAT</th>
            <th>Peer Rating</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((employee) => (
            <tr key={employee.employeeID}>
              <td>{employee.employeeID}</td>
              <td>{employee.employeeName}</td>
              <td>{employee.developmentFrequency}</td>
              <td>{employee.leadTime}</td>
              <td>{employee.cycleTime}</td>
              <td>{employee.leadTimeChanges}</td>
              <td>{employee.velocity}</td>
              <td>{employee.workInProgress}</td>
              <td>{employee.failureRate}%</td>
              <td>{employee.restoreTime}</td>
              <td>{employee.csat}</td>
              <td>{employee.peerRating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;