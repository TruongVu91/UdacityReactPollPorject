import { connect } from "react-redux";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";

const LeaderBoard = ({ users }) => {
  return (
    <div>
      <h2 className="h-body">LeaderBoard</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Users</th>
            <th>Answered</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div>
                  <Image
                    className="img-table"
                    src={user.avatarURL}
                    roundedCircle
                  />
                  <br></br>
                  {user.name}
                </div>
              </td>
              <td>{Object.keys(user.answers).length}</td>
              <td>{Object.keys(user.questions).length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const mapStateToProps = ({ users }) => ({
  users: Object.values(users).sort(
    (a, b) =>
      Object.keys(b.answers).length +
      Object.keys(b.questions).length -
      (Object.keys(a.answers).length + Object.keys(a.questions).length)
  ),
});

export default connect(mapStateToProps)(LeaderBoard);
