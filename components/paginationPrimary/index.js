import { Pagination } from 'antd';
// Styles
import styles from './styles.module.scss';

export default function PaginationPrimary({
  defaultCurrent,
  total,
  pageStyle,
}) {
  return (
    <div className={styles[`pagination-style ${pageStyle}`]}>
      <Pagination defaultCurrent={defaultCurrent} total={total} pageSize={2} />
    </div>
  );
}
