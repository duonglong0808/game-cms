import styles from './styles.module.scss';
import Table from '@/uiCore/Table';
import { handleAddBankToPayment, handleDeleteBankPayment, updateBankPayment, usePaymentBank } from '../../ultils/handleDetailPayment';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/lib';
import { ItemAddOrUpdateDto, PopupEditOrAddV1 } from '@/uiCore';
import { setDataPaymentBanks } from '@/lib/redux/app/payment.slice';
import { dataBankStatics } from '@/constants';

const cx = classNames.bind(styles);

export function ShowBankPayment({ idPayment, setIdPaymentSelect }: { idPayment: number; setIdPaymentSelect: (id: any) => void }): JSX.Element {
  const { data } = usePaymentBank(idPayment);
  const dispatch = useAppDispatch();
  const [isShowCrate, setIsCreate] = useState(false);
  const [idBankEdit, setIdBankEdit] = useState<number>();
  let dataBankEdit: ItemAddOrUpdateDto[] = [];
  if (idBankEdit) {
    const bankById: any = data.find((i: any) => i.id === idBankEdit);
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

  return (
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
        {data.length ? (
          <Table
            // columnNotShow={['slug']}
            columnNotShow={['binBank', 'isDeleted', 'deletedAt', 'updatedAt', 'userId']}
            textColor="black"
            data={data}
            columnDelete={false}
            columnEdit={true}
            // handleDelete={(id) => {
            //   handleDeleteBankPayment(idPayment, id, dispatch);
            // }}
            handleEdit={(id) => {
              setIdBankEdit(id);
            }}
          />
        ) : (
          <h2 className="text-center text-xl text-gray-700">Không có dữ liệu phù hợp !!</h2>
        )}
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
      {idBankEdit && (
        <PopupEditOrAddV1
          data={dataBankEdit}
          id={idBankEdit}
          title="Cập nhật thông tin ngân hàng"
          onSubmit={(id, data, dispatch) => {
            updateBankPayment(id, data, dispatch);
            setIdBankEdit(0);
          }}
          onCancel={() => setIdBankEdit(0)}
        />
      )}
    </div>
  );
}
