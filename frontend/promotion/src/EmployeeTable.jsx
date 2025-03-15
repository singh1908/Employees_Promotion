import { useState, useEffect } from "react";
import "./EmployeeTable.css"; // Import CSS file

const EmployeeTable = () => {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [baseUrl, setBaseUrl] = useState("http://localhost:3000/top-developers?");
  const [employeeLimit, setEmployeeLimit] = useState(20); // Default limit
  const [visibleColumns, setVisibleColumns] = useState([
    "employeeID", "employeeName", "developmentFrequency", "leadTime",
    "cycleTime", "leadTimeChanges", "velocity", "workInProgress",
    "failureRate", "restoreTime", "csat", "peerRating", "score"
  ]); // Default: Show all columns

  // Generate final API URL including the limit
  const url = `${baseUrl}limit=${employeeLimit}`;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
        setSortedData(jsonData);
      })
      .catch((error) => console.error("Error loading data:", error));
  }, [url]); // Trigger fetch when URL changes

  const handleDropdown = (e) => {
    const selectedUrl = e.target.value.split("&limit")[0]; // Remove any existing limit
    setBaseUrl(selectedUrl);

    // Set columns based on selection
    switch (selectedUrl) {
      case "http://localhost:3000/top-developers?":
        setVisibleColumns(["employeeID", "employeeName", "developmentFrequency", "leadTime", "cycleTime", "leadTimeChanges", "velocity", "workInProgress", "failureRate", "restoreTime", "csat", "peerRating", "score"]);
        break;
      case "http://localhost:3000/top-developers?velocity&csat&":
        setVisibleColumns(["employeeID", "employeeName", "velocity", "csat", "score"]);
        break;
      case "http://localhost:3000/top-developers?failureRate&restoreTime&":
        setVisibleColumns(["employeeID", "employeeName", "failureRate", "restoreTime", "score"]);
        break;
      case "http://localhost:3000/top-developers?leadTime&velocity&peerRating&":
        setVisibleColumns(["employeeID", "employeeName", "leadTime", "velocity", "peerRating", "score"]);
        break;
      default:
        setVisibleColumns(["employeeID", "employeeName", "developmentFrequency", "leadTime", "cycleTime", "leadTimeChanges", "velocity", "workInProgress", "failureRate", "restoreTime", "csat", "peerRating", "score"]);
    }
  };

  return (
    <div className="table-container">
      <h2 className="table-title">Employee Performance Metrics</h2>

      {/* Dropdown for sorting options */}
      <div className="dropdown-container">
        <label htmlFor="sort">Sort By:</label>
        <select id="sort" onChange={handleDropdown}>
          <option value="http://localhost:3000/top-developers?">No Prioritization</option>
          <option value="http://localhost:3000/top-developers?velocity&csat&">Customer Satisfaction</option>
          <option value="http://localhost:3000/top-developers?failureRate&restoreTime&">Focus on Stability</option>
          <option value="http://localhost:3000/top-developers?leadTime&velocity&peerRating&">Focus on Speed and Teamwork</option>
        </select>

        {/* Employee Limit Input */}
        <label>Number of Employees:</label>
        <input
          type="number"
          value={employeeLimit}
          onChange={(e) => setEmployeeLimit(e.target.value)}
          min="1"
          max="100"
        />
      </div>

      <table className="employee-table">
        <thead>
          <tr className="table-row">
            {visibleColumns.includes("employeeID") && <th>Employee ID</th>}
            {visibleColumns.includes("employeeName") && <th>Name</th>}
            {visibleColumns.includes("developmentFrequency") && <th>Development Frequency</th>}
            {visibleColumns.includes("leadTime") && <th>Lead Time</th>}
            {visibleColumns.includes("cycleTime") && <th>Cycle Time</th>}
            {visibleColumns.includes("leadTimeChanges") && <th>Lead Time Changes</th>}
            {visibleColumns.includes("velocity") && <th>Velocity</th>}
            {visibleColumns.includes("workInProgress") && <th>Work In Progress</th>}
            {visibleColumns.includes("failureRate") && <th>Failure Rate</th>}
            {visibleColumns.includes("restoreTime") && <th>Restore Time</th>}
            {visibleColumns.includes("csat") && <th>CSAT</th>}
            {visibleColumns.includes("peerRating") && <th>Peer Rating</th>}
            {visibleColumns.includes("score") && <th>Score</th>}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((employee) => (
            <tr key={employee.employeeID}>
              {visibleColumns.includes("employeeID") && <td>{employee.employeeID}</td>}
              {visibleColumns.includes("employeeName") && <td>{employee.employeeName}</td>}
              {visibleColumns.includes("developmentFrequency") && <td>{employee.developmentFrequency}</td>}
              {visibleColumns.includes("leadTime") && <td>{employee.leadTime}</td>}
              {visibleColumns.includes("cycleTime") && <td>{employee.cycleTime}</td>}
              {visibleColumns.includes("leadTimeChanges") && <td>{employee.leadTimeChanges}</td>}
              {visibleColumns.includes("velocity") && <td>{employee.velocity}</td>}
              {visibleColumns.includes("workInProgress") && <td>{employee.workInProgress}</td>}
              {visibleColumns.includes("failureRate") && <td>{employee.failureRate}%</td>}
              {visibleColumns.includes("restoreTime") && <td>{employee.restoreTime}</td>}
              {visibleColumns.includes("csat") && <td>{employee.csat}</td>}
              {visibleColumns.includes("peerRating") && <td>{employee.peerRating}</td>}
              {visibleColumns.includes("score") && <td>{(employee.score * 100).toFixed(2)}%</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
