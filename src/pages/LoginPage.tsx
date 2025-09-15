import React from "react";
import LoginForm from "../components/LoginForm";
import SocialBtn from "../components/SocialBtn";
import PageHeading from "../components/PageHeading";
import "../App.scss";

const LoginPage: React.FC = () => {
    return (
        <div className="login-page">
            <div className="illustration-section">
                <img src="/Illustration.svg" alt="Login Illustration" className="login-illustration" />
            </div>

            <div className="form-section">
                <PageHeading />


                {/* Social Login Buttons */}
                <div className="social-login">
                    <SocialBtn icon="/google.svg" alt="Google" className="google-btn">
                        Login with Google
                    </SocialBtn>
                    <SocialBtn icon="/facebook.svg" alt="Facebook" className="facebook-btn">
                        Login with Facebook
                    </SocialBtn>
                </div>
                <div className="divider">
                    <span>OR</span>
                </div>
                <LoginForm />
                <div className="register-link-wrapper">
                    <span>Don’t have an account?</span>
                    <a href="#" className="register-link">Register</a>
                </div>

                {/* Links */}
                
            </div>
        </div>
    );
};

export default LoginPage;
