'use client';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from '@/lib';
import { resetDataDicePlayHistory, setQueryDicePlayHistory, setStatusSubmitDicePlayHistory } from '@/lib/redux/app/dicePlayHistory.slice';

const cx = classNames.bind(styles);

export function SearchDeicePlayHistory(): JSX.Element {
  const { gameDiceId, diceDetailId, userId } = useAppSelector((state) => state.dicePlayHistory);
  console.log('🛫🛫🛫 ~ file: index.tsx:10 ~ SearchDeicePlayHistory ~ gameDiceId, diceDetailId, userId:', gameDiceId, diceDetailId, userId);
  const dispatch = useAppDispatch();

  const onChange = (data: any) => {
    dispatch(setQueryDicePlayHistory(data));
  };

  return (
    <div className={cx('wrapper', 'flex items-end')}>
      <div className={cx('group-item')}>
        <label className={cx('group-item__label')} htmlFor="gameDiceId">
          Id live
        </label>
        <input
          className={cx('group-item__input')}
          id="gameDiceId"
          name="gameDiceId"
          value={gameDiceId}
          type="text"
          placeholder="Nhập id của phiên live(option)"
          onChange={(e) => {
            if (+e.target.value > 0) {
              onChange({ gameDiceId: e.target.value });
            } else {
              console.log('celanm');
              onChange({ gameDiceId: '' });
            }
          }}
        />
      </div>

      <div className={cx('group-item')}>
        <label className={cx('group-item__label')} htmlFor="diceDetailId">
          Id chi tiết phiên game
        </label>
        <input
          className={cx('group-item__input')}
          id="diceDetailId"
          name="diceDetailId"
          value={diceDetailId}
          type="text"
          placeholder="Nhập id chi tiết của phiên(option)"
          onChange={(e) => {
            console.log('🚀 ~ SearchDeicePlayHistory ~ e.target.value:', e.target.value);
            if (Number(e.target.value) > 0) {
              onChange({ diceDetailId: e.target.value });
            } else {
              onChange({ diceDetailId: '' });
            }
          }}
        />
      </div>

      <div className={cx('group-item')}>
        <label className={cx('group-item__label')} htmlFor="userId">
          Id user
        </label>
        <input
          className={cx('group-item__input')}
          id="userId"
          name="userId"
          value={userId}
          type="text"
          placeholder="Id user(option)"
          onChange={(e) => {
            if (Number(e.target.value) > 0) {
              onChange({ userId: e.target.value });
            } else {
              onChange({ userId: '' });
            }
          }}
        />
      </div>

      <button
        className={cx('group__submit--reset', 'mr-3 bg-gray-500 text-white')}
        onClick={() => {
          dispatch(resetDataDicePlayHistory());
        }}>
        Đặt lại
      </button>
      <button
        className={cx('group__submit', 'text-white')}
        onClick={() => {
          dispatch(setStatusSubmitDicePlayHistory({ submitted: true }));
        }}>
        Áp dụng
      </button>
    </div>
  );
}
