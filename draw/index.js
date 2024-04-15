import { useEffect, useRef } from 'react';
import Fdraw from "./fador-draw";
import "./index.css";
function FunDraw() {
  var boxRef = useRef(null);
  var renderIns = useRef();
  useEffect(function () {
    if (boxRef.current) {
      renderIns.current = new Fdraw(boxRef.current);
    }
    return function () {
      var _renderIns$current;
      (_renderIns$current = renderIns.current) === null || _renderIns$current === void 0 || _renderIns$current.destroy();
      renderIns.current = undefined;
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "box",
    ref: boxRef
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: function onClick() {
      var _renderIns$current2;
      (_renderIns$current2 = renderIns.current) === null || _renderIns$current2 === void 0 || _renderIns$current2.mark();
    }
  }, "\u7ED8\u5236\u70B9"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: function onClick() {
      var _renderIns$current3;
      (_renderIns$current3 = renderIns.current) === null || _renderIns$current3 === void 0 || _renderIns$current3.line();
    }
  }, "\u7ED8\u5236\u7EBF\u6761"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: function onClick() {
      var _renderIns$current4;
      (_renderIns$current4 = renderIns.current) === null || _renderIns$current4 === void 0 || _renderIns$current4.rect();
    }
  }, "\u7ED8\u5236\u77E9\u5F62"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: function onClick() {
      var _renderIns$current5;
      (_renderIns$current5 = renderIns.current) === null || _renderIns$current5 === void 0 || _renderIns$current5.rect({
        activeStyle: {
          backgroundColor: 'rgba(234,12,144,.7)'
        },
        rectStyle: {
          backgroundColor: '#e4393c'
        }
      });
    }
  }, "\u7ED8\u5236\u4E00\u4E2A\u7EA2\u8272\u7684\u77E9\u5F62"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: function onClick() {
      var _renderIns$current6;
      (_renderIns$current6 = renderIns.current) === null || _renderIns$current6 === void 0 || _renderIns$current6.cricular();
    }
  }, "\u7ED8\u5236\u5706\u5F62"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: function onClick() {
      var _renderIns$current7;
      (_renderIns$current7 = renderIns.current) === null || _renderIns$current7 === void 0 || _renderIns$current7.geometry();
    }
  }, "\u7ED8\u5236\u533A\u57DF"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: function onClick() {
      var _renderIns$current8;
      (_renderIns$current8 = renderIns.current) === null || _renderIns$current8 === void 0 || _renderIns$current8.geometry({
        activeStyle: {
          backgroundColor: 'red'
        },
        geoStyle: {
          backgroundColor: 'rgba(234,123,15, 0.8)'
        },
        onSuccess: function onSuccess(layer) {
          alert('绘制成功');
          layer.onclick(function () {
            alert('点击了区域');
          });
        }
      });
    }
  }, "\u7ED8\u5236\u533A\u57DF\u5E76\u8BBE\u7F6E\u533A\u57DF\u989C\u8272"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: function onClick() {
      var _renderIns$current9;
      (_renderIns$current9 = renderIns.current) === null || _renderIns$current9 === void 0 || _renderIns$current9.reset();
    }
  }, "\u91CD\u7F6E\u539F\u70B9"));
}
export default FunDraw;