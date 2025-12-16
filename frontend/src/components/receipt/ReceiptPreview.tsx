import { useRef } from 'react';
import { Receipt, PAYMENT_TYPES } from '@/types/receipt';
import { Modal, Button, Group, Text, Paper, Grid, Box, Divider } from '@mantine/core';
import { X, Printer } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ReceiptPreviewProps {
  receipt: Receipt;
  onClose: () => void;
}

const ReceiptPreview = ({ receipt, onClose }: ReceiptPreviewProps) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Reçu de Paiement</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              padding: 20mm;
              color: #1a1a2e;
            }
            .receipt {
              max-width: 210mm;
              margin: 0 auto;
              border: 2px solid #e0e0e0;
              border-radius: 8px;
              overflow: hidden;
            }
            .header {
              background: linear-gradient(135deg, #1565c0, #0d47a1);
              color: white;
              padding: 24px;
              text-align: center;
            }
            .header h1 { font-size: 24px; margin-bottom: 8px; }
            .header p { font-size: 14px; opacity: 0.9; }
            .receipt-number {
              background: #f5f5f5;
              padding: 12px 24px;
              text-align: right;
              font-size: 14px;
              border-bottom: 1px solid #e0e0e0;
            }
            .content { padding: 24px; }
            .info-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 16px;
              margin-bottom: 24px;
            }
            .info-item {
              padding: 12px;
              background: #fafafa;
              border-radius: 6px;
            }
            .info-item label {
              display: block;
              font-size: 11px;
              color: #666;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-bottom: 4px;
            }
            .info-item span {
              font-size: 15px;
              font-weight: 500;
            }
            .amount-box {
              background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
              padding: 20px;
              border-radius: 8px;
              text-align: center;
              margin: 24px 0;
            }
            .amount-box label {
              display: block;
              font-size: 12px;
              color: #2e7d32;
              margin-bottom: 8px;
            }
            .amount-box .amount {
              font-size: 32px;
              font-weight: 700;
              color: #1b5e20;
            }
            .footer {
              border-top: 1px solid #e0e0e0;
              padding: 16px 24px;
              display: flex;
              justify-content: space-between;
              font-size: 12px;
              color: #666;
            }
            .signature {
              margin-top: 40px;
              padding-top: 16px;
              border-top: 1px dashed #ccc;
              text-align: right;
            }
            .signature-line {
              width: 200px;
              border-bottom: 1px solid #333;
              margin-left: auto;
              margin-bottom: 8px;
              height: 40px;
            }
            @media print {
              body { padding: 0; }
              .receipt { border: none; }
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const paymentTypeLabel = PAYMENT_TYPES.find((t) => t.value === receipt.paymentType)?.label || receipt.paymentType;

  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), 'dd MMMM yyyy', { locale: fr });
    } catch {
      return dateStr;
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
    }).format(amount);
  };

  return (
    <Modal
      opened={true}
      onClose={onClose}
      size="lg"
      title={
        <Group>
          <Text fw={600}>Aperçu du Reçu</Text>
        </Group>
      }
      centered
      overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
    >
      <Group justify="flex-end" mb="md">
        <Button variant="outline" leftSection={<Printer size={16} />} onClick={handlePrint}>
          Imprimer
        </Button>
      </Group>

      <div ref={printRef}>
        <Paper withBorder radius="md" className="overflow-hidden">
          {/* Header */}
          <Box className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 text-center">
            <Text size="xl" fw={700} mb={4}>REÇU DE PAIEMENT</Text>
            <Text size="sm" opacity={0.9}>École Exemple - Établissement Scolaire</Text>
          </Box>

          {/* Receipt Number */}
          <Box className="bg-gray-100 px-6 py-3 text-right text-sm border-b border-gray-200">
            <Text span c="dimmed">N° Reçu: </Text>
            <Text span fw={600}>{receipt.id || 'NOUVEAU'}</Text>
            <Text span c="dimmed" mx="md">|</Text>
            <Text span c="dimmed">Date: </Text>
            <Text span fw={600}>{formatDate(receipt.date)}</Text>
          </Box>

          {/* Content */}
          <Box p="lg">
            <Grid gutter="md" mb="lg">
              <Grid.Col span={6}>
                <Paper p="sm" className="bg-gray-50 rounded-lg">
                  <Text size="xs" c="dimmed" tt="uppercase" mb={4}>Nom Complet</Text>
                  <Text fw={500}>{receipt.nomComplet}</Text>
                </Paper>
              </Grid.Col>
              <Grid.Col span={6}>
                <Paper p="sm" className="bg-gray-50 rounded-lg">
                  <Text size="xs" c="dimmed" tt="uppercase" mb={4}>N° Dossier</Text>
                  <Text fw={500}>{receipt.dossierNumber}</Text>
                </Paper>
              </Grid.Col>
              <Grid.Col span={6}>
                <Paper p="sm" className="bg-gray-50 rounded-lg">
                  <Text size="xs" c="dimmed" tt="uppercase" mb={4}>Classe</Text>
                  <Text fw={500}>{receipt.classe}</Text>
                </Paper>
              </Grid.Col>
              <Grid.Col span={6}>
                <Paper p="sm" className="bg-gray-50 rounded-lg">
                  <Text size="xs" c="dimmed" tt="uppercase" mb={4}>Téléphone</Text>
                  <Text fw={500}>{receipt.phoneNumber || '-'}</Text>
                </Paper>
              </Grid.Col>
              <Grid.Col span={6}>
                <Paper p="sm" className="bg-gray-50 rounded-lg">
                  <Text size="xs" c="dimmed" tt="uppercase" mb={4}>Mode de Paiement</Text>
                  <Text fw={500}>{paymentTypeLabel}</Text>
                </Paper>
              </Grid.Col>
              <Grid.Col span={6}>
                <Paper p="sm" className="bg-gray-50 rounded-lg">
                  <Text size="xs" c="dimmed" tt="uppercase" mb={4}>Motif</Text>
                  <Text fw={500}>{receipt.paymentReason}</Text>
                </Paper>
              </Grid.Col>
              {receipt.chequeDetails && (
                <Grid.Col span={12}>
                  <Paper p="sm" className="bg-gray-50 rounded-lg">
                    <Text size="xs" c="dimmed" tt="uppercase" mb={4}>Détails du Chèque</Text>
                    <Text fw={500}>{receipt.chequeDetails}</Text>
                  </Paper>
                </Grid.Col>
              )}
            </Grid>

            {/* Amount */}
            <Paper p="lg" radius="md" className="bg-green-50 border border-green-200 text-center">
              <Text size="xs" c="green" tt="uppercase" mb="xs">Montant Payé</Text>
              <Text size="xl" fw={700} c="green">
                {formatAmount(receipt.amount)}
              </Text>
            </Paper>

            {/* Signature */}
            <Box mt="xl" pt="md" className="border-t border-dashed border-gray-300 text-right">
              <Box className="w-48 ml-auto">
                <Box className="h-10 border-b border-gray-800 mb-2" />
                <Text size="sm" c="dimmed">Signature & Cachet</Text>
              </Box>
            </Box>
          </Box>

          {/* Footer */}
          <Divider />
          <Group justify="space-between" p="md" className="text-xs text-gray-500">
            <Text size="xs">Document généré le {format(new Date(), 'dd/MM/yyyy à HH:mm', { locale: fr })}</Text>
            <Text size="xs">RecuPro - Système de Gestion</Text>
          </Group>
        </Paper>
      </div>
    </Modal>
  );
};

export default ReceiptPreview;
