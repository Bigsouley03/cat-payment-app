import React, { useState } from 'react';

const ReceiptForm = ({ onSave }) => {
  const [formData, setFormData] = useState({
    date: '',
    name: '',
    amount: '',
    paymentType: 'Espèce',
    dossierNumber: '',
    phoneNumber: '',
    paymentReason: '',
    classe: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveClick = () => {
    onSave(formData);
  };

  return (
    <>
    <div className="container mt-3" style={{
        maxWidth: '700px',
        margin: 'auto',
        marginTop: '10vh', // Adjusted to use viewport height (vh) unit
        paddingBottom: '20vh', // Added padding to ensure content fits within viewport height
        boxSizing: 'border-box', // Ensures padding is included in the total height
      }}>
      <h1 className="text-center">Générateur de Reçus de Paiement</h1>
      <form>
        <div className="form-group">
          <label htmlFor="date">Date du jour :</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Nom :</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Somme reçue :</label>
          <input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="paymentType">Type de paiement :</label>
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
        <div className="form-group">
          <label htmlFor="dossierNumber">Numéro de dossier :</label>
          <input
            type="text"
            name="dossierNumber"
            value={formData.dossierNumber}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="classe">Classe :</label>
          <select
            name="classe"
            value={formData.classe}
            onChange={handleInputChange}
            className="form-control"
          >
            <option value="">Sélectionnez la classe</option>
            <option value="LICENCE 1">LICENCE 1</option>
            <option value="LICENCE 2">LICENCE 2</option>
            <option value="LICENCE 3">LICENCE 3</option>
            <option value="MASTER 1">MASTER 1</option>
            <option value="MASTER 2">MASTER 2</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Numéro de téléphone :</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="paymentReason">Objet:</label>
          <input
            type="text"
            name="paymentReason"
            value={formData.paymentReason}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <br/>
        <div className="form-group">
        <button
          type="button"
          onClick={handleSaveClick}
          className="btn btn-primary"
        >
          GÉNÉRER
        </button>
        </div>
      </form>
    </div>
    <br/>
    </>
  );
};

export default ReceiptForm;
