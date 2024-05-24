import React from 'react';
import styled from 'styled-components/native';
import {Text, ViewStyle} from 'react-native';

interface IPage {
  item: {title: string, writer: string, likeCount: number, writeDateTime: string, viewCount: number};
  style: ViewStyle;
}

const PageItem = styled.View`
  background-color: #FFFFFF;
  border-radius: 20px;
  display: flex;
  overflow: hidden;
  flex-direction: row;
  width: 100%;
  elevation: 1;
`;

const Circle = styled.View`
  margin-top: -5%;
  width: 25%;
  height: 120%;
  border-radius: 0 150px 150px 0;
  background-color: #FFBE98;
`;

const CardBox = styled.View`
  justify-content: center;
  gap: 8px;
  width: 75%;
  padding: 20px;
`;

const PageTitle = styled.Text`
  font-weight: bold;
  font-size: 18px;
`;

const PageContent = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default function Page({item, style}: IPage) {
  return (
    <PageItem style={style}>
      <Circle/>
      <CardBox>
        <PageTitle>{item.title}</PageTitle>
        <PageContent>
          <Text>{`작성자 ${item.writer}`}</Text>
          <Text>{item.likeCount}</Text>
        </PageContent>
        <PageContent>
          <Text>{`작성일 ${item.writeDateTime}`}</Text>
          <Text>{`조회수 ${item.viewCount}`}</Text>
        </PageContent>
      </CardBox>
    </PageItem>
  );
}