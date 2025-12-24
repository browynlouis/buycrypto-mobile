import { useRouter } from 'expo-router';
import { Eye, EyeSlash, Wallet } from 'iconsax-react-nativejs';
import * as React from 'react';
import { Animated, Easing, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useAppTheme } from '../../providers/theme-provider/hooks';
import { Button } from '../button';
import { Icon } from '../icon';
import { Text } from '../text';

interface WalletPanelProps {
  balance?: string;
  title?: string;
  hideAction?: boolean;
  action?: React.ReactNode;
  children?: React.ReactNode;
  size?: 'lg' | 'sm';
  fiatCurrency?: string;
  cryptoCurrency?: string;
}

export function WalletPanel({
  children,
  title,
  balance = '0.00',
  action,
  hideAction,
  size = 'lg',
  cryptoCurrency = 'USDC',
  fiatCurrency = 'USD',
}: WalletPanelProps) {
  const router = useRouter();
  const theme = useAppTheme();
  const [visible, handleClose] = React.useState<boolean>(true);

  return (
    <View style={[styles.container, { minHeight: size === 'lg' ? 241 : 126 }]}>
      {/* Visit Wallet Arrow */}
      {!hideAction && (
        <View
          style={[
            styles.arrowContainer,
            {
              width: size === 'lg' ? 48 : 28,
              height: size === 'lg' ? 48 : 28,
              right: size === 'lg' ? 0 : 32,
              top: 0,
              zIndex: 1000,
            },
          ]}
        >
          {action ?? (
            <Button
              variant="text"
              accessibilityLabel="Visit Wallet"
              onPress={() => router.push('/(protected)/(app)/assets')}
            >
              <Icon
                name="ArrowRight"
                size={size === 'lg' ? 20 : 12}
                color={theme.colors.Shades.White}
                // rotation={-45}
              />
            </Button>
          )}
        </View>
      )}

      <View
        style={{
          paddingVertical: 24,
          paddingHorizontal: 20,
          gap: 16,
          zIndex: 1,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <View
            style={{
              height: size === 'lg' ? 26 : 20,
              width: size === 'lg' ? 26 : 20,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.colors.Primary[500],
              borderRadius: 9999,
            }}
          >
            <Wallet size={size === 'lg' ? 13 : 10} color={theme.colors.Neutral[50]} />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Text size={size === 'lg' ? 'text-md' : 'text-sm'}>{title ?? 'Your Balance'}</Text>

            {visible ? (
              <Button variant="text" onPress={() => handleClose(false)} hitSlop={10}>
                <Eye size={size === 'lg' ? 12 : 14} color={theme.colors.Neutral[50]} />
              </Button>
            ) : (
              <Button variant="text" onPress={() => handleClose(true)} hitSlop={10}>
                <EyeSlash size={size === 'lg' ? 12 : 14} color={theme.colors.Neutral[50]} />
              </Button>
            )}
          </View>
        </View>
        <View>
          <Text size={size === 'lg' ? 'display-md' : 'display-xs'}>
            {visible ? (
              <>
                {balance}

                {/* <OptionsTrigger
                  accessibilityLabel="Change Default Currency"
                  onPress={() => {
                    router.push('/profile/settings/preferences/currencies');
                  }}
                  placeholder={` ${fiatCurrency}`}
                  textStyle={{
                    fontSize: theme.fontSizes['text-xs'],
                  }}
                /> */}
              </>
            ) : (
              '*****'
            )}
          </Text>
          <Text size="text-xs" style={{ opacity: 0.5 }}>
            {visible ? (
              <>
                0.0000000000000{' '}
                <Text size="text-xs" style={{ marginLeft: 6 }}>
                  {cryptoCurrency}
                </Text>
              </>
            ) : (
              '*****'
            )}
          </Text>
        </View>

        <View>{children}</View>
      </View>
      <BackgroundSvg style={[StyleSheet.absoluteFillObject, {}]} size={size} />
    </View>
  );
}

type BackgroundSvgProps = React.ComponentProps<typeof Svg> & {
  size?: 'lg' | 'sm';
  style?: StyleProp<ViewStyle>;
  pulse?: boolean;
};

export function BackgroundSvg({ style, size = 'lg', pulse = false, ...props }: BackgroundSvgProps) {
  const animatedOpacity = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    if (!pulse) return;

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedOpacity, {
          toValue: 0.5,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(animatedOpacity, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    loop.start();
    return () => loop.stop();
  }, [pulse, animatedOpacity]);

  const SvgComponent = pulse ? Animated.createAnimatedComponent(Svg) : Svg;
  const animatedStyle = pulse ? [{ opacity: animatedOpacity }, style] : style;

  return size === 'lg' ? (
    <SvgComponent
      height={241}
      width={'100%'}
      style={animatedStyle}
      viewBox="0 0 335 241"
      preserveAspectRatio="xMidYMid meet"
      {...props}
    >
      <Path
        d="M0 40C0 21.144 0 11.716 5.858 5.858 11.716 0 21.144 0 40 0h198.5c8.85 0 13.275 0 16.789 1.376a19.997 19.997 0 0 1 11.335 11.335C268 16.225 268 20.65 268 29.5c0 8.85 0 13.275 1.376 16.79a19.997 19.997 0 0 0 11.335 11.334C284.225 59 288.65 59 297.5 59h4c12.619 0 18.929 0 23.613 2.745a20.009 20.009 0 0 1 7.142 7.142C335 73.57 335 79.88 335 92.5V201c0 18.856 0 28.284-5.858 34.142C323.284 241 313.856 241 295 241H40c-18.856 0-28.284 0-34.142-5.858C0 229.284 0 219.856 0 201V40Z"
        fill="#1D2222"
      />
    </SvgComponent>
  ) : (
    <SvgComponent
      height={126}
      width={'100%'}
      style={animatedStyle}
      viewBox="0 0 335 126"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
    >
      <Path
        d="M0 40C0 21.1438 0 11.7157 5.85786 5.85786C11.7157 0 21.1438 0 40 0H252.577C261.095 0 268 6.90522 268 15.4232C268 23.9413 274.905 30.8465 283.423 30.8465H301.5C314.119 30.8465 320.429 30.8465 325.113 33.5918C328.065 35.3221 330.524 37.7811 332.255 40.7333C335 45.4173 335 51.727 335 64.3465V86C335 104.856 335 114.284 329.142 120.142C323.284 126 313.856 126 295 126H40C21.1438 126 11.7157 126 5.85786 120.142C0 114.284 0 104.856 0 86V40Z"
        fill="#1D2222"
      />
    </SvgComponent>
  );
}

const styles = StyleSheet.create({
  container: { position: 'relative', minHeight: 241 },
  arrowContainer: {
    padding: 10,
    borderRadius: 9999,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
