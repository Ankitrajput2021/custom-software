import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from './firebase';
import { useParams } from 'react-router-dom';
import "./ViewPage.css"; // Import the CSS for styling

const ViewPage = () => {
  const { id } = useParams();  // Get the job sheet ID from the URL
  const [jobsheet, setJobsheet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobsheet = async () => {
      try {
        console.log("Fetching job sheet with ID:", id); // Log the ID to verify it's correct
        const docRef = doc(db, "jobsheets", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data()); // Log the data to verify
          setJobsheet(docSnap.data());
        } else {
          setError("Job sheet not found.");
          console.log("No document found with the given ID."); // Log if document doesn't exist
        }
      } catch (error) {
        setError("Error fetching job sheet: " + error.message);
        console.error("Error fetching job sheet:", error); // Log any errors
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJobsheet();
    } else {
      setError("Invalid Job Sheet ID.");
      setLoading(false);
    }
  }, [id]);

  const handlePrint = () => {
    window.print();  // Triggers the browser's print functionality
  };

  return (
    <div className="viewpage-container">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
          <h1>Job Sheet Details</h1>
          <div className="jobsheet-details">
            <p><strong>Client ID:</strong> {jobsheet.clientId || "N/A"}</p>
            <p><strong>Client Name:</strong> {jobsheet.clientName}</p>
            <p><strong>Contact Info:</strong> {jobsheet.contactInfo}</p>
            <p><strong>Received Date:</strong> {jobsheet.receivedDate}</p>
            <p><strong>Inventory Received:</strong> {jobsheet.inventoryReceived}</p>
            <p><strong>Reported Issues:</strong> {jobsheet.reportedIssues}</p>
            <p><strong>Client Notes:</strong> {jobsheet.clientNotes}</p>
            <p><strong>Assigned Technician:</strong> {jobsheet.assignedTechnician}</p>
            <p><strong>Estimated Amount:</strong> {jobsheet.estimatedAmount}</p>
            <p><strong>Deadline:</strong> {jobsheet.deadline}</p>
            <p><strong>Status:</strong> {jobsheet.status}</p>
          </div>

          <button onClick={handlePrint} className="print-btn">Print Job Sheet</button>
        </>
      )}
    </div>
  );
};

export default ViewPage;
