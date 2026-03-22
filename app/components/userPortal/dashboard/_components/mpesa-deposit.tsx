'use client';

import { useEffect, useState } from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { Label } from '~/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '~/components/ui/dialog';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { useDeposit } from '../context/depositContext';
import { Card } from '~/components/ui/card';

type TransactionStatus = 'idle' | 'pending' | 'success' | 'failed';

const PAYMENT_METHODS = [
  { id: 'mpesa', name: 'MPesa', enabled: true },
  { id: 'paypal', name: 'PayPal', enabled: false },
  { id: 'stripe', name: 'Stripe', enabled: false },
  { id: 'more', name: 'More', enabled: false },
];

export function DepositUI() {
  const {
    showDepositModal,
    setShowDepositModal,
    showMpesaProcessing,
    setShowMpesaProcessing,
    amount,
    setAmount,
    transactionStatus,
    setTransactionStatus,
  } = useDeposit();

  const [selectedMethod, setSelectedMethod] = useState('mpesa');
  const [error, setError] = useState('');

  // Simulate transaction (replace with real API later)
  useEffect(() => {
    if (transactionStatus !== 'pending') return;

    const timer = setTimeout(() => {
      const success = Math.random() < 0.75;
      setTransactionStatus(success ? 'success' : 'failed');
    }, 5000);

    return () => clearTimeout(timer);
  }, [transactionStatus, setTransactionStatus]);

  // --- VALIDATION ---
  const validateAmount = () => {
    const value = Number(amount);

    if (!amount || isNaN(value) || value <= 0) {
      setError('Enter a valid amount');
      return false;
    }

    if (value < 1) {
      setError('Minimum deposit is 1 KES');
      return false;
    }

    setError('');
    return true;
  };

  // --- ACTIONS ---
  const handleDeposit = () => {
    if (!validateAmount()) return;

    if (selectedMethod !== 'mpesa') {
      setError('Only MPesa is currently supported');
      return;
    }

    setShowDepositModal(false);
    setShowMpesaProcessing(true);
    setTransactionStatus('pending');
  };

  const resetState = () => {
    setTransactionStatus('idle');
    setShowMpesaProcessing(false);
    setAmount('');
    setError('');
  };

  return (
    <Card className="flex items-center justify-center ">
      {/* ---------------- Deposit Modal ---------------- */}
      <Dialog open={showDepositModal} onOpenChange={setShowDepositModal}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Deposit Funds</DialogTitle>
            <DialogDescription>
              Enter amount and choose payment method.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-4">
            
            {/* Payment Methods */}
            <div>
              <Label className="font-semibold">Payment Method</Label>
              <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
                {PAYMENT_METHODS.map((method) => (
                  <div
                    key={method.id}
                    className={`flex items-center justify-between p-3 border rounded-lg ${
                      method.enabled
                        ? 'cursor-pointer hover:bg-accent'
                        : 'opacity-50 cursor-not-allowed bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem
                        value={method.id}
                        disabled={!method.enabled}
                      />
                      <Label>{method.name}</Label>
                    </div>

                    {!method.enabled && (
                      <span className="text-xs text-muted-foreground">
                        Coming Soon
                      </span>
                    )}
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Amount */}
            <div>
              <Label>Amount (KES)</Label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
              />
              {error && (
                <p className="text-sm text-red-500 mt-1">{error}</p>
              )}
            </div>

          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDepositModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleDeposit}>
              Deposit with MPesa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ---------------- MPesa Processing ---------------- */}
      <Dialog open={showMpesaProcessing} onOpenChange={setShowMpesaProcessing}>
        <DialogContent className="sm:max-w-[400px] text-center">
          <DialogHeader>
            <DialogTitle>MPesa Transaction</DialogTitle>
            <DialogDescription>
              Follow prompts on your phone.
            </DialogDescription>
          </DialogHeader>

          <div className="py-6 space-y-4">
            
            {transactionStatus === 'pending' && (
              <>
                <Loader2 className="mx-auto w-10 h-10 animate-spin text-blue-500" />
                <p>Processing KES {amount}...</p>
              </>
            )}

            {transactionStatus === 'success' && (
              <>
                <CheckCircle2 className="mx-auto w-10 h-10 text-green-500" />
                <p className="text-green-600 font-semibold">
                  Payment Successful
                </p>
              </>
            )}

            {transactionStatus === 'failed' && (
              <>
                <XCircle className="mx-auto w-10 h-10 text-red-500" />
                <p className="text-red-600 font-semibold">
                  Payment Failed
                </p>
              </>
            )}

          </div>

          <DialogFooter>
            {transactionStatus === 'pending' ? (
              <Button variant="outline" onClick={resetState}>
                Cancel Transaction
              </Button>
            ) : (
              <Button onClick={resetState}>
                Close
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </Card>
  );
}