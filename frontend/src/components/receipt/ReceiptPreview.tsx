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
    
  // Copie tous les <style> et <link rel="stylesheet">
  const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
    .map((node) => node.outerHTML)
    .join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Reçu de Paiement</title> 
          ${styles}       
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
          <Box className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-6 text-center">
            <Text size="xl" fw={700} mb={4}>REÇU DE PAIEMENT</Text>
            <Text size="sm" opacity={0.9}>École Exemple - Établissement Scolaire</Text>
          </Box>

          {/* Receipt Number */}
          <Box className="bg-gray-100 px-6 py-3 text-right text-sm border-b border-gray-200">
            {/* <Text span c="dimmed">N° Reçu: </Text>
            <Text span fw={600}>{receipt.id || 'NOUVEAU'}</Text>
            <Text span c="dimmed" mx="md">|</Text> */}
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
            <Text size="xs">CAT - Système de Gestion</Text>
          </Group>
        </Paper>
      </div>
    </Modal>
  );
};

export default ReceiptPreview;
