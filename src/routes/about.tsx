import PropertyInputsForm from '@/components/Form/main';
import { Box } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
  component: About,
});

function About() {
  return (
    <Box>
      <PropertyInputsForm />
    </Box>
  );
}
