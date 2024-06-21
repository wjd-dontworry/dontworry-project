import React from "react"
import styled from "styled-components/native"
import { Text, View, ViewStyle } from "react-native"
import moment from "moment"
import OctiIcon from 'react-native-vector-icons/Octicons';

interface IPage {
  item: any
  style: ViewStyle
}

const PageItem = styled.View`
  background-color: #ffffff;
  border-radius: 20px;
  display: flex;
  overflow: hidden;
  flex-direction: row;
  width: 100%;
  elevation: 1;
`

const Circle = styled.View`
  margin-top: -5%;
  width: 25%;
  height: 120%;
  border-radius: 0 150px 150px 0;
  background-color: #ffbe98;
`

const CardBox = styled.View`
  justify-content: center;
  gap: 8px;
  width: 75%;
  padding: 20px;
`

const PageTitle = styled.Text`
  font-weight: bold;
  font-size: 18px;
`

const PageContent = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const LikeBox = styled.View`
  display: flex;
  flex-direction: row;
`

export default function Page({ item, style }: IPage) {
  return (
    <PageItem style={style}>
      <Circle />
      <CardBox>
        <PageTitle>{item.title}</PageTitle>
        <PageContent>
          <Text>{`작성자 ${item.user.username}`}</Text>
          <LikeBox><OctiIcon name={'heart-fill'} size={16} /><Text> {item.challenge_like.length}</Text></LikeBox>
        </PageContent>
        <PageContent>
          <Text>{`작성일 ${moment(item.created_at).format('YYYY.MM.DD')}`}</Text>
          <Text>{`조회수 0`}</Text>
        </PageContent>
      </CardBox>
    </PageItem>
  )
}
