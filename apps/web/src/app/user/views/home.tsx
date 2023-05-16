import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import UserLayout from '../components/layout';
import { useUserMemberships } from '../hooks/useUserMembership';
import Memberships from '../components/memberships';
import { useUserInformation } from '../hooks/useUserInformation';

export default function UserHomeView() {
  const { data: memberships } = useUserMemberships();
  const { data: user } = useUserInformation();

  return (
    <UserLayout>
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
          {user && (
            <Typography variant="h4" component="h1" gutterBottom marginBottom="32px">
              Welcome back {user.first_name} {user.last_name}!
            </Typography>
          )}
          {memberships && <Memberships membershipsArr={memberships} />}
        </Box>
      </Container>
    </UserLayout>
  );
}
