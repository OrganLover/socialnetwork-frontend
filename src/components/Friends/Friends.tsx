import React from 'react'

function Friends() {
  const friends = [
    {fullName: 'James Franco', age: 35},
    {fullName: 'Peter Parker', age: 15},
    {fullName: 'Kate Beckinsale', age: 25},
  ]

  return (
    <div className='friendsPage'>
      <div className='friendsBlock'>
        {friends.map((friend) => {
          return (
            <div className='friendBlock'>
              <div className='friendInfo'>
                <div>{friend.fullName}</div>
                <div>{friend.age}</div>
              </div>
              <div className='friendButtons'>
                <button>Написать</button>
                <button>Удалить из друзей</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Friends
