import React, { useCallback } from 'react';

import { ThemeAppearance, useAppStore } from '@/libs/store';
import { useTheme } from '@/shared/components/providers/theme-provider/hooks';
import { Button } from '@/shared/components/ui/button';
import { Col, Row } from '@/shared/components/ui/flex';
import { Icon } from '@/shared/components/ui/icon';
import { Switch } from '@/shared/components/ui/switch';
import { Text } from '@/shared/components/ui/text';

export function AppearanceScreen() {
  const theme = useTheme();
  const { setThemeAppearance, themeAppearance, resolvedTheme } = useAppStore();

  const isSystem = themeAppearance === 'system';

  const setLight = useCallback(() => setThemeAppearance('light'), []);
  const setDark = useCallback(() => setThemeAppearance('dark'), []);

  const toggleSystem = useCallback(
    (checked: boolean) => {
      setThemeAppearance(checked ? 'system' : resolvedTheme);
    },
    [resolvedTheme],
  );

  const themedBorder = (type: ThemeAppearance) => {
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
            borderColor: themedBorder('light'),
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
            borderColor: themedBorder('dark'),
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
