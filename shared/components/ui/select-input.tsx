import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { AppModal } from '../modal';
import { Icon } from './icon';
import { Input, InputProps } from './input';
import { DataList } from './list/data-list';

interface SelectInputProps<T> extends InputProps {
  options: T[];
  onSelect?: (item: T) => void;
  renderItem?: (item: T) => React.ReactElement;
  renderValue?: (item: T | null) => string;
}

export function SelectInput<T = any>({
  options,
  onSelect,
  renderItem,
  renderValue,
  ...props
}: SelectInputProps<T>) {
  const [selected, setSelected] = useState<T | null>(null);
  const [showOptions, setShowOptions] = useState<boolean>(false);

  useEffect(() => {
    if (options && options.length) {
      setSelected(options[0] ?? null);
    }
  }, [options]);

  useEffect(() => {
    if (selected) onSelect?.(selected);
  }, [selected]);

  return (
    <>
      <TouchableOpacity onPress={() => setShowOptions(true)} activeOpacity={0.9}>
        <Input
          editable={false}
          value={renderValue?.(selected)}
          endAdornment={<Icon name="ArrowDown2" />}
          {...props}
        />
      </TouchableOpacity>

      <AppModal visible={showOptions} handleClose={() => setShowOptions(false)}>
        <DataList
          hideHeader
          data={options}
          onSelect={(item) => {
            setSelected(item);
            setShowOptions(false);
          }}
          component={(item) => <>{renderItem?.(item)}</>}
        />
      </AppModal>
    </>
  );
}
