'use client';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import Image from 'next/image';
import { FormGroup1 } from '@/uiCore/index';
import { useState } from 'react';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/lib';
import { handleLogin } from './ulti/handleLogin';

const cx = classNames.bind(styles);

export default function LoginPage(): JSX.Element {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <div className={cx('wrapper')}>
      <div className={cx('wrapper__container')}>
        <div className={cx('container-box__logo')}>
          <Image alt="logo" src={'/logo.png'} height={30} width={100} />
        </div>

        <form className={cx('form')} onSubmit={(e) => e.preventDefault()}>
          <FormGroup1 iconInput={faUser} label="Username" placeholder="Username" onChange={(value) => setUserName(value)} typeInput="text" value={username} key={1} />
          <FormGroup1 iconInput={faLock} label="Password" placeholder="Password" onChange={(password) => setPassword(password)} typeInput="password" value={password} key={2} />

          <div className={cx('from-bottom')}>
            <div className={cx('from-bottom__box')}>
              <input type="checkbox" value={+remember} onChange={(e) => setRemember(e.target.checked)} className={cx('from-bottom__box--check')} />
              <label className={cx('from-bottom__box--label')}>Remember Me</label>
            </div>

            <button
              type="submit"
              className={cx('from-bottom__submit', 'rounded-xl')}
              onClick={(e) => {
                if (username && password) {
                  handleLogin(username, password, Boolean(remember), router, dispatch);
                } else {
                  alert('Please enter your username and password');
                }
              }}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
