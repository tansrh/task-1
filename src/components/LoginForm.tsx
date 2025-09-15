
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const inputConfig = [
    {
        type: "text",
        name: "username",
        icon: "/username_icon.svg",
        label: "User name",
        validation: {
            required: "Username is required",
            validate: (v: string) => v === "emilys" || "Username must be 'emilys'",
        },
    },
    {
        type: "email",
        name: "email",
        icon: "/mail_icon.svg",
        label: "Email",
        validation: {
            validate: (v: string) => {
                if (!v) return true;
                const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return pattern.test(v) || "Invalid email format";
            },
        },
    },
    {
        type: "password",
        name: "password",
        icon: "/key.svg",
        label: "Password",
        validation: {
            required: "Password is required",
            minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
            },
        },
    },
];

const FloatingInput = ({
    config,
    register,
    error,
    getValues,
    showPassword,
    setShowPassword,
}: {
    config: typeof inputConfig[number];
    register: any;
    error?: string;
    getValues: (name: string) => any;
    showPassword?: boolean;
    setShowPassword?: (v: boolean) => void;
}) => {
    const [focused, setFocused] = useState(false);
    const isPassword = config.type === "password";
    const value = getValues(config.name) || "";
    return (
        <div>
            <div className={`input-wrapper floating ${(focused || value) ? "active" : ""}`} style={{ position: "relative" }}>
                <img src={config.icon} alt={`${config.label} Icon`} className="input-icon" />
                <input
                    type={isPassword && showPassword ? "text" : config.type}
                    id={config.name}
                    {...register(config.name, config.validation)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />
                <span className="floating-label">{config.label}</span>
                {isPassword && setShowPassword && (
                    <button
                        type="button"
                        className="visibility-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        <img
                            src={showPassword ? "/visibility.svg" : "/visibility.svg"}
                            alt={showPassword ? "Hide" : "Show"}
                            className="visibility-icon"
                        />
                    </button>
                )}

            </div>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

const LoginForm: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm();

    // Auto-redirect if user is already logged in
    useEffect(() => {
        const user = localStorage.getItem("authUser");
        if (user) {
            navigate("/main");
        }
    }, [navigate]);

    const onSubmit = async (data: any) => {
        try {
            const payload: any = {
                username: data.username,
                password: data.password,
            };
            if (data.email) payload.email = data.email;
            payload.expiresInMins = 30;

            const res = await fetch("https://dummyjson.com/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const result = await res.json();
            if (res.ok && result.token) {
                localStorage.setItem("authUser", JSON.stringify(result));
                navigate("/main");
            } else {
                alert(result.message || "Login failed");
            }
        } catch (err) {
            alert("Network error. Please try again.");
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            {inputConfig.map((config) => (
                <FloatingInput
                    key={config.name}
                    config={config}
                    register={register}
                    error={errors[config.name]?.message as string}
                    getValues={getValues}
                    showPassword={config.type === "password" ? showPassword : undefined}
                    setShowPassword={config.type === "password" ? setShowPassword : undefined}
                />
            ))}
            <div className="form-options">
                <div>
                    <div className="checkbox-group">
                        <input type="checkbox" id="remember" {...register("rememberMe", {
                            required: "Please check to continue"
                        })} />
                        <label htmlFor="remember">Remember Me</label>

                    </div>
                    {errors.rememberMe && (
                        <div className="error-message" style={{ marginTop: "0.2rem" }}>
                            {errors.rememberMe.message as string}
                        </div>
                    )}
                </div>
                <a href="#" className="forgot-password">
                    Forgot Password?
                </a>
            </div>
            <button type="submit" className="login-btn">
                Login
            </button>
        </form>
    );
};

export default LoginForm;
