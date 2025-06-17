// src/components/FacebookLoginButton.tsx
import React from 'react';
import FacebookLogin from 'react-facebook-login';

const FacebookLoginButton: React.FC = () => {
  const responseFacebook = (response: any) => {
    console.log(response);
    // Gửi access token đến backend để xử lý
  };

  return (
    <FacebookLogin
      appId="your-facebook-app-id"  // Thay thế bằng App ID của bạn
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
      icon="fa-facebook"
    />
  );
};

export default FacebookLoginButton;
