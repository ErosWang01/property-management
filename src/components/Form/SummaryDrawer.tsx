import {
  fmtCurrency,
  type Overall,
  type PropertyBreakdown,
} from '@/helper/propertyBalance';
import React from 'react';
import {
  Box,
  Button,
  Stack,
  Typography,
  Divider,
  Paper,
  Chip,
  Drawer,
} from '@mui/material';

type StatRowProps = {
  label: string;
  value: number;
  bold?: boolean;
};

type SummaryDrawerProps = {
  summary: {
    overall: Overall;
    perProperty: PropertyBreakdown[];
  } | null;
  openDrawer: boolean;
  onClose: () => void;
  taxableIncome: number;
  grossIncome: number;
};

const getLabel = (key: string): string => {
  switch (key) {
    case 'annualRentalIncome':
      return 'Rental Income';
    case 'depreciation':
      return 'Depreciation';
    case 'estimateExpense':
      return 'Estimate Expense';
    case 'insurance':
      return 'Insurance';
    case 'interest':
      return 'Interest';
    case 'landTax':
      return 'Land Tax';
    case 'managementFee':
      return 'Management Fee';
    case 'rate':
      return 'Council Rates';
    case 'netIncome':
      return 'Net Profit';
    default:
      return '';
  }
};

const StatRow: React.FC<StatRowProps> = ({ label, value }) => {
  return (
    <>
      {label === 'Net Profit' && (
        <Divider sx={{ mt: '8px', marginBottom: '8px' }} />
      )}
      <Box display="flex" justifyContent="space-between">
        <Typography>{label}</Typography>
        <Typography>{fmtCurrency(value)}</Typography>
      </Box>
    </>
  );
};

const SummaryDrawer = ({
  summary,
  openDrawer,
  onClose,
  taxableIncome,
  grossIncome,
}: SummaryDrawerProps) => {
  return (
    <Drawer
      anchor="right"
      open={openDrawer}
      onClose={onClose}
      PaperProps={{ sx: { width: 420, p: 2 } }}
    >
      <Stack spacing={2}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6">Summary</Typography>
          <Button size="small" onClick={onClose}>
            Close
          </Button>
        </Stack>

        {summary ? (
          <Box>
            <Box display="flex" flexDirection="column" gap={2}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Chip label="Taxable Income" />
                <Typography variant="subtitle1" color="text.secondary">
                  {fmtCurrency(taxableIncome)}
                </Typography>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Chip label="Gross Income" />
                <Typography variant="subtitle1" color="text.secondary">
                  {fmtCurrency(grossIncome)}
                </Typography>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Chip label="Total Rental Income" />
                <Typography variant="subtitle1" color="text.secondary">
                  {fmtCurrency(summary.overall.totalRentalIncome)}
                </Typography>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Chip label="Total Expense" />
                <Typography variant="subtitle1" color="text.secondary">
                  {fmtCurrency(summary.overall.totalExpenses)}
                </Typography>
              </Box>
            </Box>
          </Box>
        ) : (
          <Typography color="text.secondary">
            请先点击 Calculate 生成汇总
          </Typography>
        )}

        <Divider sx={{ my: 1 }} />

        {summary?.perProperty.map((p) => (
          <Paper key={p.index} variant="outlined" sx={{ p: 1.5, mb: 1 }}>
            <Typography variant="subtitle1">Property #{p.index + 1}</Typography>
            <Box>
              {Object.entries(p).map(([key, value]) => {
                const label = getLabel(key);
                return label ? (
                  <StatRow key={label} label={label} value={value as number} />
                ) : null;
              })}
            </Box>
          </Paper>
        ))}
        {summary && summary.perProperty.length === 0 && (
          <Typography color="text.secondary">No Property Record</Typography>
        )}
      </Stack>
    </Drawer>
  );
};

export default SummaryDrawer;
