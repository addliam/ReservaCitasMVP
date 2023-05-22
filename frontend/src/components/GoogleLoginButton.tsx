import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

interface GoogleLoginButtonProps {
  rol: string;
  onSuccess: any;
  onError: any;
}

const GoogleLoginButton = ({
  rol,
  onSuccess,
  onError,
}: GoogleLoginButtonProps) => {
  return (
    <GoogleLogin
      theme="filled_black"
      onSuccess={onSuccess()}
      onError={onError()}
      width="190"
      ux_mode="redirect"
      text="signin_with"
      login_uri={`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/google?rol=${rol}`}
    />
  );
};

export default GoogleLoginButton;
