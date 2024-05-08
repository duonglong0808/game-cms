'use client';

import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import './overwiteDatePicker.css';

const cx = classNames.bind(styles);

function ShowDateFormat({ date, dateFormat }: { date: Date; dateFormat?: string }): JSX.Element {
  const dateStr = moment(date).format(dateFormat || 'YYYY-MM-DD HH:mm:ss');

  return (
    <div className={cx('box-date')}>
      <FontAwesomeIcon icon={faCalendarDays} className={cx('box-date__icon')} />
      <span className={cx('box-date__str')}>{dateStr}</span>
    </div>
  );
}

export function DatePickerCustomer({ endDate, selectsRange, startDate, onChange, dateFormat, title }: { title?: string; dateFormat?: string; startDate?: string; endDate?: string; selectsRange: boolean; onChange: ({ startDate, endDate }: { startDate: string; endDate: string }) => void }): JSX.Element {
  const [startDateCus, setStartDateCus] = useState(startDate ? new Date(startDate) : new Date());
  const [endDateCus, setEndDateCus] = useState(endDate ? new Date(endDate) : new Date());
  const [openSelectDate, setOpenSelectDate] = useState(false);

  useEffect(() => {
    if (startDateCus && endDateCus) {
      const startDateISO = moment(startDateCus).format(dateFormat || 'YYYY-MM-DD HH:mm:ss');
      const endDateISO = moment(endDateCus).format(dateFormat || 'YYYY-MM-DD HH:mm:ss');

      onChange({ startDate: startDateISO, endDate: endDateISO });
    }
  }, [startDateCus, endDateCus]);

  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('title')}>{title || 'Chọn khoảng thời gian tìm kiếm'}</h2>
      {selectsRange ? (
        <div className={cx('wrapper__date')} onClick={() => setOpenSelectDate(true)}>
          <ShowDateFormat date={startDateCus} dateFormat={dateFormat} />
          <span className={cx('wrapper__date--line')}>-</span>
          <ShowDateFormat date={endDateCus} dateFormat={dateFormat} />
        </div>
      ) : (
        <div className={cx('wrapper__date')} onClick={() => setOpenSelectDate(true)}>
          <ShowDateFormat date={startDateCus} dateFormat={dateFormat} />
        </div>
      )}
      {openSelectDate ? (
        selectsRange ? (
          <DatePicker
            dateFormat={dateFormat}
            onChange={(dates: any) => {
              console.log('🛫🛫🛫 ~ file: index.tsx:59 ~ DatePickerCustomer ~ dates:', dates);
              setStartDateCus(dates[0]);
              setEndDateCus(dates[1]);
              if (!dates?.includes(null)) setOpenSelectDate(false);

              // if (!startDateCus) setStartDateCus(dates[0]);
              // else {
              //   setEndDateCus(dates[1]);
              //   setOpenSelectDate(false);
              // }
            }}
            onClickOutside={() => setOpenSelectDate(false)}
            startDate={startDateCus}
            endDate={endDateCus}
            selectsRange={selectsRange}
            renderDayContents={(day) => <span>{day}</span>}
            inline
          />
        ) : (
          <DatePicker
            onChange={(d) => {
              console.log('onChange', d);
              setOpenSelectDate(false);
            }}
            selected={startDateCus}
            onClickOutside={() => setOpenSelectDate(false)}
            inline
          />
        )
      ) : (
        <></>
      )}
    </div>
  );
}
