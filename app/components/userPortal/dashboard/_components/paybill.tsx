'use client';

import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '~/components/ui/dialog';
import { Field, FieldLabel } from '~/components/ui/field';
import { ProcessingModal } from './processing-modal';
import {  usePaybill } from '../context/paybillContext';

export function Paybill() {
  const {
    showFormModalPaybill,
    setShowFormModalPaybill,
    showProcessingModal,
    transactionStatus,
    startTransaction,
    cancelTransaction,
  } = usePaybill();

  const [paybillNumber, setPaybillNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // ---------------- VALIDATION ----------------
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!paybillNumber.trim()) {
      newErrors.paybillNumber = 'Paybill number is required';
    }

    if (!accountNumber.trim()) {
      newErrors.accountNumber = 'Account number is required';
    }

    if (!amount.trim()) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(Number(amount)) || Number(amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------------- ACTIONS ----------------
  const handlePayBill = () => {
    if (!validateForm()) return;

    startTransaction({
      paybillNumber,
      accountNumber,
      amount,
    });
  };

  const resetForm = () => {
    setPaybillNumber('');
    setAccountNumber('');
    setAmount('');
    setErrors({});
  };

  const handleCancelTransaction = () => {
    cancelTransaction();
    resetForm();
  };

  const handleCloseModal = () => {
    cancelTransaction();
    resetForm();
  };

  const handleCancelForm = () => {
    setShowFormModalPaybill(false);
    resetForm();
  };

  return (
    <>
      {/* ---------------- FORM MODAL ---------------- */}
      <Dialog open={showFormModalPaybill} onOpenChange={setShowFormModalPaybill}>
        <DialogContent className="sm:max-w-[400px] max-w-[90vw]">
          <DialogHeader>
            <DialogTitle>Pay Bill</DialogTitle>
            <DialogDescription>
              Enter the paybill number, account number, and amount to pay.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Field>
              <FieldLabel htmlFor="paybill-number">Paybill Number</FieldLabel>
              <Input
                id="paybill-number"
                placeholder="Enter paybill number"
                value={paybillNumber}
                onChange={(e) => {
                  setPaybillNumber(e.target.value);
                  if (errors.paybillNumber) {
                    setErrors({ ...errors, paybillNumber: '' });
                  }
                }}
                className={errors.paybillNumber ? 'border-red-500' : ''}
              />
              {errors.paybillNumber && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.paybillNumber}
                </p>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="account-number">Account Number</FieldLabel>
              <Input
                id="account-number"
                placeholder="Enter account number"
                value={accountNumber}
                onChange={(e) => {
                  setAccountNumber(e.target.value);
                  if (errors.accountNumber) {
                    setErrors({ ...errors, accountNumber: '' });
                  }
                }}
                className={errors.accountNumber ? 'border-red-500' : ''}
              />
              {errors.accountNumber && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.accountNumber}
                </p>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="amount">Amount (KES)</FieldLabel>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  if (errors.amount) {
                    setErrors({ ...errors, amount: '' });
                  }
                }}
                className={errors.amount ? 'border-red-500' : ''}
              />
              {errors.amount && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.amount}
                </p>
              )}
            </Field>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={handleCancelForm}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button onClick={handlePayBill} className="flex-1">
              Pay Bill
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ---------------- PROCESSING MODAL ---------------- */}
      <ProcessingModal
        isOpen={showProcessingModal}
        onClose={handleCloseModal}
        status={transactionStatus}
        title="Pay Bill Transaction"
        description="Your payment is being processed. Please wait for confirmation."
        amount={amount}
        paybillNumber={paybillNumber}
        onCancelTransaction={handleCancelTransaction}
      />
    </>
  );
}