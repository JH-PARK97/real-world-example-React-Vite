import React from "react";
import { Form, useActionData, useNavigate, useOutletContext } from "react-router-dom";
import useAuth from "../store/store";

const Settings = () => {
  const { userProfile } = useOutletContext();
  const errors = useActionData();


  const { setIsLogin } = useAuth((state) => ({
    setIsLogin: state.setIsLogin,
  }));
  const navigator = useNavigate();
  const clickLogoutButton = () => {
    localStorage.removeItem("jwtToken");
    setIsLogin();
    navigator("/");
  };

  return (
    <>
      <title>Settings</title>
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>
              <Form method="post" replace>
                <fieldset>
                  <fieldset className="form-group">
                    <input name="image" defaultValue={userProfile?.image} className="form-control" type="text" placeholder="URL of profile picture" />
                  </fieldset>
                  <fieldset className="form-group">
                    <input name="username" defaultValue={userProfile?.username} className="form-control form-control-lg" type="text" placeholder="Your Name" />
                    {errors?.username && <span>{errors.username}</span>}
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea name="bio" defaultValue={userProfile?.bio} className="form-control form-control-lg" rows={8} placeholder="Short bio about you" />
                  </fieldset>
                  <fieldset className="form-group">
                    <input name="email" defaultValue={userProfile?.email} className="form-control form-control-lg" type="text" placeholder="Email" />
                    {errors?.email && <span>{errors.email}</span>}
                  </fieldset>
                  <fieldset className="form-group">
                    <input name="password" className="form-control form-control-lg" type="password" placeholder="Password" />
                  </fieldset>
                  <button type="submit" className="btn btn-lg btn-primary pull-xs-right">
                    Update Settings
                  </button>
                </fieldset>
              </Form>
              <hr />
              <button onClick={clickLogoutButton} type="button" className="btn btn-outline-danger">
                Or click here to logout.
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
