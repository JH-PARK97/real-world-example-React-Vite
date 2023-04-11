import { json, redirect } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS, PAGE_ENDPOINTS } from "../constants/constants";
import instance from "../utils/interceptor";

const handleRegisterAction = async (ctx) => {
  // action은 async, await으로 작동. get은 loader로, 나머지는 action으로 처리
  // context의 request.formData();를 이용해서 <Form>태그에서 전달한 정보를
  // 가져온다.
  const formData = await ctx.request.formData();
  const email = formData.get("email");
  const username = formData.get("username");
  const password = formData.get("password");

  // useActionData를 이용해 errors를 처리한다.
  // client측 Validation Check를 함.
  // remix 환경에선 이 부분이 서버에서 작동. 지금은 아님

  const errors = {};

  if (typeof username !== "string" || !username) {
    errors.username = "username은 공백일 수 없습니다.";
  }
  if (typeof email !== "string" || !email.includes("@")) {
    errors.email = "이메일 양식이 맞지 않습니다.";
  }
  if (typeof password !== "string" || !password) {
    errors.password = "비밀번호가 공백일 수없습니다.";
  }
  // 에러가 존재하면 에러를 json형식으로 return.
  if (Object.keys(errors).length) {
    return json(errors);
  }

  // fetch에서 error는 항상 try - catch로 처리해야함
  //
  try {
    await instance.post(API_ENDPOINTS.AUTH.REGIS, {
      user: {
        username,
        email,
        password,
      },
    });

    return redirect(PAGE_ENDPOINTS.AUTH.LOGIN);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("2 error @@@@@ ", error);
      switch (error.response.status) {
        case 422: {
          // 실패
          const data = error.response.data;
          if (data.errors) {
            console.log(data.errors);
            Object.keys(data.errors).map((key) => {
              console.log(key);
              if (data.errors[key]) {
                console.log("value:", data.errors[key]);
                // key = data.errors[key];
                errors[key] = data.errors[key][0];
              }
            });
            console.log("errors : ", errors);
            // [username, email, password]
            return json(errors);
          }
          break;
        }
      }
    }
  }
  return null;
};

export default handleRegisterAction;
