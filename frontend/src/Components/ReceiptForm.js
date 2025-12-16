import React, { useState } from 'react';
import axios from 'axios';
import LOGO from 'file:///C:/Users/jules/Downloads/LOGO_CAT.png';
import { Link, useNavigate } from 'react-router-dom';


const ReceiptForm = ({ onSave }) => {
  const initialFormData = {
    date: '',
    nomComplet: '',
    amount: '',
    paymentType: 'Espèce',
    chequeDetails: '',
    dossierNumber: '',
    phoneNumber: '-',
    paymentReason: '',
    classe: '',
  };


  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const navigate = useNavigate();

  const handleSaveClick = async () => {
    try {
      // Send a POST request to your Laravel backend API endpoint
      const response = await axios.post('http://172.16.4.46:8000/api/storeReceipt', formData);
      // const response = await axios.post('http://localhost:8000/api/storeReceipt', formData);

      // Handle the response as needed
      console.log('Response from server:', response.data);



      // Réinitialiser les données du formulaire après avoir généré le reçu
      setFormData(initialFormData);
      // Redirect to receiptdetails page with the newly created receipt's ID
      navigate(`/receipt/${response.data.receipt.id}`);
    } catch (error) {
      // Handle errors
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <>
      <div
        className="container mt-3"
        style={{
          display: 'flex',
          flexDirection: 'column', // Set flex direction to column
          alignItems: 'center', // Center items horizontally
          maxWidth: '1000px',
          margin: 'auto',
          marginTop: '10vh',
          paddingBottom: '20vh',
          boxSizing: 'border-box',
        }}
      >
        <h1 className="text-center">Entrer les données de l'étudiant pour générer le reçu</h1>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row', // Set flex direction to row
            justifyContent: 'center', // Center items horizontally
            marginTop: '20px', // Add some space between heading and content
          }}
        >
          <div style={{ flex: 1, marginRight: '10px' }}>
            {/* Left side - Image */}
            <img
              src={LOGO}
              alt="Cat illustration representing a receipt or payment"
              style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
            />
          </div>

          <div style={{ flex: 1, paddingLeft: '20px' }}>
            {/* Right side - Form */}
            <form>
              <div className="form-group">
                <label htmlFor="date" style={{ fontWeight: 'bold' }}>Date du jour :</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="name" style={{ fontWeight: 'bold' }}>Prenom & Nom  :</label>
                <input
                  type="text"
                  name="nomComplet"
                  value={formData.nomComplet}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div className="form-group" style={{ marginRight: '10px' }}>
                  <label htmlFor="amount" style={{ fontWeight: 'bold' }}>Somme reçue :</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="paymentType" style={{ fontWeight: 'bold' }}>Type de paiement :</label>
                  <select
                    name="paymentType"
                    value={formData.paymentType}
                    onChange={handleInputChange}
                    className="form-control"
                  >
                    <option value="Espèce">Espèce</option>
                    <option value="Chèque">Chèque</option>
                    <option value="Virement">Virement</option>
                  </select>
                </div>
                {formData.paymentType === 'Chèque' && (
                  <div className="form-group">
                    <label htmlFor="chequeDetails" style={{ fontWeight: 'bold' }}>Détails du chèque :</label>
                    <input
                      type="text"
                      name="chequeDetails"
                      value={formData.chequeDetails}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                )}

              </div>
              <div className="form-group">
                <label htmlFor="dossierNumber" style={{ fontWeight: 'bold' }}>Numéro de dossier :</label>
                <input
                  type="text"
                  name="dossierNumber"
                  value={formData.dossierNumber}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="classe" style={{ fontWeight: 'bold' }}>Classe :</label>
                <select
                  name="classe"
                  value={formData.classe}
                  onChange={handleInputChange}
                  className="form-control"
                >
                  <option value="">Sélectionnez la classe</option>
                  <option value="L1">L1</option>
                  <option value="L2">L2</option>
                  <option value="L3">L3</option>
                  <option value="M1">M1</option>
                  <option value="M2">M2</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber" style={{ fontWeight: 'bold' }}>Numéro de téléphone :</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="paymentReason" style={{ fontWeight: 'bold' }}>Objet:</label>
                <input
                  type="text"
                  name="paymentReason"
                  value={formData.paymentReason}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <br />
              <div className="form-group">
                <button
                  type="button"
                  onClick={handleSaveClick}
                  className="btn btn-primary"
                >
                  GÉNÉRER
                </button>
              </div>
              <br/>
              <div className="form-group">
                <Link to="/receipts" className="btn btn-primary">
                  RETOUR
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReceiptForm;
