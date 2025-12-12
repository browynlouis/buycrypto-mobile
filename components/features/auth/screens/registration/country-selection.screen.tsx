import { useRouter } from 'expo-router';
import React from 'react';

import { useRegistration } from '@/api/queries/auth';
import { Button } from '@/components/shared/ui/button';
import { CountrySelectInput } from '@/components/shared/ui/country-select';
import { DescriptionHeader } from '@/components/shared/ui/description-header';
import { Col } from '@/components/shared/ui/flex';

export function CountrySelectionScreen() {
  const router = useRouter();
  const {
    form: { control, setValue },
  } = useRegistration();

  return (
    <Col gap={32}>
      <DescriptionHeader
        title="What's your country?"
        subText="Please select your country to continue"
      />

      <Col gap={24}>
        <CountrySelectInput control={control} setValue={setValue} />

        <Button size="md" onPress={() => router.push('/(auth)/registration/credentials')}>
          Proceed
        </Button>
      </Col>
    </Col>
  );
}
