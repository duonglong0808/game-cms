import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const cx = classNames.bind(styles);

export function HeaderContent({ title, path }: { title: string; path: string }): JSX.Element {
  return (
    <div className={cx('wrapper')}>
      <h3 className={cx('title')}>{title}</h3>
      <div className={cx('body')}>
        <Link href={'/'} className={cx('body__content')}>
          Home
        </Link>
        <FontAwesomeIcon icon={faChevronRight} className={cx('body__icon')} />
        <Link href={'#'} className={cx('body__content')}>
          {path}
        </Link>
      </div>
    </div>
  );
}
