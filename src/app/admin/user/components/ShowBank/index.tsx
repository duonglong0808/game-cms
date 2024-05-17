import styles from './styles.module.scss';
import Table from '@/uiCore/Table';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/lib';
import { PopupEditOrAddV1 } from '@/uiCore';
import { setDataPaymentBanks } from '@/lib/redux/app/payment.slice';
import { dataBankStatics } from '@/constants';
import { getBankByUserId } from '../../utils/api';

const cx = classNames.bind(styles);

export function ShowBankUser({ userId, setUserCheckBank }: { userId: number; setUserCheckBank: (id: any) => void }): JSX.Element {
  const [dataBank, setDataBank] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await getBankByUserId(userId);
      if (res?.data) {
        setDataBank(res.data?.data);
      }
    }

    fetchData();
  }, []);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('body__header')}>
        <h1 className={cx('body__header--text', 'flex-1 ')}>{'Danh sách ngân hàng'}</h1>
        <FontAwesomeIcon className={cx('body__header--icon')} icon={faXmark} onClick={() => setUserCheckBank('')} />
      </div>

      <div className={cx('min-h-full flex-1')}>
        {dataBank.length ? (
          <Table
            // columnNotShow={['slug']}
            columnNotShow={['binBank', 'isDeleted', 'deletedAt', 'updatedAt', 'userId']}
            textColor="black"
            data={dataBank}
            columnDelete={false}
            columnEdit={false}
            // handleDelete={(id) => {
            //   handleDeleteBankPayment(userId, id, dispatch);
            // }}

            // handleEdit={(id) => {}}
          />
        ) : (
          <h2 className="text-center text-xl text-gray-700">Không có dữ liệu phù hợp !!</h2>
        )}
      </div>
    </div>
  );
}
