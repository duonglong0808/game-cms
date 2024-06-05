'use client';

import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './blockNotificationNetWork.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faLinkSlash, faWifi } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function WrapperNotificationNetWork(params: { backgroundColor?: string; color?: string }) {
  const { backgroundColor, color } = params;
  const status = useRef('online');
  const open = useRef(false);
  const forceUpdate = useState(false)[1];
  const heading = status.current === 'offline' ? 'Bạn đang offline.' : 'Đã khôi phục kết nối Internet.';

  useEffect(() => {
    const updateOnline = () => {
      status.current = 'online';
      open.current = true;
      forceUpdate((pre) => !pre);
    };

    const updateOffline = () => {
      status.current = 'offline';
      open.current = true;
      forceUpdate((pre) => !pre);
    };

    window.addEventListener('online', updateOnline);
    window.addEventListener('offline', updateOffline);

    return () => {
      window.removeEventListener('online', updateOnline);
      window.removeEventListener('offline', updateOffline);
    };
    // eslint-disable-next-line
  }, []);
  // if (open.current && status.current === 'online') {
  //     setTimeout(() => {
  //         open.current = false;
  //         forceUpdate((pre) => !pre);
  //     }, 5000);
  // }
  if (!open.current) return null;

  return (
    <div className={cx('wrapper')} style={{ backgroundColor: backgroundColor, color: color }}>
      <div className={status.current === 'online' ? cx('box__icon--online') : cx('box__icon')}>
        <FontAwesomeIcon className={status.current === 'online' ? cx('icon__wifi--online') : cx('icon__wifi')} icon={status.current === 'online' ? faWifi : faLinkSlash} />
      </div>
      <h4 className={cx('heading')} style={{ color: color }}>
        {heading}
      </h4>
      <div
        className={cx('box__icon--close')}
        onClick={() => {
          open.current = false;
          forceUpdate((pre) => !pre);
        }}>
        <FontAwesomeIcon icon={faXmark} className={cx('icon__close')} color={color} />
      </div>
    </div>
  );
}

WrapperNotificationNetWork.propTypes = {
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
};

export default WrapperNotificationNetWork;
