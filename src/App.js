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
  const [friends, setFriends] = useState(initialFriends);
  const [showFormAddFriend, setFormAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  function handleShow() {
    setFormAddFriend((show) => !show);
  }
  function handleSelection(friend) {
    setSelectedFriend((s) => (s?.id === friend.id ? null : friend));
    setFormAddFriend(false);
  }
  function handleSplitBill(value) {
    console.log(value);
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelection}
        />
        {showFormAddFriend && (
          <FormAddFriend
            setFriends={setFriends}
            setFormAddFriend={setFormAddFriend}
          />
        )}
        <Button onClick={handleShow}>
          {showFormAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          handleSplitBill={handleSplitBill}
          key={selectedFriend.id}
        />
      )}
    </div>
  );
}

function FriendList({ friends, onSelection, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friends
          friend={friend}
          key={friend.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friends({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  console.log(isSelected);
  return (
    <>
      <li className={isSelected ? "selected" : ""}>
        <img src={friend.image} alt={friend.name} />
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
        <Button onClick={() => onSelection(friend)}>
          {isSelected ? "Close" : "Select"}
        </Button>
      </li>
    </>
  );
}

function FormAddFriend({ setFriends, setFormAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    setFriends((friends) => [...friends, newFriend]);
    setFormAddFriend(false);
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🤦🏼‍♂️ Friend Name </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>🎆 Image Url </label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add Friend</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend, handleSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  const paidByFriend = bill && bill - paidByUser;
  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !paidByUser) return;
    handleSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Eat Split Bill with {selectedFriend.name}</h2>

      <label> 🤦🏼‍♂️Bill Value </label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label> 🤦🏼‍♂️Your Expenses </label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          Number(e.target.value) > bill
            ? paidByUser
            : setPaidByUser(Number(e.target.value))
        }
      />

      <label> 🤦🏼‍♂️{selectedFriend.name} Friend Expenses </label>
      <input type="text" disabled value={paidByFriend} />

      <label>🤑 Who are Going To Pay Bill </label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">User</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}

export default App;
