import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const cx = classNames.bind(styles);

export function ShowDataDetailV1({
  colorTitle,
  colorValue,
  iconTitle,
  title,
  unit,
  value,
}: {
  //
  title: string;
  value: number | string;
  unit: string;
  colorTitle?: string;
  colorValue?: string;
  iconTitle?: IconProp;
}): JSX.Element {
  return (
    <div className={cx('wrapper', 'rounded-xl')}>
      <div className={cx('header', 'flex items-center')}>
        <h3
          className={cx('header__title')}
          style={{
            color: colorTitle,
          }}>
          {title}
        </h3>
        {iconTitle && (
          <FontAwesomeIcon
            icon={iconTitle}
            style={{
              color: colorTitle,
            }}
            className={cx('header__icon')}
          />
        )}
      </div>
      <div className={cx('content', 'flex items-center')} style={{ color: colorValue }}>
        <span className={cx('content__value')}>{value}</span>
        <span className={cx('content__unit')}>{unit}</span>
      </div>
    </div>
  );
}
