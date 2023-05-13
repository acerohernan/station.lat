import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import Link from '@/components/Link';
import { useThemeContext } from '@/theme/hooks';

export default function Home() {
  const { toggleMode } = useThemeContext();

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Material UI - Next.js example in TypeScript
        </Typography>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <Button onClick={toggleMode}>Toggle color mode</Button>
      </Box>
    </Container>
  );
}
