import PropTypes from 'prop-types';

export default function Filter({ onChange }) {
  return (
    <>
      <p>Find contacts by name</p>
      <input type="text" name="filter" onChange={onChange}></input>
    </>
  );
}

Filter.propTypes = {
  onChange: PropTypes.func,
};
