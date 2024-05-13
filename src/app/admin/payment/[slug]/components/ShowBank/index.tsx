import styles from './styles.module.scss';
import Table from '@/uiCore/Table';
import { handleAddBankToPayment, handleDeleteBankPayment, usePaymentBank } from '../../ultils/handleDetailPayment';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/lib';
import { PopupEditOrAddV1 } from '@/uiCore';
import { setDataPaymentBanks } from '@/lib/redux/app/payment.slice';
import { dataBankStatics } from '@/constants';

const cx = classNames.bind(styles);

export function ShowBankPayment({ idPayment, setIdPaymentSelect }: { idPayment: number; setIdPaymentSelect: (id: any) => void }): JSX.Element {
  const { data } = usePaymentBank(idPayment);
  const dispatch = useAppDispatch();
  const [isShowCrate, setIsCreate] = useState(false);

  const dataDto = [
    {
      name: 'binBank',
      label: 'Ngân hàng',
      type: 'options',
      value: dataBankStatics[0].bin,
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
      value: '',
      readOnly: false,
      canUpdate: true,
      required: true,
    },
    {
      name: 'accountOwner',
      label: 'Chủ tài khoản',
      type: 'text',
      value: '',
      readOnly: false,
      canUpdate: true,
      required: true,
    },

    {
      name: 'accountNumber',
      label: 'Số tài khoản',
      type: 'number',
      value: '',
      readOnly: false,
      canUpdate: true,
      required: true,
    },
  ];

  useEffect(() => {
    return () => {
      dispatch(
        setDataPaymentBanks({
          data: [],
          isInitDataBank: false,
        }),
      );
    };
  }, [idPayment]);

  return data.length ? (
    <div className={cx('wrapper')}>
      <div className={cx('body__header')}>
        <h1 className={cx('body__header--text', 'flex-1 ')}>{'Danh sách ngân hàng'}</h1>
        <FontAwesomeIcon className={cx('body__header--icon')} icon={faXmark} onClick={() => setIdPaymentSelect('')} />
      </div>
      <div className={cx('body__bank')} onClick={() => setIsCreate(true)}>
        <span>Thêm ngân hàng</span>
        <FontAwesomeIcon className={cx('body__header--icon')} icon={faPlus} onClick={() => setIdPaymentSelect('')} />
      </div>
      <div className={cx('min-h-full flex-1')}>
        <Table
          // columnNotShow={['slug']}
          columnNotShow={['binBank', 'isDeleted', 'deletedAt', 'updatedAt', 'userId']}
          textColor="black"
          data={data}
          columnDelete
          columnEdit={false}
          handleDelete={(id) => {
            handleDeleteBankPayment(idPayment, id, dispatch);
          }}

          // handleEdit={(id) => {}}
        />
      </div>
      {isShowCrate && (
        <PopupEditOrAddV1
          data={dataDto}
          id={idPayment}
          title="Thêm ngân hàng nhận"
          onSubmit={(id, data, dispatch) => {
            handleAddBankToPayment(id, data, dispatch);
            setIsCreate(false);
          }}
          onCancel={() => setIsCreate(false)}
        />
      )}
    </div>
  ) : (
    <></>
  );
}
