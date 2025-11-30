import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { AppModal } from '../modal';
import { Icon } from './icon';
import { Input, InputProps } from './input';
import { DataList } from './list/data-list';

interface SelectInputProps<T> extends Omit<InputProps, 'defaultValue' | 'value'> {
  options: T[];
  value?: T | null;
  defaultValue?: T;
  onSelect?: (item: T) => void;
  renderItem: (item: T) => React.ReactElement;
  renderValue: (item: T | null) => string | undefined;
}

export function SelectInput<T = any>({
  value,
  options,
  onSelect,
  renderItem,
  renderValue,
  defaultValue,
  ...props
}: SelectInputProps<T>) {
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const [selected, setSelected] = useState<T | null>(value ?? defaultValue ?? null);

  useEffect(() => {
    setSelected(value ?? null);
  }, [value]);

  const handleSelect = (item: T) => {
    onSelect?.(item);
    setSelected(item);
    setShowOptions(false);
  };

  return (
    <>
      <TouchableOpacity onPress={() => setShowOptions(true)} activeOpacity={0.9}>
        <Input
          editable={false}
          endAdornment={<Icon name="ArrowDown2" />}
          value={selected ? renderValue(selected) : undefined}
          {...props}
        />
      </TouchableOpacity>

      <AppModal visible={showOptions} handleClose={() => setShowOptions(false)}>
        <DataList hideHeader data={options} renderItem={renderItem} onSelect={handleSelect} />
      </AppModal>
    </>
  );
}
