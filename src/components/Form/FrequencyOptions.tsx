import { Controller, useFormContext } from 'react-hook-form';
import { Box, MenuItem, TextField } from '@mui/material';

export const FREQUENCIES = [
  { value: 'annually', label: 'Annually' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'fortnightly', label: 'Fortnightly' },
];

interface Props {
  amountName: string; // e.g. "interest.amount"
  freqName: string; // e.g. "interest.frequency"
  label: string; // e.g. "Interest"
  required?: boolean;
}

export default function FrequencyOptions({
  amountName,
  freqName,
  label,
  required,
}: Props) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 180px', gap: 2 }}>
      <TextField
        label={`${label}`}
        type="number"
        slotProps={{
          htmlInput: { step: '0.01', min: 0 },
        }}
        error={Boolean(errors?.[amountName as keyof typeof errors])}
        helperText={((errors as any)?.[amountName]?.message as string) || ''}
        {...register(amountName as any, { required })}
      />

      {/* 频率：用 Controller 做受控 Select */}
      <Controller
        control={control}
        name={freqName}
        rules={{ required }}
        render={({ field, fieldState }) => (
          <TextField
            select
            label="Frequency"
            {...field}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          >
            {FREQUENCIES.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
    </Box>
  );
}
