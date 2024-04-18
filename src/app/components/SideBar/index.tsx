'use client';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { faChevronDown, faHouse, faRocket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const cx = classNames.bind(styles);

export function SideBars(): JSX.Element {
  const dataNav = [
    {
      title: 'Dashboard',
      icon: faHouse,
      link: '/dashboard',
      subMenu: [],
    },
    {
      title: 'Users',
      icon: faHouse,
      link: '/user',
      subMenu: [],
    },
    {
      title: 'Chuyển, rút tiền',
      icon: faRocket,
      // link: '/games',
      subMenu: [
        {
          title: 'Loại thanh toán',
          link: '/payment-type',
        },
        {
          title: 'Phương thức thanh toán',
          link: '/payment-method',
        },
        {
          title: 'Nạp tiền',
          link: '/deposit',
        },
        {
          title: 'Rút tiền',
          link: '/withdraw',
        },
      ],
    },
    {
      title: 'Settings',
      icon: faHouse,
      link: '/settings',
      subMenu: [],
    },
  ];

  const [navActive, setNavActive] = useState(0);

  return (
    <div className={cx('sideBar-wrapper')}>
      <div className={cx('sideBar__top')}>
        <Link href={'/'} className={cx('logos', 'flex')}>
          <Image alt="LOGO" src={'/KU_logo.svg'} height={22} width={100} className="hidden max-sm:block" />
          <Image alt="LOGO" src={'/logo.png'} height={22} width={120} className={cx('logo--pc', 'max-sm:hidden')} />
        </Link>
        <div className={cx('w-full', 'sidebar-user')}>
          <div className={cx('sidebar-user__avt-box')}>
            <Image src="/avtar-2.png" alt="Game CMS" width={80} height={80} className={cx('sidebar-user__avt')} />
          </div>
          <h4 className={cx('sidebar-user__name')}>Right Hand</h4>
          <h4 className={cx('sidebar-user__desc')}>Left Hand</h4>
        </div>
      </div>
      <nav className={cx('nav__box', 'mt-10')}>
        {dataNav.map((item, index) =>
          item.subMenu.length > 0 ? (
            <div
              className={cx('nav-multiLevel', { 'nav-border': navActive == index })}
              key={index}
              onClick={(e) => {
                setNavActive(index);
                const elementChild = document.querySelector(`.nav-parent__sub--${index}`) as HTMLDivElement;
                elementChild.style.display = elementChild.style.display === 'block' ? 'none' : 'block';
              }}>
              <div className={cx('nav-parent', { 'nav-active': navActive == index })}>
                <FontAwesomeIcon icon={item.icon} className={cx('nav-parent__icon')} />
                <span className={cx('nav-parent__title')}>{item.title}</span>
                <FontAwesomeIcon icon={faChevronDown} className={cx('nav-parent__icon--more')} />
              </div>
              <div className={cx('nav-parent__sub', `nav-parent__sub--${index}`)}>
                {item.subMenu.map((subItem, subIndex) => (
                  <Link href={subItem.link} key={subIndex} className={cx('nav-child')}>
                    {subItem.title}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link href={item.link || '/'} className={cx('nav-item', { 'nav-active': navActive == index }, { 'nav-border': navActive == index })} onClick={() => setNavActive(index)} key={index}>
              <FontAwesomeIcon icon={item.icon} className={cx('nav-parent__icon')} />
              <span className={cx('nav-parent__title')}>{item.title}</span>
            </Link>
          ),
        )}
      </nav>
    </div>
  );
}
