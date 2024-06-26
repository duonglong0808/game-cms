'use client';

import { HeaderContent } from '@/components/HeaderContent';
import { TypeGameBaccarat } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/lib';
import { resetDataBaccaratGame, setBaccaratGameEdit, setLimitOrPageBaccaratGame } from '@/lib/redux/app/baccaratGame.slice';
import { upLoadOneFile } from '@/share/upLoadFile';
import { PopupEditOrAddV1 } from '@/uiCore';
import Pagination from '@/uiCore/Pagination';
import Table from '@/uiCore/Table';
import { createdBaccaratGame, updateBaccaratGame, useBaccaratGame } from '@/utils/handleBaccaratGame';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function SectionBaccarat(): JSX.Element {
  const { data, pagination } = useBaccaratGame();
  const [boxCreate, setBoxCreate] = useState(false);
  const router = useRouter();
  const { baccaratGameIdEdit, baccaratGame } = useAppSelector((state) => state.baccaratGame);
  const dispatch = useAppDispatch();

  const setPageUser = (page: number) => {
    dispatch(setLimitOrPageBaccaratGame({ page: page }));
  };

  let dataBaccaratGameId = [
    {
      name: 'name',
      label: 'Tên bàn',
      type: 'text',
      value: '',
      readOnly: false,
      canUpdate: true,
    },
    {
      name: 'avtAuthor',
      label: 'Ảnh người live ',
      type: 'image',
      value: '',
      readOnly: false,
      canUpdate: true,
    },
    {
      name: 'type',
      label: 'Loại live ',
      type: 'options',
      value: TypeGameBaccarat.normal,
      readOnly: false,
      canUpdate: true,
      dataOption: [
        {
          text: 'MC Baccarat',
          value: TypeGameBaccarat.normal,
        },
        {
          text: 'Baccarat tốc độ',
          value: TypeGameBaccarat.flash,
        },
        {
          text: 'Mi Baccarat',
          value: TypeGameBaccarat.mi,
        },
      ],
    },
    {
      name: 'nameAuthor',
      label: 'Tên người live ',
      type: 'text',
      value: '',
      readOnly: false,
      canUpdate: true,
    },
    {
      name: 'nationalAuthor',
      label: 'Quốc tịch người live ',
      type: 'options',
      value: 'VN',
      dataOption: [
        {
          text: 'Việt Nam',
          value: 'VN',
        },
        {
          text: 'Thái lan',
          value: 'TL',
        },
        {
          text: 'Singapore',
          value: 'PHL',
        },
        {
          text: 'Indonesia',
          value: 'IND',
        },
      ],
      readOnly: false,
      canUpdate: true,
    },
    {
      name: 'idLive',
      label: 'Key live stream ',
      type: 'text',
      value: '',
      readOnly: false,
      canUpdate: true,
    },
    {
      name: 'idLiveMobile',
      label: 'Key live streamer trên điện thoại',
      type: 'text',
      value: '',
      readOnly: false,
      canUpdate: true,
    },
  ];
  if (baccaratGameIdEdit) {
    const dataId = baccaratGame.find((p) => p.id == +baccaratGameIdEdit);
    if (dataId) {
      dataBaccaratGameId = [
        {
          name: 'name',
          label: 'Tên phiên live ',
          type: 'text',
          value: dataId.name,
          readOnly: false,
          canUpdate: true,
        },
        {
          name: 'avtAuthor',
          label: 'Ảnh người live ',
          type: 'image',
          value: dataId.avtAuthor,
          readOnly: false,
          canUpdate: true,
        },
        {
          name: 'type',
          label: 'Loại live ',
          type: 'options',
          value: dataId.type,
          readOnly: false,
          canUpdate: true,
          dataOption: [
            {
              text: 'MC Baccarat',
              value: TypeGameBaccarat.normal,
            },
            {
              text: 'Baccarat tốc độ',
              value: TypeGameBaccarat.flash,
            },
            {
              text: 'Mi Baccarat',
              value: TypeGameBaccarat.mi,
            },
          ],
        },
        {
          name: 'nameAuthor',
          label: 'Tên người live ',
          type: 'text',
          value: dataId.nameAuthor,
          readOnly: false,
          canUpdate: true,
        },
        {
          name: 'nationalAuthor',
          label: 'Quốc tịch người live ',
          type: 'options',
          value: dataId.nationalAuthor,
          readOnly: false,
          canUpdate: true,
          dataOption: [
            {
              text: 'Việt Nam',
              value: 'VN',
            },
            {
              text: 'Thái lan',
              value: 'TL',
            },
            {
              text: 'Singapore',
              value: 'PHL',
            },
            {
              text: 'Indonesia',
              value: 'IND',
            },
          ],
        },
        {
          name: 'idLive',
          label: 'Key live stream ',
          type: 'text',
          value: dataId.idLive,
          readOnly: false,
          canUpdate: true,
        },
        {
          name: 'idChat',
          label: 'Key live streamer trên điện thoại',
          type: 'text',
          value: dataId.idLiveMobile,
          readOnly: false,
          canUpdate: true,
        },
      ];
    }
  }

  useEffect(() => {
    return () => {
      dispatch(resetDataBaccaratGame());
    };
  }, []);

  return (
    <main className="min-h-full flex flex-col">
      <HeaderContent path="Baccarat" title="Quản lý bàn baccarat, chi tiết bàn" />
      <div className="main-page min-h-full flex-1">
        <div onClick={() => setBoxCreate(true)} className={'flex pt-1 pb-1 pr-3 pl-3 w-52 items-center border-solid border-slate-400	 border-2 text-black mb-4 rounded-xl cursor-pointer'}>
          <h1 className={'flex-1 '}>Thêm bàn mới</h1>
          <FontAwesomeIcon className={''} color="black" icon={faXmark} />
        </div>
        {data.length ? (
          <>
            <Table
              // columnNotShow={['slug']}
              handleClickRow={(item) => {
                item && router.push(`/admin/baccarat/${item?.id}`);
              }}
              textColor="black"
              data={data}
              columnDelete={false}
              columnEdit
              handleDelete={(id) => {}}
              handleEdit={(id) => {
                dispatch(setBaccaratGameEdit({ id }));
              }}
            />
            <div>
              <Pagination count={pagination.total} page={pagination.page} limit={pagination.limit} setPage={(page) => setPageUser(page)} />
            </div>
            {baccaratGameIdEdit && <PopupEditOrAddV1 handleUploadOneFile={(file) => upLoadOneFile('image', file)} title="Cập nhật thông tin live" id={+baccaratGameIdEdit} data={dataBaccaratGameId || []} onCancel={() => dispatch(setBaccaratGameEdit({ id: '' }))} onSubmit={updateBaccaratGame} />}
          </>
        ) : (
          <></>
        )}
        {boxCreate && <PopupEditOrAddV1 handleUploadOneFile={(file) => upLoadOneFile('image', file)} title="Thêm bàn mới" data={dataBaccaratGameId || []} onCancel={() => setBoxCreate(false)} onSubmitCreate={createdBaccaratGame} />}
      </div>
    </main>
  );
}
