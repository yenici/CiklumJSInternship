import React, { PropTypes } from 'react';

const EmployeeInfo = function EmployeeInfo({ name, email, photo }) {
  const photoStyle = {
    backgroundImage: `url(${photo})`,
  };
  return (
    <div className="employee-info">
      <div className="employee-info__wrapper">
        <div className="employee-info__photo" style={photoStyle} />
        <div className="employee-info__name">{name}</div>
      </div>
      <a
        className="employee-info__email"
        href={`mailto:${email}`}
        target="_blank"
        rel="noopener noreferrer"
        alt="Revolunet"
      >
        {email}
      </a>
    </div>
  );
};

// <div className="employee-info__email">{`${email}qweqwrqetwrtytyutyuiiyutiuyttreqewqew`}</div>

EmployeeInfo.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
};

export default EmployeeInfo;
