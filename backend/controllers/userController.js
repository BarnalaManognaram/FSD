let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
];

// Helper response
const sendResponse = (res, status, success, data = null, message = null) => {
  res.status(status).json({ success, data, message });
};

exports.getUsers = (req, res) => {
  sendResponse(res, 200, true, users);
};

exports.getUser = (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));

  if (!user) {
    return sendResponse(res, 404, false, null, "User not found");
  }

  sendResponse(res, 200, true, user);
};

exports.createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return sendResponse(res, 400, false, null, "Name is required");
  }

  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name
  };

  users.push(newUser);

  sendResponse(res, 201, true, newUser, "User created");
};

exports.updateUser = (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));

  if (!user) {
    return sendResponse(res, 404, false, null, "User not found");
  }

  const { name } = req.body;

  if (!name) {
    return sendResponse(res, 400, false, null, "Name is required");
  }

  user.name = name;

  sendResponse(res, 200, true, user, "User updated");
};

exports.deleteUser = (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));

  if (index === -1) {
    return sendResponse(res, 404, false, null, "User not found");
  }

  users.splice(index, 1);

  res.status(204).send();
};