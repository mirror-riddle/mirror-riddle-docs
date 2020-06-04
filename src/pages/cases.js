import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useReducer,
  useMemo,
} from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const CaptureSwitch = (props) => {
  const { title, capture, dispatch } = props;

  const onChangeCapture = useCallback(
    (event) => {
      dispatch({
        type: title,
        payload: !!event.target.checked,
      });
    },
    [dispatch]
  );

  return (
    <label className={styles.label}>
      <span>{title}</span>
      <input type="checkbox" checked={capture} onChange={onChangeCapture} />
    </label>
  );
};

const Counter = (props) => {
  const { title, capture, dispatch, children } = props;
  const counter = useRef(null);
  const [count, setCount] = useState(0);

  const onClickCounter = useCallback(
    (event) => {
      setCount((count) => count + 1);
      dispatch({
        type: 'click',
        payload: title,
      });
    },
    [setCount, dispatch]
  );

  useEffect(() => {
    counter.current.addEventListener('click', onClickCounter, capture);
    return () => {
      counter.current.removeEventListener('click', onClickCounter, capture);
    };
  }, [counter, onClickCounter, capture]);

  return (
    <div className={styles.counter} ref={counter}>
      <p>{`capture: ${capture}`}</p>
      <p>{`title: ${title}`}</p>
      <p>{`count: ${count}`}</p>
      {children}
    </div>
  );
};

const initialState = {
  ancestor: false,
  parent: false,
  child: false,
  list: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'click':
      return { ...state, list: [...state.list, action.payload] };
    case 'clear':
      return { ...state, list: [] };
    default:
      return { ...state, [action.type]: action.payload };
  }
};

const CaseCounter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const onClickClearList = useCallback(() => {
    dispatch({
      type: 'clear',
    });
  });

  return (
    <section className={styles.caseCounter}>
      <p>
        测试DOM事件传播。ancestor, parent,
        child三个div都绑定了点击事件监听函数，且看绑定事件时设置capture不同时，事件触发顺序会有何种变化。
      </p>
      <input type="button" value="clear list" onClick={onClickClearList} />
      <p>{`list: ${state.list.toString()}`}</p>
      <CaptureSwitch
        title="ancestor"
        dispatch={dispatch}
        capture={state.ancestor}
      />
      <CaptureSwitch
        title="parent"
        dispatch={dispatch}
        capture={state.parent}
      />
      <CaptureSwitch title="child" dispatch={dispatch} capture={state.child} />
      <Counter title="ancestor" dispatch={dispatch} capture={state.ancestor}>
        <Counter title="parent" dispatch={dispatch} capture={state.parent}>
          <Counter title="child" dispatch={dispatch} capture={state.child} />
        </Counter>
      </Counter>
    </section>
  );
};

const Cases = () => {
  return (
    <Layout>
      <CaseCounter />
    </Layout>
  );
};

export default Cases;
