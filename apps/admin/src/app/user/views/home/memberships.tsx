import { Box, Skeleton, Typography } from '@mui/material';
import { useUserMemberships } from '../../hooks/useUserMemberships';
import { UserMembership } from '@/api/user/types';

const UserMemberships = () => {
  const { data: memberships } = useUserMemberships();

  return (
    <Box display="grid" gap="16px" padding="16px 0">
      {memberships ? (
        memberships.map((membership) => <MembershipCard membership={membership} key={membership.id} />)
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
}

const MembershipCard: React.FC<CardProps> = ({ membership }) => {
  return (
    <Box display="flex" borderRadius="8px" sx={{ cursor: 'pointer', border: '1px solid #F3F4F9' }}>
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
