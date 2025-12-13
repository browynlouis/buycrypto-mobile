import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { Icon } from './icon';
import { Input } from './input';

interface DatePickerProps {
  value: Date;
  disabled?: boolean;
  onChange: (date?: Date) => void;
}

export function DatePicker({ disabled, value, onChange }: DatePickerProps) {
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <TouchableOpacity onPress={() => setShow(true)} activeOpacity={0.9} disabled={disabled}>
        <Input
          editable={false}
          startAdornment={<Icon name="Clock" />}
          value={value ? value.toDateString() : undefined}
        />
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={value}
          onChange={(e, date) => {
            onChange(date);
            setShow(false);
          }}
          mode="date"
          display="calendar"
          onTouchCancel={() => setShow(false)}
          maximumDate={new Date()}
          minimumDate={new Date(1920, 1, 1)}
        />
      )}
    </>
  );
}
