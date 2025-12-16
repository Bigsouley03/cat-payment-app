import { useState } from 'react';
import { useForm } from '@mantine/form';
import { Receipt, PAYMENT_TYPES, CLASSES, PAYMENT_REASONS } from '@/types/receipt';
import { 
  TextInput, 
  NumberInput, 
  Select, 
  Button, 
  Paper, 
  Title, 
  Grid, 
  Group,
  Stack
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { notifications } from '@mantine/notifications';
import { api } from '@/services/api';
import { Save, Eye, Loader2 } from 'lucide-react';
import ReceiptPreview from './ReceiptPreview';

interface ReceiptFormProps {
  onSuccess?: (receipt: Receipt) => void;
}

const ReceiptForm = ({ onSuccess }: ReceiptFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState<Receipt | null>(null);

  const form = useForm({
    initialValues: {
      nomComplet: '',
      dossierNumber: '',
      classe: '',
      phoneNumber: '',
      date: new Date(),
      amount: 0,
      paymentType: 'cash',
      chequeDetails: '',
      paymentReason: '',
    },
    validate: {
      nomComplet: (value) => (value.length < 2 ? 'Le nom doit contenir au moins 2 caractères' : null),
      dossierNumber: (value) => (!value ? 'Numéro de dossier requis' : null),
      classe: (value) => (!value ? 'Classe requise' : null),
      amount: (value) => (value <= 0 ? 'Le montant doit être positif' : null),
      paymentReason: (value) => (!value ? 'Motif de paiement requis' : null),
    },
  });

  const handlePreview = () => {
    const values = form.values;
    const data = {
      ...values,
      date: values.date instanceof Date ? values.date.toISOString().split('T')[0] : values.date,
    } as Receipt;
    setPreviewData(data);
    setShowPreview(true);
  };

  const handleSubmit = async (values: typeof form.values) => {
    setIsSubmitting(true);
    try {
      const submitData = {
        ...values,
        date: values.date instanceof Date ? values.date.toISOString().split('T')[0] : values.date,
      };
      const result = await api.createReceipt(submitData as Omit<Receipt, 'id'>);
      notifications.show({
        title: 'Succès',
        message: 'Reçu créé avec succès',
        color: 'green',
      });
      form.reset();
      onSuccess?.(result.receipt);
    } catch (error) {
      notifications.show({
        title: 'Erreur',
        message: error instanceof Error ? error.message : 'Erreur lors de la création',
        color: 'red',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Paper shadow="sm" radius="md" p="lg" withBorder className="bg-white">
        <Title order={3} mb="lg" className="text-gray-800 border-b border-gray-200 pb-4">
          Informations du Reçu
        </Title>
        
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="lg">
            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextInput
                  label="Nom Complet"
                  placeholder="Entrez le nom complet"
                  required
                  {...form.getInputProps('nomComplet')}
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextInput
                  label="Numéro de Dossier"
                  placeholder="Ex: DOS-2024-001"
                  required
                  {...form.getInputProps('dossierNumber')}
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <Select
                  label="Classe"
                  placeholder="Sélectionner une classe"
                  required
                  data={CLASSES.map((c) => ({ value: c, label: c }))}
                  {...form.getInputProps('classe')}
                  searchable
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextInput
                  label="Téléphone"
                  placeholder="Ex: +212 600 000 000"
                  {...form.getInputProps('phoneNumber')}
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <DateInput
                  label="Date"
                  placeholder="Sélectionner la date"
                  required
                  valueFormat="DD/MM/YYYY"
                  {...form.getInputProps('date')}
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <NumberInput
                  label="Montant (DH)"
                  placeholder="0.00"
                  required
                  min={0}
                  decimalScale={2}
                  thousandSeparator=" "
                  {...form.getInputProps('amount')}
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <Select
                  label="Type de Paiement"
                  required
                  data={PAYMENT_TYPES.map((t) => ({ value: t.value, label: t.label }))}
                  {...form.getInputProps('paymentType')}
                />
              </Grid.Col>

              {form.values.paymentType === 'cheque' && (
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <TextInput
                    label="Détails du Chèque"
                    placeholder="Numéro de chèque, banque..."
                    {...form.getInputProps('chequeDetails')}
                  />
                </Grid.Col>
              )}

              <Grid.Col span={12}>
                <Select
                  label="Motif de Paiement"
                  placeholder="Sélectionner le motif"
                  required
                  data={PAYMENT_REASONS.map((r) => ({ value: r, label: r }))}
                  {...form.getInputProps('paymentReason')}
                  searchable
                />
              </Grid.Col>
            </Grid>

            <Group justify="flex-end" pt="md" className="border-t border-gray-200">
              <Button
                variant="outline"
                onClick={handlePreview}
                leftSection={<Eye size={16} />}
              >
                Aperçu
              </Button>
              <Button
                type="submit"
                loading={isSubmitting}
                leftSection={isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              >
                Enregistrer le Reçu
              </Button>
            </Group>
          </Stack>
        </form>
      </Paper>

      {showPreview && previewData && (
        <ReceiptPreview
          receipt={previewData}
          onClose={() => setShowPreview(false)}
        />
      )}
    </>
  );
};

export default ReceiptForm;
