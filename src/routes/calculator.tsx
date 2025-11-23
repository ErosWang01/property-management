import PropertyInputsForm from '@/components/Form/main';
import { Box } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/calculator')({
  component: Calculator,
});

function Calculator() {
  return (
    <Box>
      <PropertyInputsForm />
    </Box>
  );
}
