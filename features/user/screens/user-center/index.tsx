import { Suspense } from '@suspensive/react';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

import { $api } from '@/libs/api';
import { Loader } from '@/shared/components/loader';
import { Badge } from '@/shared/components/ui/bagde';
import { Row } from '@/shared/components/ui/flex';
import { Icon } from '@/shared/components/ui/icon';

import { getMe } from '../../api';
import { ProfileHeader } from '../../components/profile-header';

const UserCenterScreen = Suspense.with({ fallback: <Loader isLoading /> }, () => {
  const router = useRouter();

  const {
    data: { data: user },
  } = $api.useSuspenseQuery(...getMe);

  return (
    <View style={{ gap: 24 }}>
      <Pressable onPress={() => router.push('/(protected)/(user-center)/settings')}>
        <Row justify="space-between" align="center">
          <ProfileHeader user={user} />

          <Icon name="ArrowRight2" style={{ marginLeft: 'auto' }} />
        </Row>
      </Pressable>

      <View>
        <Badge status={user.kycLevel !== 'Not Verified'}>KYC - {user.kycLevel}</Badge>
      </View>
    </View>
  );
});

UserCenterScreen.displayName = 'UserCenterScreen';

export { UserCenterScreen };
