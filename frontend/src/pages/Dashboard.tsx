import { useState, useEffect } from 'react';
import { Receipt } from '@/types/receipt';
import { api } from '@/services/api';
import AppLayout from '@/components/layout/AppLayout';
import StatsCards from '@/components/dashboard/StatsCards';
import ReceiptsTable from '@/components/dashboard/ReceiptsTable';
import { Alert } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { AlertCircle } from 'lucide-react';

// Demo data for frontend-only mode
const DEMO_RECEIPTS: Receipt[] = [
  {
    id: 1,
    nomComplet: 'Ahmed Benali',
    paymentType: 'cash',
    amount: 3500,
    dossierNumber: 'DOS-2024-001',
    date: '2024-01-15',
    classe: '1ère Année',
    phoneNumber: '+212 600 123 456',
    paymentReason: 'Frais de scolarité',
  },
  {
    id: 2,
    nomComplet: 'Fatima Zahra Alaoui',
    paymentType: 'cheque',
    chequeDetails: 'Chèque N° 1234567 - Banque Populaire',
    amount: 5000,
    dossierNumber: 'DOS-2024-002',
    date: '2024-01-18',
    classe: '2ème Année',
    phoneNumber: '+212 600 789 012',
    paymentReason: "Frais d'inscription",
  },
  {
    id: 3,
    nomComplet: 'Youssef El Amrani',
    paymentType: 'virement',
    amount: 2500,
    dossierNumber: 'DOS-2024-003',
    date: '2024-01-20',
    classe: '3ème Année',
    phoneNumber: '+212 600 345 678',
    paymentReason: 'Frais de transport',
  },
  {
    id: 4,
    nomComplet: 'Sara Benhaddou',
    paymentType: 'cash',
    amount: 4200,
    dossierNumber: 'DOS-2024-004',
    date: '2024-01-22',
    classe: '4ème Année',
    paymentReason: 'Frais de cantine',
  },
  {
    id: 5,
    nomComplet: 'Karim Tazi',
    paymentType: 'cheque',
    chequeDetails: 'Chèque N° 9876543 - BMCE',
    amount: 6000,
    dossierNumber: 'DOS-2024-005',
    date: '2024-02-01',
    classe: '5ème Année',
    phoneNumber: '+212 600 901 234',
    paymentReason: 'Frais de scolarité',
  },
  {
      id: 6,
    nomComplet: 'Ahmed Benali',
    paymentType: 'cash',
    amount: 3500,
    dossierNumber: 'DOS-2024-001',
    date: '2024-01-15',
    classe: '1ère Année',
    phoneNumber: '+212 600 123 456',
    paymentReason: 'Frais de scolarité',
  },
  {
    id: 7,
    nomComplet: 'Fatima Zahra Alaoui',
    paymentType: 'cheque',
    chequeDetails: 'Chèque N° 1234567 - Banque Populaire',
    amount: 5000,
    dossierNumber: 'DOS-2024-002',
    date: '2024-01-18',
    classe: '2ème Année',
    phoneNumber: '+212 600 789 012',
    paymentReason: "Frais d'inscription",
  },
  {
    id: 8,
    nomComplet: 'Youssef El Amrani',
    paymentType: 'virement',
    amount: 2500,
    dossierNumber: 'DOS-2024-003',
    date: '2024-01-20',
    classe: '3ème Année',
    phoneNumber: '+212 600 345 678',
    paymentReason: 'Frais de transport',
  },
  {
    id: 9,
    nomComplet: 'Sara Benhaddou',
    paymentType: 'cash',
    amount: 4200,
    dossierNumber: 'DOS-2024-004',
    date: '2024-01-22',
    classe: '4ème Année',
    paymentReason: 'Frais de cantine',
  },
  {
    id: 10,
    nomComplet: 'Karim Tazi',
    paymentType: 'cheque',
    chequeDetails: 'Chèque N° 9876543 - BMCE',
    amount: 6000,
    dossierNumber: 'DOS-2024-005',
    date: '2024-02-01',
    classe: '5ème Année',
    phoneNumber: '+212 600 901 234',
    paymentReason: 'Frais de scolarité',
  },
  {    id: 11,
    nomComplet: 'Ahmed Benali',
    paymentType: 'cash',
    amount: 3500,
    dossierNumber: 'DOS-2024-001',
    date: '2024-01-15',
    classe: '1ère Année',
    phoneNumber: '+212 600 123 456',
    paymentReason: 'Frais de scolarité',
  },
  {
    id: 12,
    nomComplet: 'Fatima Zahra Alaoui',
    paymentType: 'cheque',
    chequeDetails: 'Chèque N° 1234567 - Banque Populaire',
    amount: 5000,
    dossierNumber: 'DOS-2024-002',
    date: '2024-01-18',
    classe: '2ème Année',
    phoneNumber: '+212 600 789 012',
    paymentReason: "Frais d'inscription",
  },
  {
    id: 13,
    nomComplet: 'Youssef El Amrani',
    paymentType: 'virement',
    amount: 2500,
    dossierNumber: 'DOS-2024-003',
    date: '2024-01-20',
    classe: '3ème Année',
    phoneNumber: '+212 600 345 678',
    paymentReason: 'Frais de transport',
  },
  {
    id: 14,
    nomComplet: 'Sara Benhaddou',
    paymentType: 'cash',
    amount: 4200,
    dossierNumber: 'DOS-2024-004',
    date: '2024-01-22',
    classe: '4ème Année',
    paymentReason: 'Frais de cantine',
  },
  {
    id: 15,
    nomComplet: 'Karim Tazi',
    paymentType: 'cheque',
    chequeDetails: 'Chèque N° 9876543 - BMCE',
    amount: 6000,
    dossierNumber: 'DOS-2024-005',
    date: '2024-02-01',
    classe: '5ème Année',
    phoneNumber: '+212 600 901 234',
    paymentReason: 'Frais de scolarité',
  },
];

const Dashboard = () => {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isApiAvailable, setIsApiAvailable] = useState(true);

  const fetchReceipts = async () => {
    setIsLoading(true);
    try {
      const response = await api.getReceipts();
      setReceipts(response.receipts);
      setIsApiAvailable(true);
    } catch {
      // If API is not available, use demo data
      setReceipts(DEMO_RECEIPTS);
      setIsApiAvailable(false);
      notifications.show({
        title: 'Mode démo',
        message: 'API non disponible - Données de démonstration',
        color: 'orange',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReceipts();
  }, []);

  return (
    <AppLayout>
      <div className="space-y-6">
        {!isApiAvailable && (
          <Alert 
            icon={<AlertCircle size={16} />} 
            color="orange" 
            variant="light"
            title="Mode démonstration"
          >
            Connectez votre backend Laravel pour sauvegarder les données.
          </Alert>
        )}
        
        <StatsCards receipts={receipts} />
        <ReceiptsTable
          receipts={receipts}
          isLoading={isLoading}
          onRefresh={fetchReceipts}
        />
      </div>
    </AppLayout>
  );
};

export default Dashboard;
