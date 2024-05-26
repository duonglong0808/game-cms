'use client';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from '@/lib';
import { StatusPaymentTranSaction, TypePaymentTranSaction } from '@/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { setDateRangerPaymentTrans, setQueryPaymentTransaction, setSubmitDateRangerPaymentTrans } from '@/lib/redux/app/paymentTransaction.slice';
import { DatePickerCustomer } from '@/uiCore';

const cx = classNames.bind(styles);

export function OptionPaymentTransaction(): JSX.Element {
  const { type, status, dateFrom, dateTo } = useAppSelector((state) => state.paymentTransaction);
  const [openOption, setOpenOption] = useState(false);
  const [openOptionStatus, setOpenOptionStatus] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <div className={cx('wrapper')}>
      <h3 className={cx('title', 'text-base')}>Chọn dữ liệu</h3>
      <div className="flex items-center">
        <div className={cx('body__item', 'mr-6')}>
          <h3 className={cx('body__item--title')}>Chọn trạng thái giao dịch</h3>

          <div className={cx('result__box', 'rounded-md')} onClick={() => setOpenOption((pre) => !pre)}>
            <p className={cx('result__text', 'flex-1')}>{type == TypePaymentTranSaction.deposit ? 'Nạp tiền' : 'Rút tiền'}</p>
            <FontAwesomeIcon className={cx('result__icon')} icon={faCaretDown} />
          </div>
          <ul className={cx('option__list', { show__option: openOption })}>
            <li
              className={cx('option__item--top')}
              onClick={() => {
                dispatch(setQueryPaymentTransaction({ type: TypePaymentTranSaction.deposit }));
                setOpenOption((pre) => !pre);
              }}>
              Nạp tiền
            </li>
            <li
              className={cx('option__item--bottom')}
              onClick={() => {
                dispatch(setQueryPaymentTransaction({ type: TypePaymentTranSaction.withdrawMoney }));
                setOpenOption((pre) => !pre);
              }}>
              Rút tiền
            </li>
          </ul>
        </div>
        <div className={cx('body__item', 'mr-6')}>
          <h3 className={cx('body__item--title')}>Chọn trạng thái giao dịch</h3>
          <div className={cx('result__box', 'rounded-md')} onClick={() => setOpenOptionStatus((pre) => !pre)}>
            <p className={cx('result__text', 'flex-1')}>{status === StatusPaymentTranSaction.processing ? 'Đang chờ' : status === StatusPaymentTranSaction.success ? 'Thành công' : status === StatusPaymentTranSaction.cancel ? 'Hủy bỏ' : 'Tất cả'}</p>
            <FontAwesomeIcon className={cx('result__icon')} icon={faCaretDown} />
          </div>
          <ul className={cx('option__list', { show__option: openOptionStatus })}>
            <li
              className={cx('option__item--top')}
              onClick={() => {
                dispatch(setQueryPaymentTransaction({ status: StatusPaymentTranSaction.processing }));
                setOpenOptionStatus((pre) => !pre);
              }}>
              Đang chờ
            </li>
            <li
              className={cx('option__item--top')}
              onClick={() => {
                console.log('hìa');
                dispatch(setQueryPaymentTransaction({ status: StatusPaymentTranSaction.success }));
                setOpenOptionStatus((pre) => !pre);
              }}>
              Thành công
            </li>

            <li
              className={cx('option__item--top')}
              onClick={() => {
                dispatch(setQueryPaymentTransaction({ status: StatusPaymentTranSaction.cancel }));
                setOpenOptionStatus((pre) => !pre);
              }}>
              Hủy bỏ
            </li>
            <li
              className={cx('option__item--top')}
              onClick={() => {
                dispatch(setQueryPaymentTransaction({ status: '' }));
                setOpenOptionStatus((pre) => !pre);
              }}>
              Tất cả
            </li>
          </ul>
        </div>
        <div className="body__item">
          <DatePickerCustomer
            dateFormat="YYYY-MM-DD"
            onChange={(data) => {
              dispatch(setDateRangerPaymentTrans({ dateFrom: data.startDate, dateTo: data.endDate }));
            }}
            startDate={dateFrom}
            endDate={dateTo}
            selectsRange={true}
          />
        </div>

        <button
          className={cx('body__submit')}
          onClick={() => {
            dispatch(setSubmitDateRangerPaymentTrans({ submit: true }));
          }}>
          Áp dụng
        </button>
      </div>
    </div>
  );
}
