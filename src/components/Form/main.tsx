// src/PropertyInputsForm.tsx
import * as React from 'react';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Divider,
  IconButton,
  Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import FrequencyOptions from './FrequencyOptions';
import { calculatePropertyBalance } from '@/helper/propertyBalance';
import { calculateAfterTaxIncome } from '@/helper/taxCalculator';
import SummaryDrawer from './SummaryDrawer';

type Frequency = 'annually' | 'monthly' | 'fortnightly';

type Property = {
  rentalIncome: { amount: ''; frequency: Frequency };
  managementFeePct: '';
  estimateExpense: '';
  depreciation: '';
  rate: '';
  landTax: '';
  insurance: { amount: ''; frequency: Frequency };
  interest: { amount: ''; frequency: Frequency };
};

export type FormValues = {
  taxableIncome: '';
  properties: Property[];
};

export default function PropertyInputsForm() {
  const methods = useForm<FormValues>({
    defaultValues: {
      taxableIncome: '',
      properties: [
        {
          rentalIncome: { amount: '', frequency: 'annually' },
          managementFeePct: '',
          estimateExpense: '',
          depreciation: '',
          rate: '',
          landTax: '',
          insurance: { amount: '', frequency: 'annually' },
          interest: { amount: '', frequency: 'annually' },
        },
      ],
    },
    mode: 'onBlur',
  });

  const { register, handleSubmit, control, reset } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'properties',
  });

  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [taxableIncome, setTaxableIncome] = React.useState(0);
  const [grossIncome, setGrossIncome] = React.useState(0);
  const [summary, setSummary] = React.useState<ReturnType<
    typeof calculatePropertyBalance
  > | null>(null);
  console.log('🚀 ~ PropertyInputsForm ~ summary:', summary);

  const onSubmit = (data: FormValues) => {
    const propertyBalance = calculatePropertyBalance(data);
    const taxableIncome =
      Number(data.taxableIncome) + propertyBalance.overall.netIncome;
    const grossIncome = calculateAfterTaxIncome(taxableIncome);
    setGrossIncome(grossIncome);
    setTaxableIncome(taxableIncome);
    setSummary(propertyBalance);

    setOpenDrawer(true);
  };

  const emptyProperty: Property = {
    rentalIncome: { amount: '', frequency: 'annually' },
    managementFeePct: '',
    estimateExpense: '',
    depreciation: '',
    rate: '',
    landTax: '',
    insurance: { amount: '', frequency: 'annually' },
    interest: { amount: '', frequency: 'annually' },
  };

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ p: 3, maxWidth: 900 }}
      >
        <Stack spacing={2} sx={{ mb: 3 }}>
          <Typography variant="h5">Total Taxable Income</Typography>
          <TextField
            label="Taxable Income"
            type="number"
            slotProps={{
              htmlInput: { step: '0.01', min: 0 },
            }}
            {...register('taxableIncome')}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 1 }}
        >
          <Typography variant="h5">Your Investment Properties</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => append(emptyProperty)}
          >
            Add Property
          </Button>
        </Stack>

        <Stack spacing={3}>
          {fields.map((field, index) => (
            <Paper key={field.id} variant="outlined" sx={{ p: 2 }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 1 }}
              >
                <Typography variant="h6">Property #{index + 1}</Typography>
                <IconButton
                  aria-label="remove property"
                  onClick={() => remove(index)}
                  disabled={fields.length === 1}
                >
                  <RemoveIcon />
                </IconButton>
              </Stack>

              <Stack spacing={2}>
                <FrequencyOptions
                  label="Rental Income"
                  amountName={`properties.${index}.rentalIncome.amount`}
                  freqName={`properties.${index}.rentalIncome.frequency`}
                />
                <Divider />
                <TextField
                  label="Management Fee %"
                  type="number"
                  slotProps={{
                    htmlInput: { step: '0.01', min: 0, max: 100 },
                  }}
                  {...register(`properties.${index}.managementFeePct` as const)}
                />
                <TextField
                  label="Estimate Expense"
                  type="number"
                  slotProps={{
                    htmlInput: { step: '0.01', min: 0 },
                  }}
                  {...register(`properties.${index}.estimateExpense` as const)}
                />

                <FrequencyOptions
                  label="Interest"
                  amountName={`properties.${index}.interest.amount`}
                  freqName={`properties.${index}.interest.frequency`}
                />
                <FrequencyOptions
                  label="Insurance"
                  amountName={`properties.${index}.insurance.amount`}
                  freqName={`properties.${index}.insurance.frequency`}
                />
                <TextField
                  label="Council Rates"
                  type="number"
                  slotProps={{
                    htmlInput: { step: '0.01', min: 0 },
                  }}
                  {...register(`properties.${index}.rate` as const)}
                />
                <TextField
                  label="Land Tax"
                  type="number"
                  slotProps={{
                    htmlInput: { step: '0.01', min: 0 },
                  }}
                  {...register(`properties.${index}.landTax` as const)}
                />

                <Divider />

                <TextField
                  label="Depreciation"
                  type="number"
                  slotProps={{
                    htmlInput: { step: '0.01', min: 0 },
                  }}
                  {...register(`properties.${index}.depreciation` as const)}
                />
              </Stack>
            </Paper>
          ))}
        </Stack>

        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <Button type="submit" variant="contained">
            Calculate
          </Button>
          <Button type="button" variant="outlined" onClick={() => reset()}>
            Reset
          </Button>
        </Stack>
      </Box>

      <SummaryDrawer
        summary={summary}
        openDrawer={openDrawer}
        taxableIncome={taxableIncome}
        grossIncome={grossIncome}
        onClose={() => setOpenDrawer(false)}
      />
    </FormProvider>
  );
}
