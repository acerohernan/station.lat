import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import Link from '@/components/Link';
import { useThemeContext } from '@/theme/hooks';
import { API } from '@/api';

export default function Home() {
  const [memberships, setMemberships] = useState<{ id: string }[]>([]);

  const { toggleMode } = useThemeContext();

  async function getUserMembership() {
    try {
      const data = await API.user.getMemberships();

      if (!data) throw new Error('Error fetch');

      console.log(data);

      setMemberships(data);
    } catch (err) {
      console.log(err);
      alert('Cannot fetch the user memberships');
    }
  }

  useEffect(() => {
    getUserMembership();
  }, []);

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
        {memberships.map((member) => (
          <span key={member.id}>{JSON.stringify(member, null, 2)}</span>
        ))}
        <Button onClick={toggleMode}>Toggle color mode</Button>
      </Box>
    </Container>
  );
}
