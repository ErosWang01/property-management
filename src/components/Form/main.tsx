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

type Frequency = 'annually' | 'monthly' | 'fortnightly';

type Property = {
  rentalIncome: number | '';
  managementFeePct: number | '';
  estimateExpense: number | '';
  depreciation: number | '';
  rate: number | '';
  landTax: number | '';
  insurance: { amount: number | ''; frequency: Frequency };
  interest: { amount: number | ''; frequency: Frequency };
};

type FormValues = {
  taxableIncome: number | '';
  properties: Property[];
};

export default function PropertyInputsForm() {
  const methods = useForm<FormValues>({
    defaultValues: {
      taxableIncome: '',
      // 先给一组，用户可继续点“+”新增
      properties: [
        {
          rentalIncome: '',
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

  const onSubmit = (data: FormValues) => {
    console.log('Form data:', data);
    alert(JSON.stringify(data, null, 2));
  };

  const emptyProperty: Property = {
    rentalIncome: '',
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
        {/* 顶部：总应税收入 */}
        <Stack spacing={2} sx={{ mb: 3 }}>
          <Typography variant="h5">Total Taxable Income</Typography>
          <TextField
            label="Taxable Income"
            type="number"
            inputProps={{ step: '0.01', min: 0 }}
            {...register('taxableIncome')}
          />
        </Stack>

        {/* 多个 Investment Property 分组 */}
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
                <TextField
                  label="Rental income"
                  type="number"
                  inputProps={{ step: '0.01', min: 0 }}
                  {...register(`properties.${index}.rentalIncome` as const)}
                />
                <TextField
                  label="Management fee %"
                  type="number"
                  inputProps={{ step: '0.01', min: 0, max: 100 }}
                  {...register(`properties.${index}.managementFeePct` as const)}
                />
                <TextField
                  label="Estimate expense"
                  type="number"
                  inputProps={{ step: '0.01', min: 0 }}
                  {...register(`properties.${index}.estimateExpense` as const)}
                />
                <TextField
                  label="折旧 (Depreciation)"
                  type="number"
                  inputProps={{ step: '0.01', min: 0 }}
                  {...register(`properties.${index}.depreciation` as const)}
                />

                <Divider />

                {/* 金额 + 频率组合：复用你的 FrequencyOptions */}
                <FrequencyOptions
                  label="Interest to be paid"
                  amountName={`properties.${index}.interest.amount`}
                  freqName={`properties.${index}.interest.frequency`}
                />
                <FrequencyOptions
                  label="Insurance"
                  amountName={`properties.${index}.insurance.amount`}
                  freqName={`properties.${index}.insurance.frequency`}
                />

                <Divider />

                <TextField
                  label="Rate (council rates)"
                  type="number"
                  inputProps={{ step: '0.01', min: 0 }}
                  {...register(`properties.${index}.rate` as const)}
                />
                <TextField
                  label="Land tax"
                  type="number"
                  inputProps={{ step: '0.01', min: 0 }}
                  {...register(`properties.${index}.landTax` as const)}
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
    </FormProvider>
  );
}
