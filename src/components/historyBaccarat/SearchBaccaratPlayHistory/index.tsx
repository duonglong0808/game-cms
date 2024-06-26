'use client';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { useAppDispatch } from '@/lib';
import { resetDataBaccaratPlayHistory, setQueryBaccaratPlayHistory, setStatusSubmitBaccaratPlayHistory } from '@/lib/redux/app/baccaratPlayHistory.slice';
import { useState } from 'react';

const cx = classNames.bind(styles);

export function SearchBaccaratPlayHistory(): JSX.Element {
  const [gameBaccarat, setGameBaccarat] = useState('');
  const [baccaratDetail, setBaccaratDetail] = useState('');
  const [user, setUser] = useState('');
  const dispatch = useAppDispatch();

  const setQuerySearch = () => {
    dispatch(
      setQueryBaccaratPlayHistory({
        userId: user,
        baccaratDetailId: baccaratDetail,
        gameBaccaratId: gameBaccarat,
      }),
    );
  };

  return (
    <div className={cx('wrapper', 'flex items-end')}>
      <div className={cx('group-item')}>
        <label className={cx('group-item__label')} htmlFor="gameBaccarat">
          Id live
        </label>
        <input
          className={cx('group-item__input')}
          id="gameBaccarat"
          name="gameBaccarat"
          value={gameBaccarat}
          type="text"
          placeholder="Nhập id của phiên live(option)"
          onChange={(e) => {
            if (+e.target.value > 0) {
              setGameBaccarat(e.target.value);
            } else {
              setGameBaccarat('');
            }
          }}
        />
      </div>

      <div className={cx('group-item')}>
        <label className={cx('group-item__label')} htmlFor="baccaratDetail">
          Id chi tiết phiên game
        </label>
        <input
          className={cx('group-item__input')}
          id="baccaratDetail"
          name="baccaratDetail"
          value={baccaratDetail}
          type="text"
          placeholder="Nhập id chi tiết của phiên(option)"
          onChange={(e) => {
            console.log('🚀 ~ SearchDeicePlayHistory ~ e.target.value:', e.target.value);
            if (+e.target.value > 0) {
              setBaccaratDetail(e.target.value);
            } else {
              setBaccaratDetail('');
            }
          }}
        />
      </div>

      <div className={cx('group-item')}>
        <label className={cx('group-item__label')} htmlFor="user">
          Id user
        </label>
        <input
          className={cx('group-item__input')}
          id="user"
          name="user"
          value={user}
          type="text"
          placeholder="Id user(option)"
          onChange={(e) => {
            if (+e.target.value > 0) {
              setUser(e.target.value);
            } else {
              setUser('');
            }
          }}
        />
      </div>

      <button
        className={cx('group__submit--reset', 'mr-3 bg-gray-500 text-white')}
        onClick={() => {
          dispatch(resetDataBaccaratPlayHistory());
        }}>
        Đặt lại
      </button>
      <button
        className={cx('group__submit', 'text-white')}
        onClick={() => {
          setQuerySearch();
          dispatch(setStatusSubmitBaccaratPlayHistory({ submitted: true }));
        }}>
        Áp dụng
      </button>
    </div>
  );
}
