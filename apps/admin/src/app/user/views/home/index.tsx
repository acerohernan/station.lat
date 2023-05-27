import { Typography } from '@mui/material';
import UserLayout from '../../components/layout';
import Card from '@mui/material/Card';
import UserMemberships from './memberships';

const HomePage = () => {
  return (
    <UserLayout>
      <Card>
        <Typography display="flex" variant="h5" component="h2">
          Welcome back!
        </Typography>
        <Typography>Choose a company to log in</Typography>
        <UserMemberships />
      </Card>
    </UserLayout>
  );
};

export default HomePage;
