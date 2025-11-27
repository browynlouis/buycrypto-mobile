import React, { useRef } from 'react';
import {
  Animated,
  LayoutChangeEvent,
  ScrollView,
  TouchableOpacity,
  View,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';
import { SceneRendererProps, TabBarProps, TabView, TabViewProps } from 'react-native-tab-view';
import styled from 'styled-components/native';

import { Text } from './text';

type Route = {
  key: string;
  title: string;
};

type Props<T extends Route> = {
  routes: T[];
  renderScene: (props: SceneRendererProps & { route: T }) => React.ReactNode;
  initialIndex?: number;
  onIndexChange?: (index: number) => void;
  showUnderline?: boolean;
  stickyHeader?: boolean;
  renderLazyPlaceholder?: TabViewProps<T>['renderLazyPlaceholder'];
  lazy?: boolean;
  headerStyle?: ViewStyle;
  swipeEnabled?: boolean;
};

export function TabbedView<T extends Route>({
  routes,
  renderScene,
  initialIndex = 0,
  onIndexChange,
  showUnderline = false,
  stickyHeader = true,
  lazy = true,
  renderLazyPlaceholder,
  headerStyle,
  swipeEnabled = true,
}: Props<T>) {
  const [index, setIndex] = React.useState(initialIndex);
  const [isInitialized, setIsInitialized] = React.useState(false);

  const layout = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const tabRefs = useRef<{ [key: number]: { x: number; width: number } }>({});
  const underlineLeft = useRef(new Animated.Value(0)).current;
  const underlineWidth = useRef(new Animated.Value(0)).current;

  const updateUnderline = (targetIndex: number, animated: boolean = true) => {
    if (!showUnderline) return;

    const tabInfo = tabRefs.current[targetIndex];

    if (!tabInfo) return;

    const animations = [
      Animated.timing(underlineLeft, {
        toValue: tabInfo.x,
        duration: animated ? 200 : 0,
        useNativeDriver: false,
      }),
      Animated.timing(underlineWidth, {
        toValue: tabInfo.width,
        duration: animated ? 200 : 0,
        useNativeDriver: false,
      }),
    ];

    if (animated) {
      Animated.parallel(animations).start();
    } else {
      underlineLeft.setValue(tabInfo.x);
      underlineWidth.setValue(tabInfo.width);
    }
  };

  const handleIndexChange = (newIndex: number) => {
    setIndex(newIndex);
    onIndexChange?.(newIndex);
    updateUnderline(newIndex, true);

    const tabInfo = tabRefs.current[newIndex];

    if (tabInfo) {
      const tabCenter = tabInfo.x + tabInfo.width / 2;
      const viewportCenter = layout.width / 2;
      let scrollX = tabCenter - viewportCenter;

      const totalTabs = routes.length;
      const lastTabInfo = tabRefs.current[totalTabs - 1];

      if (lastTabInfo) {
        const maxScrollX = lastTabInfo.x + lastTabInfo.width + 16 - layout.width;
        scrollX = Math.max(0, Math.min(scrollX, maxScrollX));
      } else {
        scrollX = Math.max(0, scrollX);
      }

      scrollRef.current?.scrollTo({ x: scrollX, animated: true });
    }
  };

  const onTabLayout = (tabIndex: number) => (event: LayoutChangeEvent) => {
    const { x, width } = event.nativeEvent.layout;

    tabRefs.current[tabIndex] = { x, width };

    if (tabIndex === index && !isInitialized && showUnderline) {
      updateUnderline(index, false);
      setIsInitialized(true);
    }
  };

  React.useEffect(() => {
    if (isInitialized && showUnderline) {
      updateUnderline(index, true);
    }
  }, [index, isInitialized, showUnderline]);

  const renderTabBar = (props: TabBarProps<T>) => {
    const inputRange = props.navigationState.routes.map((_, i) => i);

    return (
      <View style={{ position: 'relative' }}>
        <TabBarScroll
          horizontal
          ref={scrollRef}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[headerStyle]}
        >
          {props.navigationState.routes.map((route, i) => {
            const opacity = props.position.interpolate({
              inputRange,
              outputRange: inputRange.map((inputIndex) => (inputIndex === i ? 1 : 0.5)),
            });

            return (
              <TabButton
                key={i}
                onPress={() => handleIndexChange(i)}
                onLayout={onTabLayout(i)}
                activeOpacity={0.7}
              >
                <Animated.View style={{ opacity }}>
                  <Text size="text-md" weight={700}>
                    {route.title}
                  </Text>
                </Animated.View>
              </TabButton>
            );
          })}

          {showUnderline && (
            <AnimatedUnderline
              style={{
                left: underlineLeft,
                width: underlineWidth,
                opacity: isInitialized ? 1 : 0,
              }}
            />
          )}
        </TabBarScroll>
      </View>
    );
  };

  return (
    <TabView
      lazy={lazy}
      renderLazyPlaceholder={renderLazyPlaceholder}
      swipeEnabled={swipeEnabled}
      renderTabBar={stickyHeader ? renderTabBar : () => null}
      navigationState={{ index, routes }}
      renderScene={(sceneProps) => {
        return (
          <SceneWrapper>
            {!stickyHeader &&
              renderTabBar({
                navigationState: { index, routes },
                position: sceneProps.position,
                jumpTo: sceneProps.jumpTo,
                layout: sceneProps.layout,
              })}
            {renderScene(sceneProps)}
          </SceneWrapper>
        );
      }}
      onIndexChange={handleIndexChange}
      initialLayout={{ width: layout.width }}
    />
  );
}

/*   ------------------------  Styled Components   ------------------------   */

const TabBarScroll = styled(ScrollView).attrs(() => ({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
}))`
  max-height: 40px;
  position: relative;
  flex-direction: row;
  padding: 0px 0px;
`;

const TabButton = styled(TouchableOpacity)`
  margin-right: 18px;
  height: 20px;
  align-items: center;
  justify-content: center;
`;

const AnimatedUnderline = styled(Animated.View)`
  position: absolute;
  height: 2.5px;
  bottom: -1px;
  background-color: ${(props) => props.theme.colors.Primary[500]};
`;

const SceneWrapper = styled.View`
  flex: 1;
  margin-top: 12px;
`;
