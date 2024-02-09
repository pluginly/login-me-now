import { __ } from "@wordpress/i18n";
import { useSelector, useDispatch } from "react-redux";
import { Switch } from "@headlessui/react";
import apiFetch from "@wordpress/api-fetch";
import { Tooltip } from "antd";
import ProBtn from "../google/components/ProBtn";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const FacebookUpdateUserAvatar = () => {
  const dispatch = useDispatch();
  const isProAvailable = lmn_admin.pro_available ? true : false;

  const enableFacebookUpdateExistingUserAvatar = useSelector(
    (state) => state.enableFacebookUpdateExistingUserAvatar
  );
  const enableFacebookUpdateExistingUserAvatarStatus =
    false === enableFacebookUpdateExistingUserAvatar || !isProAvailable ? false : true;

  const enableFacebookLogin = useSelector((state) => state.enableFacebookLogin);
  const enableFacebookLoginStatus = false === enableFacebookLogin ? false : true;

  const updateLogsStatus = () => {
    let assetStatus;
    if (enableFacebookUpdateExistingUserAvatar === false) {
      assetStatus = true;
    } else {
      assetStatus = false;
    }

    dispatch({
      type: "UPDATE_ENABLE_FACEBOOK_UPDATE_EXISTING_USER_AVATAR",
      payload: assetStatus,
    });

    const formData = new window.FormData();

    formData.append("action", "login_me_now_update_admin_setting");
    formData.append("security", lmn_admin.update_nonce);
    formData.append("key", "facebook_pro_user_avatar");
    formData.append("value", assetStatus);

    apiFetch({
      url: lmn_admin.ajax_url,
      method: "POST",
      body: formData,
    }).then(() => {
      dispatch({
        type: "UPDATE_SETTINGS_SAVED_NOTIFICATION",
        payload: __("Successfully saved!", "login-me-now"),
      });
    });
  };


  return (
    <section
      className={`${
        enableFacebookLoginStatus ? "block" : "hidden"
      } login-me-now-dep-field-${enableFacebookLoginStatus} border-b border-solid border-slate-200 py-12 justify-between`}
    >
      <div className="mr-16 w-full flex items-center">
        <h3 className="p-0 flex-1 justify-right inline-flex text-[20px] leading-6 font-semibold text-slate-800">
          {__("Add user profile picture", "login-me-now")}
          {!isProAvailable ? <ProBtn /> : ""}
        </h3>
        <Tooltip title={`${isProAvailable === false ? "Upgrade to Pro" : ""}`}>
          <Switch
            checked={enableFacebookUpdateExistingUserAvatarStatus}
            onChange={isProAvailable === true ? updateLogsStatus : false}
            className={classNames(
              enableFacebookUpdateExistingUserAvatarStatus
                ? "bg-lmn"
                : "bg-slate-200",
              "group relative inline-flex h-[16px] w-[32px] flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-lmn focus:ring-offset-2"
            )}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute h-full w-full rounded-md bg-white"
            />
            <span
              aria-hidden="true"
              className={classNames(
                enableFacebookUpdateExistingUserAvatarStatus
                  ? "bg-lmn"
                  : "bg-gray-200",
                "pointer-events-none absolute mx-auto h-[16px] w-[32px] rounded-full transition-colors duration-200 ease-in-out"
              )}
            />
            <span
              aria-hidden="true"
              className={classNames(
                enableFacebookUpdateExistingUserAvatarStatus
                  ? "translate-x-5"
                  : "translate-x-0",
                "toggle-bubble pointer-events-none absolute left-0 inline-block h-[16px] w-[16px] transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out"
              )}
            />
          </Switch>
        </Tooltip>
      </div>
      <p className="mt-6 w-9/12 text-[16px] text-slate-500 tablet:w-full leading-[1.7]">
        {__(
          "Automatically retrieve the profile picture as avator from users' facebook account upon login or register using gmail",
          "login-me-now"
        )}
      </p>
    </section>
  );
};

export default FacebookUpdateUserAvatar;
