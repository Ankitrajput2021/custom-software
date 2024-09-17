import { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from './firebase';
import './NewJobSheet.css'; // Make sure to import the CSS

const NewJobsheet = () => {
  const [clientName, setClientName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [receivedDate, setReceivedDate] = useState("");
  const [inventoryReceived, setInventoryReceived] = useState("");
  const [issues, setIssues] = useState("");
  const [clientNotes, setClientNotes] = useState("");
  const [technician, setTechnician] = useState("");
  const [deadline, setDeadline] = useState("");
  const [estimatedAmount, setEstimatedAmount] = useState("");
  const [status, setStatus] = useState("Pending");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "jobsheets"), {
      clientName,
      contactInfo,
      receivedDate,
      inventoryReceived,
      issues,
      clientNotes,
      technician,
      deadline,
      estimatedAmount,
      status
    });
    // Clear form after submission
    setClientName("");
    setContactInfo("");
    setReceivedDate("");
    setInventoryReceived("");
    setIssues("");
    setClientNotes("");
    setTechnician("");
    setDeadline("");
    setEstimatedAmount("");
    setStatus("Pending");
  };

  return (
    <div className="new-job-sheet-container">
      <h2>CREATE NEW JOB SHEET</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          placeholder="Client Name"
          required
        />
        <input
          type="text"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          placeholder="Contact Info (Phone 10 nos)"
          required
        />
        <input
          type="date"
          value={receivedDate}
          onChange={(e) => setReceivedDate(e.target.value)}
          placeholder="Received Date"
          required
        />
        <input
          type="text"
          value={inventoryReceived}
          onChange={(e) => setInventoryReceived(e.target.value)}
          placeholder="Inventory Received"
        />
        <input type="file" placeholder="Upload Inventory Image/Document/Video" />
        <textarea
          value={issues}
          onChange={(e) => setIssues(e.target.value)}
          placeholder="Reported Issues"
          rows="3"
        />
        <textarea
          value={clientNotes}
          onChange={(e) => setClientNotes(e.target.value)}
          placeholder="Client Notes"
          rows="3"
        />
        <input
          type="text"
          value={technician}
          onChange={(e) => setTechnician(e.target.value)}
          placeholder="Assigned Technician"
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          placeholder="Deadline"
        />
        <input
          type="number"
          value={estimatedAmount}
          onChange={(e) => setEstimatedAmount(e.target.value)}
          placeholder="Estimated Amount"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="In-Progress">In-Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit">Save Job Sheet</button>
      </form>
    </div>
  );
};

export default NewJobsheet;
