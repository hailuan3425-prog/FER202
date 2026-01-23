import ListOfUsers from "./ListOfUsers";

function ManageUsers() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Manage Users</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 20,
          marginTop: 20,
        }}
      >
        {ListOfUsers.map((user) => (
          <div
            key={user.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: 8,
              padding: 15,
              textAlign: "center",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={user.avatar}
              alt="avatar"
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                marginBottom: 10,
              }}
            />

            <h4>{user.username}</h4>
            <p>ID: {user.id}</p>
            <p>Status: {user.status}</p>
            <p>Password: {user.password}</p>

            <div style={{ marginTop: 10 }}>
              <button style={{ marginRight: 8 }}>Edit</button>
              <button>Lock</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageUsers;
