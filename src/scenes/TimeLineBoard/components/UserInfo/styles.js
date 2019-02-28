import styled from 'styled-components';

const UserInfoCard = styled.div`
    padding: 20px; 
    display:  flex;
    flex-direction: column; 
    margin: 20px auto; 
    width: 100%;
    align-items: center;
`;

UserInfoCard.Avatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  overflow: hidden;
  border: 4px solid #4b4654;
  height: 90px;
  width: 90px;
`;

UserInfoCard.AvatarImg = styled.img`
  width: 100px;
  height: auto;
`;

UserInfoCard.Name = styled.div`
  padding: 20px;
`; 

export default UserInfoCard;
