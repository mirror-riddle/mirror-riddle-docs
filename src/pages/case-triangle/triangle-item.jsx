import React from 'react';
import styles from './style.module.css';

export const TriangleItem = (props) => {
  const { direction = 'up' } = props;
  return (
    <div className={styles.triangleItem}>
      <span className={styles.triangle} data-direction={direction} />
    </div>
  );
};
