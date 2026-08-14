import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    if (
      email.trim() === "admin@warehouse.com" &&
      password === "admin123"
    ) {
      const admin = {
        name: "Administrator",
        email: "admin@warehouse.com",
        role: "Administrator",
      };

      localStorage.setItem(
        "warehouse_current_user",
        JSON.stringify(admin)
      );

      navigate("/");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <main className="login-page">

      <div className="login-image"></div>
      <div className="login-overlay"></div>

      <Link to="/welcome" className="login-brand">
        <div className="login-brand-icon">
          <i className="bi bi-boxes"></i>
        </div>

        <div>
          <strong>UDEVS</strong>
          <span>WAREHOUSE</span>
        </div>
      </Link>

      <div className="login-wrapper">

        <div className="login-glass">

          <div className="login-top">

            <div className="login-symbol">
              <i className="bi bi-shield-lock"></i>
            </div>

            <div>
              <span className="login-small-title">
                ADMIN ACCESS
              </span>

              <h1>Welcome Back</h1>
            </div>

          </div>

          <p className="login-intro">
            Sign in to continue managing your warehouse.
          </p>

          {error && (
            <div className="login-error">
              <i className="bi bi-exclamation-circle"></i>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>

            <div className="modern-input">

              <i className="bi bi-envelope input-icon"></i>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
                autoComplete="email"
              />

              <label>Email Address</label>

            </div>

            <div className="modern-input">

              <i className="bi bi-lock input-icon"></i>

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
                autoComplete="current-password"
              />

              <label>Password</label>

              <button
                type="button"
                className="show-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Show password"
              >
                <i
                  className={
                    showPassword
                      ? "bi bi-eye-slash"
                      : "bi bi-eye"
                  }
                ></i>
              </button>

            </div>

            <button className="login-button" type="submit">

              <span>Sign In</span>

              <span className="login-button-icon">
                <i className="bi bi-arrow-right"></i>
              </span>

            </button>

          </form>

          <div className="login-demo">

            <div className="demo-icon">
              <i className="bi bi-info-lg"></i>
            </div>

            <div>
              <strong>Demo Administrator</strong>

              <span>
                admin@warehouse.com
              </span>

              <span>
                Password: admin123
              </span>
            </div>

          </div>

          <Link to="/welcome" className="login-back">
            <i className="bi bi-arrow-left"></i>
            Back to Home
          </Link>

        </div>

      </div>

      <div className="login-decoration decoration-one"></div>
      <div className="login-decoration decoration-two"></div>

    </main>
  );
}

export default Login;