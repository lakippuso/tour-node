const fs = require('fs');

const userData = JSON.parse(
  fs.readFileSync('./dev-data/data/users.json', 'utf8')
);

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    message: 'Success',
    data: userData,
  });
};

exports.getUser = (req, res) => {
  const id = req.params.id;
  const user = userData.find((user) => user.id == id);
  res.status(200).json({
    message: 'Success',
    data: { user: user },
  });
};

exports.addUser = (req, res) => {
  const newId = userData[userData.length - 1].id + 1;
  const newUser = Object.assign({ id: newId }, req.body);

  userData.push(newUser);

  fs.writeFile(
    './dev-data/data/users.json',
    JSON.stringify(userData),
    (error) => {
      res.status(201).json({ message: 'Success', data: { user: newUser } });
    }
  );
};

exports.updateUser = (req, res) => {
  const id = req.params.id;
  const user = data.find((user) => user.id == id);
  const updatedUser = Object.assign(user, req.body);
  res.status(200).json({ message: 'Success', data: { user: updatedUser } });
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  const user = data.find((user) => user.id == id);
  data = data.filter((user) => user.id != id);
  res.status(200).json({ message: 'Success', data: { user: user } });
};
