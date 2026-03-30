'use client';

import { createContext, useContext, useState, useEffect } from 'react';

export type TransactionStatus = 'idle' | 'pending' | 'success' | 'failed';

interface SendMoneyContextType {
  showSendFormModal: boolean;
  setShowSendFormModal: (v: boolean) => void;

  showProcessingModal: boolean;
  setShowProcessingModal: (v: boolean) => void;

  transactionStatus: TransactionStatus;
  setTransactionStatus: (v: TransactionStatus) => void;

  startTransaction: (data: {
    accountNumber: string;
    amount: string;
  }) => void;

  cancelTransaction: () => void;
}

const SendMoneyContext = createContext<SendMoneyContextType | null>(null);

export function SendMoneyProvider({ children }: { children: React.ReactNode }) {
  const [showSendFormModal, setShowSendFormModal] = useState(false);
  const [showProcessingModal, setShowProcessingModal] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>('idle');

  // Simulated processing (replace later with real backend)
  useEffect(() => {
    if (transactionStatus !== 'pending') return;

    const timer = setTimeout(() => {
      const success = Math.random() < 0.75;
      setTransactionStatus(success ? 'success' : 'failed');
    }, 5000);

    return () => clearTimeout(timer);
  }, [transactionStatus]);

  const startTransaction = () => {
    setShowSendFormModal(false);
    setShowProcessingModal(true);
    setTransactionStatus('pending');
  };

  const cancelTransaction = () => {
    setTransactionStatus('idle');
    setShowProcessingModal(false);
  };

  return (
    <SendMoneyContext.Provider
      value={{
        showSendFormModal,
        setShowSendFormModal,
        showProcessingModal,
        setShowProcessingModal,
        transactionStatus,
        setTransactionStatus,
        startTransaction,
        cancelTransaction,
      }}
    >
      {children}
    </SendMoneyContext.Provider>
  );
}

export function useSendMoney() {
  const context = useContext(SendMoneyContext);
  if (!context) {
    throw new Error('useSendMoney must be used inside SendMoneyProvider');
  }
  return context;
}