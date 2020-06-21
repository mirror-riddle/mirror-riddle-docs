import React from 'react';
import Layout from '@theme/Layout';
import styles from './styles.module.css';
import { CaseEvent } from './case-event';
import { CaseTriangle } from './case-triangle';

const Cases = () => {
  return (
    <Layout>
      <div className={styles.pageCases}>
        <h2>1. 事件冒泡</h2>
        <CaseEvent />
        <h2>2. CSS 三角形</h2>
        <CaseTriangle />
      </div>
    </Layout>
  );
};

export default Cases;
