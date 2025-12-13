import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { Icon } from './icon';
import { Input, InputProps } from './input';
import { DataList } from './list/data-list';
import { AppModal } from './modal';

interface SelectInputProps<T> extends Omit<InputProps, 'defaultValue' | 'value'> {
  options: T[];
  value?: T | null;
  defaultValue?: T;
  onSelect?: (item: T) => void;
  renderItem: (item: T) => React.ReactElement;
  renderValue: (item: T | null) => string | undefined;
  disabled?: boolean;
}

export function SelectInput<T = any>({
  value,
  options,
  onSelect,
  renderItem,
  renderValue,
  defaultValue,
  disabled,
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
      <TouchableOpacity
        onPress={() => setShowOptions(true)}
        activeOpacity={0.9}
        disabled={disabled}
      >
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
