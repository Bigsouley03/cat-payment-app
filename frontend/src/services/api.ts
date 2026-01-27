import { Receipt } from '@/types/receipt';

const API_BASE_URL = 'http://172.16.4.23:8000/api';

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Une erreur est survenue' }));
      throw new Error(error.message || 'Une erreur est survenue');
    }

    return response.json();
  }

  async getReceipts(): Promise<{ receipts: Receipt[] }> {
    return this.request<{ receipts: Receipt[] }>('/receipts');
  }

  async getReceiptById(id: number): Promise<{ receipt: Receipt }> {
    return this.request<{ receipt: Receipt }>(`/receipt/${id}`);
  }

  async createReceipt(data: Omit<Receipt, 'id'>): Promise<{ receipt: Receipt }> {
    return this.request<{ receipt: Receipt }>('/storeReceipt', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateReceipt(id: number, data: Partial<Receipt>): Promise<{ receipt: Receipt }> {
    return this.request<{ receipt: Receipt }>(`/edit/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteReceipt(id: number): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/delete/${id}`, {
      method: 'DELETE',
    });
  }
}

export const api = new ApiService();
