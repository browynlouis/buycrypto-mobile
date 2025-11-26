import { Link } from 'expo-router';
import { View } from 'react-native';

import { Badge } from '@/shared/components/ui/bagde';
import { Icon } from '@/shared/components/ui/icon';

import { ProfileHeader } from '../../components/profile-header';

export function UserCenterScreen() {
  return (
    <View style={{ gap: 24 }}>
      <Link href={'/(protected)/(user-center)/settings'}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <ProfileHeader />

          <Icon name="expand-alt" family="AntDesign" style={{ marginLeft: 'auto' }} />
        </View>
      </Link>

      <View>
        <Badge>KYC - Not Verified</Badge>
      </View>
    </View>
  );
}
