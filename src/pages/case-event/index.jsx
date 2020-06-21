import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useReducer,
} from 'react';
import styles from './style.module.css';

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

const EventTarget = (props) => {
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
    <div className={styles.eventTarget} ref={counter} data-title={title}>
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

export const CaseEvent = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const onClickClearList = useCallback(() => {
    dispatch({
      type: 'clear',
    });
  });

  return (
    <section className={styles.caseCounter}>
      <div>
        ancestor, parent,
        child三个div都绑定了点击事件监听函数。绑定事件监听函数时，capture参数不同，事件触发顺序会有变化。
      </div>
      <div className={styles.contentBlock}>
        <div className={styles.targetBlock}>
          <EventTarget
            title="ancestor"
            dispatch={dispatch}
            capture={state.ancestor}
          >
            <EventTarget
              title="parent"
              dispatch={dispatch}
              capture={state.parent}
            >
              <EventTarget
                title="child"
                dispatch={dispatch}
                capture={state.child}
              />
            </EventTarget>
          </EventTarget>
        </div>
        <div className={styles.rightBlock}>
          <div className={styles.captureBlock}>
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
            <CaptureSwitch
              title="child"
              dispatch={dispatch}
              capture={state.child}
            />
          </div>
          <div className={styles.eventBlock}>
            <input type="button" value="清空" onClick={onClickClearList} />
            <div className={styles.eventList}>{state.list.toString()}</div>
          </div>
        </div>
      </div>
    </section>
  );
};
