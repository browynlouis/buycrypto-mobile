import React, { useState } from 'react';
import { FlatList, FlatListProps, Pressable } from 'react-native';

import { Header } from '../../header';
import { Icon } from '../icon';
import { Input } from '../input';

export function DataList<T>({
  data = [],
  onSelect,
  onCancel,
  hideSearch = false,
  hideHeader = false,
  filterFn,
  separator,
  component,
  headerTitle,
}: {
  data?: T[];
  onSelect?: (item: T) => void;
  onCancel?: () => void;
  hideSearch?: boolean;
  hideHeader?: boolean;
  filterFn?: (value: string, data: T[]) => any[];
  component: (item: T) => React.JSX.Element;
  separator?: FlatListProps<T>['ItemSeparatorComponent'];
  headerTitle?: string;
}) {
  const [filter, setFilter] = useState('');

  let filteredData: T[] = hideSearch ? data : (filterFn?.(filter, data) ?? []);

  const items = [
    ...(hideHeader
      ? []
      : [
          {
            id: 'listHeader',
            component: (
              <>
                <Header title={headerTitle} onBack={() => onCancel?.()} />
              </>
            ),
          },
        ]),
    ...(hideSearch
      ? []
      : [
          {
            id: 'searchInput',
            component: (
              <Input
                placeholder="Search..."
                onChangeText={(text) => setFilter(text)}
                startAdornment={<Icon name="SearchNormal" />}
              />
            ),
          },
        ]),
    ...filteredData.map((item, index) => {
      return {
        id: index.toString(),
        component: (
          <Pressable
            onPress={() => {
              onSelect?.(item);
            }}
          >
            {component(item)}
          </Pressable>
        ),
      };
    }),
  ];

  return (
    <FlatList
      data={items}
      extraData
      keyExtractor={(item) => item.id}
      stickyHeaderIndices={[0]}
      renderItem={({ item }) => item.component}
      ItemSeparatorComponent={separator}
    />
  );
}
