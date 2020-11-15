import React from 'react';
import styled from 'styled-components';
import history from '../../history';

class StatusFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasImage: true,
    }
  }

  componentDidMount() {
    // Get registration date from backend
  }

  renderImageContent() {
    if (this.state.hasImage) {
      return (
        <ImageContent> 
          <PostImage src='images/mountains.jpg' />
        </ImageContent>
      );
    }
    return null;
  }

  refreshPage() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    history.go(0);
  }

  render() {
    let elements = Array.from(Array(5).keys())
    return (
      <Container>
        <NavBar>
          Status Feed
        </NavBar>
        {elements.map( (_ele, index) => {
          return (
            <Status key={index}>
              <Header> 
                <ProfileImage src='images/defaultAvatar.jpeg'/>
                <StatusPoster>
                  <b>Daniel Ssemanda</b> posted a status on 11/13/2020
                </StatusPoster>
              </Header>
              <Content>
                {this.renderImageContent()}
                <TextContent>
                  I just went hiking in the mountains this past weekend. It was super fun! I wish I could
                  go back pretty much every weekend. Oh well, back to work I go. Wishing everyone a 
                  wonderful week!
                </TextContent>
              </Content>
            </Status>
          );
        })}
        <GetMoreStatuses onClick={this.refreshPage}>
          Get more Statuses 
        </GetMoreStatuses>
      </Container>
    );
  }
}

export default StatusFeed;

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
