import { useState } from 'react';
import style from './Group.module.scss';

const Group = ({ isActiveGroup, setIsActiveGroup, makeGroup }) => {
  const [group, setGroup] = useState([
    { id: '1', groupName: 'mark' },
    { id: '2', groupName: 'type' },
  ]);

  const handleGrouping = event => {
    const id = event.target.dataset.id;
    const groupName = event.target.dataset.groupname;
    if (id === isActiveGroup) {
      setIsActiveGroup('');
      makeGroup('');
    } else {
      setIsActiveGroup(id);
      makeGroup(groupName);
    }
  };

  const groupEl = group.map(({ id, groupName }) => (
    <button
      key={id}
      data-id={id}
      data-groupname={groupName}
      onClick={handleGrouping}
      className={`${isActiveGroup === id ? style.active : ''} ${
        style.groupBtn
      }`}
    >
      {groupName}
    </button>
  ));

  return (
    <div>
      <span className={style.groupHeading}>Group by: </span>
      {groupEl}
    </div>
  );
};

export default Group;
