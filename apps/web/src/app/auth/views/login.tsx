import { BASE_URL } from '@/api/config';
import Link from '@/components/ui/Link';
import { Box, Card, Typography, Button, Divider, TextField } from '@mui/material';
import React from 'react';
import AuthLayout from '../components/layout';

const LoginView = () => (
  <AuthLayout>
    <Box
      sx={{
        padding: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Card
        variant="outlined"
        sx={{
          maxWidth: '600px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        <Box padding="24px" display="flex" flexDirection="column" alignItems={'center'}>
          <Typography variant="h5" component="h1" fontWeight="500">
            Sign In to Latin Station
          </Typography>
          <Box width={'100%'} marginTop={'30px'} marginBottom={'20px'} gap={'8px'} display={'grid'}>
            <Button href={`${BASE_URL}/user/auth/google/authorize`} variant="outlined" size="large" fullWidth>
              Sign in with Google
            </Button>
          </Box>
          <Divider variant="middle">Or</Divider>
          <Box display="flex" flexDirection="column" width="100%" margin={'20px 0'}>
            <TextField label="Email" type="email" />
            <Button variant="contained" fullWidth sx={{ marginTop: '20px' }} size="large">
              Sign in with Email
            </Button>
            <Box display="flex" width={'100%'} justifyContent={'center'} marginTop={'16px'}>
              <Typography marginRight="3px">Don&apos;t have an account?</Typography>
              <Link href="/signin">Create an account</Link>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  </AuthLayout>
);

export default LoginView;
