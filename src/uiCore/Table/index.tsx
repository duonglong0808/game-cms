import classNames from 'classnames/bind';
import styles from './table.module.scss';
import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
// import Button from '../Button';
// import icons from '../icons/index';

const cx = classNames.bind(styles);

function Table(props: {
  //
  data: any[];
  columnEdit: boolean;
  columnDelete: boolean;
  handleEdit?: (id: number) => void;
  handleDelete?: (id: number) => void;
  columnRestore?: boolean;
  backgroundColor?: string;
  backgroundColorHeader?: string;
  textColorHeader?: string;
  textColor?: string;
  fontSizeData?: string;
  pageSort?: boolean;
  columnNotShow?: any[];
  handleSort?: () => void;
  handleRestore?: () => void;
  handleClickRow?: (item: any) => void;
  moreColumnsOptions?: {
    name: string;
    icon: IconProp;
    handleClick?: (item: any) => void;
  }[];
}) {
  const { data = [], columnEdit, columnDelete, columnRestore, backgroundColor, textColor, fontSizeData, backgroundColorHeader = '#526dfa', handleEdit, handleDelete, handleRestore, pageSort, handleSort, textColorHeader = '#fff', columnNotShow = [], handleClickRow, moreColumnsOptions } = props;

  const allDataShow: any[] = JSON.parse(JSON.stringify(data));
  allDataShow.forEach((item) => {
    columnNotShow.forEach((col) => {
      delete item[col];
    });
  });

  let columnNames = null;
  if (allDataShow.length) {
    columnNames = Object.keys(allDataShow[0]);
  }

  // const items = useRef();

  // useEffect(() => {
  //     if (pageSort) {
  //         items.current = document.querySelectorAll('.table__drop');
  //         handleDragAndDrop(items.current);
  //     }
  // });

  return (
    <div className={cx('wrapper', 'w-full')}>
      {/* {pageSort ? (
                <div className={cx('save__sort')}>
                    <Button
                        content="Lưu"
                        backgroundColor="#fff"
                        color="#000"
                        borderColor="#00c0f4"
                        handleClick={() => handleSort(items.current)}
                    />
                </div>
            ) : (
                <></>
            )} */}
      <div className="w-full">
        <table
          style={{
            backgroundColor: `${backgroundColor}`,
            color: `${textColor}`,
          }}
          className={cx('table__custom', 'table', 'w-full')}>
          <thead className={cx('thead-light')} style={{ backgroundColor: `${backgroundColorHeader}`, color: `${textColorHeader}` }}>
            <tr className={cx('table__information')}>
              {columnNames?.map((columnName, index) => (
                <th key={index} className={cx('thead__column')}>
                  {columnName !== 'id' ? columnName : '#'}
                </th>
              ))}
              {moreColumnsOptions?.map((item, index) => (
                <th key={index} className={cx('thead__column')}>
                  {item.name}
                </th>
              ))}
              {columnEdit ? <th className={cx('thead__column')}>Cập nhật</th> : <></>}
              {columnDelete ? <th className={cx('thead__column')}>Xóa</th> : <></>}
              {columnRestore ? <th className={cx('thead__column')}>Khôi phục</th> : <></>}
            </tr>
          </thead>
          <tbody>
            {allDataShow?.map((item, index) => (
              <tr
                style={{
                  cursor: handleClickRow ? 'pointer' : 'auto',
                }}
                className={cx('table__row', 'table__drop')}
                data-sort={`${item.id}-${index + 1}`}
                key={index}
                draggable={pageSort ? true : false}
                onClick={() => {
                  handleClickRow && handleClickRow(item);
                }}>
                {columnNames?.map((col, index2) =>
                  index2 === 0 ? (
                    <th key={index2} className={cx('table__value')}>
                      {pageSort && <i className={cx('fa-solid fa-sort', 'table__icon--sort')}></i>}
                      {/* {item[col]} */}
                      {index + 1}
                    </th>
                  ) : col === 'status' ? (
                    <td key={index2} className={cx('table__value', 'td__status')}>
                      <span className={item[col] == 'ACTIVE' ? cx('active') : cx('not__active')}>{item[col] == 'ACTIVE' ? `Active` : `Not Active `}</span>
                    </td>
                  ) : col === 'statusText' ? (
                    <td key={index2} className={cx('table__value', 'td__status')}>
                      <span className={cx({ active: item[col] == 1 }, { not__active: item[col] == 0 }, { cancel: item[col] == 2 })}>{item[col] == 0 ? 'Đang chờ xử lý' : item[col] == 1 ? 'Thành công' : item[col] == 2 ? 'Hủy bỏ' : ''}</span>
                    </td>
                  ) : col === 'image' || col === 'methodImage' ? (
                    <td key={index2} className={cx('table__value', 'box__image')}>
                      {item[col]?.split(',')?.map((image: any, index3: number) => (
                        <img src={image} key={index3} alt="img show" className={cx('image')} />
                      ))}
                    </td>
                  ) : (
                    <td
                      key={index2}
                      className={col === 'deleted_at' ? cx('table__value', 'table__value--delete') : cx('table__value')}
                      style={{
                        fontSize: fontSizeData ? fontSizeData : '14px',
                      }}>
                      <span>{item[col] || 'Không có dữ liệu'}</span>
                    </td>
                  ),
                )}
                {moreColumnsOptions?.map((colOption, index) => (
                  <td
                    key={index}
                    className={cx('table__value')}
                    style={{ cursor: 'pointer', lineHeight: '100%' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      colOption.handleClick && colOption.handleClick(item);
                    }}>
                    <FontAwesomeIcon icon={colOption.icon} />
                  </td>
                ))}
                {columnEdit ? (
                  <td
                    className={cx('table__value')}
                    style={{ cursor: 'pointer', lineHeight: '100%' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit && handleEdit(columnNames && item[columnNames[0]]);
                    }}>
                    <FontAwesomeIcon icon={faPenToSquare} className={cx('table_row--icon')} />
                  </td>
                ) : (
                  <></>
                )}
                {columnDelete ? (
                  <td
                    className={cx('table__value')}
                    style={{ cursor: 'pointer', lineHeight: '100%' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete && handleDelete(columnNames && item[columnNames[0]]);
                    }}>
                    <FontAwesomeIcon icon={faTrash} />
                  </td>
                ) : (
                  <></>
                )}
                {columnRestore ? (
                  <td
                    className={cx('table__value')}
                    style={{
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'center',
                      lineHeight: '100%',
                    }}
                    onClick={handleRestore}>
                    Khôi phục
                  </td>
                ) : (
                  <></>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
