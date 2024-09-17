import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore"; // Added deleteDoc
import { db } from "./firebase";
import { Link } from "react-router-dom";
import EditJobSheet from "./EditJobSheet";
import "./HomePage.css"; // Import the custom CSS for styling

const HomePage = () => {
  const [jobsheets, setJobsheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editJobSheet, setEditJobSheet] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Added searchTerm state

  useEffect(() => {
    const fetchJobsheets = async () => {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "jobsheets"));
      setJobsheets(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    };

    fetchJobsheets();
  }, []);

  const handleUpdateJobSheet = async (updatedJobSheet) => {
    const jobRef = doc(db, "jobsheets", updatedJobSheet.id);
    await updateDoc(jobRef, updatedJobSheet);
    setJobsheets((prevJobsheets) =>
      prevJobsheets.map((job) => (job.id === updatedJobSheet.id ? updatedJobSheet : job))
    );
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job sheet?");
    if (confirmDelete) {
      await deleteDoc(doc(db, "jobsheets", id));
      setJobsheets(jobsheets.filter((sheet) => sheet.id !== id));
    }
  };

  const filteredJobsheets = jobsheets.filter((sheet) =>
    sheet.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sheet.clientId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <header>
        <h1>HARDIK TRADERS - CLIENT MANAGEMENT DASHBOARD</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by Client Name or ID..."
            value={searchTerm} // Binds searchTerm to input field
            onChange={(e) => setSearchTerm(e.target.value)} // Updates searchTerm on change
          />
          <button>Search</button>
        </div>
      </header>

      <Link to="/new-jobsheet">
        <button className="add-btn">New Job Sheet</button>
      </Link>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Client Id</th>
                <th>Client Name</th>
                <th>Contact Info</th>
                <th>Received Date</th>
                <th>Inventory Received</th>
                <th>Reported Issues</th>
                <th>Client Notes</th>
                <th>Assigned Technician</th>
                <th>Estimated Amount</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobsheets.map((sheet, index) => (
                <tr key={sheet.id}>
                  <td>{index + 1}</td>
                  <td>{sheet.clientId}</td>
                  <td>{sheet.clientName}</td>
                  <td>{sheet.contactInfo}</td>
                  <td>{sheet.receivedDate}</td>
                  <td>{sheet.inventoryReceived}</td>
                  <td>{sheet.reportedIssues}</td>
                  <td>{sheet.clientNotes}</td>
                  <td>{sheet.assignedTechnician}</td>
                  <td>{sheet.estimatedAmount}</td>
                  <td>{sheet.deadline}</td>
                  <td>{sheet.status}</td>
                  <td>
                    <Link to={`/view/${sheet.id}`} className="view-btn">
                      View
                    </Link>
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setEditJobSheet(sheet);
                        setShowModal(true);
                      }}
                    >
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(sheet.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showModal && (
            <div className="modal">
              <div className="modal-content">
                <EditJobSheet
                  job={editJobSheet}
                  onClose={() => setShowModal(false)}
                  onSave={handleUpdateJobSheet}
                />
              </div>
            </div>
          )}
        </>
      )}

      <footer>
        <p>© 2024 Hardik Traders</p>
      </footer>
    </div>
  );
};

export default HomePage;
