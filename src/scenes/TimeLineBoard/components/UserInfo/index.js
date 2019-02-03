import React from 'react';
import PropTypes from 'prop-types';
import faker from 'faker';

import UserInfoCard from './styles';


const propTypes = { };

const UserInfo = () => (
  <UserInfoCard>
    <UserInfoCard.Avatar>
      <UserInfoCard.AvatarImg src={faker.image.avatar()} />
    </UserInfoCard.Avatar>
    <UserInfoCard.Name>{faker.name.findName()}</UserInfoCard.Name>
  </UserInfoCard>
);

UserInfo.propTypes = propTypes;
export default UserInfo;
