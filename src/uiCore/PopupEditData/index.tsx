import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useAppDispatch } from '@/lib';

const cx = classNames.bind(styles);

export interface DataEditDto {
  id: number;
  title?: string;
  textWarning?: string;
  data: {
    name: string;
    label: string;
    type: string;
    value: string | number;
    readOnly: boolean;
    dataOption?: {
      text?: string;
      value?: string | number;
    }[];
    canUpdate?: false;
  }[];
  onSubmit: (id: number, data: any, dispatch: any) => void;
  onCancel: () => {};
}

export function PopupEditTransaction({ id, data, onCancel, onSubmit, title, textWarning }: DataEditDto) {
  const [dataState, setDataState] = useState(data);
  const isUnableBtn = dataState.some((item) => item.canUpdate);

  const dispatch = useAppDispatch();

  return (
    <div className={cx('wrapper')}>
      <div className={cx('group__list')}>
        <div className={cx('body__header')}>
          <h1 className={cx('body__header--text', 'flex-1 ')}>{title || 'Cập nhật quá trình giao dịch'}</h1>
          <FontAwesomeIcon className={cx('body__header--icon')} icon={faXmark} onClick={onCancel} />
        </div>
        {textWarning && <p className={cx('wrapper__warning', 'text-center text-red-500 mb-1 text-sm')}>{textWarning}</p>}
        {dataState.map((col, index) => (
          <div key={index} className={cx('group__data')}>
            <label className={cx('group__data--label')}>{col.label}</label>
            {col.type != 'options' ? (
              <input value={col.value ?? ''} readOnly={col.readOnly} className={cx('group__data--input', { 'group__data--input-readOnly': col.readOnly })} />
            ) : (
              <select
                className={cx('group__data--select')}
                name={col.name}
                onChange={(e) => {
                  //   const element = e.target as HTMLOptionElement;
                  setDataState((pre) => {
                    const dataNew = pre.map((item) => {
                      if (item.name === col.name) {
                        return {
                          ...item,
                          value: e.target.value,
                        };
                      } else {
                        return item;
                      }
                    });
                    return dataNew;
                  });
                }}>
                {col.dataOption?.map((val, index) => (
                  <option key={index} className={cx('group__data--option')} value={val.value} selected={col.value == val.value}>
                    {val.text}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
        <div className="flex justify-center">
          <button
            disabled={!isUnableBtn}
            className={cx('submit-btn', 'rounded-xl disabled:cursor-not-allowed disabled:bg-zinc-500')}
            onClick={() => {
              const dataSend: any = {};
              dataState.forEach((item, index) => {
                if (item.canUpdate) {
                  dataSend[item.name] = item.value;
                }
              });
              onSubmit(id, dataSend, dispatch);
            }}>
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
