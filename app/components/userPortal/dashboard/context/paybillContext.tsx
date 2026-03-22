'use client';

import { createContext, useContext, useState, useEffect } from 'react';

export type TransactionStatus = 'idle' | 'pending' | 'success' | 'failed';

interface PaybillContextType {
  showFormModalPaybill: boolean;
  setShowFormModalPaybill: (v: boolean) => void;

  showProcessingModal: boolean;
  setShowProcessingModal: (v: boolean) => void;

  transactionStatus: TransactionStatus;
  setTransactionStatus: (v: TransactionStatus) => void;

  startTransaction: (data: {
    paybillNumber: string;
    accountNumber: string;
    amount: string;
  }) => void;

  cancelTransaction: () => void;
}

const PaybillContext = createContext<PaybillContextType | null>(null);

export function PaybillProvider({ children }: { children: React.ReactNode }) {
  const [showFormModalPaybill, setShowFormModalPaybill] = useState(false);
  const [showProcessingModal, setShowProcessingModal] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>('idle');

  // Simulated processing (replace with real API later)
  useEffect(() => {
    if (transactionStatus !== 'pending') return;

    const timer = setTimeout(() => {
      const success = Math.random() < 0.75;
      setTransactionStatus(success ? 'success' : 'failed');
    }, 5000);

    return () => clearTimeout(timer);
  }, [transactionStatus]);

  const startTransaction = () => {
    setShowFormModalPaybill(false);
    setShowProcessingModal(true);
    setTransactionStatus('pending');
  };

  const cancelTransaction = () => {
    setTransactionStatus('idle');
    setShowProcessingModal(false);
  };

  return (
    <PaybillContext.Provider
      value={{
        showFormModalPaybill,
        setShowFormModalPaybill,
        showProcessingModal,
        setShowProcessingModal,
        transactionStatus,
        setTransactionStatus,
        startTransaction,
        cancelTransaction,
      }}
    >
      {children}
    </PaybillContext.Provider>
  );
}

export function usePaybill() {
  const context = useContext(PaybillContext);
  if (!context) {
    throw new Error('usePaybill must be used inside PaybillProvider');
  }
  return context;
}