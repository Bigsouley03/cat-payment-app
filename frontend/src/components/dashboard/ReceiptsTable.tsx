import { useState } from 'react';
import { Receipt, PAYMENT_TYPES, ReceiptFilters, CLASSES } from '@/types/receipt';
import { 
  Paper, 
  Title, 
  TextInput, 
  Select, 
  Table, 
  Badge, 
  ActionIcon, 
  Group, 
  Text,
  Button,
  Collapse,
  Box,
  Stack,
  Grid,
  Loader
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { Eye, Trash2, Search, Filter, X } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import ReceiptPreview from '../receipt/ReceiptPreview';
import { api } from '@/services/api';

interface ReceiptsTableProps {
  receipts: Receipt[];
  isLoading: boolean;
  onRefresh: () => void;
}

const ReceiptsTable = ({ receipts, isLoading, onRefresh }: ReceiptsTableProps) => {
  const [filters, setFilters] = useState<ReceiptFilters>({
    search: '',
    paymentType: '',
    classe: '',
    dateFrom: '',
    dateTo: '',
  });
  const [showFilters, { toggle: toggleFilters }] = useDisclosure(false);
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleFilterChange = (key: keyof ReceiptFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      paymentType: '',
      classe: '',
      dateFrom: '',
      dateTo: '',
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce reçu ?')) return;
    
    setDeletingId(id);
    try {
      await api.deleteReceipt(id);
      notifications.show({
        title: 'Succès',
        message: 'Reçu supprimé avec succès',
        color: 'green',
      });
      onRefresh();
    } catch (error) {
      notifications.show({
        title: 'Erreur',
        message: 'Erreur lors de la suppression',
        color: 'red',
      });
    } finally {
      setDeletingId(null);
    }
  };

  const filteredReceipts = receipts.filter((receipt) => {
    const matchesSearch =
      !filters.search ||
      receipt.nomComplet.toLowerCase().includes(filters.search.toLowerCase()) ||
      receipt.dossierNumber.toLowerCase().includes(filters.search.toLowerCase());

    const matchesPaymentType = !filters.paymentType || receipt.paymentType === filters.paymentType;
    const matchesClasse = !filters.classe || receipt.classe === filters.classe;

    const receiptDate = new Date(receipt.date);
    const matchesDateFrom = !filters.dateFrom || receiptDate >= new Date(filters.dateFrom);
    const matchesDateTo = !filters.dateTo || receiptDate <= new Date(filters.dateTo);

    return matchesSearch && matchesPaymentType && matchesClasse && matchesDateFrom && matchesDateTo;
  });

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
    }).format(amount);
  };

  const getPaymentTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      cash: 'green',
      cheque: 'blue',
      virement: 'orange',
    };
    const label = PAYMENT_TYPES.find((t) => t.value === type)?.label || type;
    return <Badge color={colors[type] || 'gray'} variant="light">{label}</Badge>;
  };

  const hasActiveFilters = Object.values(filters).some((v) => v !== '');

  return (
    <>
      <Paper shadow="sm" radius="md" withBorder className="bg-white">
        <Box p="lg" className="border-b border-gray-200">
          <Group justify="space-between" wrap="wrap" gap="md">
            <Title order={4} className="text-gray-800">Historique des Reçus</Title>
            <Group gap="sm">
              <TextInput
                placeholder="Rechercher..."
                leftSection={<Search size={16} />}
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-64"
              />
              <ActionIcon 
                variant={showFilters ? 'filled' : 'light'} 
                size="lg"
                onClick={toggleFilters}
              >
                <Filter size={16} />
              </ActionIcon>
              {hasActiveFilters && (
                <Button variant="subtle" size="sm" leftSection={<X size={14} />} onClick={clearFilters}>
                  Effacer
                </Button>
              )}
            </Group>
          </Group>

          <Collapse in={showFilters}>
            <Grid mt="md" gutter="md">
              <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
                <Select
                  placeholder="Type de paiement"
                  data={[
                    { value: '', label: 'Tous' },
                    ...PAYMENT_TYPES.map((t) => ({ value: t.value, label: t.label })),
                  ]}
                  value={filters.paymentType}
                  onChange={(value) => handleFilterChange('paymentType', value || '')}
                  clearable
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
                <Select
                  placeholder="Classe"
                  data={[
                    { value: '', label: 'Toutes' },
                    ...CLASSES.map((c) => ({ value: c, label: c })),
                  ]}
                  value={filters.classe}
                  onChange={(value) => handleFilterChange('classe', value || '')}
                  clearable
                  searchable
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
                <TextInput
                  type="date"
                  placeholder="Date début"
                  value={filters.dateFrom}
                  onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
                <TextInput
                  type="date"
                  placeholder="Date fin"
                  value={filters.dateTo}
                  onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                />
              </Grid.Col>
            </Grid>
          </Collapse>
        </Box>

        <Table.ScrollContainer minWidth={800}>
          <Table striped highlightOnHover>
            <Table.Thead className="bg-gray-50">
              <Table.Tr>
                <Table.Th>N°</Table.Th>
                <Table.Th>Nom Complet</Table.Th>
                <Table.Th>Dossier</Table.Th>
                <Table.Th>Classe</Table.Th>
                <Table.Th>Date</Table.Th>
                <Table.Th>Type</Table.Th>
                <Table.Th ta="right">Montant</Table.Th>
                <Table.Th ta="center">Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {isLoading ? (
                <Table.Tr>
                  <Table.Td colSpan={8}>
                    <Group justify="center" py="xl">
                      <Loader size="sm" />
                      <Text c="dimmed">Chargement...</Text>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ) : filteredReceipts.length === 0 ? (
                <Table.Tr>
                  <Table.Td colSpan={8}>
                    <Text ta="center" py="xl" c="dimmed">
                      Aucun reçu trouvé
                    </Text>
                  </Table.Td>
                </Table.Tr>
              ) : (
                filteredReceipts.map((receipt) => (
                  <Table.Tr key={receipt.id}>
                    <Table.Td>
                      <Text fw={500}>#{receipt.id}</Text>
                    </Table.Td>
                    <Table.Td>{receipt.nomComplet}</Table.Td>
                    <Table.Td>
                      <Text ff="monospace" size="sm">{receipt.dossierNumber}</Text>
                    </Table.Td>
                    <Table.Td>{receipt.classe}</Table.Td>
                    <Table.Td>
                      {format(new Date(receipt.date), 'dd/MM/yyyy', { locale: fr })}
                    </Table.Td>
                    <Table.Td>{getPaymentTypeBadge(receipt.paymentType)}</Table.Td>
                    <Table.Td ta="right">
                      <Text fw={600} c="green">{formatAmount(receipt.amount)}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Group justify="center" gap="xs">
                        <ActionIcon
                          variant="light"
                          color="blue"
                          onClick={() => setSelectedReceipt(receipt)}
                          title="Voir / Imprimer"
                        >
                          <Eye size={16} />
                        </ActionIcon>
                        <ActionIcon
                          variant="light"
                          color="red"
                          onClick={() => receipt.id && handleDelete(receipt.id)}
                          loading={deletingId === receipt.id}
                          title="Supprimer"
                        >
                          <Trash2 size={16} />
                        </ActionIcon>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))
              )}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>

        {filteredReceipts.length > 0 && (
          <Box p="md" className="border-t border-gray-200 bg-gray-50">
            <Group justify="space-between">
              <Text size="sm" c="dimmed">
                {filteredReceipts.length} reçu(s) affiché(s)
              </Text>
              <Group gap="xs">
                <Text size="sm" c="dimmed">Total:</Text>
                <Text size="lg" fw={700} c="green">
                  {formatAmount(filteredReceipts.reduce((sum, r) => sum + r.amount, 0))}
                </Text>
              </Group>
            </Group>
          </Box>
        )}
      </Paper>

      {selectedReceipt && (
        <ReceiptPreview
          receipt={selectedReceipt}
          onClose={() => setSelectedReceipt(null)}
        />
      )}
    </>
  );
};

export default ReceiptsTable;
