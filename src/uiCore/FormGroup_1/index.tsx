import classNames from 'classnames/bind';
import style from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, faUser } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(style);

export function FormGroup1({ label, onBlur, placeholder, onChange, typeInput, value, iconInput }: { value: any; onChange: (value: any) => void; onBlur?: () => {}; label: string; placeholder: string; typeInput: string; iconInput: IconDefinition }): JSX.Element {
  return (
    <div className={cx('fromGroup__wrapper')}>
      <label className={cx('fromGroup__label')}>{label}</label>
      <div className={cx('fromGroup__body')}>
        <input type={typeInput} placeholder={placeholder} className={cx('fromGroup__body--input')} value={value} onChange={(e) => onChange(e.target.value)} />
        <FontAwesomeIcon icon={iconInput} className={cx('fromGroup__body--icon')} />
      </div>
    </div>
  );
}
