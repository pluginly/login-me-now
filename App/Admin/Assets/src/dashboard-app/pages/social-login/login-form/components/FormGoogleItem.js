import React from "react";
import { useSelector } from "react-redux";

export default function FormGoogleItem() {
  const loginButtonStyleData = useSelector((state) => state.loginButtonStyle);
  return (
    <>
      {loginButtonStyleData === "icon" && (
        <div className="bg-white flex items-center justify-center shadow-md h-[50px] w-[50px] rounded-[4px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 25 25"
            fill="none"
          >
            <path
              d="M22.714 10.4596H21.875V10.4163H12.5V14.583H18.387C17.5281 17.0085 15.2203 18.7497 12.5 18.7497C9.04842 18.7497 6.24998 15.9512 6.24998 12.4997C6.24998 9.04811 9.04842 6.24967 12.5 6.24967C14.0932 6.24967 15.5427 6.85072 16.6463 7.83249L19.5927 4.88613C17.7323 3.15228 15.2437 2.08301 12.5 2.08301C6.74738 2.08301 2.08331 6.74707 2.08331 12.4997C2.08331 18.2523 6.74738 22.9163 12.5 22.9163C18.2526 22.9163 22.9166 18.2523 22.9166 12.4997C22.9166 11.8012 22.8448 11.1195 22.714 10.4596Z"
              fill="#FFC107"
            />
            <path
              d="M3.28436 7.65124L6.70676 10.1611C7.6328 7.86842 9.87551 6.24967 12.5 6.24967C14.0932 6.24967 15.5427 6.85072 16.6463 7.83249L19.5927 4.88613C17.7323 3.15228 15.2437 2.08301 12.5 2.08301C8.49895 2.08301 5.02915 4.34186 3.28436 7.65124Z"
              fill="#FF3D00"
            />
            <path
              d="M12.5 22.9165C15.1906 22.9165 17.6354 21.8868 19.4839 20.2124L16.2599 17.4842C15.1789 18.3063 13.8581 18.7509 12.5 18.7499C9.79063 18.7499 7.4901 17.0223 6.62344 14.6113L3.22656 17.2285C4.95052 20.602 8.45156 22.9165 12.5 22.9165Z"
              fill="#4CAF50"
            />
            <path
              d="M22.7141 10.4602H21.875V10.417H12.5V14.5837H18.387C17.9761 15.738 17.2361 16.7468 16.2583 17.4852L16.2599 17.4842L19.4839 20.2123C19.2557 20.4196 22.9167 17.7087 22.9167 12.5003C22.9167 11.8019 22.8448 11.1201 22.7141 10.4602Z"
              fill="#1976D2"
            />
          </svg>
        </div>
      )}
      {loginButtonStyleData === "text" || loginButtonStyleData === undefined ? (
        <div className="flex items-center border border-[#CCCCBE] rounded-[8px] p-3 mb-3">
          <div className="w-[20%] flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 25 25"
              fill="none"
            >
              <path
                d="M22.714 10.4596H21.875V10.4163H12.5V14.583H18.387C17.5281 17.0085 15.2203 18.7497 12.5 18.7497C9.04842 18.7497 6.24998 15.9512 6.24998 12.4997C6.24998 9.04811 9.04842 6.24967 12.5 6.24967C14.0932 6.24967 15.5427 6.85072 16.6463 7.83249L19.5927 4.88613C17.7323 3.15228 15.2437 2.08301 12.5 2.08301C6.74738 2.08301 2.08331 6.74707 2.08331 12.4997C2.08331 18.2523 6.74738 22.9163 12.5 22.9163C18.2526 22.9163 22.9166 18.2523 22.9166 12.4997C22.9166 11.8012 22.8448 11.1195 22.714 10.4596Z"
                fill="#FFC107"
              />
              <path
                d="M3.28436 7.65124L6.70676 10.1611C7.6328 7.86842 9.87551 6.24967 12.5 6.24967C14.0932 6.24967 15.5427 6.85072 16.6463 7.83249L19.5927 4.88613C17.7323 3.15228 15.2437 2.08301 12.5 2.08301C8.49895 2.08301 5.02915 4.34186 3.28436 7.65124Z"
                fill="#FF3D00"
              />
              <path
                d="M12.5 22.9165C15.1906 22.9165 17.6354 21.8868 19.4839 20.2124L16.2599 17.4842C15.1789 18.3063 13.8581 18.7509 12.5 18.7499C9.79063 18.7499 7.4901 17.0223 6.62344 14.6113L3.22656 17.2285C4.95052 20.602 8.45156 22.9165 12.5 22.9165Z"
                fill="#4CAF50"
              />
              <path
                d="M22.7141 10.4602H21.875V10.417H12.5V14.5837H18.387C17.9761 15.738 17.2361 16.7468 16.2583 17.4852L16.2599 17.4842L19.4839 20.2123C19.2557 20.4196 22.9167 17.7087 22.9167 12.5003C22.9167 11.8019 22.8448 11.1201 22.7141 10.4602Z"
                fill="#1976D2"
              />
            </svg>
          </div>
          <div className="w-[60%] text-center">
            <span className="text-[16px] text-[#646464]">
              Continue with <span className="font-medium">Google</span>
            </span>
          </div>
          <div className="w-[20%]"></div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
