import React, { useCallback } from 'react';

import { useAppTheme } from '@/components/shared/providers/theme-provider/hooks';
import { Button } from '@/components/shared/ui/button';
import { Col, Row } from '@/components/shared/ui/flex';
import { Icon } from '@/components/shared/ui/icon';
import { Switch } from '@/components/shared/ui/switch';
import { Text } from '@/components/shared/ui/text';
import { ThemeAppearance, useAppStore } from '@/store';

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
