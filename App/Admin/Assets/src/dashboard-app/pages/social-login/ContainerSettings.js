import { __ } from "@wordpress/i18n";
import { useSelector } from "react-redux";

import GoogleLogin from "./google/GoogleLogin";
import GoogleClientID from "./google/GoogleClientID";
import GoogleInNativeLogin from "./google/GoogleInNativeLogin";
import GoogleInUpdateExistingUserData from "./google/GoogleInUpdateExistingUserData";
import GoogleCancelOnTapOutside from "./google/GoogleCancelOnTapOutside";
import GoogleProDefaultUserRole from "./google/GoogleProDefaultUserRole";
import GoogleProDefaultUserRoleCopy from "./google/GoogleProDefaultUserRoleCopy";
import GoogleProExcludePages from "./google/GoogleProExcludePages";
import GoogleProRedirectUrl from "./google/GoogleProRedirectUrl";


import GoogleUpdateUserAvatar from "./google/GoogleUpdateUserAvatar";
import OneTapToLogin from "./google/OneTapToLogin";
import UserSwitching from "../settings/general/UserSwitching";
// import PasscodeInput from "./PasscodeInput";


function SettingsWrapper({ state }) {
  const wrappers = wp.hooks.applyFilters(
    "login_me_now_dashboard.settings_tab_wrappers",
    {
      "global-settings": (
        <>
          <UserSwitching />
        </>
      ),
      "google": (
        <>
          <GoogleLogin />
          <GoogleClientID />
          <OneTapToLogin /> 
          <GoogleInNativeLogin />
          {/* <GoogleProDefaultUserRoleCopy /> */}
          <GoogleProDefaultUserRole />
          <GoogleInUpdateExistingUserData />
          <GoogleUpdateUserAvatar />
          <GoogleProExcludePages />
          <GoogleCancelOnTapOutside />
          <GoogleProRedirectUrl />
          {/* <PasscodeInput /> */}
        </>
      ),
    }
  );
  return <div>{wrappers[state]}</div>;
}

const ContainerSettings = () => {
  const activeSocialLoginNavigationTab = useSelector(
    (state) => state.activeSocialLoginNavigationTab
  );

  // Parent Div is Required to add Padding to the Entire Structure for Smaller Windows.
  return (
    <>
      <div className="lg:col-span-9 border-l px-14">
        {wp.hooks.applyFilters(
          `login_me_now_dashboard.settings_screen_before_${activeSocialLoginNavigationTab}`,
          <span />
        )}
        <SettingsWrapper state={activeSocialLoginNavigationTab}></SettingsWrapper>
        {wp.hooks.applyFilters(
          `login_me_now_dashboard.settings_screen_after_${activeSocialLoginNavigationTab}`,
          <span />
        )}
      </div>
    </>
  );
};

export default ContainerSettings;