import { Box, Skeleton, Typography } from '@mui/material';
import { useUserMemberships } from '../../hooks/useUserMemberships';
import { UserMembership } from '@/api/user/types';
import { API } from '@/api';
import React, { Dispatch, SetStateAction } from 'react';
import Cookies from 'js-cookie';
import { NavigateFunction, useNavigate } from 'react-router-dom';

const UserMemberships = () => {
  const [isGeneratingToken, setisGeneratingToken] = React.useState(false);
  const { data: memberships } = useUserMemberships();
  const navigate = useNavigate();

  return (
    <Box
      display="grid"
      gap="16px"
      padding="16px 0"
      sx={{ opacity: isGeneratingToken ? 0.5 : 1, cursor: isGeneratingToken ? 'not-allowed' : 'default' }}
    >
      {memberships ? (
        memberships.map((membership) => (
          <MembershipCard
            membership={membership}
            key={membership.id}
            setIsGenerating={setisGeneratingToken}
            navigate={navigate}
          />
        ))
      ) : (
        <MembershipsSkeleton />
      )}
    </Box>
  );
};

const MembershipsSkeleton = () => (
  <>
    {[1, 2, 3].map((item) => (
      <Skeleton key={item} variant="rectangular" height="100px" sx={{ borderRadius: '8px' }} />
    ))}
  </>
);

interface CardProps {
  membership: UserMembership;
  setIsGenerating: Dispatch<SetStateAction<boolean>>;
  navigate: NavigateFunction;
}

const MembershipCard: React.FC<CardProps> = ({ membership, setIsGenerating, navigate }) => {
  const getMembershipToken = async () => {
    setIsGenerating(true);
    const res = await API.user.createMemberToken({ company_id: membership.company_id });

    if (res.failed) {
      console.log(res.error?.errors);
      return setIsGenerating(false);
    }

    Cookies.set('isLoggedInCompany', '1');
    navigate('/company');

    setIsGenerating(false);
  };

  return (
    <Box
      display="flex"
      borderRadius="8px"
      sx={{ cursor: 'pointer', border: '1px solid #F3F4F9' }}
      onClick={getMembershipToken}
    >
      <img
        src="/images/company-placeholder.png"
        alt="company placeholder img"
        style={{ objectFit: 'cover', width: '100px' }}
      />
      <Box padding="16px">
        <Typography fontSize="1rem" fontWeight="500">
          {membership.company.name}
        </Typography>
        <Typography marginTop="4px">Role: {membership.role}</Typography>
      </Box>
    </Box>
  );
};

export default UserMemberships;
