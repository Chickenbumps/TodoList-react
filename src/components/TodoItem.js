import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete, AiTwotoneEdit } from 'react-icons/all';
import { useTodoDispatch } from '../TodoContext';

const Remove = styled.div`
  float: right;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  display: none;
`;

const Fix = styled.div`
  float: right;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #4eee51;
  }
  display: none;
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
    ,
    ${Fix} {
      display: flex;
    }
  }
`;

const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props) =>
    props.done &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;

const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
    `};
  ${(props) =>
    props.fix &&
    css`
      color: #4eee51;
    `}
`;

const UpdateInput = styled.input`
  width: 100%;
  font-size: 21px;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

function TodoItem({ id, done, text, fix }) {
  const dispatch = useTodoDispatch();
  const [value, setValue] = useState('');
  const onToggle = () => {
    dispatch({ type: 'TOGGLE', id });
  };
  const onRemove = () => {
    dispatch({ type: 'REMOVE', id });
  };
  const onFix = () => {
    dispatch({ type: 'FIX', id });
  };
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: 'UPDATE',
      id,
      value,
    });
    setValue('');
  };
  return (
    <TodoItemBlock>
      <CheckCircle onClick={onToggle} done={done}>
        {done && <MdDone />}
      </CheckCircle>
      <Text done={done} fix={fix}>
        <form onSubmit={onSubmit}>
          {fix && <UpdateInput value={value} onChange={onChange} />}
          {fix || text}
        </form>
      </Text>
      <Fix onClick={onFix} fix={fix}>
        <AiTwotoneEdit />
      </Fix>
      <Remove onClick={onRemove}>
        <MdDelete />
      </Remove>
    </TodoItemBlock>
  );
}

export default React.memo(TodoItem);
