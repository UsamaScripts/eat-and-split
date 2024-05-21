import { Children } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList />
        <FormAddFriend />
        <Button>Add Friend</Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendList() {
  const friends = initialFriends;
  return (
    <ul>
      {friends.map((friend) => (
        <Friends friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}
function Friends({ friend, key }) {
  return (
    <li>
      <img scr={friend.image} alt={friend.name} />
      {friend.name}
      {friend.balance < 0 && (
        <p className="red">
          You Own {friend.name} {friend.balance}$
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} Own You {friend.balance}$
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are Even</p>}
      <Button>Select </Button>
    </li>
  );
}
function Button({ children }) {
  return <button className="button">{children}</button>;
}
function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <lable> Friend Name 🤦🏼‍♂️</lable>
      <input type="text" />
      <lable> Image Url 🎆</lable>
      <input type="text" />
      <Button>Add Friend</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Eat Split Bill with X</h2>

      <lable> Bill Value 🤦🏼‍♂️</lable>
      <input type="text" />

      <lable> Your Expenses 🤦🏼‍♂️</lable>
      <input type="text" />

      <lable> Your Friend Expenses 🤦🏼‍♂️</lable>
      <input type="text" disabled />

      <lable>🤑 Who are Going To Pay Bill </lable>
      <select>
        <option value="user">user</option>
        <option value="firend">friend</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}

export default App;
