'use client';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from '@/lib';
import { TypePaymentTranSaction } from '@/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { setTypePaymentTransaction } from '@/lib/redux/app/paymentTransaction.slice';

const cx = classNames.bind(styles);

export function OptionPaymentTransaction(): JSX.Element {
  const { type } = useAppSelector((state) => state.paymentTransaction);
  const [openOption, setOpenOption] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <div className={cx('wrapper')}>
      <h3 className={cx('title', 'text-base')}>Chọn dữ liệu</h3>
      <div className={cx('body')}>
        <div className={cx('result__box', 'rounded-md')} onClick={() => setOpenOption((pre) => !pre)}>
          <p className={cx('result__text', 'flex-1')}>{type == TypePaymentTranSaction.deposit ? 'Nạp tiền' : 'Rút tiền'}</p>
          <FontAwesomeIcon className={cx('result__icon')} icon={faCaretDown} />
        </div>
        <ul className={cx('option__list', { show__option: openOption })}>
          <li
            className={cx('option__item--top')}
            onClick={() => {
              dispatch(setTypePaymentTransaction({ type: TypePaymentTranSaction.deposit }));
              setOpenOption((pre) => !pre);
            }}>
            Nạp tiền
          </li>
          <li
            className={cx('option__item--bottom')}
            onClick={() => {
              dispatch(setTypePaymentTransaction({ type: TypePaymentTranSaction.withdrawMoney }));
              setOpenOption((pre) => !pre);
            }}>
            Rút tiền
          </li>
        </ul>
      </div>
    </div>
  );
}
