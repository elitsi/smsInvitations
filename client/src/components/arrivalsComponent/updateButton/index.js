import React from 'react'
import './updateButton.scss'

const UpdateButton = props => {
  return (
    <div className="update">
      <button onClick={props.onClick}>עדכנו הגעתכם</button>
    </div>
  )
};

export default UpdateButton;
