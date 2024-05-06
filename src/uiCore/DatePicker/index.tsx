import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.css';

export function DatePickerCustomer({ endDate, selectsRange, startDate, onChange }: { startDate?: string; endDate?: string; selectsRange: boolean; onChange: ({ startDate, endDate }: { startDate: string; endDate: string }) => void }): JSX.Element {
  const [startDateCus, setStartDateCus] = useState(startDate ? new Date(startDate) : new Date());
  const [endDateCus, setEndDateCus] = useState(endDate ? new Date(endDate) : new Date());

  useEffect(() => {
    if (startDateCus && endDateCus) {
      const startDateISO = new Date(startDateCus).toISOString();
      const endDateISO = new Date(endDateCus).toISOString();

      onChange({ startDate: startDateISO, endDate: endDateISO });
    }
  }, [startDateCus, endDateCus]);

  if (selectsRange) {
    return (
      <DatePicker
        onChange={(dates: any) => {
          if (!startDateCus) setStartDateCus(dates[0]);
          else {
            setEndDateCus(dates[1]);
          }
        }}
        startDate={startDateCus}
        endDate={endDateCus}
        selectsRange={selectsRange}
        renderDayContents={(day) => <span>{day}</span>}
        inline
      />
    );
  } else {
    return (
      <DatePicker
        onChange={(d) => {
          console.log('onChange', d);
        }}
        selected={startDateCus}
        inline
      />
    );
  }
}
