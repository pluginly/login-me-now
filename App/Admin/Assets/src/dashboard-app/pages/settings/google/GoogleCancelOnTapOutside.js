import { __ } from '@wordpress/i18n';
import { useSelector, useDispatch } from 'react-redux';
import { Switch } from '@headlessui/react'
import apiFetch from '@wordpress/api-fetch';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

const GoogleCancelOnTapOutside = () => {

	const dispatch = useDispatch();

	const enableGoogleCancelOnTapOutside = useSelector((state) => state.enableGoogleCancelOnTapOutside);
	const enableGoogleCancelOnTapOutsideStatus = false === enableGoogleCancelOnTapOutside ? false : true;

	const enableGoogleLogin = useSelector((state) => state.enableGoogleLogin);
	const enableGoogleLoginStatus = false === enableGoogleLogin ? false : true;
	
	const updateStatus = () => {

		let assetStatus;
		if (enableGoogleCancelOnTapOutside === false) {
			assetStatus = true;
		} else {
			assetStatus = false;
		}

		console.log(assetStatus)
		dispatch({ type: 'UPDATE_ENABLE_CANCEL_ON_TAP_OUTSIDE', payload: assetStatus });

		const formData = new window.FormData();

		formData.append('action', 'login_me_now_update_admin_setting');
		formData.append('security', lmn_admin.update_nonce);
		formData.append('key', 'google_cancel_on_tap_outside');
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
		<section className={`${enableGoogleLoginStatus ? 'block' :'hidden'} border-b border-solid border-slate-200 px-8 py-8 justify-between`}>
			<div className='mr-16 w-full flex items-center'>
				<h3 className="p-0 flex-1 justify-right inline-flex text-xl leading-6 font-semibold text-slate-800">
					{__('One Tap Prompt Behavior', 'login-me-now')}
				</h3>
				<Switch
					checked={enableGoogleCancelOnTapOutsideStatus}
					onChange={updateStatus}
					className={classNames(
						enableGoogleCancelOnTapOutsideStatus ? 'bg-lmn' : 'bg-slate-200',
						'group relative inline-flex h-4 w-9 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-lmn focus:ring-offset-2'
					)}
				>
					<span aria-hidden="true" className="pointer-events-none absolute h-full w-full rounded-md bg-white" />
					<span
						aria-hidden="true"
						className={classNames(
							enableGoogleCancelOnTapOutsideStatus ? 'bg-lmn' : 'bg-gray-200',
							'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out'
						)}
					/>
					<span
						aria-hidden="true"
						className={classNames(
							enableGoogleCancelOnTapOutsideStatus ? 'translate-x-5' : 'translate-x-0',
							'toggle-bubble pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out'
						)}
					/>
				</Switch>
				
			</div>
			<p className="mt-2 w-9/12 text-sm text-slate-500 tablet:w-full">
				{__("Enable automatic closing on outside clicks", 'login-me-now')}
			</p>
		</section>
	);
};

export default GoogleCancelOnTapOutside;