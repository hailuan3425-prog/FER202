import React from "react";

export default function DemoForm() {
  return (
    <div style={{ width: 360, padding: 20, border: "1px solid #ddd", borderRadius: 8 }}>
      <h3>Form đặt vé máy bay</h3>

      <label>Họ tên</label>
      <input
        type="text"
        placeholder="Họ tên"
        style={{ width: "100%", marginBottom: 10 }}
      />
      <small>Phải nhập 5 ký tự, in hoa...</small>

      <br /><br />

      <label>Địa chỉ</label>
      <input
        type="text"
        style={{ width: "100%", marginBottom: 10 }}
      />
      <small>Phải nhập 5 ký tự, in hoa...</small>

      <br /><br />

      <div style={{ display: "flex", gap: 10 }}>
        <div style={{ flex: 1 }}>
          <label>Đi từ</label>
          <select style={{ width: "100%" }}>
            <option>Hà nội</option>
            <option>Đà nẵng</option>
          </select>
        </div>

        <div style={{ flex: 1 }}>
          <label>Đến</label>
          <select style={{ width: "100%" }}>
            <option>Hà nội</option>
            <option>Hồ chí minh</option>
          </select>
        </div>
      </div>

      <br />

      <label>Chọn chiều đi (Khứ hồi)</label>
      <div>
        <input type="checkbox" name="type" /> Đi
      </div>
      <div>
        <input type="checkbox" name="type" /> Về
      </div>

      <br />

      <button
        style={{
          width: "100%",
          background: "#1677ff",
          color: "white",
          padding: 10,
          border: "none",
          borderRadius: 6
        }}
      >
        Đặt vé
      </button>
    </div>
  );
}
