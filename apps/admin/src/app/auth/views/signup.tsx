import { Link } from 'react-router-dom';
import AuthLayout from '../components/layout';
import { Box, Card, Typography, Button, Divider, TextField } from '@mui/material';
import { BASE_URL } from '@/api/config';

const SignUpPage = () => (
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
            Sign Up to Latin Station
          </Typography>
          <Box width={'100%'} marginTop={'30px'} marginBottom={'20px'} gap={'8px'} display={'grid'}>
            <Button href={`${BASE_URL}/user/auth/google/authorize`} variant="outlined" size="large" fullWidth>
              Sign up with Google
            </Button>
          </Box>
          <Divider variant="middle">Or</Divider>
          <Box display="flex" flexDirection="column" width="100%" margin={'20px 0'}>
            <TextField label="Email" type="email" />
            <Button variant="contained" fullWidth sx={{ marginTop: '20px' }} size="large">
              Sign up with Email
            </Button>
            <Box display="flex" width={'100%'} justifyContent={'center'} marginTop={'16px'}>
              <Typography marginRight="3px">Do you have an account?</Typography>
              <Link to="/signin">Sign In</Link>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  </AuthLayout>
);

export default SignUpPage;
