import React from 'react';
import styles from './style.module.css';

const TriangleItem = (props) => {
  const { direction = 'up' } = props;
  return (
    <div className={styles.triangleItem}>
      <span className={styles.triangle} data-direction={direction} />
    </div>
  );
};

export default TriangleItem;
