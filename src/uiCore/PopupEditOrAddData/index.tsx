import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '@/lib';
import Image from 'next/image';

const cx = classNames.bind(styles);

export interface ItemAddOrUpdateDto {
  name: string;
  label: string;
  type: string;
  value: string | number;
  readOnly: boolean;
  required?: boolean;
  placeholder?: string;
  dataOption?: {
    text?: string;
    value?: string | number;
  }[];
  canUpdate?: boolean;
}

export interface DataEditDto {
  id?: number;
  title?: string;
  textWarning?: string;
  data: ItemAddOrUpdateDto[];
  onSubmit?: (id: number, data: any, dispatch: any) => void;
  onSubmitCreate?: (data: any, dispatch: any) => void;
  onCancel: () => void;
  handleUploadOneFile?: (file: File) => Promise<string>;
}

export function PopupEditOrAddV1({ id, data, onCancel, onSubmit, title, textWarning, handleUploadOneFile, onSubmitCreate }: DataEditDto) {
  const [dataState, setDataState] = useState(data);
  const isUnableBtn = dataState.some((item) => item.canUpdate);

  const dispatch = useAppDispatch();

  const handleOnChangeInputOrSelect = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, col: ItemAddOrUpdateDto) => {
    //   const element = e.target as HTMLOptionElement;
    setDataState((pre) => {
      const dataNew = pre.map((item) => {
        if (item.name === col.name) {
          return {
            ...item,
            value: e.target.value,
          };
        } else {
          return item;
        }
      });
      return dataNew;
    });
  };

  const handleChangeFile = (urlImage: string, col: ItemAddOrUpdateDto) => {
    setDataState((pre) => {
      const dataNew = pre.map((item) => {
        if (item.name === col.name) {
          return {
            ...item,
            value: urlImage,
          };
        } else {
          return item;
        }
      });
      return dataNew;
    });
  };

  return (
    <form
      className={cx('wrapper')}
      onSubmit={(e) => {
        e.preventDefault();
        const dataSend: any = {};
        dataState.forEach((item, index) => {
          if (item.canUpdate) {
            dataSend[item.name] = item.value;
          }
        });
        if (id) {
          onSubmit && onSubmit(id, dataSend, dispatch);
        } else {
          onSubmitCreate && onSubmitCreate(data, dispatch);
        }
      }}>
      <div className={cx('group__list')}>
        <div className={cx('body__header')}>
          <h1 className={cx('body__header--text', 'flex-1 ')}>{title || 'Cập nhật quá trình giao dịch'}</h1>
          <FontAwesomeIcon className={cx('body__header--icon')} icon={faXmark} onClick={onCancel} />
        </div>
        {textWarning && <p className={cx('wrapper__warning', 'text-center text-red-500 mb-1 text-sm')}>{textWarning}</p>}
        {dataState.map((col, index) => (
          <div key={index} className={cx('group__data')}>
            <label className={cx('group__data--label')}>{col.label}</label>
            {col.type == 'options' ? (
              <select
                required={col.required}
                className={cx('group__data--select')}
                name={col.name}
                defaultValue={col.value}
                onChange={(e) => {
                  handleOnChangeInputOrSelect(e, col);
                }}>
                {col.dataOption?.map((val, index) => (
                  <option key={index} className={cx('group__data--option')} value={val.value}>
                    {val.text}
                  </option>
                ))}
              </select>
            ) : col.type == 'image' ? (
              <div className="flex items-center">
                <input
                  type="file"
                  name={col.name}
                  required={col.required}
                  onChange={async (e) => {
                    if (e.target.files && handleUploadOneFile) {
                      const urlImage = await handleUploadOneFile(e.target.files[0]);
                      if (urlImage) {
                        handleChangeFile(urlImage, col);
                      }
                    }
                  }}
                />
                <Image alt="Image demo" src={String(col.value)} width={80} height={80} className={cx('image__demo', 'rounded-2xl')} />
              </div>
            ) : (
              <input
                value={col.value ?? ''}
                name={col.name}
                type={col.type}
                required={col.required}
                readOnly={col.readOnly}
                placeholder={col.placeholder}
                className={cx('group__data--input', { 'group__data--input-readOnly': col.readOnly })}
                onChange={(e) => {
                  handleOnChangeInputOrSelect(e, col);
                }}
              />
            )}
          </div>
        ))}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={!isUnableBtn}
            className={cx('submit-btn', 'rounded-xl disabled:cursor-not-allowed disabled:bg-zinc-500')}
            onSubmit={(e) => {
              // e.preventDefault();
            }}>
            Xác nhận
          </button>
        </div>
      </div>
    </form>
  );
}
