import styled from 'styled-components';

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  /* width: 100%; */

  color: #555;
  font-weight: 500;
`;

export const InputStyled = styled.input`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &:hover {
    border-color: #999;
  }

  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
  }
`;
