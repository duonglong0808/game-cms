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
          type="number"
          placeholder="Nhập id của phiên live(option)"
          onChange={(e) => {
            onChange({ gameDiceId: e.target.value });
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
          type="number"
          placeholder="Nhập id chi tiết của phiên(option)"
          onChange={(e) => {
            onChange({ diceDetailId: e.target.value });
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
          type="number"
          placeholder="Id user(option)"
          onChange={(e) => {
            onChange({ userId: e.target.value });
          }}
        />
      </div>

      <button
        className={cx('group__submit--reset', 'mr-3 bg-gray-500')}
        onClick={() => {
          dispatch(resetDataDicePlayHistory());
        }}>
        Đặt lại
      </button>
      <button
        className={cx('group__submit')}
        onClick={() => {
          dispatch(setStatusSubmitDicePlayHistory({ submitted: true }));
        }}>
        Áp dụng
      </button>
    </div>
  );
}
