import { __ } from '@wordpress/i18n';
import { useSelector, useDispatch } from 'react-redux';
import { Switch } from '@headlessui/react'
import apiFetch from '@wordpress/api-fetch';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

const FacebookLogin = () => {

	const dispatch = useDispatch();

	const enableFacebookLogin = useSelector((state) => state.enableFacebookLogin);
	const enableFacebookLoginStatus = false === enableFacebookLogin ? false : true;

	const updateLogsStatus = () => {

		let assetStatus;
		if (enableFacebookLogin === false) {
			assetStatus = true;
		} else {
			assetStatus = false;
		}

		dispatch({ type: 'UPDATE_ENABLE_FACEBOOK_LOGIN', payload: assetStatus });

		const formData = new window.FormData();

		formData.append('action', 'login_me_now_update_admin_setting');
		formData.append('security', lmn_admin.update_nonce);
		formData.append('key', 'facebook_login');
		formData.append('value', assetStatus);

		apiFetch({
			url: lmn_admin.ajax_url,
			method: 'POST',
			body: formData,
		}).then(() => {
			dispatch({ type: 'UPDATE_SETTINGS_SAVED_NOTIFICATION', payload: __('Successfully saved!', 'login-me-now') });
		});
	};

	return (
		<section className='block pb-6 pt-12 justify-between'>
			<div className='mr-16 w-full flex items-center'>
				<h3 className="p-0 flex-1 justify-right inline-flex text-[24px] leading-6 font-semibold text-slate-800">
					{__('Facebook', 'login-me-now')}
				</h3>
				<Switch

					checked={enableFacebookLoginStatus}
					onChange={updateLogsStatus}
					className={classNames(
						enableFacebookLoginStatus ? 'bg-lmn' : 'bg-slate-200',
						'group relative inline-flex h-[8px] w-[32px] flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-lmn focus:ring-offset-2'
					)}
				>
					<span aria-hidden="true" className="pointer-events-none absolute h-full w-full rounded-md bg-white" />
					<span
						aria-hidden="true"
						className={classNames(
							enableFacebookLoginStatus ? 'bg-lmn' : 'bg-gray-200',
							'pointer-events-none absolute mx-auto h-[16px] w-[32px] rounded-full transition-colors duration-200 ease-in-out'
						)}
					/>
					<span
						aria-hidden="true"
						className={classNames(
							enableFacebookLoginStatus ? 'translate-x-5' : 'translate-x-0',
							'toggle-bubble pointer-events-none absolute left-0 inline-block h-[16px] w-[16px] transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out'
						)}
					/>
				</Switch>
				
			</div>
			<p className="mt-6 w-9/12 text-[16px] text-slate-500 tablet:w-full leading-[1.7]">
				{__('Enable facebook login', 'login-me-now')}
			</p>
		</section>
	);
};

export default FacebookLogin;