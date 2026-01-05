import { Receipt } from '@/types/receipt';
import { Paper, Text, Group, SimpleGrid, ThemeIcon } from '@mantine/core';
import { FileText, DollarSign, Users, TrendingUp } from 'lucide-react';

interface StatsCardsProps {
  receipts: Receipt[];
}

const StatsCards = ({ receipts }: StatsCardsProps) => {
  const totalReceipts = receipts.length;
  const totalAmount = receipts.reduce((sum, r) => sum + Number(r.amount || 0), 0);
  const uniqueStudents = new Set(receipts.map((r) => r.nomComplet)).size;
  
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const thisMonthReceipts = receipts.filter((r) => {
    const receiptDate = new Date(r.date);
    return receiptDate.getMonth() === currentMonth && receiptDate.getFullYear() === currentYear;
  });
  const thisMonthAmount = thisMonthReceipts.reduce((sum, r) => sum + r.amount, 0);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const stats = [
    {
      title: 'Total Reçus',
      value: totalReceipts.toString(),
      icon: FileText,
      color: 'blue',
    },
    {
      title: 'Montant Total',
      value: formatAmount(totalAmount),
      icon: DollarSign,
      color: 'green',
    },
    {
      title: 'Étudiants',
      value: uniqueStudents.toString(),
      icon: Users,
      color: 'cyan',
    },
    {
      title: 'Ce Mois',
      value: formatAmount(thisMonthAmount),
      icon: TrendingUp,
      color: 'orange',
    },
  ];

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md" mb="lg">
      {stats.map((stat, index) => (
        <Paper
          key={stat.title}
          shadow="sm"
          radius="md"
          p="lg"
          withBorder
          className="bg-white hover:shadow-md transition-shadow"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <Group justify="space-between" align="flex-start">
            <div>
              <Text size="sm" c="dimmed" fw={500} mb={4}>
                {stat.title}
              </Text>
              <Text size="xl" fw={700}>
                {stat.value}
              </Text>
            </div>
            <ThemeIcon
              size="xl"
              radius="md"
              variant="light"
              color={stat.color}
            >
              <stat.icon size={20} />
            </ThemeIcon>
          </Group>
        </Paper>
      ))}
    </SimpleGrid>
  );
};

export default StatsCards;
