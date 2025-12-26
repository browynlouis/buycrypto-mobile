import { Suspense } from '@suspensive/react';
import { useSuspenseQueries } from '@tanstack/react-query';
import { Controller } from 'react-hook-form';

import { getKycInfoQueryOptions } from '@/api/queries/kyc';
import { getMeQueryOptions, useProfileUpdate } from '@/api/queries/user';
import { Button } from '@/components/shared/ui/button';
import { CountrySelectInput } from '@/components/shared/ui/country-select';
import { DatePicker } from '@/components/shared/ui/date-picker';
import { DescriptionHeader } from '@/components/shared/ui/description-header';
import { Col, Row } from '@/components/shared/ui/flex';
import { Icon } from '@/components/shared/ui/icon';
import {
  ControlledInput,
  InputGroup,
  InputHelperText,
  InputLabel,
} from '@/components/shared/ui/input';
import { Loader } from '@/components/shared/ui/loader';

const PersonalInfoScreen = Suspense.with({ fallback: <Loader isLoading /> }, () => {
  const [
    {
      data: { data: user },
    },
    {
      data: { data: kyc },
    },
  ] = useSuspenseQueries({
    queries: [getMeQueryOptions(), getKycInfoQueryOptions()],
  });

  const { form, submit, isSubmitting } = useProfileUpdate({
    profile: {
      country: user.profile.country,
      firstName: user.profile.firstName,
      lastName: user.profile.lastName,
      middleName: user.profile.middleName,
      dob: user.profile.dob ? new Date(user.profile.dob) : new Date(),
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = form;

  const isDisabled = isSubmitting || Boolean(kyc.currentKycLevel);

  return (
    <>
      <Loader isLoading={isSubmitting} />

      <Col gap={32}>
        <DescriptionHeader
          title="Tell us more about you"
          subText="Please provide your information"
        />

        <Col gap={24}>
          <Row gap={12} align="flex-start">
            <ControlledInput
              control={control}
              name="firstName"
              label="First Name"
              editable={!isDisabled}
              placeholder="e.g Jon"
            />

            <ControlledInput
              control={control}
              name="lastName"
              label="Last Name"
              editable={!isDisabled}
              placeholder="e.g Doe"
            />
          </Row>

          <ControlledInput
            control={control}
            name="middleName"
            label="Middle Name"
            editable={!isDisabled}
            placeholder="e.g Jack"
          />

          <Controller
            name="dob"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <InputGroup style={{ flex: 1 }}>
                <InputLabel>Date of Birth</InputLabel>
                <DatePicker
                  value={field.value}
                  onChange={(date) =>
                    date &&
                    form.setValue('dob', date, {
                      shouldDirty: true,
                      shouldValidate: true,
                    })
                  }
                />
                {invalid && <InputHelperText variant="error">{error?.message}</InputHelperText>}
              </InputGroup>
            )}
          />
          <InputGroup style={{ flex: 1 }}>
            <InputLabel>Country/Region of Residence</InputLabel>
            <CountrySelectInput control={control} disabled={isDisabled} />
          </InputGroup>
        </Col>

        {/* Display only when user has no kyc level  */}
        {!kyc.currentKycLevel && (
          <Button
            size="lg"
            disabled={!isValid}
            endAdornment={<Icon name="ArrowRight2" />}
            onPress={handleSubmit((values) => {
              submit({
                ...values,
                dob: values.dob.toISOString(),
              });
            })}
          >
            Continue
          </Button>
        )}
      </Col>
    </>
  );
});

PersonalInfoScreen.displayName = 'PersonalInfoScreen';

export { PersonalInfoScreen };
