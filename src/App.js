import { useState } from "react";

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

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function App() {
  const [showFormAddFriend, setFormAddFriend] = useState(false);
  function handleShow() {
    setFormAddFriend((show) => !show);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList />
        {showFormAddFriend && <FormAddFriend />}
        <Button onClick={handleShow}>
          {showFormAddFriend ? "Close" : "Add Friend"}
        </Button>
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

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label> Friend Name 🤦🏼‍♂️</label>
      <input type="text" />
      <label> Image Url 🎆</label>
      <input type="text" />
      <Button>Add Friend</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Eat Split Bill with X</h2>

      <label> Bill Value 🤦🏼‍♂️</label>
      <input type="text" />

      <label> Your Expenses 🤦🏼‍♂️</label>
      <input type="text" />

      <label> Your Friend Expenses 🤦🏼‍♂️</label>
      <input type="text" disabled />

      <label>🤑 Who are Going To Pay Bill </label>
      <select>
        <option value="user">user</option>
        <option value="firend">friend</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}

export default App;
