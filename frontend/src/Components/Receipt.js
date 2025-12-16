import React from 'react';
import PIED from 'file:///C:/Users/jules/Downloads/PIED DE PAGE.png';
import LOGO from 'file:///C:/Users/jules/Downloads/LOGO_CAT.png';
import { Link } from 'react-router-dom';

const Receipt = ({ data }) => {
  const {
    date,
    nomComplet,
    amount,
    chequeDetails,
    paymentType,
    dossierNumber,
    phoneNumber,
    paymentReason,
    classe,
  } = data;

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: '2-digit' };
    const formattedDate = new Date(dateString).toLocaleDateString('fr-FR', options);
    return formattedDate;
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
            Date : <strong style={{ textTransform: 'uppercase' }}> {formatDate(date)} </strong>                                                                                                 
          </h4>
          <h4 className="text-right" style={{ fontStyle: 'italic' }}>
            CAT/FIN/ 2023-2024
          </h4>
          </div>
      </div>
        <br />
      <div className="content text-left" style={{ margin: '50', paddingLeft: '150px', paddingRight: '10px' }}>
        
        <p>NOM DE L’ETUDIANT : <strong style={{ textTransform: 'uppercase' }}> {nomComplet} </strong></p>
        <p>
          SOMME REÇUE : <strong>{amount} FCFA</strong> 
        </p>
        <p>
         VIA : <strong style={{ textTransform: 'uppercase' }}> {paymentType} </strong>
         {paymentType === 'Chèque' && (
            <span> - Détails du chèque: <strong>{chequeDetails}</strong></span>
        )}
        </p>
        <p>
          Numéro de Dossier : <strong style={{ textTransform: 'uppercase' }}> {dossierNumber}  </strong>                                   
        </p>
        <p>
          NIVEAU : <strong style={{ textTransform: 'uppercase' }}>{classe}</strong>
        </p>
        <p>
          TEL : <strong> {phoneNumber} </strong>
        </p>
        <br/>
        <p>OBJET: <strong> {paymentReason} </strong> </p>
      </div>
      <br />
      <br />
      <br />
      <button onClick={handlePrint} className="btn btn-primary btn-print">IMPRESSION</button>
      <div className="text-end btn-print">
      <Link to="/receipts" className="btn btn-primary">
        HISTORIQUE
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

export default Receipt;
