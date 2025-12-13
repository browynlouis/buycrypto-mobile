import { Suspense } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

import { getMeQueryOptions } from '@/api/queries/user';
import { Badge } from '@/components/shared/ui/badge';
import { Row } from '@/components/shared/ui/flex';
import { Icon } from '@/components/shared/ui/icon';
import { Loader } from '@/components/shared/ui/loader';
import { resolveKycLevel } from '@/lib/utils';

import { ProfileHeader } from '../_partials/profile-header';

const UserCenterScreen = Suspense.with({ fallback: <Loader isLoading /> }, () => {
  const router = useRouter();

  const {
    data: { data: user },
  } = useSuspenseQuery(getMeQueryOptions());

  return (
    <View style={{ gap: 24 }}>
      <Pressable onPress={() => router.push('/(protected)/(user-center)/settings')}>
        <Row justify="space-between" align="center">
          <ProfileHeader user={user} />

          <Icon name="ArrowRight2" style={{ marginLeft: 'auto' }} />
        </Row>
      </Pressable>

      <View>
        <Badge status={!!user.kycLevel}>KYC - {resolveKycLevel(user.kycLevel)}</Badge>
      </View>
    </View>
  );
});

UserCenterScreen.displayName = 'UserCenterScreen';

export { UserCenterScreen };
