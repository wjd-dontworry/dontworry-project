import { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { View, AppState, TextInput, Text, TouchableOpacity } from "react-native"
import styled from "styled-components/native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

import { supabase } from "../db/supabase"

AppState.addEventListener("change", state => {
  if (state === "active") {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

function Auth() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [wrongMessage, setWrongMessage] = useState("")

  const navigation = useNavigation()

  // 로그인
  async function signInWithEmail() {
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      setWrongMessage("아이디나 비밀번호가 맞지 않습니다!")
      setErrorMessage("")
      setEmail("")
      setPassword("")
    } else {
      navigation.navigate("TabNavigator" as never)
      setEmail("")
      setPassword("")
      setWrongMessage("")
    }
    setLoading(false)
  }

  // 소셜 로그인
  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    })
    if (data) alert("로그인 되었습니다.")
    if (error) {
      console.error("Google OAuth error:", error.message)
      return
    } else {
      navigation.navigate("TabNavigator" as never)
    }
  }

  // 이메일 형식이 올바른지 검사하는 함수
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  // 이메일 형식 검사 및 상태 설정 함수
  const handleEmailChange = (text: any) => {
    setEmail(text)
    if (!validateEmail(text)) {
      setErrorMessage("올바른 이메일 형식이 아닙니다.")
    } else {
      setErrorMessage("")
    }
  }

  return (
    <>
      <BackIcon
        name="chevron-left"
        onPress={() => {
          navigation.navigate("Home" as never)
        }}
      />
      <LoginContainer>
        <TitleContainer>
          <TitleText>돈, 워리</TitleText>
        </TitleContainer>
        <InputContainer>
          <InputLabel>이메일</InputLabel>
          <InputTextContainer>
            <StyledTextInput onChangeText={handleEmailChange} value={email} placeholder="email@address.com" autoCapitalize={"none"} />
          </InputTextContainer>
          <ErrorMessage>{!!errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}</ErrorMessage>
        </InputContainer>
        <InputContainer>
          <InputLabel>비밀번호</InputLabel>
          <InputTextContainer>
            <StyledTextInput onChangeText={(text: string) => setPassword(text)} value={password} secureTextEntry={true} placeholder="* * * * * * * * *" autoCapitalize={"none"} />
          </InputTextContainer>
          <ErrorMessage>{!!wrongMessage && <ErrorMessage>{wrongMessage}</ErrorMessage>}</ErrorMessage>
        </InputContainer>
        <ButtonContainer>
          <LoginButton disabled={loading} onPress={() => signInWithEmail()}>
            <ButtonWhiteText>로그인</ButtonWhiteText>
          </LoginButton>
        </ButtonContainer>
        <ButtonContainer>
          <GoogleLoginButton disabled={loading} onPress={() => signInWithGoogle()}>
            <GoogleLoginButtonContainer>
              <GoogleIcon name="google" />
              <ButtonBlackText>Google로 시작하기</ButtonBlackText>
            </GoogleLoginButtonContainer>
          </GoogleLoginButton>
        </ButtonContainer>
        <QuestionContainer>
          <InputHrLabel />
          <QuestionText>계정이 없으신가요?</QuestionText>
        </QuestionContainer>
        <ButtonContainer>
          <SignUpButton
            disabled={loading}
            onPress={() => {
              navigation.navigate("SignUp" as never)
            }}>
            <ButtonBlackText>회원가입</ButtonBlackText>
          </SignUpButton>
        </ButtonContainer>
      </LoginContainer>
    </>
  )
}

export default Auth

const LoginContainer = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`

const BackIcon = styled(Icon)`
  font-size: 60px;
`

const TitleContainer = styled(View)`
  margin-bottom: 40px;
`

const TitleText = styled(Text)`
  font-size: 35px;
  font-weight: 700;
  font-family: "LINE Seed Sans KR";
`

const InputContainer = styled(View)`
  align-items: center;
  width: 90%;
  margin-bottom: 20px;
`

const InputLabel = styled(Text)`
  width: 90%;
  margin-bottom: 20px;
`

const InputTextContainer = styled(View)`
  width: 90%;
  border-color: #ccc;
  border-bottom-width: 1;
  margin-bottom: 15px;
`

const StyledTextInput = styled(TextInput)`
  width: 90%;
  padding: 0px 10px;
`

const ErrorMessage = styled(Text)`
  width: 90%;
  color: red;
`

const ButtonContainer = styled(View)`
  width: 90%;
  margin-bottom: 20px;
  flex-direction: row;
  justify-content: space-around;
`

const LoginButton = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 48px;
  border-radius: 8px;
  background-color: #ffbe98;
`

const GoogleLoginButton = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 48px;
  border-radius: 8px;
  border: 2px solid #ffe6bf;
`

const GoogleLoginButtonContainer = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const GoogleIcon = styled(Icon)`
  font-size: 28px;
  margin-right: 10px;
`

const QuestionContainer = styled(View)`
  width: 90%;
  align-items: center;
  margin-top: 19px;
`

const InputHrLabel = styled(Text)`
  width: 90%;
  height: 1px;
  border: 1px solid #d9d9d9;
  margin-bottom: 19px;
`

const QuestionText = styled(Text)`
  color: #000;
  font-size: 15px;
  font-weight: 700;
  font-family: "LINE Seed Sans KR";
  margin-bottom: 19px;
`

const SignUpButton = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 48px;
  border-radius: 8px;
  border: 2px solid #ffe6bf;
`

const ButtonWhiteText = styled(Text)`
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  font-family: "Pretendard";
`

const ButtonBlackText = styled(Text)`
  color: #000;
  font-size: 16px;
  font-weight: 600;
  font-family: "Pretendard";
`
