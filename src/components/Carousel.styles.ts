import styled from 'styled-components';

interface WrapperProps {
  $width: number;
}

interface ListItemProps {
  $itemWidth: number;
}

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Wrapper = styled.div<WrapperProps>`
  width: ${({ $width }) => $width}px;

  overflow: hidden;
`;

export const List = styled.ul`
  display: flex;
`;

export const ListItem = styled.li<ListItemProps>`
  flex-shrink: 0;
  width: 200px;
  width: ${({ $itemWidth }) => $itemWidth}px;
`;

export const Arrow = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;

  &.disabled {
    opacity: 0.3;
    cursor: default;
  }
`;
