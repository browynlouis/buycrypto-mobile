import { ErrorBoundary, Suspense } from '@suspensive/react';
import { SuspenseQuery } from '@suspensive/react-query';
import React, { useState } from 'react';
import { View } from 'react-native';

import { $fetchApi } from '@/libs/api';
import { toast } from '@/libs/utils';
import { Button } from '@/shared/components/ui/button';
import { Icon } from '@/shared/components/ui/icon';
import { SelectInput } from '@/shared/components/ui/select-input';
import { Skeleton } from '@/shared/components/ui/skeleton';

import { AuthScreenTitle } from '../../components';

export function CountrySelectionScreen() {
  const [modal, setModal] = useState(false);

  return (
    <View style={{ gap: 32 }}>
      <AuthScreenTitle
        title="What's your country?"
        subText="Please select your country to continue"
      />

      {/* Error boundary should have a SIMPLE fallback */}
      <ErrorBoundary fallback={<></>} onError={(e) => toast().error(e.message)}>
        <Suspense
          fallback={
            <>
              <Skeleton width={'100%'} height={45} />
              <Skeleton width={'100%'} height={45} />
            </>
          }
        >
          <SuspenseQuery
            queryKey={['metadata/config/countries']}
            queryFn={() => $fetchApi.GET('/metadata/config/countries')}
          >
            {({ data }) => {
              const { data: countries } = data;

              return (
                <>
                  <View style={{ gap: 24 }}>
                    <SelectInput
                      options={[]}
                      placeholder="Select your country…"
                      startAdornment={<Icon name="Flag" />}
                      endAdornment={<Icon name="ArrowDown2" />}
                    />
                  </View>

                  <Button size="md">Proceed</Button>
                </>
              );
            }}
          </SuspenseQuery>
        </Suspense>
      </ErrorBoundary>
    </View>
  );
}
