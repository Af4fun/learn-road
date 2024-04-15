import { useEffect, useRef } from 'react';
import Fdraw from './fador-draw';
import './index.css';

function FunDraw() {
  const boxRef = useRef<HTMLDivElement>(null);
  const renderIns = useRef<Fdraw>();

  useEffect(() => {
    if (boxRef.current) {
      renderIns.current = new Fdraw(boxRef.current);
    }

    return () => {
      renderIns.current?.destroy();
      renderIns.current = undefined;
    };
  }, []);
  return (
    <div>
      <div className="box" ref={boxRef}></div>
      <button
        type="button"
        onClick={() => {
          renderIns.current?.mark();
        }}
      >
        绘制点
      </button>
      <button
        type="button"
        onClick={() => {
          renderIns.current?.line();
        }}
      >
        绘制线条
      </button>
      <button
        type="button"
        onClick={() => {
          renderIns.current?.rect();
        }}
      >
        绘制矩形
      </button>
      <button
        type="button"
        onClick={() => {
          renderIns.current?.rect({
            activeStyle: {
              backgroundColor: 'rgba(234,12,144,.7)',
            },
            rectStyle: {
              backgroundColor: '#e4393c',
            },
          });
        }}
      >
        绘制一个红色的矩形
      </button>
      <button
        type="button"
        onClick={() => {
          renderIns.current?.cricular();
        }}
      >
        绘制圆形
      </button>
      <button
        type="button"
        onClick={() => {
          renderIns.current?.geometry();
        }}
      >
        绘制区域
      </button>
      <button
        type="button"
        onClick={() => {
          renderIns.current?.geometry({
            activeStyle: { backgroundColor: 'red' },
            geoStyle: { backgroundColor: 'rgba(234,123,15, 0.8)' },
            onSuccess(layer) {
              alert('绘制成功');
              layer.onclick(() => {
                alert('点击了区域');
              });
            },
          });
        }}
      >
        绘制区域并设置区域颜色
      </button>
      <button
        type="button"
        onClick={() => {
          renderIns.current?.reset();
        }}
      >
        重置原点
      </button>
    </div>
  );
}

export default FunDraw;
