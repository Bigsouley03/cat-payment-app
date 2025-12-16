import React, { useState } from 'react';

const EditReceiptModal = ({ receiptData, onSave, onClose }) => {
  const [editedData, setEditedData] = useState({ ...receiptData });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    // Call the onSave function to update the receipt data
    onSave(editedData);
    // Close the modal
    onClose();
  };

  return (
    <div className="modal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modifier Reçu</h5>
            <button type="button" className="close" aria-label="Close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              {/* Include form fields for editing, e.g., */}
              <div className="form-group">
                <label htmlFor="formNomComplet">Nom Complet</label>
                <input
                  type="text"
                  className="form-control"
                  id="formNomComplet"
                  placeholder="Enter Nom Complet"
                  name="nomComplet"
                  value={editedData.nomComplet}
                  onChange={handleChange}
                />
              </div>

              {/* Add other form fields as needed */}
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditReceiptModal;
