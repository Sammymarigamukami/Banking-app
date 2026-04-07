'use client'

import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Card } from '~/components/ui/card'
import {
  loanFormSchema,
  type LoanFormData,
  getInterestRate,
  calculateMonthlyPayment,
  calculateTotalInterest,
} from '~/lib/loan-validation'

export function LoanApplication() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isCompleted, setIsCompleted] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<{
    idDocument?: File
    bankStatements?: File
  }>({})

  const form = useForm<LoanFormData>({
    resolver: zodResolver(loanFormSchema),
    defaultValues: {
      loanAmount: 50000,
      repaymentTerm: 60,
      employmentType: 'full-time',
      monthlyIncome: 5000,
      loanPurpose: 'home',
    },
    mode: 'onChange',
  })

  const { watch } = form
  const loanAmount = watch('loanAmount')
  const repaymentTerm = watch('repaymentTerm')
  const employmentType = watch('employmentType')
  const monthlyIncome = watch('monthlyIncome')

  // Calculate loan metrics
  const interestRate = getInterestRate(employmentType)
  const monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, repaymentTerm)
  const totalInterest = calculateTotalInterest(monthlyPayment, repaymentTerm, loanAmount)
  const totalAmount = loanAmount + totalInterest

  const validateStep = async (step: number): Promise<boolean> => {
    switch (step) {
      case 1:
        return form.trigger(['loanAmount', 'repaymentTerm'])
      case 2:
        return form.trigger(['employmentType', 'monthlyIncome', 'loanPurpose'])
      case 3:
        return true // File validation happens on upload
      default:
        return false
    }
  }

  const handleNext = async () => {
    const isValid = await validateStep(currentStep)
    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFileUpload = useCallback(
    (event: React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>, field: 'idDocument' | 'bankStatements') => {
      event.preventDefault()
      
      let files: FileList | null = null
      if ('dataTransfer' in event) {
        files = event.dataTransfer.files
      } else if ('target' in event) {
        files = event.currentTarget.files
      }

      if (files && files.length > 0) {
        const file = files[0]
        setUploadedFiles((prev) => ({ ...prev, [field]: file }))
        form.setValue(field, file)
      }
    },
    [form]
  )

  const onSubmit = async (data: LoanFormData) => {
    try {
      // Simulate API call
      console.log('Loan Application Submitted:', data)
      setIsCompleted(true)
      setTimeout(() => {
        setCurrentStep(1)
        setIsCompleted(false)
        form.reset()
        setUploadedFiles({})
      }, 3000)
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">
            Loan Application
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Complete your application in just 3 simple steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <AnimatePresence mode="wait">
              {isCompleted ? (
                <motion.div
                  key="completed"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <Card className="p-8 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="inline-block mb-6"
                    >
                      <CheckCircle className="h-16 w-16 text-emerald-500" />
                    </motion.div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                      Application Submitted!
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                      Your loan application has been successfully submitted. We'll review it and get
                      back to you within 24 hours.
                    </p>
                  </Card>
                </motion.div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Step 1: Loan Details */}
                    {currentStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
                          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-6">
                            Step 1: Loan Amount & Repayment Term
                          </h2>

                          <FormField
                            control={form.control}
                            name="loanAmount"
                            render={({ field }) => (
                              <FormItem className="mb-6">
                                <FormLabel className="text-slate-700 dark:text-slate-300">
                                  Loan Amount: ${loanAmount.toLocaleString()}
                                </FormLabel>
                                <FormControl>
                                  <div className="space-y-3">
                                    <input
                                      type="range"
                                      min="1000"
                                      max="1000000"
                                      step="1000"
                                      {...field}
                                      onChange={(e) => field.onChange(Number(e.target.value))}
                                      className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                    />
                                    <Input
                                      type="number"
                                      {...field}
                                      onChange={(e) => field.onChange(Number(e.target.value))}
                                      className="border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                                      placeholder="Enter loan amount"
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="repaymentTerm"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-700 dark:text-slate-300">
                                  Repayment Term: {repaymentTerm} months
                                </FormLabel>
                                <FormControl>
                                  <div className="space-y-3">
                                    <input
                                      type="range"
                                      min="12"
                                      max="360"
                                      step="1"
                                      {...field}
                                      onChange={(e) => field.onChange(Number(e.target.value))}
                                      className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                    />
                                    <Input
                                      type="number"
                                      {...field}
                                      onChange={(e) => field.onChange(Number(e.target.value))}
                                      className="border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                                      placeholder="Enter months"
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </Card>
                      </motion.div>
                    )}

                    {/* Step 2: Employment Details */}
                    {currentStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
                          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-6">
                            Step 2: Employment & Income Details
                          </h2>

                          <FormField
                            control={form.control}
                            name="employmentType"
                            render={({ field }) => (
                              <FormItem className="mb-4">
                                <FormLabel className="text-slate-700 dark:text-slate-300">
                                  Employment Type
                                </FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="border-slate-200 dark:border-slate-700 dark:bg-slate-800">
                                      <SelectValue placeholder="Select employment type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="full-time">Full-time Employee</SelectItem>
                                    <SelectItem value="part-time">Part-time Employee</SelectItem>
                                    <SelectItem value="self-employed">Self-Employed</SelectItem>
                                    <SelectItem value="retired">Retired</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="monthlyIncome"
                            render={({ field }) => (
                              <FormItem className="mb-4">
                                <FormLabel className="text-slate-700 dark:text-slate-300">
                                  Monthly Income
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="Enter monthly income"
                                    {...field}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                    className="border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="loanPurpose"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-700 dark:text-slate-300">
                                  Loan Purpose
                                </FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="border-slate-200 dark:border-slate-700 dark:bg-slate-800">
                                      <SelectValue placeholder="Select loan purpose" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="home">Home Purchase</SelectItem>
                                    <SelectItem value="auto">Auto Purchase</SelectItem>
                                    <SelectItem value="education">Education</SelectItem>
                                    <SelectItem value="personal">Personal Use</SelectItem>
                                    <SelectItem value="business">Business</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </Card>
                      </motion.div>
                    )}

                    {/* Step 3: Document Upload */}
                    {currentStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
                          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-6">
                            Step 3: Document Upload
                          </h2>

                          <FormField
                            control={form.control}
                            name="idDocument"
                            render={() => (
                              <FormItem className="mb-6">
                                <FormLabel className="text-slate-700 dark:text-slate-300">
                                  Government ID
                                </FormLabel>
                                <FormControl>
                                  <div
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={(e) => handleFileUpload(e, 'idDocument')}
                                    className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 text-center cursor-pointer hover:border-emerald-500 transition-colors"
                                  >
                                    <input
                                      type="file"
                                      accept=".pdf,.jpg,.jpeg,.png"
                                      onChange={(e) => handleFileUpload(e, 'idDocument')}
                                      className="hidden"
                                      id="id-upload"
                                    />
                                    <label htmlFor="id-upload" className="cursor-pointer block">
                                      <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                                      <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
                                        {uploadedFiles.idDocument
                                          ? uploadedFiles.idDocument.name
                                          : 'Drop file or click to upload'}
                                      </p>
                                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                        PDF, JPEG, or PNG (Max 5MB)
                                      </p>
                                    </label>
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="bankStatements"
                            render={() => (
                              <FormItem>
                                <FormLabel className="text-slate-700 dark:text-slate-300">
                                  Bank Statements
                                </FormLabel>
                                <FormControl>
                                  <div
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={(e) => handleFileUpload(e, 'bankStatements')}
                                    className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 text-center cursor-pointer hover:border-emerald-500 transition-colors"
                                  >
                                    <input
                                      type="file"
                                      accept=".pdf,.jpg,.jpeg,.png"
                                      onChange={(e) => handleFileUpload(e, 'bankStatements')}
                                      className="hidden"
                                      id="bank-upload"
                                    />
                                    <label htmlFor="bank-upload" className="cursor-pointer block">
                                      <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                                      <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
                                        {uploadedFiles.bankStatements
                                          ? uploadedFiles.bankStatements.name
                                          : 'Drop file or click to upload'}
                                      </p>
                                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                        PDF, JPEG, or PNG (Max 10MB)
                                      </p>
                                    </label>
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </Card>
                      </motion.div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex gap-3 justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleBack}
                        disabled={currentStep === 1}
                        className="border-slate-200 dark:border-slate-700"
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                      </Button>

                      {currentStep < 3 ? (
                        <Button
                          type="button"
                          onClick={handleNext}
                          className="bg-emerald-500 hover:bg-emerald-600 text-white"
                        >
                          Continue
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          className="bg-emerald-500 hover:bg-emerald-600 text-white"
                        >
                          Submit Application
                          <CheckCircle className="h-4 w-4 ml-2" />
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Summary Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card className="sticky top-6 p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">
                Loan Summary
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-slate-600 dark:text-slate-400 text-sm">Loan Amount</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-50">
                    ${loanAmount.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-slate-600 dark:text-slate-400 text-sm">Term</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-50">
                    {repaymentTerm} months
                  </span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-slate-600 dark:text-slate-400 text-sm">Interest Rate</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-50">
                    {(interestRate * 100).toFixed(1)}%
                  </span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-slate-600 dark:text-slate-400 text-sm">Monthly Payment</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 text-lg">
                    ${monthlyPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-slate-600 dark:text-slate-400 text-sm">Total Interest</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-50">
                    ${totalInterest.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-slate-900 dark:text-slate-50 font-semibold">Total Amount</span>
                  <span className="font-bold text-lg text-slate-900 dark:text-slate-50">
                    ${totalAmount.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-emerald-50 dark:bg-slate-800 rounded-lg border border-emerald-200 dark:border-emerald-900">
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                    Debt-to-Income Ratio:
                  </span>
                  {' '}
                  {monthlyIncome > 0
                    ? ((monthlyPayment / monthlyIncome) * 100).toFixed(1)
                    : '0'}
                  %
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
