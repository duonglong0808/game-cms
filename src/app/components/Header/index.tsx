import styles from './styles.module.scss';
import { faBars, faBell, faChevronDown, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Image from 'next/image';

const cx = classNames.bind(styles);

export function Header(): JSX.Element {
  return (
    <header className={cx('header-wrapper', 'flex justify-between items-center w-full')}>
      <div className={cx('header-icon__box', 'flex items-center')}>
        <FontAwesomeIcon icon={faBars} className={cx('header-icon')} />
      </div>
      <div>
        <div className={cx('info-user', 'flex items-center')}>
          <div className={cx('header-control__box')}>
            <FontAwesomeIcon icon={faEnvelope} className={cx('header-icon__control')} />
            <FontAwesomeIcon icon={faChevronDown} className={cx('header-icon__arr--bottm')} />
          </div>

          <div className={cx('header-control__box')}>
            <FontAwesomeIcon icon={faBell} className={cx('header-icon__control')} />
            <FontAwesomeIcon icon={faChevronDown} className={cx('header-icon__arr--bottm')} />
          </div>
          <div className={cx('header-user')}>
            <div className={cx('header-user__image--box')}>
              <Image alt="Avatar" src={'/avtar-2.png'} width={30} height={30} className={cx('header-user__image')} />
            </div>
            <span className={cx('header-user__name')}>Right Hand</span>
          </div>
        </div>
      </div>
    </header>
  );
}
