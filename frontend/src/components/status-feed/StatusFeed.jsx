import React from 'react';
import styled from 'styled-components';
import history from '../../history';
import api from '../../api/api';
import { isToday, getTime, getDate } from '../../helpers/dates';
import { connect } from 'react-redux';
import _ from 'lodash';

class StatusFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statuses: []
    }
  }

  async componentDidMount() {
    const { auth } = this.props;
    if (!auth.loggedIn) {
      history.push('/login');
    }
    this.dealWithGettingStatuses(auth, (result) => {
      this.tellServerStatusesWereSeen(auth, result, () => {});
      this.setState({ statuses: result });
    });
  }

  async dealWithGettingStatuses(auth, handleResult) {
    let response = await api.get(`/statuses/get/${auth.user}`);
    // let response = await api.get('/statuses/get/5faf3490349f3b6c3707cfd2'); // For testing
    const { success, result, error } = response.data;
    if (!success) {
      console.log(error);
    } else {
      console.log(result);
      handleResult(result);
    }
  }

  async tellServerStatusesWereSeen(auth, statuses, handleResult) {
    let response = await api.put('/statuses/see', {
      userId: auth.user,
      // userId: "5faf3490349f3b6c3707cfd2", // For testing
      statusIds: _.map(statuses, '_id'),
    });
    const { success, result, error } = response.data;
    if (!success) {
      console.log(error);
    } else {
      console.log(result);
      handleResult(result);
    }
  }

  refreshPage() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    history.go(0);
  }

  renderStatuses() {
    const { statuses } = this.state;
    if (statuses.length === 0) {
      return (
        <NoStatuses>
          There are no new statuses to show at the moment.
        </NoStatuses>
      );
    }
    return statuses.map( (status, index) => {
      const hasSrc = (status.creator.imageLink != null && status.creator.imageLink !== '');
      const src = hasSrc ? status.creator.imageLink : 'images/defaultAvatar.jpeg';
      const fullName = status.creator.firstName + " " + status.creator.lastName;
      const date = new Date(status.creationDate);
      let dateStr = isToday(date) ? `today at ${getTime(date)}` :
                    `on ${getDate(date)} at ${getTime(date)}`;
      return (
        <Status key={index}>
          <Header> 
            <ProfileImage src={src}/>
            <StatusPoster>
              <b>{fullName}</b> posted a status {dateStr}
            </StatusPoster>
          </Header>
          <Content>
            {this.renderImageContent(status)}
            <TextContent>
              {status.text}
            </TextContent>
          </Content>
        </Status>
      );
    })
  }

  renderImageContent(status) {
    if (status.imageLink != null && status.imageLink !== '') {
      return (
        <ImageContent> 
          <PostImage src={status.imageLink} />
        </ImageContent>
      );
    }
    return null;
  }

  render() {
    // let elements = Array.from(Array(5).keys())
    return (
      <Container>
        <NavBar>
          Status Feed
        </NavBar>
        {this.renderStatuses()}
        <GetMoreStatuses onClick={this.refreshPage}>
          Get more Statuses 
        </GetMoreStatuses>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth }
}

export default (connect(mapStateToProps, {})(StatusFeed));

const NoStatuses = styled.div`
  margin-top: 15px;
  color: blue;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  font-size: 1.5rem;
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 20px;
`

const NavBar = styled.div`
  display: inline-block;
  width: 100%;
  height: 70px;
  background-color:#3498db;
  font-weight: 500;
  color: white;
  font-size: 2rem;
  text-align: center;
  padding-top: 15px;
`

const Status = styled.div`
  width: 700px;
  margin-left: auto;
  margin-right: auto;
  background-color:#e6e6e6;
  margin-top: 15px;
  border-radius: 15px;
`

const ProfileImage = styled.img`
  margin-left: 15px;
  margin-top: 7px;
  max-width: 50px;
  max-height: 50px;
  vertical-align: middle;
  border-radius: 50%;
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 64px;
`
const StatusPoster = styled.div`
  text-align: center;
  margin-left: 7px;
  margin-top: auto;
  margin-bottom: auto;
`

const Content = styled.div`
  margin-left: 15px;
  margin-right: 15px;
`

const ImageContent = styled.div`
  margin-top: 5px;
  display: flex;
  align-items: center;
  height: calc((500px - 64px) / 2);
  width: 100%;
`

const PostImage = styled.img`
  vertical-align: middle;
  margin: auto;
  max-width: 100%;
  max-height: 100%;
`
const TextContent = styled.p` 
  margin-top: 15px;
  padding-bottom: 25px;
  padding-left: 20px;
  padding-right: 20px;
  height: 50%;
  width: 100%;
  font-family: 'Lucida Console', Courier, monospace;
`

const GetMoreStatuses = styled.div` 
  padding-top: 15px;
  text-align: center;
  color: blue;
  margin-left: auto;
  margin-right: auto;
  color: #3498db;
  font-size: 1.5rem;
  cursor: pointer;
`
