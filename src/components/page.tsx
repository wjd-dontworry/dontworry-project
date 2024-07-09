import React from "react"
import styled from "styled-components/native"
import { ViewStyle } from "react-native"
import moment from "moment"
import OctiIcon from "react-native-vector-icons/Octicons"

interface IPage {
  item: any
  style: ViewStyle
}

export default function Page({ item, style }: IPage) {
  return (
    <PageItem style={style}>
      <Circle />
      <CardBox>
        <PageTitle>{item.title}</PageTitle>
        <PageContent>
          <UserInfoText>{`작성자 : ${item.user.username}`}</UserInfoText>
          <UserInfoText>{`작성일 :  ${moment(item.created_at).format("YYYY.MM.DD")}`}</UserInfoText>
          <LikeBox>
            <LikeIcon name={"heart-fill"} />
            <LikeInfoText> {item.challenge_like.length}</LikeInfoText>
          </LikeBox>
        </PageContent>
      </CardBox>
    </PageItem>
  )
}

const PageItem = styled.View`
  background-color: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  flex-direction: row;
  width: 100%;
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
  flex-direction: column;
  gap: 5px;
  justify-content: space-between;
`

const UserInfoText = styled.Text`
  font-size: 12px;
  color: #ccc;
`

const LikeBox = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 3px;
`

const LikeIcon = styled(OctiIcon)`
  font-size: 15px;
`

const LikeInfoText = styled.Text`
  font-size: 15px;
`
