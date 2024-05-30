import styles from './styles.module.scss';
import Table from '@/uiCore/Table';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/lib';
import { ItemAddOrUpdateDto, PopupEditOrAddV1 } from '@/uiCore';
import { setDataPaymentBanks } from '@/lib/redux/app/payment.slice';
import { dataBankStatics } from '@/constants';
import { getBankByUserId, updateBank } from '../utils/api';

const cx = classNames.bind(styles);

export function ShowBankUser({ userId, setUserCheckBank }: { userId: number; setUserCheckBank: (id: any) => void }): JSX.Element {
  const [dataBank, setDataBank] = useState<any>([]);
  const [refresh, setRefresh] = useState(true);
  const [idBankEdit, setIdBankEdit] = useState<number>();
  let dataBankEdit: ItemAddOrUpdateDto[] = [];
  if (idBankEdit) {
    const bankById: any = dataBank.find((i: any) => i.id === idBankEdit);
    dataBankEdit = [
      {
        name: 'binBank',
        label: 'Ngân hàng',
        type: 'options',
        value: bankById?.binBank,
        dataOption: dataBankStatics.map((bank) => {
          return {
            text: bank.shortName,
            value: bank.bin,
          };
        }),
        readOnly: false,
        canUpdate: true,
        required: true,
      },
      {
        name: 'branch',
        label: 'Chi nhánh',
        type: 'text',
        value: bankById?.branch,
        readOnly: false,
        canUpdate: true,
        required: false,
      },
      {
        name: 'accountOwner',
        label: 'Chủ tài khoản',
        type: 'text',
        value: bankById?.accountOwner,
        readOnly: false,
        canUpdate: true,
        required: true,
      },

      {
        name: 'accountNumber',
        label: 'Số tài khoản',
        type: 'number',
        value: bankById?.accountNumber,
        readOnly: false,
        canUpdate: true,
        required: true,
      },
    ];
  }

  useEffect(() => {
    async function fetchData() {
      if (refresh) {
        console.log('Fetching data');
        const res = await getBankByUserId(userId);
        if (res?.data) {
          setDataBank(res.data?.data);
        }
        setRefresh(false);
      }
    }

    fetchData();
  }, [refresh]);

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
            columnEdit={true}
            // handleDelete={(id) => {
            //   handleDeleteBankPayment(userId, id, dispatch);
            // }}

            handleEdit={(id) => {
              setIdBankEdit(id);
            }}
          />
        ) : (
          <h2 className="text-center text-xl text-gray-700">Không có dữ liệu phù hợp !!</h2>
        )}
      </div>

      {idBankEdit && (
        <PopupEditOrAddV1
          data={dataBankEdit}
          id={idBankEdit}
          title="Thêm ngân hàng nhận"
          onSubmit={async (id, data, dispatch) => {
            const nameBank = dataBankStatics.find((i) => i.bin == data.binBank)?.name;
            const req = await updateBank(id, { ...data, nameBank });
            console.log('🚀 ~ onSubmit={ ~ req:', req);
            if (req?.data) {
              setRefresh(true);
              setIdBankEdit(0);
            }
          }}
          onCancel={() => setIdBankEdit(0)}
        />
      )}
    </div>
  );
}
