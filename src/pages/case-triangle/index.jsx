import React from 'react';
import styles from './style.module.css';
import { TriangleItem } from './triangle-item';

export const CaseTriangle = (props) => {
  return (
    <div className={styles.caseTriangle}>
      {['up', 'down', 'left', 'right'].map((direction, index) => (
        <TriangleItem key={index} direction={direction} />
      ))}
    </div>
  );
};
