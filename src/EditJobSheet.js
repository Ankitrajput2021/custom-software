import React, { useState } from "react";
import "./EditJobSheet.css"; // Add your styles in a separate CSS file

const EditJobSheet = ({ job, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    clientName: job.clientName || "",
    contactInfo: job.contactInfo || "",
    receivedDate: job.receivedDate || "",
    inventoryReceived: job.inventoryReceived || "",
    inventoryImage: job.inventoryImage || "None",
    reportedIssues: job.reportedIssues || "",
    clientNotes: job.clientNotes || "",
    assignedTechnician: job.assignedTechnician || "",
    estimatedAmount: job.estimatedAmount || "",
    deadline: job.deadline || "",
    status: job.status || "In Progress",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, id: job.id });
  };

  return (
    <div className="edit-job-sheet-container">
      <h2 className="form-header">EDIT JOB SHEET</h2>
      <form onSubmit={handleSubmit}>
        <label>Client Name:</label>
        <input
          type="text"
          name="clientName"
          value={formData.clientName}
          onChange={handleChange}
        />

        <label>Contact Info:</label>
        <input
          type="text"
          name="contactInfo"
          value={formData.contactInfo}
          onChange={handleChange}
        />

        <label>Received Date:</label>
        <input
          type="date"
          name="receivedDate"
          value={formData.receivedDate}
          onChange={handleChange}
        />

        <label>Inventory Received:</label>
        <input
          type="text"
          name="inventoryReceived"
          value={formData.inventoryReceived}
          onChange={handleChange}
        />

        <label>Inventory Image/Document/Video:</label>
        <input
          type="text"
          name="inventoryImage"
          value={formData.inventoryImage}
          onChange={handleChange}
        />

        <label>Reported Issues:</label>
        <textarea
          name="reportedIssues"
          value={formData.reportedIssues}
          onChange={handleChange}
        />

        <label>Client Notes:</label>
        <textarea
          name="clientNotes"
          value={formData.clientNotes}
          onChange={handleChange}
        />

        <label>Assigned Technician:</label>
        <input
          type="text"
          name="assignedTechnician"
          value={formData.assignedTechnician}
          onChange={handleChange}
        />

        <label>Estimated Amount:</label>
        <input
          type="number"
          name="estimatedAmount"
          value={formData.estimatedAmount}
          onChange={handleChange}
        />

        <label>Deadline:</label>
        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
        />

        <label>Status:</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>

        <div className="form-buttons">
          <button type="submit" className="save-btn">Save Changes</button>
          <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditJobSheet;

