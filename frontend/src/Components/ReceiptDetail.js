import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PIED from 'file:///C:/Users/jules/Downloads/PIED DE PAGE.png';
import { Link } from 'react-router-dom';
import LOGO from 'file:///C:/Users/jules/Downloads/LOGO_CAT.png';
import { useParams } from 'react-router-dom';

const ReceiptDetails = () => {
  const [receiptData, setReceiptData] = useState(null);
  const { id } = useParams();
  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    const fetchReceiptById = async () => {
      try {
        // Fetch selected receipt by ID
        const response = await axios.get(`http://172.16.4.46:8000/api/receipt/${id}`);
        // const response = await axios.get(`http://localhost:8000/api/receipt/${id}`);

        setReceiptData(response.data.receipt);
      } catch (error) {
        console.error('Erreur lors de la récupération des données du reçu:', error);
      }
    };

    fetchReceiptById();
  }, [id]);

  if (!receiptData) {
    // Vous pouvez afficher un indicateur de chargement ici si nécessaire
    return <div>Chargement.......</div>;
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: '2-digit' };
    const formattedDate = new Date(dateString).toLocaleDateString('fr-FR', options);
    return formattedDate;
  };

  const formatAmount = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };
  return (
    <>
      <div className="py-5 w-100" style={{ position: 'relative', backgroundColor: '#284081' }}>
      </div>

        <div className="py-5" style={{ position: 'absolute', width: '45px', right: 20, left: 'auto',paddingRight: '20px', backgroundColor: '#7D5D27' }}>
          {/* Contenu de l'en-tête */}
        </div>

      <style>
        {`
          @media print {
            .bg-primary {
              background-color: #007BFF;
              height: 1px;
            }
            .btn-print {
              display: none;
            }
            .hidden-print {
              display: block !important;
            }
          }
        `}
      </style>

      <header className="d-flex justify-content-between align-items-center py-3">
        <div className="logo">
        <img
            src={LOGO}
            alt="Your Logo"
            style={{ maxWidth: '150px', marginRight: '25px' }}
          />
        </div>
      </header>
      <h1 className="text-center" style={{ textDecoration: 'underline' }}><strong>REÇU DE PAIEMENT</strong></h1>

      <div className="text-center py-3"style={{ margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
        <div className='d-flex justify-content-between'>
          <h4 className="text-left" style={{ fontStyle: 'italic' }}>
            Date : <strong style={{ textTransform: 'uppercase' }}> {formatDate(receiptData.date)} </strong>                                                                                                 
          </h4>
          <h4 className="text-right" style={{ fontStyle: 'italic' }}>
            CAT/FIN/ 2023-2024
          </h4>
          </div>
      </div>
        <br />
      <div className="content text-left" style={{ margin: '50', paddingLeft: '150px', paddingRight: '10px' }}>
        
        <p>NOM DE L’ETUDIANT : <strong style={{ textTransform: 'uppercase' }}> {receiptData.nomComplet} </strong></p>
        <p>
          SOMME REÇUE : <strong>{formatAmount(receiptData.amount)} FCFA</strong> 
        </p>

        <p>
        VIA : <strong style={{ textTransform: 'uppercase' }}> {receiptData.paymentType} </strong>
        {receiptData.paymentType === 'Chèque' && (
            <span> - <strong>{receiptData.chequeDetails}</strong></span>
        )}
    </p>
        <p>
          Numéro de Dossier : <strong style={{ textTransform: 'uppercase' }}> {receiptData.dossierNumber}  </strong>                                   
        </p>
        <p>
          NIVEAU : <strong>{receiptData.classe}</strong>
        </p>
        <p>
          TEL : <strong> {receiptData.phoneNumber} </strong>
        </p>
        <br/>
        <p>OBJET: <strong style={{ textTransform: 'uppercase' }}> {receiptData.paymentReason} </strong> </p>
      </div>
      <br />
      <br />
      <br />
      <button onClick={handlePrint} className="btn btn-primary btn-print">IMPRESSION</button>
      <div className="text-end">
      <Link to="/receipts" className="btn btn-primary btn-print">
        RETOUR
      </Link>
    </div>

      <div className="container py-3">
        <div className="d-flex justify-content-between">
          <div className="">
            <h5 style={{ textDecoration: 'underline' }} className="text-left">SIGNATURE DE L'ETUDIANT</h5>
          </div>
          <div className="">
            <h5 style={{ textDecoration: 'underline' }} className="text-right">SIGNATURE COMPTABILITÉ</h5>
          </div>
        </div>
      </div>
      <footer className="text-center py-3">
      <div className="hidden-print" style={{ display: 'none', position: 'absolute', bottom: '0', left: '0', right: '0', marginTop: '20px', textAlign: 'center',}}>
        <img
          src={PIED}
          alt="PIED DE PAGE"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>
      </footer>
    </>
  );
};

export default ReceiptDetails;
