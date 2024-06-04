'use client';

import styles from './styles.module.scss';
import { faBars, faBell, faChevronDown, faEnvelope, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { checkAndFetchDataUser } from './until/handleHeader';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib';

const cx = classNames.bind(styles);

export function Header(): JSX.Element {
  const { name } = useAppSelector((state) => state.userCurrent);
  const router = useRouter();
  const [openOptions, setOpenOption] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      checkAndFetchDataUser(dispatch, router);
    }

    fetchData();
  }, []);

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
          <div className={cx('header-user')} onClick={() => setOpenOption((pre) => !pre)}>
            <div className={cx('header-user__image--box')}>
              <Image alt="Avatar" src={'/avtar-2.png'} width={30} height={30} className={cx('header-user__image')} />
            </div>
            <span className={cx('header-user__name')}>{name}</span>

            <div className={cx('absolute w-[132px] bg-white transition-all', { '-bottom-14 right-0': openOptions, 'bottom-20 -right-full': !openOptions })}>
              <div className="flex items-center px-2 py-2 shadow-[0_6px_15px_0_#0000004d]">
                <span className="block mr-3 text-black">Đăng xuất</span>
                <FontAwesomeIcon icon={faSignOut} className={cx('header-icon__control')} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
