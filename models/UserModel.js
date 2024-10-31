import { get } from "../controllers/AboutController";
import connection from "../services/connectDB";

function getAllUsers() {
    return connection.execute("SELECT username, fullname, address FROM user")
}

function insertOne({username, fullname, password, address, sex, email, role = 1}) {
    return connection.execute("INSERT INTO user (username, fullname, password, address, sex, email, role) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [username, fullname, password, address, sex, email, role]
    )
}

function findOne(username) {
    return connection.execute("SELECT * FROM user WHERE username = ?", [username])
}

function updateOne({username, fullname, address, sex, email}) {
    return connection.execute("UPDATE user SET fullname = ?, address = ?, sex = ?, email = ? WHERE username = ?",
        [fullname, address, sex, email, username])
}

function updateOnePassword(username, password) {
    return connection.execute("UPDATE user SET password = ? WHERE username = ?", [password, username])
}

function deleteOne(username) {
    return connection.execute("DELETE FROM user WHERE username = ?", [username])
}

export default {
    getAllUsers,
    insertOne,
    findOne,
    updateOne,
    updateOnePassword,
    deleteOne,
}