// PaginationControl.tsx
'use client';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

export interface PaginationControlProps {
  limit: number | string; // Sửa đổi kiểu của limit thành number hoặc string
  setLimit: (limit: number | string) => void;
}

export function PaginationControl({ limit, setLimit }: PaginationControlProps): JSX.Element {
  const [isCustom, setIsCustom] = useState(false);

  return (
    <div className={cx('paginationControl')}>
      <span className={cx('paginationControlLabel')}>Số hàng trên trang :</span>
      <select
        className={cx('paginationControlSelect')}
        value={limit}
        onChange={(e) => {
          if (e.target.value == 'custom') {
            setIsCustom(true);
          } else {
            setLimit(Number(e.target.value));
            setIsCustom(false);
          }
        }}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
        {/* Thêm tùy chọn cho phép nhập limit từ người dùng */}
        <option value="custom">Custom</option>
      </select>
      {/* Hiển thị ô nhập khi người dùng chọn tùy chọn "Custom" */}
      {isCustom && <input type="number" className={cx('paginationControlInput')} value={limit} onChange={(e) => setLimit(Number(e.target.value))} />}
    </div>
  );
}
