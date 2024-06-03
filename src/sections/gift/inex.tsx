'use client';

import { HeaderContent } from '@/components/HeaderContent';
import { FilterGiftCode } from '@/components/giftCode/FilterGiftCode';
import { StatusGiftCode } from '@/constants';
import { useAppDispatch } from '@/lib';
import { setGiftCodeEdit, setLimitOrPageGiftCode } from '@/lib/redux/app/gifCode.slice';
import { ItemAddOrUpdateDto, PopupEditOrAddV1 } from '@/uiCore';
import Pagination from '@/uiCore/Pagination';
import Table from '@/uiCore/Table';
import { handleCreateGiftCode, handleDeleteGiftCode, updateDataGiftCode, useGiftCode } from '@/utils/handleGiftView';
import { useState } from 'react';

export default function SectionGift(): JSX.Element {
  const { data, pagination, giftCodeIdEdit, dataBeforeHandle } = useGiftCode();
  const [showPopupCreate, setShowPopupCreate] = useState(false);

  let dataGiftCode: ItemAddOrUpdateDto[] = [
    {
      label: 'Tên quà tặng',
      name: 'name',
      readOnly: false,
      type: 'text',
      value: '',
      canUpdate: true,
    },
    {
      label: 'Số lượng',
      name: 'totalCode',
      type: 'number',
      readOnly: false,
      value: '',
      canUpdate: true,
    },
    {
      label: 'Điểm thưởng',
      name: 'point',
      type: 'number',
      readOnly: false,
      canUpdate: true,
      value: '',
    },
  ];
  const giftCodeById = dataBeforeHandle.find((d) => d.id == +giftCodeIdEdit);
  if (giftCodeById) {
    dataGiftCode = [
      {
        label: 'Tên quà tặng',
        name: 'name',
        readOnly: true,
        type: 'text',
        value: giftCodeById.name,
        canUpdate: false,
      },
      {
        label: 'Điểm thưởng',
        name: 'point',
        type: 'number',
        readOnly: true,
        value: giftCodeById.point,
      },
      {
        label: 'Trạng thái',
        name: 'status',
        type: 'options',
        readOnly: !(giftCodeById.status == StatusGiftCode.Created),
        canUpdate: giftCodeById.status == StatusGiftCode.Created,
        value: giftCodeById.status,
        dataOption: [
          {
            text: 'Đã tạo',
            value: StatusGiftCode.Created,
          },
          {
            text: 'Vô hiệu hóa',
            value: StatusGiftCode.Disable,
          },
        ],
      },
    ];
  }

  const dispatch = useAppDispatch();

  const setIdGiftCode = (id: string) => {
    dispatch(setGiftCodeEdit({ id }));
  };

  const setPageGiftCode = (page: number) => {
    dispatch(setLimitOrPageGiftCode({ page: page }));
  };

  return (
    <div className="h-full">
      <HeaderContent path="gift" title="QUản lý gift code" />

      <div className="main-page min-h-full flex-1 relative">
        <FilterGiftCode />
        <button
          type="button"
          onClick={() => {
            setShowPopupCreate(true);
          }}
          className="px-2 py-1 rounded-lg h-10 text-white bg-[#924bfa] mb-3">
          Thêm quà tặng mới
        </button>
        {data.length ? (
          <div>
            <Table
              textColor="black"
              data={data}
              columnDelete
              columnEdit
              handleDelete={(id) => {
                handleDeleteGiftCode(id, dispatch);
              }}
              handleEdit={(id) => {
                setIdGiftCode(String(id));
              }}
            />
            <div>
              <Pagination count={pagination.total} page={pagination.page} limit={pagination.limit} setPage={(page) => setPageGiftCode(page)} />
            </div>
            {giftCodeIdEdit ? <PopupEditOrAddV1 title="Cập nhật thông tin gift code" id={+giftCodeIdEdit} data={dataGiftCode} onCancel={() => setIdGiftCode('')} onSubmit={updateDataGiftCode} /> : <></>}
          </div>
        ) : (
          <></>
        )}
        {showPopupCreate ? (
          <PopupEditOrAddV1
            title="Thêm mới gift code"
            data={dataGiftCode}
            onCancel={() => setShowPopupCreate(false)}
            onSubmitCreate={(data, dispatch) => {
              handleCreateGiftCode(data, dispatch);
              setShowPopupCreate(false);
            }}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
