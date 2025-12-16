import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import ReceiptForm from '@/components/receipt/ReceiptForm';
import { Receipt } from '@/types/receipt';

const NewReceipt = () => {
  const navigate = useNavigate();

  const handleSuccess = (receipt: Receipt) => {
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto">
        <ReceiptForm onSuccess={handleSuccess} />
      </div>
    </AppLayout>
  );
};

export default NewReceipt;
