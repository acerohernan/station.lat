import { Box, Card, Typography } from '@mui/material';
import CompanyLayout from '../components/layout';
import { useCompanyInformation } from '../hooks/useCompanyInformation';

const CompanyHomePage = () => {
  const { data: company } = useCompanyInformation();

  return (
    <CompanyLayout>
      {company ? (
        <Box display="grid" gap="24px">
          <Card>
            <Typography fontWeight="500" component="h1" fontSize="1.1rem" textAlign="center">
              Welcome to {company.name}
            </Typography>
            <Typography textAlign="center" marginTop="16px">
              You have done{' '}
              <Typography component="span" color="blue" fontWeight="500" sx={{ display: 'inline' }}>
                76%
              </Typography>{' '}
              more sales today. Check your inventory and update your stocks.
            </Typography>
          </Card>
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <Card sx={{ height: 300 }} key={`card-${i}`}></Card>
            ))}
        </Box>
      ) : null}
    </CompanyLayout>
  );
};

export default CompanyHomePage;
