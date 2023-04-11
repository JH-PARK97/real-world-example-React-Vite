import React from "react";
import { Form, NavLink, useActionData } from "react-router-dom";

const Login = () => {
  const isRegister = false;
  const errors = useActionData();

  if (errors) {
    console.log(errors);
  }
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign {isRegister ? "up" : "in"}</h1>
            <NavLink to="/register">{isRegister ? "Have" : "Need"} an account?</NavLink>

            {/* replace는 history의 push, replace와 비슷한 기능 */}
            <Form method="post" replace>
              <input
                style={{
                  marginBottom: 15,
                  marginTop: 15,
                }}
                type="email"
                name="email"
                className="form-control form-control-lg"
                placeholder="Email"
              />
              {errors?.email && <span>{errors.email}</span>}
              <input type="password" name="password" className="form-control form-control-lg" placeholder="Password" />
              {errors?.password && <span>{errors.password}</span>}
              <button
                style={{
                  marginTop: 10,
                }}
                type="submit"
                className="btn btn-lg btn-primary pull-xs-right"
              >
                Sign in
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
