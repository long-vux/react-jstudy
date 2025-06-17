// src/components/GithubLoginButton.tsx
import React from 'react';
import GitHubLogin from 'react-github-login';

const GithubLoginButton: React.FC = () => {
  const onSuccess = (response: any) => {
    console.log(response);
    // Gửi code đến backend để lấy access token từ GitHub
  };

  const onFailure = (error: any) => {
    console.error(error);
  };

  return (
    <GitHubLogin
      clientId="your-github-client-id" // Thay thế bằng GitHub Client ID của bạn
      redirectUri="http://localhost:3000"  // URL mà bạn sẽ nhận lại từ GitHub
      onSuccess={onSuccess}
      onFailure={onFailure}
      buttonText="Login with GitHub"
    />
  );
};

export default GithubLoginButton;
