// Expo icon sets
import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
} from '@expo/vector-icons';
import * as Iconsax from 'iconsax-react-nativejs';
import React from 'react';
import { ViewStyle } from 'react-native';

import { useAppTheme } from '../providers/theme-provider/hooks';

// Map icon families
const ICON_FAMILIES = {
  Ionicons,
  MaterialIcons,
  Feather,
  FontAwesome,
  AntDesign,
  Entypo,
  EvilIcons,
  FontAwesome5,
  FontAwesome6,
  Fontisto,
  Foundation,
  MaterialCommunityIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
  Iconsax, // Add Iconsax as a valid family
};

export type IconFamily = keyof typeof ICON_FAMILIES;

interface IconProps {
  /** The icon name within the chosen family */
  name: string;
  /** Icon family (e.g., 'Feather', 'Iconsax', 'Ionicons') */
  family?: IconFamily;
  /** Size in pixels */
  size?: 'sm' | 'md' | 'lg' | number;
  /** Icon color */
  color?: string;
  /** Optional style */
  style?: ViewStyle;
  /** Iconsax only: variant (Bold, Broken, Linear, Outline, etc.) */
  variant?: 'Bold' | 'Broken' | 'Bulk' | 'Linear' | 'Outline' | 'TwoTone';
}

/**
 * Universal Icon Component
 * Supports Expo Vector Icons and Iconsax React Native.
 *
 * Example usage:
 * ```tsx
 * <AppIcon family="Feather" name="user" size={24} color="#fff" />
 * <AppIcon family="Iconsax" name="Heart" variant="Bold" color="tomato" />
 * ```
 */
export const Icon: React.FC<IconProps> = ({
  name,
  family = 'Iconsax',
  size = 'md',
  color,
  style,
  variant = 'Broken',
}) => {
  const theme = useAppTheme();

  let iconSize: number;
  const IconSet = ICON_FAMILIES[family];

  switch (size) {
    case 'sm':
      iconSize = 20;
      break;
    case 'lg':
      iconSize = 28;
    case 'md':
    default:
      iconSize = 24;
      break;
  }

  if (typeof size === 'number') {
    iconSize = size;
  }

  // Handle Iconsax separately
  if (family === 'Iconsax') {
    const IconComponent = (Iconsax as any)[name];

    if (!IconComponent) return null;

    return (
      <IconComponent
        size={iconSize}
        color={color ?? theme.colors.Neutral[400]}
        variant={variant}
        style={style}
      />
    );
  }

  // Handle Expo vector icons
  if (!IconSet) return null;

  return (
    <IconSet
      name={name as any}
      size={iconSize}
      color={color ?? theme.colors.Neutral[400]}
      style={style}
    />
  );
};
