import React, { useCallback } from 'react';

import { ThemeAppearance, useAppStore } from '@/libs/store';
import { useAppTheme } from '@/shared/components/providers/theme-provider/hooks';
import { Button } from '@/shared/components/ui/button';
import { Col, Row } from '@/shared/components/ui/flex';
import { Icon } from '@/shared/components/ui/icon';
import { Switch } from '@/shared/components/ui/switch';
import { Text } from '@/shared/components/ui/text';

export function AppearanceScreen() {
  const theme = useAppTheme();
  const { setThemeAppearance, themeAppearance, resolvedTheme } = useAppStore();

  const setDark = useCallback(() => setThemeAppearance('dark'), []);
  const setLight = useCallback(() => setThemeAppearance('light'), []);

  const isSystem = themeAppearance === 'system';
  const toggleSystem = useCallback(
    (checked: boolean) => {
      setThemeAppearance(checked ? 'system' : resolvedTheme);
    },
    [resolvedTheme],
  );

  const selectedThemeBorder = (type: ThemeAppearance) => {
    return themeAppearance === type ? theme.colors.Primary[500] : 'transparent';
  };

  return (
    <Col gap={24}>
      <Row gap={12}>
        <Button
          variant="plain"
          startAdornment={<Icon name="Sun1" />}
          disabled={isSystem}
          onPress={setLight}
          style={{
            flex: 1,
            borderWidth: 1.5,
            borderColor: selectedThemeBorder('light'),
          }}
        >
          Light
        </Button>

        <Button
          variant="plain"
          disabled={isSystem}
          startAdornment={<Icon name="Moon" />}
          onPress={setDark}
          style={{
            flex: 1,
            borderWidth: 1.5,
            borderColor: selectedThemeBorder('dark'),
          }}
        >
          Dark
        </Button>
      </Row>

      <Row justify="space-between">
        <Text>Use System Default</Text>
        <Switch value={isSystem} onValueChange={toggleSystem} />
      </Row>
    </Col>
  );
}
