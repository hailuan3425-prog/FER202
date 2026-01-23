import React from "react";
import bg from "../assets/login-bg.jpg"; // ảnh bên trái

function LoginForm() {
  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">

        {/* LEFT IMAGE */}
        <div
          className="col-md-6 d-none d-md-flex align-items-center justify-content-center text-white"
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="p-5">
            <h1>Khám phá thế giới</h1>
            <p>Hơn 1000 điểm đến với giá tốt nhất</p>
          </div>
        </div>

        {/* RIGHT LOGIN */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div style={{ width: "360px" }}>
            <h2 className="mb-3">Đăng nhập</h2>

            <div className="mb-3">
              <input className="form-control" placeholder="Username" />
            </div>

            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>

            <button className="btn btn-primary w-100 mb-2">
              Login
            </button>

            <button className="btn btn-outline-secondary w-100">
              Cancel
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default LoginForm;
