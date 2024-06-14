import React from "react"
import styled from "styled-components/native"
import { useNavigation } from "@react-navigation/native"
import { supabase } from "../db/supabase"

export default function ProfileScreen() {
  const navigation = useNavigation()

  const Logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) alert("로그아웃 중에 문제가 생겼습니다.")
    else {
      alert("로그아웃 되었습니다")
      navigation.navigate("Login" as never)
    }
  }

  const MemberOut = async () => {
    const {
      data: { user },
      error: getUserError,
    } = await supabase.auth.getUser()

    if (getUserError) {
      console.error("Error getting user:", getUserError)
      alert("사용자 정보를 가져올 수 없습니다.")
      return
    }

    if (user) {
      const { error: deleteUserError } = await supabase.auth.admin.deleteUser(user.id)
      console.log({ deleteUserError })
      if (deleteUserError) alert("회원 탈퇴 중에 문제가 생겼습니다.")
      else {
        alert("회원 탈퇴 되었습니다")
        navigation.navigate("TabNavigator" as never)
      }
    } else {
      alert("사용자 정보를 가져올 수 없습니다.")
    }
  }

  return (
    <ProfileBox>
      <Button onPress={() => Logout()}>로그아웃</Button>
      <Button onPress={() => MemberOut()}>회원탈퇴</Button>
      <Button onPress={() => navigation.navigate("UserUpdate" as never)}>회원정보 수정</Button>
    </ProfileBox>
  )
}

// ------------------- style ------------------- //

const ProfileBox = styled.View`
  width: 100%;
  height: 150px;
  background-color: #ffffff;
`

const Button = styled.Text`
  margin-bottom: 20px;
  border: 2px solid black;
  width: 40%;
`
