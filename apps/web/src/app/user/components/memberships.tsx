import { API } from '@/api';
import { UserMembership } from '@/api/user/types';
import { Box, Button, Card, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

interface Props {
  membershipsArr: UserMembership[];
}

const Memberships: React.FC<Props> = ({ membershipsArr }) => {
  return (
    <Box display={'grid'} gap={'8px'}>
      {membershipsArr.map((membership) => (
        <MembershipItem membership={membership} key={`${membership.id}`} />
      ))}
    </Box>
  );
};

interface ItemProps {
  membership: UserMembership;
}

const MembershipItem: React.FC<ItemProps> = ({ membership: { company } }) => {
  const { push } = useRouter();
  const imageSrc = company.image_url ?? '/img/company-placeholder.png';

  async function createToken() {
    const token = await API.user.createCompanyAccessToken({ company_id: company.id });

    if (!token) return alert('Error to create the token');

    Cookies.set('company_token', token);
    push('/company');
  }

  return (
    <Card onClick={createToken} variant="outlined" sx={{ cursor: 'pointer' }}>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Image src={imageSrc} alt={company.name} width={100} height={100} />
        <Box width="100%" padding="0 8px">
          <Typography>{company.name}</Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default Memberships;
