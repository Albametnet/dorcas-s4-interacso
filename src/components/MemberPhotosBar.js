import React from 'react';

class MemberPhotosBar extends React.Component {
  render(){
    return (
      <div className= "team-member__photo">
        {this.props.memberPics.map((pic) =>
          <img className= "team-member__photo--circles" src= {pic}/>
        )}
      </div>
    );
  }
}

export default MemberPhotosBar;
