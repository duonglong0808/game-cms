'use client';

import { HeaderContent } from '@/components/HeaderContent';
import { useAppDispatch } from '@/lib';
import { setGiftCodeEdit, setLimitOrPageGiftCode } from '@/lib/redux/app/gifCode.slice';
import { ItemAddOrUpdateDto, PopupEditOrAddV1 } from '@/uiCore';
import Pagination from '@/uiCore/Pagination';
import Table from '@/uiCore/Table';
import { updateDataGiftCode, useGiftCode } from '@/utils/handleGiftView';

export default function SectionGift(): JSX.Element {
  const { data, pagination, giftCodeIdEdit } = useGiftCode();
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
    },
  ];
  if (giftCodeIdEdit) {
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
        {/* <FilterUser /> */}
        {data.length ? (
          <div>
            <Table
              textColor="black"
              data={data}
              columnDelete
              columnEdit
              handleDelete={(id) => {}}
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
      </div>
    </div>
  );
}
