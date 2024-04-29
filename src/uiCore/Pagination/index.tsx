'use client';
import classNames from 'classnames/bind';
import styles from './pagination.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function getNumberPageDisplay(page: number, countPage: number) {
  const arrPage = [];
  if (page - 1 > 0) {
    arrPage.push(page - 1);
  }
  arrPage.push(page);
  if (page + 1 <= countPage) {
    arrPage.push(page + 1);
  }
  return arrPage;
}

function Pagination(params: {
  count: number; //Tổng số phần tử
  limit: number; //Số phần tử 1 trang
  page: number;
  setPage: (page: number) => void;
}) {
  const { count, limit, page, setPage } = params;
  const countPage = Math.ceil(count / limit) ? Math.ceil(count / limit) : 1;
  const arrPage = getNumberPageDisplay(page, countPage);

  return (
    <div className={cx('wrapper')}>
      <ul className={cx('pagination__box')}>
        <li
          className={page === 1 ? cx('pagination__item--change', 'not__selected') : cx('pagination__item--change')}
          onClick={() => {
            if (page > 1) {
              setPage(page - 1);
            }
          }}>
          <FontAwesomeIcon icon={faChevronLeft} className={cx('pagination__icon')} />
        </li>
        {page - 1 > 1 ? <li className={cx('pagination__dot')}>. . .</li> : <></>}
        {arrPage.map((itemPage, index) => (
          <li className={itemPage === page ? cx('pagination__item', 'active') : cx('pagination__item')} key={index} onClick={() => setPage(itemPage)}>
            {itemPage}
          </li>
        ))}
        {page + 1 < countPage ? <li className={cx('pagination__dot')}>. . .</li> : <></>}
        <li
          className={page === countPage ? cx('pagination__item--change', 'not__selected') : cx('pagination__item--change')}
          onClick={() => {
            if (page !== countPage) {
              setPage(page + 1);
            }
          }}>
          <FontAwesomeIcon className={cx('pagination__icon')} icon={faChevronRight} />
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
